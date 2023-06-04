const stripe = require("stripe")(
  "sk_test_51MOfo8SGelT47QhwOXLFqkwryzTxQ6UvODm7Kz3zFVDGWzVBCy3H2wih5QxTO9sTaUYqZV1PqIhZew0sEJI3J0Ay00VahoLj7N"
);

exports.handler = async (event, context) => {
  if (
    event.httpMethod === "POST" &&
    event.path === "/.netlify/functions/index/payments/create"
  ) {
    const total = event.queryStringParameters.total;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "inr",
      description: "Software development services",
      payment_method_types: ["card"],
    });
    return {
      statusCode: 201,
      body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
    };
  } else if (
    event.httpMethod === "GET" &&
    event.path === "/.netlify/functions/index"
  ) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "working fine" }),
    };
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "Not Found" }),
    };
  }
};
