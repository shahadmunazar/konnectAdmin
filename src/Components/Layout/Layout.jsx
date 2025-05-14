import React from "react";
import Topbar from "./Topbar";
import Navbar from "./Navbar";
// import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <div className="main-wrapper">
        <Navbar />
        <div className="page-wrapper">
          <Topbar />
          {/* Main Div components */}
          {children}
          {/* <Footer /> */}
        </div>
      </div>
    </>
  );
};
export default Layout;
