import type { NextPage } from "next";

import { useAuth } from "../context/auth";

import LoginUI from "./loginui";
import Welcome from "./welcome";

const Home: NextPage = () => {
  const { user } = useAuth();

  return user ? <Welcome /> : <LoginUI />;
};

export default Home;
