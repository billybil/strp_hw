const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
require('dotenv').config()

app.use(require('cors')());
app.use(express.static('.'));
app.use(express.json());

// Edit the .env file to replace with your Secret test key.
const stripe = require('stripe')(process.env.SECRET_KEY);

const calculateOrderAmount = items => {
  // 1200 = 12.00
  const cost = 1200;
  const pinCount = Number(items.pinCount)

  return (cost*pinCount);
};

const handleChargeSucceeded = event => {
  var stream = fs.createWriteStream('./fulfillment.txt', {flags:'a'});
  stream.write(event.data.object.id + "\n");
};

app.post('/create-payment-intent', async (req, res) => {
  const items = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: 'usd',
    metadata: {integration_check: 'accept_a_payment'},
  });

  res.send({
    clientSecret: paymentIntent.client_secret
  });
});

app.post('/webhook', bodyParser.raw({type: 'application/json'}), (req, res) => {
  const event = req.body;
  // Handle the event
  switch (event.type) {
    case 'charge.succeeded':
      console.log(`Charge Succeeded for ${event.data.object.amount} was successful!`);
      handleChargeSucceeded(event);
      break;

    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  res.sendStatus(200);
})

app.listen(3001, () => console.log('Node server listening on port 3001!'));