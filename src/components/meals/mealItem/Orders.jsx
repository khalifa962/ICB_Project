import style from "./MealItem.module.css";
import classes from "../AvailableMeals.module.css";
import Card from "../../UI/Card";
import Spinner from "../../UI/spinner";
import { useState,useEffect } from "react";

const Orders = (props) => {
  const [myOrders, setMyOrders] = useState(props.orders);
  const [isLoading, setIsLoading] = useState(true);
  const[change,setChange]=useState([1,2,3]);
  useEffect(() => {
    let interval=setInterval(()=>{      
      props.fetchOrders();
      setIsLoading(false);
      setMyOrders(props.orders);
      const uniqueIds = [];
      const unique = myOrders.filter(element => {
        const isDuplicate = uniqueIds.includes(element.id);
        if (!isDuplicate) {
          uniqueIds.push(element.id);
          return true;
        }
        return false;
      });
      setMyOrders(unique);
    },500) 
    return ()=>clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const deleteOrderHandler=(x,y)=>{
      let pp=prompt("You Are Going To Delete This Order, Please Type \"Yes\" To Premenantly Delete The Item Or Cancel If You Wouldn't Delete It");
      if(pp){
        if(pp.toLowerCase()==="yes"){
          setChange(prev=>[...prev,y]);
          props.deleteItemHandler(x,y);
        }else{
          return;
        }
      }
    }
  return (
    <section className={classes.meals}>
      <Card>
        {isLoading && <Spinner />}
        {myOrders.length>0?(<ul>
          {myOrders.map((order) => {
            return (
              <li onClick={()=>deleteOrderHandler('oreders/',order.id)} 
              key={order.id} 
              className={`${change.includes(order.id)?style.done:style.meal}`}>
                <div className="userDetails">
                  <div className={style.price} >Time: {order.user.showTime}</div>
                  <h3>Name: {order.user.name}</h3>
                  <div className={style.price}>Phone: {order.user.postalCode}</div>
                  <div className={style.description}>Floor: {order.user.city}</div>
                  <div className={style.price}>Class: {order.user.street}</div>
                </div>
                <div className="itemsOrd">
                {order.items.map(i=>{
                  return (<div className="itemsOr" key={i.id}>
                    <h3>{i.name}</h3>
                    <div className={style.price}>EGP {i.price}</div>
                    <div className={style.description} key={i.id}>Amount: {i.amount} X</div>
                  </div>
                  )
                })}
                </div>
                  <div className="totalPrice">Total Price: {order.totalAmount}</div>

              </li>
            )})
          }
        </ul>):(<div className={style.meal}>
            <h3>No Orders !!</h3>
          </div>)}
      </Card>
    </section>
)
};
export default Orders;
