import React from "react";
import { useState } from "react";

export default function Test(props) {
  const [isClicked, setIsNotClicked] = useState(false);
  const { name } = props;

  const buttonClick = () => {
    setIsNotClicked((prev) => !prev);
  };
  return (
    <>
      <h1>{isClicked.toString()}</h1>
      <button onClick={buttonClick}></button>
    </>
  );
}
