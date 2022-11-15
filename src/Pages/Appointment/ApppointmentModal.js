import React from "react";
import { format } from "date-fns";
import Button from "../../Components/Button/Button"

const ApppointmentModal = ({ treatmentModal, selectedDate }) => {
  const { name, slots } = treatmentModal;
  const date = format(selectedDate, "PP");

  const handelBooking = e =>{
    e.preventDefault();
    const form = e.target;
    const date = form.date.value;
    const slot = form.slot.value;
    const name = form.name.value;
    const email = form.email.value;
    const phoneNumber = form.phoneNumbervalue;

    console.log(date, slot, name, email, phoneNumber);
  }
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
          <form onSubmit={handelBooking} className="grid grid-cols-1 gap-3 mt-10">
            <input
              type="text"
              name="date"
              value={date}
              disabled
              className="input input-bordered w-full"
            />
            <select name="slot" className="select select-bordered w-full">
              {
                slots.map(slot => <option>{slot}</option>)
              }
            </select>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              name="email"
              placeholder="Enter Email"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Enter Phone Number"
              className="input input-bordered w-full"
            />
            <Button 
            disabled={slots.length === 0}
            type="submit">{"Submit"}</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ApppointmentModal;
