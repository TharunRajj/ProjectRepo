import { React, useState } from "react";
import classes from "./App.module.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const changeInputHandler = (event) => {
    setInputValue(event.target.value);
  };
  const buttonClickHandler = () => {
    let utterence = new SpeechSynthesisUtterance(inputValue);
    speechSynthesis.speak(utterence);
  };
  return (
    <div className={classes.app}>
      <label for="text" id="text">
        Enter text
      </label>
      <input
        type="textarea"
        id="text"
        onChange={changeInputHandler}
        value={inputValue}
      ></input>
      <button id="button" type="button" disabled = {!inputValue.trim()} onClick={buttonClickHandler}>
        Speech
      </button>
    </div>
  );
}

export default App;
