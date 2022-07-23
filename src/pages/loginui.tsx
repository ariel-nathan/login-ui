import React, { FC, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";

import { useAuth } from "../context/auth";
import { useLoading } from "../context/loading";

interface loginDataInterface {
  email: string;
  password: string;
}

const LoginUI: FC = () => {
  const { signUp, login, googleLogin, resetPassword } = useAuth();
  const { setIsLoading } = useLoading();

  const [signUpView, setSignUpView] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [resetEmailSent, setResetEmailSent] = useState<boolean>(false);
  const [loginData, setLoginData] = useState<loginDataInterface>({
    email: "",
    password: "",
  });

  useEffect(() => {
    setIsLoading(false);
    setResetEmailSent(false);
    if (loginError === "Firebase: Error (auth/missing-email).") {
      setLoginError("Email is required");
    } else if (loginError === "Firebase: Error (auth/invalid-email).") {
      setLoginError("Please enter a valid email");
    } else if (loginError === "Firebase: Error (auth/user-not-found).") {
      setLoginError("User not found");
    } else if (loginError === "Firebase: Error (auth/internal-error).") {
      if (!loginData.password) {
        setLoginError("Please enter a password");
      } else {
        setLoginError("Internal error");
      }
    } else if (loginError === "Firebase: Error (auth/email-already-in-use).") {
      setLoginError("Account already exists");
    }
  }, [loginError]);

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (signUpView) {
      const response: any = await signUp(loginData.email, loginData.password);
      setLoginError(response?.message);
    } else {
      const response: any = await login(loginData.email, loginData.password);
      setLoginError(response?.message);
    }
  };

  const handlePasswordReset = async () => {
    setIsLoading(true);
    const response: any = await resetPassword(loginData.email);
    setLoginError(response?.message);
    if (!response) {
      setResetEmailSent(true);
    }
  };

  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <form
        className="w-80 h-[30rem] bg-gray-200 rounded-lg shadow-lg flex flex-col justify-center items-center p-5 space-y-3"
        onSubmit={handleSubmitForm}
      >
        <h1 className="text-3xl font-bold text-center">
          {signUpView ? "Sign Up" : "Login"}
        </h1>
        <div className="w-full">
          <label className="text-sm font-bold mb-2 w-full flex justify-between">
            <p>Email</p>
            {loginError && <p className="text-red-500">{loginError}</p>}
            {resetEmailSent && (
              <p className="text-green-500">Email sent! Check spam</p>
            )}
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-bold mb-2">Password</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
        </div>
        {signUpView ? (
          <>
            <button
              className="bg-blue-500 hover:bg-blue-700 focus:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-4/5"
              type="submit"
            >
              Sign Up
            </button>
            <button
              className="font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-4/5 flex justify-between items-center border border-gray-400 hover:bg-gray-300 focus:bg-gray-300"
              type="button"
              onClick={() => {
                googleLogin();
              }}
            >
              <FcGoogle size={20} />
              <p className="text-base font-medium text-gray-700">
                Continue with Google
              </p>
            </button>
          </>
        ) : (
          <>
            <div
              className="w-full flex items-center justify-end text-gray-500 hover:text-gray-800 cursor-pointer text-sm"
              onClick={handlePasswordReset}
            >
              Forgot password?
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 focus:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-4/5"
              type="submit"
            >
              Sign In
            </button>
            <button
              className="font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-4/5 flex justify-between items-center border border-gray-400 hover:bg-gray-300 focus:bg-gray-300"
              type="button"
              onClick={() => {
                googleLogin();
                setIsLoading(true);
              }}
            >
              <FcGoogle size={20} />
              <p className="text-base font-medium text-gray-700">
                Continue with Google
              </p>
            </button>
          </>
        )}
        <div className="w-full flex items-center justify-center">
          <div className="border w-full border-gray-300 mx-5"></div>
          <div className="text-gray-400">Or</div>
          <div className="border w-full border-gray-300 mx-5"></div>
        </div>
        <button
          className="bg-gray-500 hover:bg-gray-700 focus:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-4/5"
          type="button"
          onClick={() => {
            setSignUpView(!signUpView);
          }}
        >
          {signUpView ? "Login" : "Create an account"}
        </button>
      </form>
    </div>
  );
};

export default LoginUI;
