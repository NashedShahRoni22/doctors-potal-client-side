import React from "react";

const InfoCard = ({ic}) => {
    const {img, title, detail, bgClass} = ic;
  return (
    <section 
    className={`card card-side shadow-xl p-6 ${bgClass}`}>
      <figure>
        <img src={img} alt="Movie" />
      </figure>
      <div className="card-body text-white">
        <h2 className="card-title">{title}</h2>
        <p>{detail}</p>
      </div>
    </section>
  );
};

export default InfoCard;
