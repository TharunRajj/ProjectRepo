import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../Store/CartContext";
import CartItem from "./CartItem";
import CheckoutForm from "./CheckoutForm";

const Cart = (props) => {
  const [isCheckout, SetIsCheckout] = useState(false);
  const [isOrderSucceed, setOrderSuceed] = useState(false);
  const ctx = useContext(CartContext);
  const addCartItemHandler = (item) => {
    ctx.addItem({ ...item, quantity: 1 });
  };
  const removeCartItemHandler = (id) => {
    ctx.removeItem(id);
  };
  const checkoutHandler = () => {
    SetIsCheckout(true);
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {ctx.cartItems.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          quantity={item.quantity}
          price={item.price}
          onRemove={removeCartItemHandler.bind(null, item.id)}
          onAdd={addCartItemHandler.bind(null, item)}
        ></CartItem>
      ))}
    </ul>
  );
  const noOfItems = ctx.cartItems.length;
  const buttonRender = (
    <div className={classes.actions}>
      <button className={classes["button-alt"]} onClick={props.onHideCart}>
        Close
      </button>
      {noOfItems > 0 && (
        <button className={classes.button} onClick={checkoutHandler}>
          Order
        </button>
      )}
    </div>
  );

  const showHideButtonHandler = () => {
    SetIsCheckout(false);
  };
  const successfulOrderHandler = () => {
    setOrderSuceed(true);
  };
  const cartContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{`$${ctx.totalAmount ? ctx.totalAmount.toFixed(2) : 0}`}</span>
      </div>
      {isCheckout && (
        <CheckoutForm
          buttonHandler={showHideButtonHandler}
          orderPlaced={successfulOrderHandler}
        />
      )}
      {!isCheckout && buttonRender}
    </React.Fragment>
  );
  const buttonContent = (
    <>
      <p style={{ textAlign: "center" }}>Order Placed...</p>
      <div className={classes.actions}>
        <button className={classes["button-alt"]} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </>
  );
  return (
    <Modal onRemoveCart={props.onHideCart}>
      {!isOrderSucceed && cartContent}
      {isOrderSucceed && buttonContent}
    </Modal>
  );
};

export default Cart;
