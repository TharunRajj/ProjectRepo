import React from "react";
// import { ReactDOM } from 'react-dom';
import classes from './Modal.module.css'
var ReactDOM = require('react-dom');
const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onRemoveCart}></div>;
};

const Overlay = (props) => {
  return ( 
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};
const portalElement = document.getElementById("overlays");
const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop onRemoveCart={props.onRemoveCart}/>,portalElement)}
      {ReactDOM.createPortal(<Overlay>{props.children}</Overlay>,portalElement)}
    </React.Fragment>
  );
};

export default Modal;
