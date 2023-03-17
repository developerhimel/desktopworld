import React, { useEffect, useState } from "react";
import { Avatar } from "antd";
import GradientBb from "../../components/reusable/svg/GradientBb";
import Link from "next/link";
import { useRouter } from "next/router";

function Compare() {
  const router = useRouter();
  const query = router.query;
  const [user, setUser] = useState(undefined as any);
  useEffect(() => {
    const userId = localStorage.getItem("user");
    if (userId) {
      fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
        });
    }
  }, []);
  return (
    <div>
      {/* Breadcamp section start */}
      <div className="bg-white dark:bg-gray-800 py-3 shadow border-b dark:border-b-gray-600">
        <nav
          className="flex container m-auto px-3 lg:px-0"
          aria-label="Breadcrumb"
        >
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                href="/"
                className="inline-flex items-center text-xs font-medium text-gray-700 hover:text-red-500 hover:underline dark:text-gray-400 dark:hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  className="w-3 h-3 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                Home
              </Link>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ml-1 text-xs font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                  Compare
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      {/* Breadcamp section end */}
      <div className="container m-auto">
        <div className="max-w-6xl m-auto bg-white dark:bg-gray-700 dark:border-gray-600 my-10 p-10 shadow border rounded-lg">
          <div className="relative bg-white dark:bg-gray-700 dark:border-gray-500 dark:shadow-gray-600 dark:hover:bg-gray-600 hover:bg-gray-50 rounded-xl p-6 text-sm leading-6 transition shadow-[0_1px_3px_rgba(15,23,42,0.03),0_1px_2px_rgba(15,23,42,0.06)] ring-1 ring-slate-600/[0.04]">
            <Link href={"#"}>
              <div className="w-full h-32 flex justify-center items-center flex-col">
                <span className="bg-indigo-100 dark:bg-gray-600 w-14 h-14 justify-center flex items-center rounded-full shadow">
                  <i className="fa-duotone fa-question text-3xl text-indigo-600 dark:text-indigo-300"></i>
                </span>
                <h2 className="py-2 text-sm font-semibold text-center dark:text-white">
                  Coming soon...
                </h2>
              </div>
            </Link>
            <GradientBb />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Compare;
