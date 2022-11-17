import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

const AppointmentOption = ({ ao, setTreatmentModal }) => {
  const { name, slots } = ao;
  const { user } = useContext(AuthContext);
  return (
    <div>
      <div className="card bg-base-100 shadow-xl text-center">
        <div className="card-body">
          <h2 className="text-2xl text-secondary ">{name}</h2>
          <p>{slots.length > 0 ? slots[0] : "Try Another"}</p>
          <p>
            {slots.length} {slots.length > 1 ? "spaces" : "space"} Avialable
          </p>
          <div className="card-actions justify-center mt-3">
            {user?.uid ? 
              <label
                htmlFor="appointment-modal"
                className="btn bg-gradient-to-r from-primary to-secondary 
              border-0 text-white"
                onClick={() => setTreatmentModal(ao)}
              >
                Book Appointment
              </label>
              :
              <Link
              to='/login'
              className="btn bg-gradient-to-r from-primary to-secondary 
              border-0 text-white"
              >
                Please Login
              </Link>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentOption;
