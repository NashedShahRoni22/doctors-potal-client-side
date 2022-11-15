import React, { useState } from "react";
import { format } from "date-fns";
import AppointmentOption from "./AppointmentOption";
import ApppointmentModal from "./ApppointmentModal";
import { useQuery } from "@tanstack/react-query";

const AvailableAppointment = ({ selectedDate }) => {
  const [treatmentModal, setTreatmentModal] = useState(null);

  const {data:appointmentOptions = []} = useQuery({
    queryKey: ['appointmentOptions'],
    queryFn: ()=> 
    fetch("http://localhost:5000/appointmentServicesOptions")
    .then((res) => res.json())
  })


  return (
    <div>
      <h3 className="text-center text-xl font-bold mt-16 text-secondary">
        Available Appointments {format(selectedDate, "PP")}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-24">
        {appointmentOptions.map((ao) => (
          <AppointmentOption
            key={ao._id}
            ao={ao}
            setTreatmentModal={setTreatmentModal}
          ></AppointmentOption>
        ))}
      </div>
      {treatmentModal && (
        <ApppointmentModal treatmentModal={treatmentModal} selectedDate={selectedDate}></ApppointmentModal>
      )}
    </div>
  );
};

export default AvailableAppointment;
