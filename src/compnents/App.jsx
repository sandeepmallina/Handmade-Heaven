import "./App.css";
import Header from "./Header-Components/Header";
import Home from "./Home-components/Home";
import Checkout from "./Checkout-Components/Checkout";
import Payment from "./Payment-Components/Payment";
import Register from "./Login-Components/Register/Register";
import Orders from "./Orders-Components/Orders";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { UnameProvider } from "./SimpleStateProvider/UnameProvider";
import Login from "./Login-Components/Login";
//restart needed after installing react router
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { auth } from "../firebase";
import { useStateValue } from "./StateProvider/StateProvider";
import ProductPreview from "./ProductPreview/ProductPreview";
const promise = loadStripe(
  "pk_test_51MOfo8SGelT47QhwEL6WuuB6pSHzISg1h3G9TlYDemPuhgFLPVVfDYuGPYwRZYdny3frvEgadz3fhQKXRYWZFuyc00YiBlQHQu"
);

function App() {
  const [{}, dispatch] = useStateValue();
  //   function getItem(id){
  //   return basket.find(item => item.id===id)?true:false;
  // }
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("the user is ", authUser);
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <div className="app">
      <UnameProvider>
        <Routes>
          <Route
            path="/register"
            element={
              <>
                <Register />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Header />
                <Login />
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <>
                <Header />
                <Checkout />
              </>
            }
          />
          <Route
            path="/payment"
            element={
              <>
                <Header />{" "}
                <Elements stripe={promise}>
                  <Payment />{" "}
                </Elements>
              </>
            }
          />
          <Route
            path="/orders"
            element={
              <>
                <Header />
                <Orders />
              </>
            }
          />
          <Route
            path="/productinfo/:productName"
            element={
              <>
                <Header />
                <ProductPreview />
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <Header /> <Home />
              </>
            }
          />
        </Routes>
      </UnameProvider>
    </div>
  );
}

export default App;
