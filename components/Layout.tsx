import React from "react";
import FloatBox from "./reusable/FloatBox";
import Footer from "./reusable/Footer/Footer";
import Navbar from "./reusable/NavBar/Navbar";

function Layout(props: { children: any }) {
  return (
    <>
      <Navbar />
      {props.children}
      <Footer />
      <FloatBox />
    </>
  );
}

export default Layout;
