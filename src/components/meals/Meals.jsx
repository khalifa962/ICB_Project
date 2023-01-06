import MealsSummary from "./MealsSumarry";
import AvailabelMeals from "./AvailableMeals";
import { Fragment } from "react";
const Meals = (props) => {
  return (
    <Fragment>
      <MealsSummary />
      <AvailabelMeals meals={props.meals}/>
    </Fragment>
  );
};
export default Meals;
