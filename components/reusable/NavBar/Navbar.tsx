import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { MenuProps } from "antd";
import { Dropdown } from "antd";
import { MenuOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { DarkThemeToggle, Flowbite, Tooltip } from "flowbite-react";
import Menu from "./Menu";
import { useRouter } from "next/router";
import User from "./user";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  SwipeableDrawer,
} from "@mui/material";
import menu from "../../../json/menu.json";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useCart } from "react-use-cart";
import Lottie from "react-lottie";
import * as animationData from "./offers.json";

const DynamicSearchbar = dynamic(() => import("./Searchbar"), {
  suspense: true,
});

function Navbar() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const { totalUniqueItems } = useCart();
  const router = useRouter();
  const [user, setUser] = useState(undefined as any);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = React.useState<string | false>();
  const [totalCartUniqueItemsLength, setTotalCartUniqueItemsLength] =
    useState(0);

  useEffect(() => {
    setTotalCartUniqueItemsLength(totalUniqueItems);
  }, [totalUniqueItems]);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

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
  }, [router.asPath]);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div
          onClick={() => router.push("/login")}
          className="flex flex-row items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-sky-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
          <h2 className="ml-2">Login</h2>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          onClick={() => router.push("/register")}
          className="flex flex-row items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-teal-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
          <h2 className="ml-2">Register</h2>
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="sticky top-0 z-40">
        <div className="bg-white bg-opacity-90 dark:bg-gray-900 backdrop-blur-sm shadow dark:shadow-none shadow-sky-100 pb-[1px] rounded-b-md lg:rounded-none">
          {/* <div className="bg-gray-900 lg:py-[15px] pt-3 pb-[1px] rounded-b-md lg:rounded-none"> */}
          <div className="container m-auto">
            {/* Codes For Mobile Mode Start*/}
            <div className="lg:hidden">
              <div className="flex flex-row justify-between items-center lg:hidden py-1">
                <div>
                  <button className="px-3" onClick={() => setDrawerOpen(true)}>
                    <MenuOutlined className="text-gray-800 text-xl dark:text-white" />
                  </button>
                  <SwipeableDrawer
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                    onOpen={() => setDrawerOpen(true)}
                  >
                    <div className="w-[50vw]">
                      <div>
                        {user ? (
                          <div>
                            <button
                              onClick={() => {
                                setDrawerOpen(false);
                                router.push("/user/profile");
                              }}
                              className="px-3 py-2 bg-gray-300 text-orange-500 font-semibold w-full"
                            >
                              <i className="fa-duotone fa-user mx-1"></i> My
                              Account{" "}
                            </button>
                            <button
                              onClick={async () => {
                                const res = await fetch("/api/auth/logout");
                                const data = await res.json();
                                if (
                                  data.message === "Successfuly logged out!"
                                ) {
                                  setDrawerOpen(false);
                                  localStorage.removeItem("user");
                                  setUser(undefined);
                                  router.push("/");
                                }
                              }}
                              className="px-3 py-2 bg-gray-300 text-red-600 font-semibold w-full border-t"
                            >
                              Logout{" "}
                              <i className="fa-duotone fa-right-from-bracket mx-1"></i>
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setDrawerOpen(false);
                              router.push("/login");
                            }}
                            className="px-3 py-2 bg-gray-300 text-orange-500 font-semibold w-full"
                          >
                            Register/Login{" "}
                            <i className="fa-duotone fa-right-to-bracket mx-1"></i>
                          </button>
                        )}
                      </div>
                      {menu.map((cg: any, index: number) => {
                        const categoryName = cg.name;
                        return (
                          <Accordion
                            key={index}
                            disableGutters
                            expanded={expanded === `panel${index}`}
                            onChange={handleChange(`panel${index}`)}
                            className="shadow-none border-b"
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls={`panel${index}d-content`}
                              id={`panel${index}d-header`}
                              className="shadow shadow-sky-200"
                            >
                              <button
                                onClick={() => {
                                  setDrawerOpen(false);
                                  router.push({
                                    pathname: `/category/${cg.name
                                      .replace(
                                        /[&\/\\#, +()$~%.'":*?<>{}]/g,
                                        "-"
                                      )
                                      .toLowerCase()}`,
                                    query: { cg: cg.name },
                                  });
                                }}
                                className="hover:text-red-500 hover:underline text-left"
                              >
                                {cg.name}
                              </button>
                            </AccordionSummary>
                            {cg.items && (
                              <AccordionDetails>
                                {cg.items.map((scg: any, index: number) => (
                                  <button
                                    key={index}
                                    onClick={() => {
                                      setDrawerOpen(false);
                                      router.push({
                                        pathname: `/sub-category/${scg.name
                                          .replace(
                                            /[&\/\\#, +()$~%.'":*?<>{}]/g,
                                            "-"
                                          )
                                          .toLowerCase()}`,
                                        query: {
                                          cg: categoryName,
                                          scg: scg.name,
                                        },
                                      });
                                    }}
                                    className="hover:text-red-500 hover:underline w-full text-left my-1 text-sm"
                                  >
                                    {scg.name}
                                  </button>
                                ))}
                              </AccordionDetails>
                            )}
                          </Accordion>
                        );
                      })}
                    </div>
                  </SwipeableDrawer>
                </div>
                <Link href={"/"}>
                  <Image
                    alt="Logo"
                    src={"/assets/logo/logo1.png"}
                    height={50}
                    width={110}
                    priority
                  />
                </Link>
                <button
                  onClick={() => router.push("/checkout/cart")}
                  className="px-3 relative"
                >
                  <span className="absolute right-0 -top-1 bg-red-500 text-white font-bold w-5 h-5 text-center text-xs flex items-center justify-center rounded-full">
                    {totalCartUniqueItemsLength}
                  </span>
                  <ShoppingCartOutlined className="text-gray-800 text-2xl dark:text-white" />
                </button>
              </div>
              <div className="mx-3">
                <DynamicSearchbar />
              </div>
            </div>
            {/* Codes For Mobile Mode End*/}

            {/* Codes For Desktop Mode Start*/}
            <div className="">
              <div className="hidden lg:flex flex-row justify-start items-center">
                <Link href={"/"}>
                  <div className="w-40 h-20 relative">
                    <Image
                      alt="Logo"
                      src={"/assets/logo/logo1.png"}
                      fill
                      priority={true}
                      className="object-contain"
                    />
                  </div>
                </Link>
                <div className="w-full flex flex-row items-center">
                  <div className="w-1/2 mx-5 hidden lg:block">
                    <DynamicSearchbar />
                  </div>
                  <div className="hidden lg:w-1/2 lg:flex flex-row justify-between items-center">
                    <Link href={"/"}>
                      <div className="flex flex-row items-center hover:cursor-pointer">
                        <div className="px-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 ccprimary animate-pulse"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h2 className="text-gray-800 dark:text-white text-base">
                            Offers
                          </h2>
                          <h3 className="text-gray-400 text-xs">
                            Latest Offers
                          </h3>
                        </div>
                      </div>
                    </Link>
                    <Link href={"/"}>
                      <div className="flex flex-row items-center hover:cursor-pointer">
                        <div className="px-2">
                          <Lottie
                            options={defaultOptions}
                            height={50}
                            width={50}
                          />
                        </div>
                        <div>
                          <h2 className="text-gray-800 dark:text-white text-base">
                            Flash Offers
                          </h2>
                          <h3 className="text-gray-400 text-xs">
                            Special Offer
                          </h3>
                        </div>
                      </div>
                    </Link>
                    {user ? (
                      <User user={user} setUser={setUser} />
                    ) : (
                      <Dropdown menu={{ items }} placement="bottom" arrow>
                        <div className="flex flex-row items-center hover:cursor-pointer">
                          <div className="px-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6 ccprimary"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                              />
                            </svg>
                          </div>
                          <div>
                            <h2 className="text-gray-800 dark:text-white text-base">
                              Account
                            </h2>
                            <h3 className="text-gray-400 text-xs">
                              Register || Login
                            </h3>
                          </div>
                        </div>
                      </Dropdown>
                    )}
                    <Flowbite className="">
                      <Tooltip content="Switch Theme" style="light">
                        <DarkThemeToggle className="focus:outline-none hover:bg-gray-100 focus:ring-0 bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600" />
                      </Tooltip>
                    </Flowbite>
                    <div className="min-w-[112px]">
                    <Link
                      href={"/pcbuilder"}
                      className="relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-normal text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
                      <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                      <span className="relative text-white text-sm font-semibold">
                        PC Builder
                      </span>
                    </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Codes For Desktop Mode End*/}
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-700 border-b dark:border-gray-600 lg:block hidden">
        <div className="container m-auto relative">
          <Menu />
        </div>
      </div>
      <div className="fixed bottom-0 z-50 w-full pt-5 lg:hidden">
        <Flowbite className="absolute bottom-full left-0">
          <Tooltip content="Switch Theme" style="light">
            <DarkThemeToggle className="focus:outline-none hover:bg-gray-100 focus:ring-0 bg-white dark:bg-gray-700 dark:hover:bg-gray-600 shadow dark:shadow-gray-900 mb-2 mx-2" />
          </Tooltip>
        </Flowbite>
        <div className="bg-white dark:bg-gray-700 w-full shadow shadow-gray-900 grid grid-cols-5 gap-1">
          <button className="flex flex-col justify-center items-center hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white py-2">
            <i className="fa-duotone fa-gift text-lg"></i>
            <h2 className="text-xs font-semibold">Offers</h2>
          </button>
          <button className="flex flex-col justify-center items-center hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white py-2">
            <i className="fa-sharp fa-solid fa-bolt-lightning text-lg"></i>
            <h2 className="text-xs font-semibold">Deals</h2>
          </button>
          <button
            onClick={() => router.push("/pcbuilder")}
            className="flex flex-col justify-center items-center hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white py-2"
          >
            <i className="fa-duotone fa-computer text-lg"></i>
            <h2 className="text-xs font-semibold">Pc Builder</h2>
          </button>
          <button
            onClick={() => router.push("/compare")}
            className="flex flex-col justify-center items-center hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white py-2"
          >
            <i className="fa-duotone fa-code-compare text-lg"></i>
            <h2 className="text-xs font-semibold">Compare</h2>
          </button>
          <button
            onClick={() => router.push("/user/profile")}
            className="flex flex-col justify-center items-center hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white py-2"
          >
            <i className="fa-duotone fa-user text-lg"></i>
            <h2 className="text-xs font-semibold">Account</h2>
          </button>
        </div>
      </div>
    </>
  );
}

export default Navbar;
