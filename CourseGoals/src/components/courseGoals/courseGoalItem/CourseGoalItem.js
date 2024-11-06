import React from "react";
import './CourseGoalItem.css'
const CourseGoalItem = props => {
  const deleteItemHandler = () => {
    props.onDelete(props.id);
  };

  return (
    <li className="goal-item" onClick={deleteItemHandler}>
      {props.children}
    </li>
  );
};
export default CourseGoalItem;