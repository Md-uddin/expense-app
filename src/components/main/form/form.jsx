
import React,{useState,useContext,useEffect} from 'react'
import { TextField, Grid, Button, FormControl,  Typography, Select, InputLabel, MenuItem } from "@material-ui/core"
import { ExpenseTrackerContext } from '../../../Constext.js/Context'
import { v4 as uuidv4 } from 'uuid';
import { useSpeechContext } from '@speechly/react-client';
import { incomeCategories,expenseCategories } from '../../../constants/categories'
import useStyles from './styles'
import FormatDate from '../../../utils/formatDate'
import CustomizedSnackBar from '../../Snackbar/snackbar';

const initialState = {
    amount: '',
    category: '',
    type: 'Income',
    date: FormatDate(new Date())
}
const Form = () => {
    const [formData, setFormData] = useState(initialState);
    const [open, setOpen] = useState(false)
    const classes = useStyles();
    const { segment } = useSpeechContext();
    useEffect(() => {
        if (segment) {
            if (segment.intent.intent === 'add_expense') {
              setFormData({...formData , type : 'Expense'})
            } else if (segment.intent.intent === 'add_income') {
                setFormData({ ...formData, type : 'Income'})
            } else if (segment.isFinal && segment.intent.intent === 'create_transaction') {
                return createTransaction();
            } else if (segment.isFinal && segment.intent.intent === "cancel_transaction") {
                return  setFormData(initialState)
            }
            segment.entities.forEach((e) => {
                const category = `${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`
                switch (e.type) {
                    case 'amount':
                        setFormData({ ...formData, amount: e.value });
                        break;
                    case 'category':
                        if (incomeCategories.map((ic) => ic.type.includes(category))) {
                            
                            setFormData({ ...formData, category });
                        } else if (expenseCategories.map((ic) => ic.type.includes(category))) {
                            setFormData({...formData,category})
                        }
                        break;
                    case 'date':
                        setFormData({ ...formData, date: e.value });
                        break;
                    default:
                        break;
                }
            })
            if (segment.isFinal && formData.amount && formData.category && formData.type && formData.date) {
                createTransaction();
            }
      }  
    },[segment])
    const onFormchange = (e) => {
        if ( e.target.name === 'date'){setFormData({ ...formData, [e
            .target.name]: FormatDate(e.target.value)
        });
        }
        else {setFormData({ ...formData, [e
            .target.name]: e.target.value });}
        
        console.log(formData)
    }
    const { addTransaction } = useContext(ExpenseTrackerContext);
    const createTransaction = () => {
        if (Number.isNaN(Number(formData.amount)) || !formData.date.includes('-')) return;

        const transaction = {...formData,amount:Number(formData.amount),id:uuidv4()}
        addTransaction(transaction);
        setFormData(initialState);
        setOpen(true)
    }
    const selecetedCategories = formData.type ==='Income' ? incomeCategories : expenseCategories
    return (
        <Grid container spacing={2}>
            <CustomizedSnackBar open={open} setOpen={setOpen}/>
            <Grid item xs={12} >
            <Typography align="center" variant="subtitle2" gutterBottom >
                    {segment && segment.words.map((w)=> w.value).join(" ")}
            </Typography>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select value={formData.type} onChange={(e)=>{onFormchange(e)}} name="type">
                        <MenuItem value="Income">Income</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6} >
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select onChange={(e)=>{onFormchange(e)}} name="category">
                        {selecetedCategories.map((c)=> (<MenuItem key={c.type} value={c.type} >{c.type}</MenuItem>))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField type="number" label="Amount" fullWidth name="amount" onChange={(e)=>{onFormchange(e)}} value={formData.amount}/>
            </Grid>
            <Grid item xs={6}>
                <TextField type="date" fullWidth value={formData.date} name="date" onChange={(e)=>{onFormchange(e)}}/>
            </Grid>
            <Button className={classes.button} variant="outlined" color="primary" fullWidth onClick={()=>{createTransaction()}}>Create</Button>
      </Grid>
    )
}

export default Form
