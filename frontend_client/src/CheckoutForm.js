import React, { useState } from 'react';
import {
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import './CheckoutForm.css';


export default function CheckoutForm() {
  const [numPins, setNumPins] = useState(0)
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const stripe = useStripe();
  const elements = useElements();
  let fetchData;

  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    }
  };

  const handlePinChange = async ev => {
    setNumPins(ev.target.value);
  }

  const handleChange = async ev => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(ev.empty);
    setError(ev.error ? ev.error.message : '');
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);

    // TODO: Add actual billing data
    const billingDetails = {
      name: 'Test User',
      email: 'test@test.com',
      address: {
        city: 'test city',
        line1: '123 test street',
        state: 'OR',
        postal_code: '97219'
      }
    };

    try{
      const res = await fetch('/create-payment-intent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({pinCount: numPins})
          })
      fetchData = await res.json()
    } catch (error) {
      console.log('### BAD THINGS HAPPENED IN FETCH');
      console.log(error)
      console.log('#######################');
    }

    const payload = await stripe.confirmCardPayment(fetchData.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: billingDetails
      }
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  return (
    <div>
      <form id='payment-form' onSubmit={handleSubmit}>
        <input 
          type='text'
          placeholder='GET YOUR PINS!'
          onChange={handlePinChange}
          required
        />
        
        <br/><br/>
        
        <CardElement id='card-element' options={cardStyle} onChange={handleChange} />
        <button
            disabled={processing || disabled || succeeded}
            id='submit'>
            <span id='button-text'>
                {processing ? (
                    <div className='spinner' id='spinner'></div>
                ) : (
                    'Pay'
                )}
            </span>
        </button>
      </form>
      
      <br/>

      {/* Show any error that happens when processing the payment */}
      {error && (
        <p className='card-error' role='alert'>{error} 😢
        </p>)}

      {/* TODO: Redirect users to a successful checkout page.*/}
      {/* Show a success message upon completion */}
      <p className={succeeded ? 'result-message' : 'result-message hidden'}>
        Hot diggity dog! <b>{numPins}</b> pins headed your way 🌭💨
      </p>
    </div>
    
  );
}