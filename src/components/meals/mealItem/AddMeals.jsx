import {useState} from 'react';
import classes from "../../cart/CheckOut.module.css";
import useInput from "../../../hooks/use-input";

const isEmpty = (value) => value.trim() !== "";
const priceValidHandler=(value)=> !isNaN(Number(value)) && typeof Number(value)==="number";

const AddMeals = (props) => {
    const [formError, setFormError] = useState({
      nameValidation: true,
      description: true,
      priceValidation: true,
    });
    const {
      value: nameInput,
      isValid: nameIsValid,
      inputHandler: nameInputHandler,
      resetHandler: resetName
    } = useInput(isEmpty);
    const {
      value: priceInput,
      isValid: priceIsValid,
      inputHandler: priceInputHandler,
      resetHandler: resetprice
    } = useInput(priceValidHandler);
    const {
      value: descriptionInput,
      isValid: descriptionIsValid,
      inputHandler: descriptionInputHandler,
      resetHandler: resetDescription
    } = useInput(isEmpty);

    const formIsValid = nameIsValid && descriptionIsValid && priceIsValid;
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
        if (!priceIsValid) {
          setFormError((prev) => {
            return { ...prev, priceValidation: false };
          });
        } else {
          setFormError((prev) => {
            return { ...prev, priceValidation: true };
          });
        }
        if (!descriptionIsValid) {
          setFormError((prev) => {
            return { ...prev, descriptionValidation: false };
          });
        } else {
          setFormError((prev) => {
            return { ...prev, descriptionValidation: true };
          });
        }
        return;
      } else {
        props.submitOrderHandler({
          name: nameInput,
          price: Number(priceInput),
          description: descriptionInput,
        });
        resetName();
        resetprice();
        resetDescription();

        setFormError({
          nameValidation: true,
          priceValidation: true,
          descriptionValidation: true,

        });
      }
    };

    return (
      <form style={{width:"60%",margin:"auto",padding:"20px",borderRadius:"20px",backgroundColor:"#eee", overflow:"auto"}} className={classes.form} onSubmit={confirmHandler}>
        <div
          className={`${classes.control} ${
            !formError.nameValidation ? classes.invalid : ""
          }`}
        >
          <label htmlFor="name">Name</label>
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
            !formError.priceValidation ? classes.invalid : ""
          }`}
        >
          <label htmlFor="price">Price</label>
          <input
            onChange={priceInputHandler}
            type="text"
            id="price"
            value={priceInput}
          />
        {!formError.priceValidation && (
            <p style={{ fontSize: "20px", color: "red" }}>Enter Valid Price</p>
          )}
        </div>
        <div
          className={`${classes.control} ${
            !formError.descriptionValidation ? classes.invalid : ""
          }`}
        >
          <label htmlFor="description">Description</label>
          <input
            onChange={descriptionInputHandler}
            type="text"
            id="description"
            value={descriptionInput}
          />
        {!formError.descriptionValidation && (
            <p style={{ fontSize: "20px", color: "red" }}>Enter Valid Description</p>
          )}
        </div>
        <div style={{margin:"10px"}} className={classes.actions}>
          <button type="button" onClick={props.addMealHandler}>
            Cancel
          </button>
          <button className={classes.submit}>Confirm</button>
        </div>
      </form>
    );
  };



export default AddMeals;
