import { useReducer } from "react";
import CartContext from "./cart-context";
const defaultCartState = JSON.parse(window.localStorage.getItem("myItems"))
  ? JSON.parse(window.localStorage.getItem("myItems"))
  : {
      items: [],
      totalAmount: 0
    };

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    // const updatedItems = state.items.concat(action.item);
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    setTimeout(
      () =>
        window.localStorage.setItem(
          "myItems",
          JSON.stringify({
            items: updatedItems,
            totalAmount: updatedTotalAmount
          })
        ),
      100
    );
    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }
  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;
    let updatedItems;
    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => {
        return item.id !== action.id;
      });
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    setTimeout(
      () =>
        window.localStorage.setItem(
          "myItems",
          JSON.stringify({
            items: updatedItems,
            totalAmount: updatedTotalAmount
          })
        ),
      100
    );
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }
  if (action.type === "CLEAR") {
    window.localStorage.removeItem("myItems");
    return { items: [], totalAmount: 0 };
  }
  return defaultCartState;
};
const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);
  const resetCart = () => {
    dispatchCart({ type: "CLEAR" });
  };
  const addItemHandler = (item) => {
    dispatchCart({ type: "ADD_ITEM", item: item });
  };
  const removeItemHandler = (id) => {
    dispatchCart({ type: "REMOVE_ITEM", id: id });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    resetCart
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
