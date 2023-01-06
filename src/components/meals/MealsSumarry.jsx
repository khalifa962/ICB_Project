import style from "./MealsSummary.module.css";
const MealsSummary = () => {
  return (
    <section className={style.summary}>
      <h2>Delicious Food, Served To You!</h2>
      <p>
        Choose your favourite meal from our broad selection of available meals
        and enjoy a delcious meal at ICB School.
      </p>
      <p>
        All our meals are cooked with high-quality ingredients, just-in-time and
        of course by experienced chefs.
      </p>
    </section>
  );
};
export default MealsSummary;
