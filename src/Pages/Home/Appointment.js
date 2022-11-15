import React from "react";
import doctor from "../../assets/images/doctor-small.png";
import Button from "../../Components/Button/Button";
import appointment from "../../assets/images/appointment.png"

const Appointment = () => {
  return (
    <section className="hero mt-[170px] pt-8 pb-0" 
    style={{background: `url(${appointment})`}} >
      <div className="flex flex-col md:flex-row items-center">
        <img src={doctor} alt="" className="w-1/2 mb-0 -mt-48  hidden md:block" />
        <div>
          <h5 className="text-primary font-bold">Appointment</h5> 
          <h1 className="text-5xl font-bold text-white">Make an appointment Today</h1>
          <p className="py-6 text-white">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsumis that it has a more-or-less normal
            distribution of letters,as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page
          </p>
          <Button>{"Appointment"}</Button>
        </div>
      </div>
    </section>
  );
};

export default Appointment;
