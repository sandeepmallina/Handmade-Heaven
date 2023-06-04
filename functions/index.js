const functions = require("firebase-functions");
const express =require ("express");
const cors =require("cors");
// const { request, response } = require("express");
const stripe =require("stripe")('sk_test_51MOfo8SGelT47QhwOXLFqkwryzTxQ6UvODm7Kz3zFVDGWzVBCy3H2wih5QxTO9sTaUYqZV1PqIhZew0sEJI3J0Ay00VahoLj7N');

//API


//API config
const app=express();
//refer cors in webdevsimplified
app.use(cors({ origin: "*" }));
app.use(express.json()); 

app.get('/',(request,response) => response.status(200).send('hello world'));
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    
    amount: total, // subunits of the currency
    currency: "usd",
    description: 'Software development services',
  });
    //ok created
    response.status(201).send({
      clientSecret: paymentIntent.client_secret,
      });
});
exports.api=functions.https.onRequest(app)