import React from "react";
import trartment from "../../assets/images/treatment.png"
import Button from "../../Components/Button/Button";

const Treatment = () => {
  return (
    <section className="hero mt-[130px]">
      <div className="hero-content flex-col md:flex-row">
        <img
          src={trartment}
          className="max-w-sm rounded-lg shadow-2xl"
          alt=""
        />
        <div>
          <h1 className="text-5xl font-bold">Exceptional Dental Care, on Your Terms</h1>
          <p className="py-6">
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page
          </p>
          <Button>{"Get Started"}</Button>
        </div>
      </div>
    </section>
  );
};

export default Treatment;
