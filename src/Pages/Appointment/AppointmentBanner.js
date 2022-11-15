import React from "react";
import chair from "../../assets/images/chair.png";
import bg from "../../assets/images/bg.png";
import "react-day-picker/dist/style.css";
import { DayPicker } from "react-day-picker";


const AppointmentBanner = ({selectedDate, setSelectedDate}) => {

  return (
    <section style={{ 
      background: `url(${bg})`,
      backgroundSize: 'cover',
      height: '100vh'
      
      }} className="py-24">
      <div className="hero">
        <div className="hero-content flex-col md:flex-row-reverse">
          <img src={chair} className="md:w-1/2 rounded-lg shadow-2xl" alt="" />
          <div className="my-10 shadow rounded-3xl mx-auto bg-white">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentBanner;
