import Card from "../../UI/Card";
import AddMeals from "./AddMeals";
import ControlMeals from "./ControlMeals";
import Orders from "./Orders";
import {useState} from 'react';
import "../../../styles.css"
const ChefPage = (props) => {
  const valid= "AAAAAA";
  const [chefPass, setChefPass] = useState("");
  const [controlMeal, setControlMeal] = useState(false);
  const [addMeal, setAddMeal] = useState(false);
  const [orders, setOrders] = useState(false);

  const chefPassInputHandler=(e)=>{
    setChefPass(e.target.value);
  }

  const addMealHandler=()=>{
    setAddMeal(prev=>!prev);
  }
  const controlMealHandler=()=>{
    setControlMeal(prev=>!prev);
  }
  const ordersHandler=()=>{
      setOrders(prev=>!prev);
  }
  return <Card>
      {chefPass !== valid ?(
      <div className="passcode">
        <label htmlFor="name">Please Enter A Valid Passcode !</label>
        <input
          onChange={chefPassInputHandler}
          type="text"
          id="name"
          value={chefPass}/>
      </div>
    ):(<>
        <div className="chefButtons">
          <button onClick={addMealHandler}>Add Meal</button>
          <button onClick={ordersHandler}>Orders</button>
          <button onClick={controlMealHandler}>Meals</button>
        </div>
        {addMeal&&<AddMeals submitOrderHandler={props.submitOrderHandler} addMeal={addMeal} addMealHandler={addMealHandler}/>}
        {controlMeal&&<ControlMeals meals={props.meals} deleteItemHandler={props.deleteItemHandler}/>}
        {orders&&<Orders   orders={props.orders} deleteItemHandler={props.deleteItemHandler} fetchOrders={props.fetchOrders}/>}
      </>)
    }
    </Card>
}
export default ChefPage;
