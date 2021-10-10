import React from 'react';
import { Card, CardContent, Typography, CardHeader } from '@material-ui/core';
import useStyles from './styles'
import useTranscations from '../../useTransactions';
import { Doughnut } from 'react-chartjs-2'


const Details = ({title}) => {
    const classes = useStyles();
    const { total, chartData } = useTranscations(title);
    console.log('chart Data')
    console.log(title, total , chartData)
    return (
        <Card className={ title === 'Income' ?classes.income : classes.expense}>
            <CardHeader title={title} />
            <CardContent>
                <Typography variant="h5" >${total}</Typography>
                <Doughnut data = {chartData} />
            </CardContent>
      </Card>
    )
}

export default Details
