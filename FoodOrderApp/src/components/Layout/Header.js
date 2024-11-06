import React from "react";
import classes from "./Header.module.css";
import mealsImage from "../../Assests/pexels-fauxels-3184195.jpg";
import HeaderCartButton from "./HeaderCartButton";
const Header = (props) => {
  return (
    <React.Fragment>
      <header  className={classes.header}>
        <h1>Tasty Meals</h1>
        <HeaderCartButton onClick={props.onShowCart}/>
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt="Get the delicious meals"></img>
      </div>
    </React.Fragment>
  );
};

export default Header;
