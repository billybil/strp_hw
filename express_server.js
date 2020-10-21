const express = require("express");
const app = express();
app.use(require('cors')());
app.use(express.static("."));
app.use(express.json());

// TODO: Dont put the the key like this. Move it to env.
const stripe = require("stripe")("sk_test_51Hd23ALCD5Pym0HWlYbzYJAMuV35kyAWHhTWMFCxGjb7K9UdDitk8u8BWROT3Puz7RNzGjqmTSRjL6eHsYRf3l1300GgOkvaRo");

const calculateOrderAmount = items => {
  const cost = 1000;
  const pinCount = Number(items.pinCount)

  return (cost*pinCount);
};

app.post("/create-payment-intent", async (req, res) => {
  const items = req.body;

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