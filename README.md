# README
Hello! Welcome to my readme for Stripe Payments Intent integration :)

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

1. Please make sure you have access to at least two tabs or windows to start the backend and frontend separately.

2. Navigate to folder where you have this code.

3. To start the backend:
```
npm start
```

4. Change directories into the `frontend_client` directory and start the frontend client:
```
npm start
```

5. At this point a browser tab should have opened with the payment screen to begin testing, if it did not, please open your web browser and goto this url:
```
localhost:3000
```

## Stripe Test Account


## Testing the Payment UI
Here are a few card numbers you can test the UI with:

* Successful Payment:  `4242 4242 4242 4242`
* Payment is Declined: `4000 0000 0000 9995`

Stripe has provided a lot of test data to be used in testing the integration. Please find the full full list at [Stripe Testing](https://stripe.com/docs/testing#cards) page.

## Testing the Payment webhook
There is a webhook built to log successful payments, this can be tested 

* 