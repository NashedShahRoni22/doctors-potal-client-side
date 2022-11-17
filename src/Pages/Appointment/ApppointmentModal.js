import React, { useContext } from "react";
import { format } from "date-fns";
import Button from "../../Components/Button/Button";
import toast from "react-hot-toast";
import {AuthContext} from "../../context/AuthProvider"

const ApppointmentModal = ({
  treatmentModal,
  setTreatmentModal,
  selectedDate,
  refetch
}) => {
  const { name, slots } = treatmentModal;
  const date = format(selectedDate, "PP");
  const { user } = useContext(AuthContext);

  const handelBooking = (e) => {
    e.preventDefault();
    const form = e.target;
    const date = form.date.value;
    const slot = form.slot.value;
    const patientName = form.name.value;
    const email = form.email.value;
    const phoneNumber = form.phoneNumber.value;

    const booking = {
      treatmentName: name,
      appointmentDate: date,
      slot,
      patientName,
      email,
      phoneNumber,
    };
    fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          setTreatmentModal(null);
          toast.success("Booking Confirmed!");
          refetch();
        }
        else{
          toast.error(data.message);
        }
      });
  };
  return (
    <>
      <input type="checkbox" id="appointment-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="appointment-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{name}</h3>
          <form
            onSubmit={handelBooking}
            className="grid grid-cols-1 gap-3 mt-10"
          >
            <input
              type="text"
              name="date"
              value={date}
              disabled
              className="input input-bordered w-full"
            />
            <select name="slot" className="select select-bordered w-full">
              {slots.map((slot, i) => (
                <option key={i}>{slot}</option>
              ))}
            </select>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              className="input input-bordered w-full"
              defaultValue={user?.displayName}
              disabled
            />
            <input
              type="text"
              name="email"
              placeholder="Enter Email"
              className="input input-bordered w-full"
              defaultValue={user?.email}
              disabled
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Enter Phone Number"
              className="input input-bordered w-full"
              required
            />
            <Button disabled={slots.length === 0} type="submit">
              {"Submit"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ApppointmentModal;
