import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Login from './Login'
import { useForm } from "react-hook-form"
import axios from "axios"
import toast from 'react-hot-toast'

function Signup() {
  const location = useLocation();
  const navigate=useNavigate();
  const from = location.state?.from.pathname ||"/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password
    }
    await axios.post("/user/signup", userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success('Signup Successfully');
          navigate(from, {replace: true});
        }
        localStorage.setItem("Users", JSON.stringify(res.data.user));
      }).catch((err) => {
        if (err.response) {
          console.log(err)
          toast.error("Signup Error: " + err.response.data.message);
        }
      });
  };
  return (
    <>

      <div className=" flex h-screen items-center justify-center ">
        <div className="w-[600px]">
          <div className=" modal-box border-[1px] border-pink-400 shadow-2xl shadow-pink-400 dark:bg-slate-900 dark:text-white dark:shadow-md dark:shadow-pink-400">

            <form onSubmit={handleSubmit(onSubmit)} method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <Link
                to="/"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </Link>

              <h3 className="font-bold text-lg">Signup</h3>
              {/*Name*/}
              <div className='mt-5 space-y-2'>
                <span>Name</span>
                <br />
                <input
                  type="text"
                  placeholder='Enter your Full Name '
                  className='w-80 px-3 py-1 border rounded-md outline-none   dark:text-black'
                  {...register("fullname", { required: true })}
                />
                <br />
                {errors.fullname && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>

              {/* Email ID */}
              <div className='mt-5 space-y-2'>
                <span>Email</span>
                <br />
                <input
                  type="email"
                  placeholder='Enter your email '
                  className='w-80 px-3 py-1 border rounded-md outline-none dark:text-black'
                  {...register("email", { required: true })}
                />
                <br />
                {errors.email && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>

              {/* Password */}
              <div className='mt-5 space-y-2'>
                <span>Password</span>
                <br />
                <input
                  type="text"
                  placeholder='Enter your password '
                  className='w-80 px-3 py-1 border rounded-md outline-none   dark:text-black'
                  {...register("password", { required: true })}
                />
                <br />
                {errors.password && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>

              {/* Login Button */}
              <div className="mt-5 flex justify-around ">
                <button type="submit" className=" bg-pink-500 text-white hover:bg-pink-700 duration-200 px-3 py-1 rounded-md  dark:bg-pink-500 dark:text-white">Signup</button>
                <p className="text-lg">
                  Have allrady account?

                  <button className=" cursor-pointer underline text-blue-500 "
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()}>
                    Login
                  </button>
                  <Login />

                </p>
              </div>
              <p className="text-sm py-4 justify-center text-center ">Press ESC key or click on ✕ button to close</p>

            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup