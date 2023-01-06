import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import style from "./HeaderCartButton.module.css";
import CartIcon from "../cart/cartIcon";
const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  const numberOfCartItems = items.reduce((curr, item) => curr + item.amount, 0);
  const [btnAnimation, setBtnAnimation] = useState(false);
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnAnimation(true);
    const timer = setTimeout(() => {
      setBtnAnimation(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [items]);
  const btnClasses = `${style.button} ${btnAnimation ? style.bump : null}`;
  return (
    <button className={btnClasses} onClick={props.showCartHandler}>
      <span className={style.icon}>
        <CartIcon />
      </span>
      <span className={style.cartText}>Your Cart</span>
      <span className={style.badge}>{numberOfCartItems}</span>
    </button>
  );
};
export default HeaderCartButton;
