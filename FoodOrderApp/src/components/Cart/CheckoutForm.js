import classes from "./CheckoutForm.module.css";
import { useContext, useRef, useState } from "react";
import CartContext from "../../Store/CartContext";
import axios from "axios";

const isEmpty = (value) => value.trim() === "";
const isValidPostalCode = (value) => value.trim().length === 6;

const CheckoutForm = (props) => {
  const ctx = useContext(CartContext);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [validateValue, setValidateValue] = useState({
    nameIsValid: true,
    streetIsValid: true,
    postalCodeIsValid: true,
    cityIsValid: true,
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const checkoutConfirmHandler = (event) => {
    event.preventDefault();

    const nameInputIsValid = !isEmpty(nameInputRef.current.value);
    const streeInputIsValid = !isEmpty(streetInputRef.current.value);
    const postalCodeInputIsValid = isValidPostalCode(
      postalCodeInputRef.current.value
    );
    const cityInputIsValid = !isEmpty(cityInputRef.current.value);

    setValidateValue({
      nameIsValid: nameInputIsValid,
      streetIsValid: streeInputIsValid,
      postalCodeIsValid: postalCodeInputIsValid,
      cityIsValid: cityInputIsValid,
    });
    const formIsValid =
      nameInputIsValid &&
      streeInputIsValid &&
      postalCodeInputIsValid &&
      cityInputIsValid;

    if (!formIsValid) {
      return;
    }
    submitDataHandler();
  };
  const submitDataHandler = async () => {
    setIsSubmitting(true);
    const userData = {
      name: nameInputRef.current.value,
      street: streetInputRef.current.value,
      postalCode: postalCodeInputRef.current.value,
      city: cityInputRef.current.value,
    };
    const submittedData = {
      user: userData,
      cartItems: ctx.cartItems,
    };
    try {
      await axios.post(
        "https://react-http-7d4bc-default-rtdb.firebaseio.com/orders.json",
        {
          body: JSON.stringify(submittedData),
        }
      );
      setSubmitError("");
      setIsSubmitting(false);
      setDidSubmit(true);
      ctx.clearCart();
      props.orderPlaced();
    } catch (error) {
      setSubmitError(error.message);
    }
  };
  const submittingContent = (
    <p className={classes.message}>Placing order....</p>
  );
  const successfullSubmitContent = <p>Order placed....</p>;
  const buttonContent = (
    <div className={classes.actions}>
      <button type="button" onClick={props.buttonHandler}>
        Cancel
      </button>
      <button className={classes.submit}>Confirm</button>
    </div>
  );
  const nameInputClasses = `${classes.control} ${
    !validateValue.nameIsValid ? classes.invalid : ""
  }`;
  const streetInputClasses = `${classes.control} ${
    !validateValue.streetIsValid ? classes.invalid : ""
  }`;
  const postalCodeClasses = `${classes.control} ${
    !validateValue.postalCodeIsValid ? classes.invalid : ""
  }`;
  const cityInputClasses = `${classes.control} ${
    !validateValue.cityIsValid ? classes.invalid : ""
  }`;
  return (
    <form className={classes.form} onSubmit={checkoutConfirmHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef}></input>
        {!validateValue.nameIsValid && <p>Enter valid name.</p>}
      </div>
      <div className={streetInputClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef}></input>
        {!validateValue.streetIsValid && <p>Enter valid street.</p>}
      </div>
      <div className={postalCodeClasses}>
        <label htmlFor="postal code">Postal Code</label>
        <input type="text" id="postal code" ref={postalCodeInputRef}></input>
        {!validateValue.postalCodeIsValid && (
          <p>Enter a valid postal code(6 characters long)</p>
        )}
      </div>
      <div className={cityInputClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef}></input>
        {!validateValue.cityIsValid && <p>Enter valid city.</p>}
      </div>
      <div>
        {submitError && <p className={classes.error}>{submitError}</p>}
      </div>
      {isSubmitting && !submitError && submittingContent}
      {!isSubmitting && !submitError && !didSubmit && buttonContent}
      {didSubmit && successfullSubmitContent}
    </form>
  );
};

export default CheckoutForm;
