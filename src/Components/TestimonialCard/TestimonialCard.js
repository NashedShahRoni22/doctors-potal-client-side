import React from "react";

const TestimonialCard = ({td}) => {
    const {name, image, description, location} = td;

  return (
    <section>
      <div className="card bg-base-100 shadow-xl p-8">
        <div className="my-6">
          <p>{description}</p>
        </div>
        <div className=" flex gap-8 items-center ">
            <div>
                <img className="w-[64px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2" src={image} alt="" srcset="" />
            </div>
            <div>
                <h2>{name}</h2>
                <p>{location}</p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCard;
