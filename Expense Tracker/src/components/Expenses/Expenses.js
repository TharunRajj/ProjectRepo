import React, { useState } from "react";
import Cards from "../UI/Cards";
import "./Expenses.css";
import ExpensesFilter from "./ExpenseFilter";
import ExpenseList from "./ExpensesList";
import ExpenseChart from "./ExpensesChart";
const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState("2020");
  const expenseFilterCondition = (selectedData) => {
    setFilteredYear(selectedData);
  };

  const filteredExpenseYear = props.items.filter((expense) => {
    //let date = new Date(expense.date);
    return expense.date.getFullYear().toString() === filteredYear;
  });

  return (
    <div>
      <Cards className="items">
        <ExpensesFilter
          selected={filteredYear}
          onChangeFilter={expenseFilterCondition}
        />
        <ExpenseChart expense={filteredExpenseYear} />
        <ExpenseList items={filteredExpenseYear} />
      </Cards>
    </div>
  );
};
export default Expenses;
