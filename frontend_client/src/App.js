import React, { Component } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import './App.css';

// Replace with your publishable test key here
const promise = loadStripe("pk_test_51Hd23ALCD5Pym0HWAwPFZC2lyy6suo3LjBeiYUBbN0jRHXiZUUFXOv3HGDonRk6wWlt5HwHaEB8fkXYBBlzaALyQ00L8B39dQf");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: ''};
  }

  render () {
    return (
      <div className="App">
        <Elements stripe={promise}>
          <CheckoutForm />
        </Elements>
       </div>
    );
  }
}

export default App;
