import React, { useReducer, createContext } from "react";

import contextReducer from "./contextReducer";

const initialState = JSON.parse(localStorage.getItem("transactions")) || [];

export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
  const [transactions, dispatch] = useReducer(contextReducer, initialState);

  // acton creators
  const deleteTransaction = (id) => {
    dispatch({ type: "DELETE_TRANSACTION", payload: id });
  };
  const addTransaction = (transcation) => {
    dispatch({ type: "ADD_TRANSACTION", payload: transcation });
  };
//   console.log(transactions);
  const balance = transactions.reduce((acc, curVal) => {
    return(curVal.type=== 'Expense' ? acc - curVal.amount : acc + curVal.amount )
  },0)
  return (
    <ExpenseTrackerContext.Provider
      value={{
        deleteTransaction,
              addTransaction,
        transactions,
      balance
      }}
    >
      {children}
    </ExpenseTrackerContext.Provider>
  );
};
