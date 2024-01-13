import React, { useEffect, useState } from "react";
import "./Payment.css";
import axios from "../../axios";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../Reducer/Reducer";
import { useStateValue } from "../StateProvider/StateProvider";
import CheckoutProduct from "../Checkout-Components/CheckoutProduct";
import { Await, Link, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { db } from "../../firebase";
import { useUserStateValue } from "../SimpleStateProvider/UnameProvider";
function Payment() {
  const history = useNavigate();
  const [{ basket, user }, dispatch] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);
  const { getUniqueItems, userName } = useUserStateValue();
  const uniqueProducts = getUniqueItems();
  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: "POST",
        // Stripe expects the total in a currencies subunits
        url: `/payments/create?total=${(getBasketTotal(basket) * 100) | 0}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);
  // console.log("the basket is",getBasketTotal(basket)*100);
  console.log("the secret is  ", clientSecret);

  const handleSubmit = !userName
    ? (e) => {
        e.preventDefault();
        alert("Please Sign In");
        history("/login");
      }
    : async (event) => {
        event.preventDefault();
        setProcessing(true);
        const payload = await stripe
          .confirmCardPayment(clientSecret, {
            payment_method: {
              card: elements.getElement(CardElement),
              billing_details: {
                name: "Jenny Rosen",
                address: {
                  line1: "510 Townsend St",
                  postal_code: "98140",
                  city: "San Francisco",
                  state: "CA",
                  country: "US",
                },
              },
            },
          })
          .then(({ paymentIntent }) => {
            //paymentIntent= payment confirmation
            db.collection("users")
              .doc(user?.uid)
              .collection("orders")
              .doc(paymentIntent.id)
              .set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created,
              });

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
              type: "EMPTY_BASKET",
            });
            history("/orders", { replace: true });
          });
      };
  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  return (
    <div className="payment">
      <div className="payment_container">
        <h1>
          Checkout({" "}
          <Link
            to="/checkout"
            style={{ textDecoration: "underline", color: "black" }}
          >
            {basket?.length} items
          </Link>
          )
        </h1>
        {/* Payment section -deliver address*/}
        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment_address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>
        {/* Payment section -Review Items */}
        <div className="payment_section">
          <div className="payment_title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment_items">
            {uniqueProducts.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                quantaity={item.quantaity}
              />
            ))}
          </div>
        </div>
        {/* Payment section -Payment method */}
        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment method</h3>
          </div>

          <div className="payment_details">
            {/* Stripe things */}
            <h5 style={{ marginBottom: "10px" }}>
              Dummy data : Card No :- 4242 4242 4242 4242 date:- 04 / 24 cvv:-
              242 ZIP: 42424
            </h5>
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment_priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <h3>Order Total:{value}</h3>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button
                  disabled={processing || disabled || succeeded}
                  type="submit"
                >
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
