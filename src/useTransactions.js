import { useContext } from "react";
import { ExpenseTrackerContext } from "./Constext.js/Context";

import {
  incomeCategories,
  expenseCategories,
  resetCategories,
} from "./constants/categories";

const useTranscations = (title) => {
  console.log(title);
  resetCategories();
  const { transactions } = useContext(ExpenseTrackerContext);

  const transactionsPerType = transactions.filter((t) => t.type === title);
 console.log(transactionsPerType)
  const total = transactionsPerType.reduce(
    (acc, currVal) => (acc += currVal.amount),
    0
  );
  const categories = title === "Income" ? incomeCategories : expenseCategories;

    transactionsPerType.forEach((t) => {
      
    const category = categories.find((c) => c.type === t.category);

    console.log(category)
      if (category) category.amount += t.amount;
      console.log('this is ')
  });
     console.log(categories,total,transactions)
    const filteredCategories = categories.filter((c) => c.amount > 0);
  
  const chartData = {
    datasets: [
      {
        data: filteredCategories.map((c) => c.amount),
        backgroundColor: filteredCategories.map((c) => c.color),
      },
    ],
    labels: filteredCategories.map((c) => c.type),
  };

  return { filteredCategories, total, chartData };
};
export default useTranscations;
