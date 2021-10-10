import React,{useContext} from 'react'
import { Card, CardContent, CardHeader, Divider, Grid, Typography } from '@material-ui/core'
import { ExpenseTrackerContext } from '../../Constext.js/Context'
import Form from './form/form'
import useStyle from './styles'
import List from './List/list'
import InfoCard from './infoCard'

const Main = () => {
    const classes = useStyle();
    const {balance} = useContext(ExpenseTrackerContext)
    return (
        <Card className={classes.root}>
            <CardHeader title="expense Tracker" subheader="Powered by Speechly" />
            <CardContent>
                <Typography align="center" variant="h5">Total Balance ${balance}</Typography>
                <Typography variant="subtitle" style={{ lineHeight: '1.5em', marginTop: '20px' }}>
                   <InfoCard/>
                </Typography>
                <Divider className={classes.divider}/>
                <Form/>
                
            </CardContent>
            <CardContent className={classes.cardContent}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                 <List/>
                        </Grid>
                </Grid>
            </CardContent>
       </Card>
    )
}

export default Main
