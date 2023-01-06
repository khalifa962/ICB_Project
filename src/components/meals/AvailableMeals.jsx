import Card from "../UI/Card";
import style from "./AvailableMeals.module.css";
import MealItem from "./mealItem/MealItem";
import { useState, useEffect } from "react";
import Spinner from "../UI/spinner";

const AvailableMeals = (props) => {
  const [myMeals, setMyMeals] = useState(props.meals);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
    setMyMeals(props.meals)
  }, [props.meals]);
  return (
    <section className={style.meals}>
      <Card>
        {isLoading && <Spinner />}
        {myMeals.length>0?(<ul>
          {myMeals.map((meal) => {
            return (
              <MealItem
                id={meal.id}
                key={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
              />
            );
          })}
        </ul>):<ul><p className="errorDialogue">Internet Connection Issue, Please Refresh the Page Or Check Your Connection Status!</p></ul>}
      </Card>

    </section>
  );
};
export default AvailableMeals;
