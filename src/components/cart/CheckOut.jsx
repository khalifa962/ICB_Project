import classes from "./CheckOut.module.css";
import useInput from "../../hooks/use-input";
import { useState } from "react";
const isEmpty = (value) => value.trim() !== "";
const postalCodeValidate = (value) => value.length === 11;
const Checkout = (props) => {
  //error state
  const [formError, setFormError] = useState({
    nameValidation: true,
    streetValidation: true,
    postalCodeValidation: true,
    cityValidation: true
  });
  const {
    value: nameInput,
    isValid: nameIsValid,
    inputHandler: nameInputHandler,
    resetHandler: resetName
  } = useInput(isEmpty);
  const {
    value: streetInput,
    isValid: streetIsValid,
    inputHandler: streetInputHandler,
    resetHandler: resetStreet
  } = useInput(isEmpty);
  const {
    value: postalCodeInput,
    isValid: postalCodeIsValid,
    inputHandler: postalCodeInputHandler,
    resetHandler: resetPostalCode
  } = useInput(postalCodeValidate);
  const {
    value: cityInput,
    isValid: cityIsValid,
    inputHandler: cityInputHandler,
    resetHandler: resetCity
  } = useInput(isEmpty);

  const formIsValid =
    nameIsValid && streetIsValid && postalCodeIsValid && cityIsValid;
  const confirmHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      if (!nameIsValid) {
        setFormError((prev) => {
          return { ...prev, nameValidation: false };
        });
      } else {
        setFormError((prev) => {
          return { ...prev, nameValidation: true };
        });
      }
      if (!streetIsValid) {
        setFormError((prev) => {
          return { ...prev, streetValidation: false };
        });
      } else {
        setFormError((prev) => {
          return { ...prev, streetValidation: true };
        });
      }
      if (!postalCodeIsValid) {
        setFormError((prev) => {
          return { ...prev, postalCodeValidation: false };
        });
      } else {
        setFormError((prev) => {
          return { ...prev, postalCodeValidation: true };
        });
      }
      if (!cityIsValid) {
        setFormError((prev) => {
          return { ...prev, cityValidation: false };
        });
      } else {
        setFormError((prev) => {
          return { ...prev, cityValidation: true };
        });
      }
      return;
    } else {
      const date = new Date();
      const showTime = date.getHours()+ ':' + date.getMinutes()+ ":" + date.getSeconds();
      props.onConfirm({
        name: nameInput,
        street: streetInput,
        postalCode: postalCodeInput,
        city: cityInput,
        showTime:showTime,
      });
      resetName();
      resetStreet();
      resetPostalCode();
      resetCity();
      setFormError({
        nameValidation: true,
        streetValidation: true,
        postalCodeValidation: true,
        cityValidation: true
      });
    }
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          !formError.nameValidation ? classes.invalid : ""
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input
          onChange={nameInputHandler}
          type="text"
          id="name"
          value={nameInput}
        />
        {!formError.nameValidation && (
          <p style={{ fontSize: "20px", color: "red" }}>Enter Valid Name</p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          !formError.streetValidation ? classes.invalid : ""
        }`}
      >
        <label htmlFor="street">Class or Room</label>
        <input
          onChange={streetInputHandler}
          type="text"
          id="street"
          value={streetInput}
        />
        {!formError.streetValidation && (
          <p style={{ fontSize: "20px", color: "red" }}>Enter Valid Class Or Room</p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          !formError.postalCodeValidation ? classes.invalid : ""
        }`}
      >
        <label htmlFor="postal">Phone Number</label>
        <input
          onChange={postalCodeInputHandler}
          type="text"
          id="postal"
          value={postalCodeInput}
        />
        {!formError.postalCodeValidation && (
          <p style={{ fontSize: "20px", color: "red" }}>
            Enter Valid Phone Number
          </p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          !formError.cityValidation ? classes.invalid : ""
        }`}
      >
        <label htmlFor="city">Floor</label>
        <input
          onChange={cityInputHandler}
          type="text"
          id="city"
          value={cityInput}
        />
        {!formError.cityValidation && (
          <p style={{ fontSize: "20px", color: "red" }}>Enter Valid Floor</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
