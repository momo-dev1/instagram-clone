import { Link } from "react-router-dom";
import { TwitterIcon, FacebookIcon } from "assets/icons";
import InstaLogo from "../assets/images/login-logo.png";

import Head from "../components/shared/Head";
import { useAuthContext } from "auth/auth";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    username: yup.string().min(4).max(15).lowercase().required(),
    fullname: yup.string().min(8).max(25).required(),
    password: yup.string().min(6).max(15).required(),
  })
  .required();

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { registerUserWithEmailAndPassword, error } = useAuthContext();

  const submitForm = async (data) => {
    await registerUserWithEmailAndPassword(data);
  };

  return (
    <>
      <Head title="Sign up" />
      <div className="flex items-center justify-center ">
        <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="px-6 py-8 bg-white shadow w-72 xs:w-80 md:w-96 ">
              <div>
                <img className="mx-auto" src={InstaLogo} alt="instagram" />
              </div>
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div>
                  <Link
                    to="#"
                    className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 group"
                  >
                    <span className="sr-only">Sign in with Facebook</span>
                    <FacebookIcon />
                  </Link>
                </div>

                <div>
                  <Link
                    to="#"
                    className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 group"
                  >
                    <span className="sr-only">Sign in with Twitter</span>
                    <TwitterIcon />
                  </Link>
                </div>
              </div>
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-light">
                      Or continue with
                    </span>
                  </div>
                </div>
              </div>

              <form
                onSubmit={handleSubmit(submitForm)}
                className="mt-8 space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-primary">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("email")}
                      type="text"
                      className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    <div className="flex flex-col gap-1 mt-1">
                      {errors.email?.message && (
                        <span className="text-sm text-red-primary">
                          {errors.email?.message}
                        </span>
                      )}
                      {error.emailError && (
                        <span className="text-sm text-red-primary">
                          {error.emailError}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-primary">
                    Full Name
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("fullname")}
                      id="fullname"
                      type="text"
                      className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {errors.fullname?.message && (
                      <span className="text-sm text-red-primary">
                        {errors.fullname?.message}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-primary">
                    Username
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("username")}
                      type="text"
                      className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {errors.username?.message && (
                      <span className="text-sm text-red-primary">
                        {errors.username?.message}
                      </span>
                    )}
                    {error.usernameError && (
                      <span className="text-sm text-red-primary">
                        {error.usernameError}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-primary">
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("password")}
                      type="password"
                      className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {errors.password?.message && (
                      <span className="text-sm text-red-primary">
                        {errors.password?.message}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className={`flex  justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-medium border border-transparent rounded-md shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-medium`}
                  >
                    Sign up
                  </button>
                </div>
              </form>
              <div className="mt-5 text-center text-md">
                <div className="mx-auto font-medium text-gray-500 ">
                  By signing up, you agree to our <br /> Terms , Data Policy and
                  Cookies
                  <br />
                  Policy.
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-4 mt-3 font-semibold text-center bg-white shadow sm:px-10">
            Have an account?
            <Link to="/accounts/login/">
              <span className="ml-2 opacity-75 text-blue-medium hover:opacity-100">
                Log In
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
