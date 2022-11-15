import React from "react";
import Appointment from "./Appointment";
import Banner from "./Banner";
import ContactForm from "./ContactForm";
import InfoCards from "./InfoCards";
import ServicesCards from "./ServicesCards";
import Testimonial from "./Testimonial";
import Treatment from "./Treatment";

const Home = () => {
  return (
    <section>
      <Banner></Banner>
      <InfoCards></InfoCards>
      <ServicesCards></ServicesCards>
      <Treatment></Treatment>
      <Appointment></Appointment>
      <Testimonial></Testimonial>
      <ContactForm></ContactForm>
    </section>
  );
};

export default Home;
