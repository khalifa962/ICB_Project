import style from "./Modal.module.css";
// import Modal from "./Modal";
import ReactDOM from "react-dom";
import React from "react";
const spinnerElement = document.getElementById("spinner");

const Backdrop = (props) => {
  return <div className={style.backdrop}></div>;
};

const SpinnerLoader = () => {
  return (
    <section className="talign-center">
      <div
        className="spinner spinner--steps2 icon-spinner-7"
        aria-hidden="true"
      ></div>
    </section>
  );
};
const Spinner = () => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, spinnerElement)}
      {ReactDOM.createPortal(<SpinnerLoader />, spinnerElement)}
    </>
  );
};
export default Spinner;
