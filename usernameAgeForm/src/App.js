import React,{useState} from "react";
import Adduser from "./components/Users/Addusers.js";
import Userslist from "./components/Users/Userslist.js";
function App() {
const [usersList,setUsersList]=useState([]);
const onAddUser=(uName,uAge)=>{
  setUsersList((prevUsersList)=>{
    return[...prevUsersList,{name:uName,age:uAge,key:Math.random().toString()}]
  });
}
  return (
    <div>
      <Adduser onAddUser={onAddUser}/> 
      <Userslist users={usersList} />
    </div>
  );
}

export default App;
