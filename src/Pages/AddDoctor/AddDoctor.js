import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";

const AddDoctor = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const imgHostKey = process.env.REACT_APP_imgbb_apiKey;
  const navigate = useNavigate();

  const handelAddDoctor = (data) => {
    const image = data.img[0];
    const formData = new FormData();
    formData.append('image', image);
    const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`
    fetch(url,{
      method:'POST',
      body: formData
    })
    .then(res => res.json())
    .then(imgData =>{
      if(imgData.success){
        const doctor  ={
          name : data.name,
          email: data.email,
          speciality: data.speciality,
          image: imgData.data.url
        }
        fetch('http://localhost:5000/doctors',{
          method:'POST',
          headers:{
            'content-type': 'application/json',
             authorization: `bearer ${localStorage.getItem('accessToken')}`
          },
          body: JSON.stringify(doctor)
        })
        .then(res => res.json())
        .then(result =>{
          if(result.acknowledged){
            toast.success(`${data.name} is Successfully Added!`);
            navigate('/dashboard/manageDoctors')
          };
        })
      };
    })
  };

  const {data: specialities, isLoading} = useQuery({
    queryKey:['speciality'],
    queryFn: async () =>{
      const res = await fetch('http://localhost:5000/appointmentSpeciality');
      const data = await res.json();
      return data;
    }
  })

  if(isLoading){
    return <Loading></Loading>
  }

  return (
    <section className="mx-10">
      <h1 className="text-3xl mb-4">Add a doctor</h1>

      <div className="w-96 shadow p-8 rounded">
        <form
          onSubmit={handleSubmit(handelAddDoctor)}
          className="grid grid-cols-1 gap-3"
        >
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              className="input input-bordered w-full"
            />
            {errors.name && (
              <p className="text-red-500 mt-3">{errors.name?.message}</p>
            )}
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              className="input input-bordered w-full"
            />
            {errors.email && (
              <p className="text-red-500 mt-3">{errors.email?.message}</p>
            )}
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Please select a Speciality</span>
            </label>
            <select 
            className="select select-bordered w-full max-w-xs"
            {...register("speciality", { required: "Email is required" })}>
              {
                specialities.map(speciality => <option key={speciality._id} value={speciality.name}>{speciality.name}</option>)
              }
            </select>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Photo</span>
            </label>
            <input
              {...register("img", { required: "Image is required" })}
              type="file"
              className="input input-bordered w-full"
            />
            {errors.img && (
              <p className="text-red-500 mt-3">{errors.img?.message}</p>
            )}
          </div>

          <input
            type="submit"
            value="Add A Doctor"
            className="btn bg-green-500 hover:bg-green-600 border-0 text-white"
          />
        </form>
      </div>
    </section>
  );
};

export default AddDoctor;
