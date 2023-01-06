import {useState } from 'react';
import Card from "./UI/Card";
import AddMaintenanceOrder from './AddMaintenanceOrder';
import MaintenanceOrders from './MaintenanceOrders';
const valid="FFFFFF";
const Maintenance =(props)=>{
  const [pass,setPass]=useState("");
  const [addOrder, setAddOrder] = useState(false);
  const [orders, setOrders] = useState(false);

  const addOrderHandler=()=>{
    setAddOrder(prev=>!prev);
  }
  const ordersHandler=()=>{
    setOrders(prev=>!prev);
  }

  const passInputHandler=(e)=>{
    setPass(e.target.value);
  }
  return  <Card>
            {pass !== valid ?(
            <div className="passcode">
              <label htmlFor="pass">Please Enter A Valid Passcode !</label>
              <input
                onChange={passInputHandler}
                type="password"
                id="pass"
                value={pass}/>
            </div>
          ):(<>
              <div className="chefButtons">
                <button onClick={addOrderHandler}>Add Order</button>
                <button onClick={ordersHandler}>Orders</button>
              </div>
              {addOrder&&<AddMaintenanceOrder addOrderHandler={addOrderHandler} addMaintenanceOrder={props.addMaintenanceOrderHandler} />}
              {orders&&<MaintenanceOrders  
              fetchMaintenanceOrders={props.fetchMaintenanceOrders}
              maintenanceOrders={props.maintenanceOrders}
              />}
            
            </>)
          }
        </Card>
}
export default Maintenance;

// {orders&&<Orders  orders={props.orders} check={props.check} fetchOrders={props.fetchOrders}/>}
