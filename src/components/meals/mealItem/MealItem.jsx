import style from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import { useContext } from "react";
import CartContext from "../../../store/cart-context";
const MealItem = (props) => {
  const ctx = useContext(CartContext);
  const onAddToCartHandler = (amount) => {
    ctx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price
    });
  };
  const price = `EGP${Number(props.price).toFixed(2)}`;
  return (
    <li className={style.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={style.description}>{props.description}</div>
        <div className={style.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={onAddToCartHandler} id={props.id} />
      </div>
    </li>
  );
};
export default MealItem;
