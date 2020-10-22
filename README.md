# README
![Screenshot of project](/images/homework_screenshot.png)

Hello! Welcome to my attempt at working through aStripe Payments Intent integration :)
 

## Built With
* Backend built with [Express](http://expressjs.com)
* Frontend built with [Create React App](https://create-react-app.dev).


## Before You Get Started
Before you get started lets make sure you can start the services you need. Please open your Terminal and check if you have NPM installed with the following command:

```
npm -v
```

If you dont have NPM head over to [NPM JS](https://www.npmjs.com/get-npm) to install it on your computer.


## Starting The Services
To make it easier and more consistent all the libraries you'll need to run are included in this repo. 

1. Please make sure you have access to have a few tab sready  to start the backend and frontend services. 

2. Navigate to folder where you have this code.

3. Start the backend:
```
npm start
```

4. Change directories into the `frontend_client` directory and start the frontend client:
```
npm start
```

5. At this point a browser tab should have opened with the payment screen to for you to begin testing. If it did not, please open your web browser and goto this url:
```
localhost:3000
```


## Changing Stripe Accounts
This was made using my Stripe test account, so your tests and data will appear in my Stripe Dashboard. If you'd like to see the purchases appear in your dashboard please grab the API keys from your [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys) and edit the following:

For the backend, please edit the `./.env` file and replace the secret key with yours.
```
SECRET_KEY=<your_stripe_secret_key>
```

For the frontend, please edit this file `./frontend/src/App.js` and replace the publishable key with yours.
```
const promise = loadStripe("<your_stripe_publishable_key>");

```

Once these are done, please stop backend your service (Control-C typically) and restart. You should start seeing payments in your [Stripe Dashboard](https://dashboard.stripe.com/test/payments).


## Testing the Payment UI
Here are a few card numbers you can test the UI with:

* Successful Payment:  `4242 4242 4242 4242`
* Payment is Declined: `4000 0000 0000 9995`

Stripe has provided a lot of test data to be used in testing the integration. Please find the full full list at (Stripe Testing)[https://stripe.com/docs/testing#cards] page.


## Testing the Payment webhook
There is a webhook built to log successful payments for fulfillment. Successful charges are logged to `fulfillment.txt`. The webhook can be tested using the (Stripe CLI)[https://stripe.com/docs/stripe-cli] tool.

To start testing the webhook locally, open a new terminal type in:
```
stripe listen --forward-to localhost:3001/webhook
```

and in another terminal tab type in:
```
stripe trigger payment_intent.succeeded
```

Open `fulfillment.txt` to see the Stripe IDs of the successful payments.