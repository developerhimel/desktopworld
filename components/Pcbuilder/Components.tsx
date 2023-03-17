import Image from "next/image";
import React from "react";
import GradientBb from "../reusable/svg/GradientBb";
import { ChangeEvent, Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { NumericFormat } from "react-number-format";
import { useRouter } from "next/router";
import debounce from "lodash.debounce";
import { Skeleton } from "antd";
import Link from "next/link";
import { Button } from "@mui/material";

function Components(props: {
  imgSrc: any;
  title: any;
  cg: any;
  scg: any;
  setData: any;
  data: any;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [searchText, setSearchText] = useState("");
  const cancelButtonRef = useRef(null);

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLoading(true);
    setSearchText(e.target.value);
    const res = await fetch("/api/search/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: e.target.value,
      }),
    });
    const data = await res.json();
    setFiltered(data);
    setLoading(false);
  };

  const handleChoose = async () => {
    setOpen(true);
    setLoading(true);
    if (props.scg) {
      const res = await fetch("/api/filter/scg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cg: props.cg,
          scg: props.scg,
        }),
      });
      const data = await res.json();
      setFiltered(data.filteredProducts);
      setLoading(false);
    } else {
      const res = await fetch("/api/filter/cg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cg: props.cg,
        }),
      });
      const data = await res.json();
      setFiltered(data.filteredProducts);
      setLoading(false);
    }
  };

  return (
    <>
      {/* Search Modal */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          initialFocus={cancelButtonRef}
          onClose={() => {
            setFiltered([]);
            setOpen(false);
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-start justify-center pt-5">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-700 text-left shadow-xl transition-all sm:my-8 sm:w-full w-full mx-3 sm:max-w-7xl min-h-[60vh]">
                  <div>
                    <div className="border-b px-3 py-4 flex items-center dark:border-b-gray-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-gray-800 dark:text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                      </svg>
                      <input
                        type="search"
                        name="search"
                        id="searchproduct"
                        className="w-full mx-1 px-2 border-none rounded bg-white dark:bg-gray-700 dark:text-white"
                        placeholder="Search"
                        autoFocus
                        onChange={debounce(handleSearch, 500)}
                      />
                      <button
                        className="border px-1 rounded bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                        type="button"
                      >
                        esc
                      </button>
                    </div>
                    <div className="p-3 max-h-[80vh] overflow-auto flex flex-col">
                      <div className="w-full h-full justify-center items-center flex">
                        {filtered.length === 0 ? (
                          <div>
                            <h2 className="dark:text-white">
                              No products found!
                            </h2>
                          </div>
                        ) : null}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                        {filtered?.map((item: any, index: number) => (
                          <div
                            key={index}
                            className="bg-white shadow-md min-h-[550px] rounded-md group/main hover:shadow-pink-300 dark:bg-gray-700"
                          >
                            <div>
                              <div className="pt-2">
                                <span
                                  className={`text-xs bg-pink-600 pr-2 text-white p-1 rounded-r-full`}
                                >
                                  Save:
                                  <NumericFormat
                                    displayType="text"
                                    className="px-1"
                                    value={item.price - item.discountPrice}
                                    thousandSeparator=","
                                  />
                                  ৳
                                </span>
                              </div>
                              <div className="p-3 relative w-full h-[230px] overflow-hidden border-b-2 dark:border-b-gray-500">
                                {loading && (
                                  <Skeleton.Image
                                    className="w-full h-full absolute top-0 z-[1] left-0"
                                    active={loading}
                                  />
                                )}
                                <Link
                                  href={{
                                    pathname: `/${item.name
                                      .replace(
                                        /[&\/\\#, +()$~%.'":*?<>{}]/g,
                                        "-"
                                      )
                                      .toLowerCase()}`,
                                    query: { id: item._id },
                                  }}
                                >
                                  <Image
                                    src={item.src}
                                    fill
                                    alt={item.name}
                                    onLoad={() => setLoading(false)}
                                    className="w-full group-hover/main:scale-105 ease-in-out duration-300 object-contain p-5"
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="px-3 py-3 text-sm font-semibold cursor-pointer">
                              <Link
                                href={{
                                  pathname: `/${item.name
                                    .replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, "-")
                                    .toLowerCase()}`,
                                  query: { id: item._id },
                                }}
                              >
                                <div className="w-full h-10">
                                  <h3 className="hover:text-red-500 hover:underline line-clamp-2 text-ellipsis dark:text-white dark:hover:text-red-400">
                                    {item?.name}
                                  </h3>
                                </div>
                              </Link>
                            </div>
                            <div className="border-b mx-3 pb-2 min-h-[120px] dark:border-b-gray-500">
                              {item.keyFeatures
                                .slice(0, 4)
                                .map((item: any, index: number) => (
                                  <div
                                    key={index}
                                    className="text-xs flex justify-start items-start my-2 text-gray-700 dark:text-gray-200"
                                  >
                                    <i className="fa-solid fa-circle text-[4px] mr-2 mt-[5px]"></i>
                                    <p className="line-clamp-1 text-ellipsis">
                                      {item.value}
                                    </p>
                                  </div>
                                ))}
                            </div>
                            <div className="pt-2 flex flex-row flex-wrap justify-center items-center px-3">
                              <div className="flex flex-row justify-start text-sky-600 font-semibold">
                                <NumericFormat
                                  displayType="text"
                                  className=""
                                  value={
                                    item.discountPrice
                                      ? item.discountPrice
                                      : item.price
                                  }
                                  thousandSeparator=","
                                />
                                <span className="ml-1">৳</span>
                              </div>
                              <div className="flex flex-row justify-start text-xs dark:text-gray-300 ml-3 line-through">
                                <NumericFormat
                                  displayType="text"
                                  className=""
                                  value={item.price}
                                  thousandSeparator=","
                                />
                                <span className="ml-1">৳</span>
                              </div>
                            </div>
                            <div className="mx-3 py-3">
                              <Button
                                onClick={() => {
                                  setOpen(false);
                                  props.setData(item);
                                }}
                                className="bg-indigo-50 text-indigo-700 hover:text-white w-full shadow-none font-semibold capitalize hover:bg-indigo-700 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                                variant="contained"
                              >
                                Choose
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      {loading && (
                        <div className="text-sky-500 flex items-center justify-center py-2">
                          <div
                            className="spinner-border animate-spin inline-block w-6 h-6 border-4 rounded-full"
                            role="status"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {props.data ? (
        <div className="flex justify-between border my-2 mx-5 p-2 items-center rounded relative dark:border-gray-500">
          <div className="flex items-center">
            <div className="w-20 h-20 relative">
              <Image src={props.data.src} alt={props.title} fill />
            </div>
            <div>
              <span className="text-sm ml-2">{props.data.name}</span>
              <div className="pt-2 flex flex-row flex-wrap justify-start items-center px-3">
                <div className="flex flex-row justify-start text-orange-500 dark:text-orange-400 font-semibold">
                  <NumericFormat
                    displayType="text"
                    className=""
                    value={
                      props.data.discountPrice
                        ? props.data.discountPrice
                        : props.data.price
                    }
                    thousandSeparator=","
                  />
                  <span className="ml-1">৳</span>
                </div>
                <div className="flex flex-row justify-start text-xs dark:text-gray-300 ml-3 line-through">
                  <NumericFormat
                    displayType="text"
                    className=""
                    value={props.data.price}
                    thousandSeparator=","
                  />
                  <span className="ml-1">৳</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button
              onClick={() => props.setData(undefined)}
              className="rounded text-sm md:mx-0 h-10 w-10 hover:bg-sky-100 dark:hover:bg-gray-600"
            >
              <i className="fa-duotone fa-close text-lg"></i>
            </button>
            <button
              onClick={handleChoose}
              className="rounded text-sm md:mx-0 h-10 w-10 hover:bg-sky-100 dark:hover:bg-gray-600"
            >
              <i className="fa-duotone fa-rotate text-lg"></i>
            </button>
          </div>
          <GradientBb />
        </div>
      ) : (
        <div className="flex justify-between border my-2 mx-5 p-2 items-center rounded relative dark:border-gray-500">
          <div className="flex items-center">
            <Image
              src={props.imgSrc}
              alt={props.title}
              height={50}
              width={50}
            />
            <span className="text-sm ml-2">{props.title}</span>
          </div>
          <button
            onClick={handleChoose}
            className="rounded text-sm border border-blue-500 md:mx-0 h-10 w-24 hover:text-white hover:bg-blue-400"
          >
            Choose
          </button>
          <GradientBb />
        </div>
      )}
    </>
  );
}

export default Components;
