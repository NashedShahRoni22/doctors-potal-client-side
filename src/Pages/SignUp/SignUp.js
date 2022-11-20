import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import useToken from "../../hooks/useToken";

const SignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { createUser, updateUserProfile, googleSignIn } =
    useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const[createdUserEmail, setCreatedUserEmail] = useState('');
  const [token] = useToken(createdUserEmail);
  if(token){
    navigate('/')
  }

  const handelGoogleSignIn = () => {
    googleSignIn()
      .then((res) => {
        const user = res.user;
        console.log(user);
        toast.success("Google Login Successfull!");
        navigate(from, { replace: true });
      })
      .catch((e) => {
        console.error(e.message);
      });
  };

  const handelLogin = (data) => {
    console.log(data.email, data.password, data.name);
    createUser(data.email, data.password)
      .then((res) => {
        const user = res.user;
        console.log(user);
        toast.success("User Created Successfully !");
        const userInfo = {
          displayName: data.name,
        };
        updateUserProfile(userInfo)
          .then(() => {
            savedUser(data.name, data.email)
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  const savedUser = (name, email)=>{
    const user = {name, email};
    fetch('http://localhost:5000/users',{
      method: 'POST',
      headers:{
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      setCreatedUserEmail(email);
    })
  }

  return (
    <div className="h-[80vh] flex items-center justify-center">
      <div className="w-96 shadow p-8 rounded">
        <h1 className="text-xl font-bold text-green-500 mb-4">
          {" "}
          Register Now!
        </h1>

        <form
          onSubmit={handleSubmit(handelLogin)}
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
              <span className="label-text">Password</span>
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be 6 charecters",
                },
                pattern: {
                  value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!#$%&?@ "])/,
                  message:
                    "Password must contain 1 uppercase, 1 lowercase, 1 number and one special charecter",
                },
              })}
              type="password"
              className="input input-bordered w-full"
            />
            {errors.password && (
              <p className="text-red-500 mt-3">{errors.password?.message}</p>
            )}
          </div>
          <input
            type="submit"
            value="Register"
            className="btn bg-green-500 hover:bg-green-600 border-0 text-white"
          />
        </form>
        <p className="mt-4 text-sm text-center">
          Already have an account ?{" "}
          <Link to="/login" className="text-secondary font-semibold">
            Please Login
          </Link>
        </p>
        <div className="divider my-8">OR</div>
        <button
          onClick={handelGoogleSignIn}
          className="btn btn-outline btn-success w-full"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default SignUp;
