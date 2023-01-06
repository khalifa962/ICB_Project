import style from "./meals/mealItem/MealItem.module.css";
import classes from "./meals/AvailableMeals.module.css";
import Card from "./UI/Card";
import Spinner from "./UI/spinner";
import { useState,useEffect } from "react";

const MaintenanceOrders=(props)=>{
  const [myOrders, setMyOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let inr=setInterval(() => {
      props.fetchMaintenanceOrders();
      const uniqueIds = [];
      const unique = props.maintenanceOrders.filter(element => {
        const isDuplicate = uniqueIds.includes(element.id);
        if (!isDuplicate) {
          uniqueIds.push(element.id);
          return true;
        }
        return false;
      });
      // setMaintenanceOrders(unique);
      setTimeout(() => {
      setIsLoading(false)
      setMyOrders(unique);
    }, 200); 
    }, 200);
    return ()=>clearInterval(inr);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className={classes.meals}>
      <Card>
        {isLoading && <Spinner />}
        {myOrders.length>0?(<ul>
          {myOrders.map((order) => {
            return (
              <li key={order.id} className={style.meal}>
                <div>
                  <h3>{order.name}</h3>
                  <div className={style.description}>{order.description}</div>
                </div>
                <div className={style.price}>{order.showTime}</div>
                
              </li>
            )})
          }
        </ul>):(<div className={style.meal}>
            <h3>Have A Coffee, No Orders Right Now!!</h3>
          </div>)}
      </Card>
    </section>
)

}
export default MaintenanceOrders;
