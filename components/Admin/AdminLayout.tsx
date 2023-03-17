import React from "react";
import { FloatButton } from "antd";
import Sidebar from "./Layout/Sidebar";
import Navbar from "./Layout/Navbar";

function AdminLayout(props: { children: any }) {
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="w-full h-full">
          <Navbar />
          <div className="w-full h-full overflow-auto bg-gray-50 dark:bg-gray-800">
            <div className="container max-w-7xl m-auto dark:text-white">
              {props.children}
            </div>
          </div>
        </div>
      </div>
      <FloatButton.BackTop />
    </>
  );
}

export default AdminLayout;
