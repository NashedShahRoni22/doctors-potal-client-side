import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentForm = ({ bookingData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { _id,price, patientName, email } = bookingData;

  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [transectionID, setTransectionID] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
    } else {
      setCardError("");
    }
    setSuccess("");
    setProcessing(true);

    const { paymentIntent, error: cardError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: patientName,
            email: email
          },
        },
      }
    );

    if (cardError) {
      setCardError(cardError.message);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const payment = {
        price,
        transectionID: paymentIntent.id,
        email,
        bookingId: _id,
      };

      fetch("http://localhost:5000/payments", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            setSuccess("Congratulations! Payment Done!");
            setTransectionID(paymentIntent.id);
            setProcessing(false);
            navigate('/dashboard')
          }
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        type="submit"
        disabled={!stripe || !clientSecret || processing}
        className="btn btn-xs mt-5"
      >
        Proceed
      </button>
      <p className="text-red-500 mt-3">{cardError}</p>
      {success && (
        <div>
          <p className="text-green-500">{success}</p>
          <p className="text-green-500">Your Transection ID{transectionID}</p>
        </div>
      )}
    </form>
  );
};

export default PaymentForm;
