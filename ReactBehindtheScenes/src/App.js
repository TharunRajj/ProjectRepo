import { React, useCallback, useState } from "react";
import Button from "./components/UI/Button/Button";
import "./App.css";
import DemoOutput from "./components/Demo/DemoOutput";

function App() {
  const [toggleChange, setToggleChange] = useState(false);
  const [showtoggle, setShowToggle] = useState(false);
  const toggleHandler = useCallback(() => {
    if (showtoggle) {
      setToggleChange((setToggleChange) => !setToggleChange); //OR setToggleChange(!toggleChange)
    }
  }, [showtoggle]);
  const showToggleHandler = () => {
    setShowToggle(true);
  };
  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput showText={toggleChange}></DemoOutput>
      <Button onClick={showToggleHandler}>Toggle ON</Button>
      <Button onClick={toggleHandler}>Toggle Paragraph</Button>
    </div>
  );
}

export default App;
