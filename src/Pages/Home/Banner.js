import React from "react";
import chair from "../../assets/images/chair.png";
import bg from "../../assets/images/bg.png"
import Button from "../../Components/Button/Button";

const Banner = () => {
  return (
    <section 
    style={{
      background: `url(${bg})`,
      backgroundSize: 'cover',
      height: '100vh'
    }} 
    className="py-24">
      <div className="hero">
        <div className="hero-content flex-col md:flex-row-reverse">
          <img src={chair} className="md:w-1/2 rounded-lg shadow-2xl" alt="" />
          <div>
            <h1 className="text-5xl font-bold">Your New Smile Starts Here</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <Button>{"Get Started"}</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
