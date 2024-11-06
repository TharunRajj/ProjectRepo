import React from "react";
import Cards from "../UI/Cards";
import ExpenseDate from "./ExpenseDate";
import "./ExpenseItem.css";

const ExpenseItem = (prop) => {
  return (
    <Cards className="expense-item">
      <ExpenseDate date={prop.date} />
      <div className="expense-item__description">
        <h2>{prop.title}</h2>
        <div className="expense-item__price">${prop.amount}</div>
      </div>
    </Cards>
  );
};

export default ExpenseItem;
