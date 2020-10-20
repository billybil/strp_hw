import React, { Component } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import HotdotPinSelector from "./HotdogPinSelector"
import './App.css';
import HotdogPinSelector from './HotdogPinSelector';

// Stripe stuff
const promise = loadStripe("pk_test_51Hd23ALCD5Pym0HWAwPFZC2lyy6suo3LjBeiYUBbN0jRHXiZUUFXOv3HGDonRk6wWlt5HwHaEB8fkXYBBlzaALyQ00L8B39dQf");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: ''};
  }

  render () {
    return (
      <div className="App">
        <HotdogPinSelector></HotdogPinSelector>

        <Elements stripe={promise}>
          <CheckoutForm />
        </Elements>
       </div>
    );
  }

  // callAPI() {
  //   fetch('http://localhost:9000/testAPI')
  //     .then(res => res.text())
  //     .then(res => this.setState({ apiResponse: res}))
  //     .catch(err => err);
  // }

  // componentDidMount() {
  //   this.callAPI();
  // }
 
  // render() {
  //   return (
  //     <div className='App'>
  //       <header className='App-header'>
  //         <h1 className='App-title'>Hello World!</h1>
  //       </header>
  //       <p className="App-intro">{this.state.apiResponse}</p>
  //     </div>
  //   )
  // }
}

export default App;
