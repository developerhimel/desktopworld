import { DarkThemeToggle, Flowbite, Tooltip } from "flowbite-react";
import React from "react";

function Navbar() {
  return (
    <div className="bg-white w-full bg-opacity-90 backdrop-blur-sm py-2 dark:bg-gray-700">
      <div className="max-w-7xl m-auto">
        <div className="flex justify-end items-center">
          <Flowbite className="">
            <Tooltip content="Switch Theme" style="light">
              <DarkThemeToggle className="focus:outline-none hover:bg-gray-100 focus:ring-0 bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600" />
            </Tooltip>
          </Flowbite>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
