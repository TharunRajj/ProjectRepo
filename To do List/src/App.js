import { useState } from "react";
import "./styles.css";
import Viewlist from "./Viewlist";

export default function App() {
  const [enteredName, setEnteredName] = useState("");
  const [todoList,settodoList]=useState([]);
  const addItemHandler = () => {
    let item={
      'id': Math.floor(Math.random() * 9999),
      'name': enteredName
    }
    settodoList([...todoList,item]);
  };
const removeItem=(id)=>{
  const newItems=todoList.filter(items=>items.id!==id);
  settodoList(newItems);
}
  const changeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  return (
    <div className="App">
      <h1>To do list</h1>
      <input type="text" className="add" onChange={changeHandler}></input>
      <button className="add-button" onClick={addItemHandler}>
        Add
      </button>
      {todoList.map((set) => (
        <Viewlist value={set} removeItemHandler={removeItem} />
      ))}
    </div>
  );
}
