import React from "react";
import "./CourseGoalList.css";
import CourseGoalItem from "../courseGoalItem/CourseGoalItem";

const CourseGoalList = props => {
  return (
    <ul className="goal-list">
      {props.items.map(goal => (
        <CourseGoalItem
          key={goal.id}
          id={goal.id}
          onDelete={props.onDeleteItem}
        >
          {goal.text}
        </CourseGoalItem>
      ))}
    </ul>
  );
};
export default CourseGoalList;
