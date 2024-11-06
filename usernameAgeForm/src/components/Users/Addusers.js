import React, { useRef } from "react";
import { useState } from "react";
import Card from "../UI/Card";
import classes from "./Adduser.module.css";
import Button from "../UI/Button";
import ErrorModal from "./ErrorModal";
const Adduser = (props) => {
  const ageInputRef = useRef();
  const nameInputRef = useRef();
  // const [enteredUsername, setEnteredUsername] = useState("");
  // const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();
  // const usernameChangeHandler = (event) => {
  //   setEnteredUsername(event.target.value);
  // };
  // const ageChangeHandler = (event) => {
  //   setEnteredAge(event.target.value);
  // };
  const formSubmitHandler = (event) => {
    event.preventDefault();
    const enteredAge = ageInputRef.current.value;
    const enteredUsername = nameInputRef.current.value;
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter valid name and age(non empty values)",
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter valid age(>0)",
      });
      return;
    }
    props.onAddUser(enteredUsername, enteredAge);
    nameInputRef.current.value='';
    ageInputRef.current.value='';
    // setEnteredAge("");
    // setEnteredUsername("");
  };
  const errorHandler = () => {
    setError(null);
  };
  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={formSubmitHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            //onChange={usernameChangeHandler}
            type="text"
            //value={enteredUsername}
            ref={nameInputRef}
          ></input>
          <label htmlFor="age">Age(Years)</label>
          <input
            id="age"
            //onChange={ageChangeHandler}
            type="text"
            //value={enteredAge}
            ref={ageInputRef}
          ></input>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};
export default Adduser;
