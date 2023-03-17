import React, { useEffect, useState } from "react";
import { Avatar, Skeleton } from "antd";
import GradientBb from "../../components/reusable/svg/GradientBb";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import moment from "moment";
import { NumericFormat } from "react-number-format";
import { Button } from "@mui/material";

function Orders() {
  const router = useRouter();
  const query = router.query;
  const [user, setUser] = useState(undefined as any);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState(undefined as any);

  useEffect(() => {
    setLoading(true);
    fetch("/api/order/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: query.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      });
  }, [query.id]);

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
            <li className="inline-flex items-center">
              <Link
                href="/user/profile"
                className="inline-flex items-center text-xs font-medium text-gray-700 hover:text-red-500 hover:underline dark:text-gray-400 dark:hover:text-white"
              >
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
                My Account
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
                  Orders
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      {/* Breadcamp section end */}
      <div className="container m-auto">
        <div className="max-w-6xl m-auto bg-white dark:bg-gray-700 dark:border-gray-600 my-10 p-3 md:p-10 shadow border rounded-lg min-h-[50vh]">
          <h1 className="text-xl font-semibold dark:text-white pb-5 border-b mb-2 dark:border-b-gray-500">
            Orders
          </h1>
          {loading ? (
            <div className="">
              <Skeleton active={loading} className="my-1" />
              <Skeleton active={loading} className="my-1" />
              <Skeleton active={loading} className="my-1" />
            </div>
          ) : (
            <div className="">
              {orders?.map((item: any, index: number) => (
                <div
                  key={index}
                  className="relative my-3 bg-white dark:bg-gray-700 dark:border-gray-800 dark:shadow-gray-800 rounded-xl p-5 text-sm leading-6 transition shadow-[0_1px_3px_rgba(15,23,42,0.03),0_1px_2px_rgba(15,23,42,0.06)] ring-1 ring-slate-600/[0.04] dark:ring-slate-700"
                >
                  <div className="w-full flex flex-row justify-between items-center border-b pb-2 dark:border-b-gray-500 mb-3">
                    <div>
                      <h2 className="py-1 text-base font-semibold dark:text-white">
                        Order#{" "}
                        <span className="text-sm font-normal text-orange-500">
                          {item._id}
                        </span>
                      </h2>
                      <h3 className="dark:text-white text-sm">
                        {moment(item.createdAt).format(
                          "DD/MM/YYYY   h:mm:ss A"
                        )}
                      </h3>
                    </div>
                    <div className="flex justify-between items-center gap-5">
                      <div className="text-base flex justify-center items-center">
                        <i
                          className={`fa-solid ${
                            item.orderStatus === "processing"
                              ? "fa-clock-two-thirty text-teal-500"
                              : item.orderStatus === "cancelled"
                              ? "fa-circle-xmark text-red-600"
                              : item.orderStatus === "delivered"
                              ? "fa-circle-check text-green-600"
                              : item.orderStatus === "pending"
                              ? "fa-circle-check text-yellow-400"
                              : null
                          } mr-2`}
                        ></i>
                        <span
                          className={`capitalize dark:text-white ${
                            item.orderStatus === "processing"
                              ? "text-teal-500"
                              : item.orderStatus === "cancelled"
                              ? "text-red-600"
                              : item.orderStatus === "delivered"
                              ? "text-green-600"
                              : item.orderStatus === "pending"
                              ? "text-yellow-400"
                              : null
                          }`}
                        >
                          {item.orderStatus}
                        </span>
                      </div>
                      {item.orderStatus === "pending" ? (
                        <Button
                          onClick={async () => {
                            const res = await fetch("/api/admin/updateOrder", {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                id: item._id,
                                action: "cancel",
                              }),
                            });
                            const data = await res.json();
                            console.log(data);
                            if (data.message === "success") {
                              router.reload();
                            }
                          }}
                          className="text-xs w-full border-none bg-rose-500 text-white hover:bg-rose-600 py-2.5 capitalize font-semibold dark:bg-gray-600 dark:hover:bg-gray-800 dark:text-white"
                        >
                          Cancel
                        </Button>
                      ) : item.orderStatus === "processing" ? (
                        <Button
                          onClick={async () => {
                            const res = await fetch("/api/admin/updateOrder", {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                id: item._id,
                                action: "cancel",
                              }),
                            });
                            const data = await res.json();
                            console.log(data);
                            if (data.message === "success") {
                              router.reload();
                            }
                          }}
                          className="text-xs w-full border-none bg-rose-500 text-white hover:bg-rose-600 py-2.5 capitalize font-semibold dark:bg-gray-600 dark:hover:bg-gray-800 dark:text-white"
                        >
                          Cancel
                        </Button>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex items-center">
                      <div className="relative w-16 h-16">
                        <Image
                          src={item?.products[0]?.src}
                          fill
                          alt={item?.products[0]?.name}
                        />
                      </div>
                      <h2 className="mx-3 font-semibold dark:text-white">
                        {item?.products[0]?.name}{" "}
                        <span className="text-gray-600 dark:text-gray-300">
                          - ({item?.products.length} more)
                        </span>
                      </h2>
                    </div>
                    <h2 className="font-semibold text-orange-500">
                      <span className="text-gray-800 dark:text-white">
                        Total:
                      </span>
                      <NumericFormat
                        displayType="text"
                        className="px-1"
                        value={item.total}
                        thousandSeparator=","
                      />
                      ৳
                    </h2>
                  </div>
                  <GradientBb />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders;
