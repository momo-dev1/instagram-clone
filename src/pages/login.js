import { useState } from "react";
import { Link } from "react-router-dom";
import { TwitterIcon, FacebookIcon } from "assets/icons";
import InstaLogo from "../assets/images/login-logo.png";

import Head from "../components/shared/Head";

import { useAuthContext } from "auth/auth";

const LoginPage = () => {
  const { signIn, error } = useAuthContext();

  const [formFields, setFormFields] = useState({ email: "", password: "" });
  const isInvalid = formFields.email === "" || formFields.password === "";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn(formFields);
  };

  return (
    <>
      <Head title="Login" />
      <div className="flex items-center justify-center ">
        <div className="flex flex-col justify-center min-h-screen py-12 sm:px-6 lg:px-8">
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="px-6 py-8 bg-white shadow w-72 xs:w-96 ">
              <div>
                <img className="mx-auto" src={InstaLogo} alt="instagram" />
              </div>
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                {error.signError && (
                  <span className="block text-sm text-center text-red-primary">
                    {error.signError}
                  </span>
                )}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-primary"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      value={formFields.email}
                      onChange={handleInputChange}
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-primary"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      value={formFields.password}
                      onChange={handleInputChange}
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <button
                    disabled={isInvalid}
                    type="submit"
                    className={`${
                      isInvalid ? "opacity-75   cursor-not-allowed" : ""
                    } flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-medium border border-transparent rounded-md shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                  >
                    Log In
                  </button>
                </div>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 text-gray-500 bg-white">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">
                  <div>
                    <Link
                      to="#"
                      className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm group hover:bg-gray-50"
                    >
                      <span className="sr-only">Sign in with Facebook</span>
                      <FacebookIcon />
                    </Link>
                  </div>

                  <div>
                    <Link
                      to="#"
                      className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm group hover:bg-gray-50"
                    >
                      <span className="sr-only">Sign in with Twitter</span>
                      <TwitterIcon />
                    </Link>
                  </div>
                </div>
                <div className="mt-4 text-sm text-center">
                  <Link
                    to="#"
                    className="font-medium text-blue-light hover:text-blue-medium"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-4 mt-3 font-semibold text-center bg-white shadow sm:px-10">
            Don't have an account?
            <Link to="/accounts/emailsignup/">
              <span className="ml-2 opacity-75 text-blue-medium hover:opacity-100">
                Sign up
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
