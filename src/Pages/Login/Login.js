import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [resetEmail, setResetEmail] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { loginUser, forgetPasswordEmail, googleSignIn } =
    useContext(AuthContext);

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

  const handelForgetPassword = () => {
    if (!resetEmail) {
      toast.error("Please Enter Email address!");
      return;
    }
    forgetPasswordEmail(resetEmail)
      .then(() => {
        toast.success("Please Check your email address!");
      })
      .catch((e) => console.error(e.message));
  };

  const handelEmailblur = (e) => {
    const email = e.target.value;
    setResetEmail(email);
  };

  const handelLogin = (data) => {
    console.log(data);
    loginUser(data.email, data.password)
      .then((res) => {
        const user = res.user;
        console.log(user);
        toast.success("Login Successfull!");
        navigate(from, { replace: true });
      })
      .catch((e) => {
        console.log(e.message);
        toast.error(e.message);
      });
  };
  return (
    <div className="h-[80vh] flex items-center justify-center">
      <div className="w-96 shadow p-8 rounded">
        <h1 className="text-xl font-bold text-green-500 mb-4"> Login Now!</h1>

        <form
          onSubmit={handleSubmit(handelLogin)}
          className="grid grid-cols-1 gap-3"
        >
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              onBlur={handelEmailblur}
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
              })}
              type="password"
              className="input input-bordered w-full"
            />
            {errors.password && (
              <p className="text-red-500 mt-3">{errors.password?.message}</p>
            )}
            <label className="label cursor-pointer">
              <span className="label-text" onClick={handelForgetPassword}>
                Forgot Password?
              </span>
            </label>
          </div>
          <input
            type="submit"
            value="Login"
            className="btn bg-green-500 hover:bg-green-600 border-0 text-white"
          />
        </form>
        <p className="mt-4 text-sm text-center">
          New to Doctors Portal?{" "}
          <Link to="/signup" className="text-secondary font-semibold">
            Create new account
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

export default Login;
