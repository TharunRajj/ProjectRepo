import React from "react";

const DemoOutput = (props) => {
  return <p>{props.showText ? "This is new!" : ""}</p>;
};

export default React.memo(DemoOutput);