import React,{useContext} from 'react'
import { Avatar, IconButton, List as MUIList, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Slide } from '@material-ui/core'
import { Delete, MoneyOff } from '@material-ui/icons'

import useStyle from './style'
import { ExpenseTrackerContext } from '../../../Constext.js/Context'


const List = () => {

    const classes = useStyle();
    const {deleteTransaction,transactions} = useContext(ExpenseTrackerContext);

    console.log(deleteTransaction)

    
    return (
        <MUIList dense={false} className={classes.list}>
            {transactions.map(transaction => (
                <Slide direction="down" in mountOnEnter unmountOnExit key={transactions.id}>
                    {/* for animation above                  */}
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar className={transaction.type === 'Income' ? classes.avatarIncome : classes.avatarExpense} >
                            <MoneyOff/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={transaction.category} secondary={`$${ transaction.amount }-${ transaction.date }`} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={()=>{deleteTransaction(transaction.id)}}>
                                <Delete/>
                            </IconButton>
                        </ListItemSecondaryAction>
                            
                        
                    </ListItem>

                </Slide>
            ))}
     </MUIList>
    )
}

export default List
