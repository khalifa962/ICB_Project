import {useState} from 'react';
import classes from "./cart/CheckOut.module.css";
import useInput from "../hooks/use-input";

const isEmpty = (value) => value.trim() !== "";
// const priceValidHandler=(value)=> !isNaN(Number(value)) && typeof Number(value)==="number";

const AddMaintenanceOrder= (props) => {
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
      value: descriptionInput,
      isValid: descriptionIsValid,
      inputHandler: descriptionInputHandler,
      resetHandler: resetDescription
    } = useInput(isEmpty);

    const formIsValid = nameIsValid && descriptionIsValid ;
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
        const date = new Date();
        const showTime = date.getHours()+ ':' + date.getMinutes()+ ":" + date.getSeconds();
        props.addMaintenanceOrder({
          name: nameInput,
          description: descriptionInput,
          showTime: showTime        
        });
        resetName();
        resetDescription();
        setFormError({
          nameValidation: true,
          descriptionValidation: true,
        });
      }
    };

    return (
      
      <form style={{width:"60%",margin:"auto",padding:"20px",borderRadius:"20px",backgroundColor:"#eee", overflow:"auto"}} className={classes.form} onSubmit={confirmHandler}>
        <div
          className={`${classes.control} ${
            !formError.nameValidation ? classes.invalid : ""
          }`}>
          <label htmlFor="name">Name</label>
          <input
            onChange={nameInputHandler}
            type="text"
            id="name"
            value={nameInput}/>
          {!formError.nameValidation && (
            <p style={{ fontSize: "20px", color: "red" }}>Enter Valid Name</p>
          )}
        </div>
        <div
          className={`${classes.control} ${
            !formError.descriptionValidation ? classes.invalid : ""
          }`}>
          <label htmlFor="description">Description</label>
          <input
            onChange={descriptionInputHandler}
            type="text"
            id="description"
            value={descriptionInput}/>
        {!formError.descriptionValidation && (
            <p style={{ fontSize: "20px", color: "red" }}>Enter Valid Description</p>
          )}
        </div>
        <div style={{margin:"10px"}} className={classes.actions}>
          <button type="button" onClick={props.addOrderHandler}>
            Cancel
          </button>
          <button className={classes.submit}>Confirm</button>
        </div>
      </form>
    );
  };



export default AddMaintenanceOrder;
