import React from "react";
import Card from "../UI/Card";
import classes from "./Userslist.module.css";
const Userslist = (props) => {
  return (
    <Card className={classes.users}>
      <ul>
        {props.users.map((user) => (
          <li key={user.key}>
            {user.name} ({user.age} years old)
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default Userslist;
