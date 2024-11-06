import "./Viewlist.css";
const Viewlist = (props) => {
  return (
    <div className="to-do-list">
      <li>{props.value.name}</li>
      <button onClick={() => props.removeItemHandler(props.value.id)}>x</button>
    </div>
  );
};

export default Viewlist;
