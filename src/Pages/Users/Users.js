import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import Loading from "../../Shared/Loading/Loading";

const Users = () => {
  const { isLoading, data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch("http://localhost:5000/users").then((res) => res.json()),
  });
  if (isLoading) {
    return <Loading></Loading>;
  }

  const handelMakeAdmin = id =>{
    fetch(`http://localhost:5000/users/admin/${id}`,{
        method: 'PUT',
        headers:{
           authorization: `bearer ${localStorage.getItem("accessToken")}`
        }
    })
    .then(res => res.json())
    .then(data => {
        if(data.modifiedCount > 0){
            toast.success('Admin Created');
            refetch();
        }
    })
  }
  return (
    <div className="mx-10">
      <h1 className="text-3xl mb-10">Total Users {users.length}</h1>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u,i) => (
              <tr key={u._id}>
                <th>{i+1}</th>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                    {
                        u?.role !== 'admin' &&
                        <button onClick={()=> handelMakeAdmin(u._id)} className="btn btn-sm btn-secondary">Make Admin</button>
                    }
                </td>
                <td>
                    <button className="btn btn-sm btn-error">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
