import React from 'react';
import classes from'./Spinner.module.css'; // Import your CSS file for styling the spinner

function Spinner() {
  return (
    <div className={classes.spinneroverlay}>
      <div className={classes.spinnercontainer}></div>
    </div>
  );
}

export default Spinner;