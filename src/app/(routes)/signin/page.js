"use client"
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";


import { useSigninMutation } from "../../../redux/features/auth/authApi";

const Signin = () => {
  // react hook form credentials
  const {
    register,
    handleSubmit,
    formState: { errors }, 
  } = useForm();

  // server side credential
  const [signin, { isLoading: logging, isSuccess: logged }] =
    useSigninMutation();

  // user credential from state
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (Object.keys(user).length) {
        router.push("/");
    }
  }, [user, router]);

  useEffect(() => {
    // sign in
    if (logging) {
      toast.loading("Signing in.", { id: "signin_user" });
    } else if (logged) {
      toast.success("Signed in.", {
        id: "signin_user",
      });
    }
  }, [logging, logged]);

  const handleSigninForm = (data) => {
    signin(data);
  };

  return (
    <>
      <div className="min-h-screen bg-white flex flex-col justify-center py-12 px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 max-w">
              Don&apos;t have an account?
            <Link
              href="/sign-up"
              className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
            >
              Sign up
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-6 rounded-lg sm:px-10">
            <form
              className="mb-0 space-y-6"
              onSubmit={handleSubmit(handleSigninForm)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  {errors.email ? (
                    <span className="text-red-500 font-medium">
                      Email field is required!
                    </span>
                  ) : (
                    "Email"
                  )}
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="off"
                    {...register("email", { required: true })}
                    className="w-full form-input rounded-md p-2"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="flex justify-between text-sm font-medium text-gray-700"
                >
                  {errors.password ? (
                    <span className="text-red-500 font-medium">
                      Password field is required!
                    </span>
                  ) : (
                    "Password"
                  )}

                  <Link
                    href="/forgot-password"
                    className="text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot Password
                  </Link>
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="off"
                    {...register("password", { required: true })}
                    className="w-full form-input rounded-md p-2"
                  />
                </div>
              </div>

              <div>
                <button className="w-full btn-primary">Sign in</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
