import React, {useState} from "react";
import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";
const NewExpense = (props) => {
  const[isEditing,setIsEditing] = useState(false);
  const submitDataHandler = (enteredExpenseData) => {
    const expenseData={
        ...enteredExpenseData,
        id:Math.random().toString()
    }
    props.onSubmitExpenseData(expenseData);
  };
  const startEditingHandler=()=>{
    setIsEditing(true);
  }
  const stopEditingHandler=()=>{
    setIsEditing(false);
  }
  return (
    <div className="new-expense">
      {!isEditing && <button onClick={startEditingHandler}>Add New Expense</button>}
      {isEditing && <ExpenseForm onSaveSubmitData={submitDataHandler} onCancel={stopEditingHandler}/>}
    </div>
  );
};

export default NewExpense;
