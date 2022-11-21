import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import Loading from "../../Shared/Loading/Loading";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const url = `http://localhost:5000/bookings?email=${user?.email}`;

  const { isLoading, data: bookings } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: () =>
      fetch(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="overflow-x-auto mx-10">
      <h1 className="text-3xl mb-10">My Appointments</h1>
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Treatment</th>
            <th>Date</th>
            <th>Time</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {bookings?.map((booking, i) => (
            <tr className="hover" key={booking._id}>
              <th>{i + 1}</th>
              <td>{booking.patientName}</td>
              <td>{booking.treatmentName}</td>
              <td>{booking.appointmentDate}</td>
              <td>{booking.slot}</td>
              <td>
                {booking.price && !booking.paid && (
                  <Link to={`/dashboard/payment/${booking._id}`} className="btn btn-primary btn-xs">Payment</Link>
                )}
                {booking.price && booking.paid && <span className="text-green-500">Paid</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
