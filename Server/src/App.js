import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import './App.css';

const App = () => {
  const [product, setProduct] = useState({
    name: "React Course",
    price: 2000 * 100,
    prodectBy: "techieegy",
  });

  const makePayment = (token) => {
    const body = {
      token,
      product,
    };
    const headers = {
      "content-Type": "application/json",
    };
    return fetch("http://localhost:5000/payment", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="centered-container">
      <StripeCheckout
        name="Buy React Course"
        amount={product.price}
        currency="INR"
        token={makePayment}
        stripeKey="pk_test_51Ns3JgSIi3K60iBfJVtMpwEnEziaUboDEKuvTm9mUgte9mfansU5ktQIL43At1qxd3wQWwwSRWAVkyBmOJDolMNc002WI88R7r"
      >
        <button className="blue-button">Buy React Course at {product.price / 100}</button>
      </StripeCheckout>
    </div>
  );
};

export default App;
