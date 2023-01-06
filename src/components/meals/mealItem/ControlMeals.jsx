import style from "./MealItem.module.css";
import classes from "../AvailableMeals.module.css";
import Card from "../../UI/Card";
import Spinner from "../../UI/spinner";
// import MealItem from "../../mealItem/MealItem";
// import useInput from "../../../hooks/use-input";

import { useState, useEffect } from "react";

const ControlMeals = (props) => {
  const [myMeals, setMyMeals] = useState(props.meals);
  const [isLoading, setIsLoading] = useState(true);
  // const price = ;
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
    setMyMeals(props.meals)
  }, [props.meals]);
  const deleteMealHandler=(x,y)=>{
    let pp=prompt("You Are Going To Delete Meal, Please Type \"Yes\" To Premenantly Delete The Item Or Cancel If You Wouldn't Delete It");
    if(pp){
      if(pp.toLowerCase()==="yes"){
        props.deleteItemHandler(x,y);
        const uniqueIds = [];
        const unique = myMeals.filter(element => {
          const isDuplicate = uniqueIds.includes(element.id);
          if (!isDuplicate) {
            uniqueIds.push(element.id);
            return true;
          }
          return false;
        });
        setMyMeals(unique);  
        }else{
        return;
      }
    }
  }

  return (
      <section className={classes.meals}>
        <Card>
          {isLoading && <Spinner />}
          {myMeals.length>0?(
          <ul>
          {myMeals.map((meal) => {
            const price=`EGP ${Number(meal.price).toFixed(2)}`
            return (
              <li key={meal.id} className={style.meal}>
                <div>
                  <h3>{meal.name}</h3>
                  <div className={style.description}>{meal.description}</div>
                  <div className={style.price}>{price}</div>
                </div>
                <div style={{cursor:"pointer"}} onClick={()=>deleteMealHandler('meals/',meal.id)}>
                  <svg  xmlns="http://www.w3.org/2000/svg" fill="#fff" height="58" width="48"><path d="M13.05 42q-1.25 0-2.125-.875T10.05 39V10.5H8v-3h9.4V6h13.2v1.5H40v3h-2.05V39q0 1.2-.9 2.1-.9.9-2.1.9Zm21.9-31.5h-21.9V39h21.9Zm-16.6 24.2h3V14.75h-3Zm8.3 0h3V14.75h-3Zm-13.6-24.2V39Z"/><title>Delete This Meal</title>
</svg>
                </div>
              </li>
            )})}
        </ul>
          ):(
            <h3 style={{color:"#FFF", textAlign:"center",letterSpacing:"2px"}}>There Is No Meals, Please Add Some!!</h3>
          )}

        </Card>
      </section>
      )
};
export default ControlMeals;
