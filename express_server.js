const express = require("express");
const app = express();
app.use(require('cors')());
const { resolve } = require("path");
// This is your real test secret API key.
const stripe = require("stripe")("sk_test_51Hd23ALCD5Pym0HWlYbzYJAMuV35kyAWHhTWMFCxGjb7K9UdDitk8u8BWROT3Puz7RNzGjqmTSRjL6eHsYRf3l1300GgOkvaRo");

app.use(express.static("."));
app.use(express.json());

const calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  const cost = 1400;

  console.log("##############");
  console.log(items);
  console.log("##############");

  return 1400;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    metadata: {integration_check: 'accept_a_payment'},
  });

  res.send({
    clientSecret: paymentIntent.client_secret
  });
});

app.listen(3001, () => console.log('Node server listening on port 3001!'));