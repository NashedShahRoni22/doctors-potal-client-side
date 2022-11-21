import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData } from "react-router-dom";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(process.env.REACT_APP_stripePK);

const Payment = () => {
  const bookingData = useLoaderData();
  const { price, treatmentName, appointmentDate, slot } = bookingData;
  return (
    <section className="glass rounded-xl mx-10 p-10">
      <h2 className="text-xl">
        Payment for <strong>{treatmentName}</strong>
      </h2>
      <p className="my-3">
        Please pay <strong>${price}</strong> to confirm your Apppointment.
      </p>
      <p>
        Your Appointment on {appointmentDate} at {slot}
      </p>

      <div className="p-5 my-5 glass">
        <Elements stripe={stripePromise}>
          <PaymentForm bookingData={bookingData}/>
        </Elements>
      </div>
    </section>
  );
};

export default Payment;
