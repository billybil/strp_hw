# README
Hello! Welcome to my attempt at working through a Stripe Payments Intent integration :)

![Screenshot of project](/images/homework_screenshot.png)

 In this repo you'll find code to build the above custom Stripe Payment module. The project will create a local backend/frontend for you to test payments with and has a webhook endpoint to log successful charges.


## Built With
* Backend built with [Express](http://expressjs.com)
* Frontend built with [Create React App](https://create-react-app.dev).


## Before You Get Started
Before you get started lets make sure you can start the services you need. Please open your terminal app and check if you have NPM installed with the following command:

```
npm -v
```

If that errors out that means you don't have have NPM installed. In that case please head over to [NPM JS](https://www.npmjs.com/get-npm) to install it on your computer before proceeding.


## Starting The Services
To make this a little bit easier for you, I've included all the libraries you'll need to run in this repo. Please note, we'll be opening services in a few different tabs.

1. In your first tab, navigate to folder where you have this code.

2. Start the backend:
```
npm start
```

3. In a different terminal tab, navigate to into the `./frontend_client` directory and start the frontend client:
```
npm start
```

4. At this point a browser tab should have opened with the payment screen to for you to begin testing. If it did not, please open your web browser and goto this url:
```
localhost:3000
```


## Changing Stripe Accounts
This was made using my Stripe test account, so your tests and data will appear in my Stripe Dashboard not yours. If you'd like to see the purchases appear in your dashboard please grab the API keys from your [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys) and edit the following files:

For the backend, please edit the `./.env` file and replace the **Secret Key** with yours.
```
SECRET_KEY=<your_stripe_secret_key>
```

For the frontend, please edit this file `./frontend/src/App.js` and replace the **Publishable Key** with yours.
```
const promise = loadStripe("<your_stripe_publishable_key>");

```

Once these are done, please stop backend your service (Control-C typically) and restart. Now your  test payments should start appearing in your [Stripe Dashboard](https://dashboard.stripe.com/test/payments).


## Testing the Payments
Here are a few card numbers you can test the Payments with:

* Successful Payment:  `4242 4242 4242 4242`
* Payment is Declined: `4000 0000 0000 9995`

If interested, Stripe has provided a lot of different cards to be used in testing the integration. To find the full list please head over to the [Stripe Testing](https://stripe.com/docs/testing#cards) page.


## Testing the Webhook
Successful charges are handled by a webhook and logged to `fulfillment.txt`. The webhook can be tested using the [Stripe CLI](https://stripe.com/docs/stripe-cli) tool.

To start testing the webhook locally, open a new terminal type in:
```
stripe listen --forward-to localhost:3001/webhook
```

To test successful payments, in different terminal tab type in:
```
stripe trigger payment_intent.succeeded
```

If successful you should see:
```
[200 POST] OK payment_intent.succeeded
```

View the `fulfillment.txt` file to see a log of the Stripe IDs of the successful payments.

## Thanks!
Hopefully that was helpful and guided you through everything you need. Please reach out to me at `bil.nguyen@gmail.com` if you have any questions or if you were blocked anywhere.