import { React, useReducer } from "react";
import CartContext from "./CartContext";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (prevState, action) => {
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = prevState.items.findIndex(
      (item) => item.id === action.item.id
    );
    let existingCartItem = prevState.items[existingCartItemIndex];
    let updatedItems;
    let updatedItem;
    if (existingCartItem) {
      updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + action.item.quantity,
      };
      updatedItems = [...prevState.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = prevState.items.concat(action.item);
    }
    const updatedAmount =
      prevState.totalAmount + action.item.price * action.item.quantity;
    return {
      items: updatedItems,
      totalAmount: updatedAmount,
    };
  }
  if (action.type === "REMOVE_ITEM") {
    let cartItemIndex = prevState.items.findIndex(
      (item) => item.id === action.id
    );
    let existingItem = prevState.items[cartItemIndex];
    if (!existingItem) {
      return;
    }
    let updatedAmount = prevState.totalAmount - existingItem.price;
    let updatedItems;
    let updatedItem;
    if (existingItem.quantity === 1) {
      updatedItems = prevState.items.filter((item) => item.id !== action.id);
    }
    if (existingItem.quantity > 1) {
      updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      updatedItems = [...prevState.items];
      updatedItems[cartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedAmount,
    };
  }
  if (action.type === "CLEAR") {
    return defaultCartState;
  }
  return defaultCartState;
};
const CartContextProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id });
  };
  const removeCartItemsHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };
  const cartValue = {
    cartItems: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: removeCartItemsHandler,
  };
  return (
    <CartContext.Provider value={cartValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
