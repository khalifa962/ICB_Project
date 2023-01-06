/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import "./styles.css";
import React, { useState, useEffect} from "react";
// import CartContext from "./store/cart-context";
import CartProvider from "./store/CartProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import ReactDOM from "react-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Meals from "./components/meals/Meals";
import Cart from "./components/cart/Cart";
import Maintenance from "./components/Maintenance";
import ChefPage from "./components/meals/mealItem/ChefPage";
//DB Configuration
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue,remove } from "firebase/database";
import BabaSanphor from './assets/klipartz.png';
export default function App() {
/*------------------------------------------------------------------------------------------------ */
const firebaseConfig = {
  apiKey: "AIzaSyDDINQgG6jk39ZGKDOTGCWTLPvXtvJ0szY",
  authDomain: "icb-2023.firebaseapp.com",
  databaseURL: "https://icb-2023-default-rtdb.firebaseio.com",
  projectId: "icb-2023",
  storageBucket: "icb-2023.appspot.com",
  messagingSenderId: "704506630715",
  appId: "1:704506630715:web:dc69c04d49fcaec1a7c21e"
};
// Initialize Firebase
// eslint-disable-next-line no-unused-vars
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dbRef = ref(getDatabase());
/*------------------------------------------------------------------------------------------------ */
  

  const validaty = "icb2023";
  const [cartIsShown, setCartIsShown] = useState(false);
  const [pass, setPass] = useState("");
  const [meals, setMeals] = useState([]);
  const [orders, setOrders] = useState({});
  const [maintenanceOrders, setMaintenanceOrders] = useState([]);
  const showCartHandler = () => {
    setCartIsShown(!cartIsShown);
  };

  const passInputHandler = (e) => {
    setPass(e.target.value);
  };

//fetch orders function 
  const dbase = getDatabase();
  const fetchOrders = async () => {
    let loadedOrders = [];
    const data = await ref(dbase, "oreders");
    onValue(data, (snapshot) => {
      const ordersData = snapshot.val();
      for (const key in ordersData) {
        loadedOrders.push({
          id: key,
          items: ordersData[key].items,
          user: ordersData[key].user,
          totalAmount:ordersData[key].totalAmount,
        });
      }
      setOrders(loadedOrders);
    });
  };
  //ADD Maintenance Order

  const addMaintenanceOrderHandler = async (order) => {
    await fetch(
      "https://icb-2023-default-rtdb.firebaseio.com/MaintenanceOrders.json",
      {
        method: "POST",
        body: JSON.stringify({
          ...order,
        }),
      }
    );
    fetchMaintenanceOrders();
    const uniqueIds = [];
    const unique = maintenanceOrders.filter(element => {
      const isDuplicate = uniqueIds.includes(element.id);
      if (!isDuplicate) {
        uniqueIds.push(element.id);
        return true;
      }
      return false;
    });
    setMaintenanceOrders(unique);
  };

  //fetch Maintenance orders function 
  const fetchMaintenanceOrders = async () => {
    let loadedOrders = [];
    const data = await ref(dbase, "MaintenanceOrders");
    onValue(data, (snapshot) => {
      const ordersData = snapshot.val();
      for (const key in ordersData) {
        loadedOrders.push({
          id: key,
          name: ordersData[key].name,
          description: ordersData[key].description,
          showTime:ordersData[key].showTime,
        });
      }
      setMaintenanceOrders(loadedOrders);
    });
  };


//fetch meals function 
  const fetchFn = async () => {
    setMeals([]);
    let loadedMeals = [];
    const data = await ref(dbase, `meals`);
    onValue(data, (snapshot) => {
      let mealsData = snapshot.val();
      for (const key in mealsData) {
        loadedMeals.push({
          id: key,
          name: mealsData[key].name,
          description: mealsData[key].description,
          price: mealsData[key].price,
        });
      }
      setMeals(loadedMeals);
    }) 
  };

  const deleteItemHandler = (items,itemID) => {
    remove(ref(dbase,items+itemID));
    const uniqueIds = [];
      const unique = meals.filter(element => {
        const isDuplicate = uniqueIds.includes(element.id);
        if (!isDuplicate) {
          uniqueIds.push(element.id);
          return true;
        }
        return false;
      });
      setMeals(unique);
    fetchFn();
  }
  //ADD A new Meal by chef
  const addOrderHandler = async (meal) => {
    await fetch(
      "https://icb-2023-default-rtdb.firebaseio.com/meals.json",
      {
        method: "POST",
        body: JSON.stringify({
          ...meal,
        }),
      }
    );
    fetchFn();
    const uniqueIds = [];
    const unique = meals.filter(element => {
      const isDuplicate = uniqueIds.includes(element.id);
      if (!isDuplicate) {
        uniqueIds.push(element.id);
        return true;
      }
      return false;
    });
    setMeals(unique);
  };

  useEffect(() => {
    fetchFn();
    const uniqueIds = [];
    const unique = meals.filter(element => {
      const isDuplicate = uniqueIds.includes(element.id);
      if (!isDuplicate) {
        uniqueIds.push(element.id);
        return true;
      }
      return false;
    });
    setMeals(unique);
  }, []);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(()=>{
    fetchMaintenanceOrders();
    const uniqueIds = [];
    const unique = maintenanceOrders.filter(element => {
      const isDuplicate = uniqueIds.includes(element.id);
      if (!isDuplicate) {
        uniqueIds.push(element.id);
        return true;
      }
      return false;
    });
    setMaintenanceOrders(unique);
    // console.log(maintenanceOrders);
   },[])
  
  return (
    <CartProvider>
      <Router>
        {cartIsShown && <Cart fetchOrders={fetchOrders} showCartHandler={showCartHandler} />}
        <Header showCartHandler={showCartHandler} />
        <main>
          {pass !== validaty ? (
            <div className="passcode">
              <label htmlFor="passcode">Please Enter A Valid Passcode !</label>
              <input
                onChange={passInputHandler}
                type="password"
                id="passcode"
                value={pass}
              />
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<div className="homeContainer"><div id="ballon"> <img src={BabaSanphor} alt="baba Sanphore"/> </div></div>}/>
              <Route path="/food" element={<Meals meals={meals} />} />
              <Route
                path="/chef"
                element={
                  <ChefPage
                    meals={meals}
                    submitOrderHandler={addOrderHandler}
                    orders={orders}
                    fetchOrders={fetchOrders}
                    deleteItemHandler={deleteItemHandler}
                  />
                }
              />
              <Route path="/maintenance" element={<Maintenance 
              fetchMaintenanceOrders={fetchMaintenanceOrders}
              maintenanceOrders={maintenanceOrders}
              addMaintenanceOrderHandler={addMaintenanceOrderHandler}
              />} />
            </Routes>
          )}
        </main>
        <Footer/>
      </Router>
    </CartProvider>
  );
}
