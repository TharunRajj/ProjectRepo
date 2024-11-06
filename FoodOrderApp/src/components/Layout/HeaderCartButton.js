import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../Store/CartContext";

const HeaderCartButton = (props) => {
  const [animation, setAnimation] = useState(false);
  const cartCtx = useContext(CartContext);
  const { cartItems } = cartCtx;
  const noOfItems = cartItems.reduce((curNumber, item) => {
    return curNumber + item.quantity;
  }, 0);

  useEffect(() => {
    if (cartItems.length === 0) {
      return;
    }
    setAnimation(true);
    const timer = setTimeout(() => {
      setAnimation(false);
    }, 300); //300 is given because bumb animation time is 300ms(see HeaderCartButton.module.css)

    return () => {
      clearInterval(timer);
    };
  }, [cartItems]);

  const buttonClasses = `${classes.button} ${animation ? classes.bump : ""}`;
  return (
    <button className={buttonClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{noOfItems}</span>
    </button>
  );
};

export default HeaderCartButton;
