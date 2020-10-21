import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import './CheckoutForm.css';


export default function CheckoutForm() {
  const [numPins, setNumPins] = useState(0)
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  // useEffect(() => {
  //   // Create PaymentIntent as soon as the page loads
  //   window
  //     .fetch("/create-payment-intent", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({items: [{ "numPins": numPins}]})
  //     })
  //     .then(res => {
  //       return res.json();
  //     })
  //     .then(data => {
  //       setClientSecret(data.clientSecret);
  //     });
  //   }, []);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const handlePinChange = async ev => {
    console.log("## handle change!");
    console.log(ev.target.value)
    console.log(ev) 
    setNumPins(ev.target.value);
  }
  const handleChange = async ev => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(ev.empty);
    setError(ev.error ? ev.error.message : "");
  };

  const handleSubmit = async ev => {
    ev.preventDefault();

    const billingDetails = {
      name: "Test User",
      email: "test@test.com",
      address: {
        city: "test city",
        line1: "123 test street",
        state: "OR",
        postal_code: "97219"
      }
    };

    let resData;
    try{
      const res = await fetch("/create-payment-intent", {
            method: "POST",
            headers: {
                      "Content-Type": "application/json"
                    },
            body: JSON.stringify({items: [{ "numPins": numPins}]})
          })
      resData = await res.json()
      await setClientSecret(resData.clientSecret)

      console.log("######## THIS IS THE FIRST PART");
      console.log(resData)
      console.log("######## THIS IS THE FIRST PART");
      console.log(resData.clientSecret)
      console.log("######## THIS IS THE FIRST PART");
      console.log(clientSecret)
      console.log("######## THIS IS THE FIRST PART");
    } catch (error) {
      console.log("### ERROR");
      console.log(error)
      console.log("### ERROR");
    }

    // try{
    //  fetch("/create-payment-intent", {
    //     method: "POST",
    //     headers: {
    //               "Content-Type": "application/json"
    //             },
    //     body: JSON.stringify({items: [{ "numPins": numPins}]})
    //   })
    //   .then(res => {
    //     console.log(res)
    //     return res.json();
    //   })
    //   .then(data => {
    //     console.log("######## HERE");
    //     console.log(data);        
    //     console.log("######## HERE");
    //     console.log(data.clientSecret);
    //     console.log("######## END");
    //     setClientSecret(data.clientSecret);
    //     return data.clientSecret
    //   })
    //   .then(async (client_secret) => {
    //     console.log("######## client secret");
    //     console.log(client_secret);


    //     // ev.preventDefault();
    //     // setProcessing(true);
    //     const payload = await stripe.confirmCardPayment(client_secret, {
    //       payment_method: {
    //         card: elements.getElement(CardElement),
    //         billing_details: billingDetails
    //       }
    //     })
    //     console.log("###### ");
    //     console.log(payload);

    //     if (payload.error) {
    //       setError(`Payment failed ${payload.error.message}`);
    //       setProcessing(false);
    //     } else {
    //       setError(null);
    //       setProcessing(false);
    //       setSucceeded(true);
    //     }
    //   })


      console.log("######## THIS IS THE SECOND PART");

      setProcessing(true);
      console.log("######## THIS PART");

      const payload = await stripe.confirmCardPayment(resData.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: billingDetails
        }
      });
      console.log("######## NEXT PART");

      if (payload.error) {
              setError(`Payment failed ${payload.error.message}`);
              setProcessing(false);
            } else {
              setError(null);
              setProcessing(false);
              setSucceeded(true);
            }


    // } catch (error) {
    //   console.log("### ERROR");
    //   console.log(error)
    //   console.log("### ERROR");
    // }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <input 
        type="text"
        placeholder="GET YOUR PINS!"
        onChange={handlePinChange}
      />

      <p/>
        
      <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
      <button
          disabled={processing || disabled || succeeded}
          id="submit">
          <span id="button-text">
              {processing ? (
                  <div className="spinner" id="spinner"></div>
              ) : (
                  "Pay"
              )}
          </span>
      </button>
      
      {/* Show any error that happens when processing the payment */}
      {error && (
          <div className="card-error" role="alert">
      {error}
      </div>)}

      {/* Show a success message upon completion */}
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded!
      </p>
    </form>
  );
}