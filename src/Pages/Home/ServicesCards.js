import React from "react";
import whitening from"../../assets/images/whitening.png";
import cavity from"../../assets/images/cavity.png";
import fluride from"../../assets/images/fluoride.png";
import ServiceCard from "../../Components/ServiceCard/ServiceCard";

const ServicesCards = () => {
    const serviceCardDetails = [
        {
            id:1,
            title:"Fluoride Treatment",
            details:"Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
            img:fluride,
        },
        {
            id:2,
            title:"Cavity Filling",
            details:"Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
            img:cavity,
        },
        {
            id:3,
            title:"Teeth Whitening",
            details:"Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
            img:whitening,
        },
    ]
  return (
    <section className="mt-32 mx-5">
      <div className="text-center">
        <h4 className="text-xl text-secondary font-bold">OUR SERVICES</h4>
        <h2 className="text-3xl">Services We Provide</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
        {
            serviceCardDetails.map(scd => <ServiceCard key={scd.id} scd={scd}></ServiceCard>)
        }
      </div>
    </section>
  );
};

export default ServicesCards;
