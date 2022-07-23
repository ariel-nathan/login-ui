import React from "react";

import type { AppType } from "next/dist/shared/lib/utils";
import { AuthProvider } from "../context/auth";
import { LoadingProvider } from "../context/loading";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <LoadingProvider>
        <Component {...pageProps} />
      </LoadingProvider>
    </AuthProvider>
  );
};

export default MyApp;
