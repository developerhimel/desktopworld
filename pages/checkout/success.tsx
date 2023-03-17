import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import Lottie from "react-lottie";
import * as animationData from "./success-animation.json";
import { Button } from "@mui/material";

const OrderSuccessPage: NextPage = (props: any) => {
  const router = useRouter();
  const query = router.query;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      <Head>
        <title>
          Success - Classic Computer || Largest tech accessories shop in
          Bangladesh
        </title>
        <meta
          name="description"
          content="Classic Computer has the most comprehensive array of Desktop PCs. We offer top-of-the-line Custom PC, Brand PC, All-in-One PC, and Portable Mini PC at our stores spread all over Bangladesh. Get your new iMac Desktop or Apple Mac Mini with an international warranty and servicing plan. To build a Desktop PC with the components of your choice, you can always depend on the experts of the Classic Computer PC shop. Take your gaming or professional content creation to the next level with a large collection of high-end Gaming and Rendering PC from Classic Computer. You can choose and build a complete Personal computer with our PC Builder feature anytime, anywhere. Or, build a Desktop PC to your taste right in front of you at the Classic Computer PC Shop."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
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
                    Success
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        {/* Breadcamp section end */}
        <div className="container m-auto">
          <div className="max-w-6xl m-auto">
            <div className="bg-white dark:bg-gray-900 my-5 min-h-[50vh] rounded-md mx-3 md:mx-0 text-center py-5">
              <Lottie options={defaultOptions} height={150} width={150} />
              <h2 className="text-xl font-semibold py-1 text-gray-800 dark:text-white">
                Thank you for your order!
              </h2>
              <h2 className="text-base font-semibold py-1 text-sky-400">
                Order# {query?.id}
              </h2>
              <h2 className="text-lg my-1 text-gray-800 dark:text-white">
                We will contact you soon to verify the order.
              </h2>
              <h2 className="px-5 text-gray-800 dark:text-white my-5">
                If you have any questions about this order, feel free to call us
                on{" "}
                <span className="font-semibold text-orange-500">
                  017-18443892
                </span>{" "}
                /{" "}
                <span className="font-semibold text-orange-500">
                  017-11945255
                </span>{" "}
                (10 AM - 5 PM).
              </h2>
              <div className="my-5 border-t mx-10 py-5">
                <Button
                  onClick={() => router.push("/")}
                  className="shadow bg-sky-500 hover:bg-sky-600 capitalize rounded-full text-base py-2 shadow-indigo-200"
                  variant="contained"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSuccessPage;
