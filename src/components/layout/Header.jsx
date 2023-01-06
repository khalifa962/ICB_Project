import style from "./Header.module.css";
import React, { Fragment,useState } from "react";
// import mealsImage from "../../assets/meals.jpg";
import maintenanceImage from '../../assets/maintenance.jpg';
import mealsImage from "../../assets/icb.jpg";
import logoImg from "../../assets/logo.png";
import HeaderCartButton from "./HeaderCartButton";
import { Link } from "react-router-dom";

const Header = (props) => {
const [showImage,setShowImage]=useState("");
const classFood=showImage==="meals"?style.displayNone:style.link;
const classChef=showImage==="chef"?style.displayNone:style.link;
const classMaintenance=showImage==="maintenance"?style.displayNone:style.link;

  return (
    <Fragment>
      <header className={style.header}>
      <div className={style.links}>
        <Link onClick={()=>setShowImage("meals")} className={classFood} to="/food">
          <h3>ICB Food</h3>
        </Link>
        <Link onClick={()=>setShowImage("chef")} className={classChef} to="/chef">
          <h4>Chef Page</h4>
        </Link>
        <Link onClick={()=>setShowImage("maintenance")} className={classMaintenance} to="/maintenance">
          <h4>Maintenance</h4>
        </Link>
      </div>
      {showImage==="meals"?<HeaderCartButton showCartHandler={props.showCartHandler} />:<Link to="/" onClick={()=>setShowImage("")} className={style.logoImg}><img src={logoImg} alt="logo"/></Link>}
      </header>
      {showImage==="meals"||showImage==="chef"?(
        <div className={style["main-image"]}>
        <img src={mealsImage} alt="meals" />
        </div>
        ):showImage==="maintenance"?(
          <div className={style["main-image"]}>
          <img src={maintenanceImage} alt="maintenance" />
          </div>
        ):null}

    </Fragment>
  );
};
export default Header;
