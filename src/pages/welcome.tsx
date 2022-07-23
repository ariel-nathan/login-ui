import React, { useEffect } from "react";

import { useAuth } from "../context/auth";
import { useLoading } from "../context/loading";

const Welcome = () => {
  const { user, logout } = useAuth();
  const { setIsLoading } = useLoading();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center space-y-5">
      <div>Welcome! {user.email}</div>
      <button
        className="bg-gray-500 hover:bg-gray-700 focus:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-80"
        type="button"
        onClick={logout}
      >
        Log Out
      </button>
    </div>
  );
};

export default Welcome;
