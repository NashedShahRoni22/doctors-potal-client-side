import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";
import Loading from "../../Shared/Loading/Loading";

const ManageDoctors = () => {
  const [deleteDoctor, setDeleteDoctor] = useState(null);

  const closeConfirmationModal =()=>{
    setDeleteDoctor(null);
  }


  const { data: doctors, isLoading, refetch } = useQuery({
    queryKey: ["doctors"],
    queryFn: () =>
      fetch("http://localhost:5000/doctors", {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });
  if (isLoading) {
    return <Loading></Loading>;
  }

  const handelDeleteDoctor = doctor =>{
    fetch(`http://localhost:5000/doctors/${doctor._id}`,{
      method:"DELETE",
      headers:{
        authorization: `bearer ${localStorage.getItem("accessToken")}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if(data.deletedCount > 0){
        toast.error("Deleted Successfully!");
        refetch();
      };
    })
  }
  return (
    <div className="mx-10">
      <h1 className="text-3xl mb-4">Total Doctors: {doctors?.length}</h1>

      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Speciality</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, i) => (
              <tr key={doctor._id}>
                <th>{i + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <img src={doctor.image} alt="" />
                    </div>
                  </div>
                </td>
                <td>{doctor.name}</td>
                <td>{doctor.speciality}</td>
                <td>
                  <label 
                  onClick={()=> setDeleteDoctor(doctor)}
                  htmlFor="confirmation-modal" 
                  className="btn btn-xs btn-error">
                    Delete
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {
        deleteDoctor && 
        <ConfirmationModal
        title={"Are you sure?"}
        message={`If you delete ${deleteDoctor.name} you can't get this doctor data back again!`}
        closeConfirmationModal={closeConfirmationModal}
        handelDeleteDoctor={handelDeleteDoctor}
        doctorData = {deleteDoctor}
        ></ConfirmationModal>
      }
    </div>
  );
};

export default ManageDoctors;
