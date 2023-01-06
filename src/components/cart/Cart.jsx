import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import style from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./CheckOut";
const Cart = (props) => {
  const [checkout, setCheckout] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  // const [notValid,setNotValid]=useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `EGP${Number(cartCtx.totalAmount).toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const orderHandler = () => {
    setCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
      setIsSubmiting(true);
        await fetch(
          "https://icb-2023-default-rtdb.firebaseio.com/oreders.json",
          {
            method: "POST",
            body: JSON.stringify({
              user: userData,
              items: cartCtx.items,
              totalAmount,
            })
          }
        );
        setTimeout(() => {
          setIsSubmiting(false);
          setIsSubmited(true);
          props.fetchOrders();
        }, 2000);
        cartCtx.resetCart();
        // props.fetchOrders();
    }

  const submitedHandler=()=>{
    setIsSubmited(false);
    props.showCartHandler();

  }

  const cartItems = (
    <ul className={style["cart-items"]}>
      {cartCtx.items.map((i) => {
        return (
          <CartItem
            key={i.id}
            name={i.name}
            amount={i.amount}
            price={i.price}
            onAdd={cartItemAddHandler.bind(null, i)}
            onRemove={cartItemRemoveHandler.bind(null, i.id)}
          />
        );
      })}
    </ul>
  );


  const modalActions = checkout ? (
    <Checkout onConfirm={submitOrderHandler} onCancel={props.showCartHandler} />
  ) : (
    <div className={style.actions}>
      <button onClick={submitedHandler} className={style["button--alt"]}>
        Close
      </button>
      {hasItems && (
        <button className={style.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const ModalContent = isSubmited ? (
    <>
      <p>ORDER SENT SUCCESSFULLY</p>
      <button onClick={submitedHandler} className={style.closeBtn}>
        Close
      </button>    
    </>
  ) : isSubmiting ? (
    <section className="talign-center">
      <div
        className="spinnerBlack spinner--steps2 icon-spinner-7"
        aria-hidden="true"
      ></div>
      <p>SENDING ORDER TO THE CHEF!!</p>
    </section>
  ) : (
    <>
      {cartItems}
      <div className={style.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {modalActions}
    </>
  );

  return <Modal showCartHandler={props.showCartHandler}>{ModalContent}</Modal>;
};
export default Cart;
