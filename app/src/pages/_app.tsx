import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/app";
import { Toaster } from 'react-hot-toast'; // Import the Toaster component

import "~/styles/globals.css";

const MyApp: AppType = ({
  Component,
  pageProps,
}) => {
  return (
    <div className={GeistSans.className}>
      <Toaster /> 
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
