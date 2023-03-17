import React, { useEffect, useState } from "react";
import { Avatar } from "antd";
import GradientBb from "../../components/reusable/svg/GradientBb";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCart } from "react-use-cart";
import { NumericFormat } from "react-number-format";
import Image from "next/image";
import { Button } from "@mui/material";

function Cart() {
  const router = useRouter();
  const { items, removeItem, cartTotal, emptyCart } = useCart();
  const query = router.query;
  const [user, setUser] = useState(undefined as any);
  const [cartItems, setCartItems] = useState(undefined as any);
  const [inTotal, setInTotal] = useState(undefined as any);

  useEffect(() => {
    setCartItems(items);
    setInTotal(cartTotal);
  }, [items, cartTotal]);

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
                  Shopping Cart
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      {/* Breadcamp section end */}
      <div className="container m-auto">
        <div className="max-w-6xl m-auto bg-white dark:bg-gray-700 dark:border-gray-600 my-10 p-0 md:p-10 shadow border rounded-lg">
          <div className="bg-white dark:bg-gray-700 shadow p-3 md:p-5 rounded-md text-sm mb-5">
            <div className="flex items-center border-b pb-3 pt-1 dark:border-b-gray-500">
              <span className="bg-indigo-50 text-indigo-600 w-8 h-8 rounded-full text-center justify-center text-sm font-bold items-center flex">
                CC
              </span>
              <h2 className="ml-3 font-semibold text-lg dark:text-white">
                Shopping Cart
              </h2>
            </div>
            <div className="bg-gray-50 dark:bg-gray-600 rounded flex justify-between items-center mt-3 mb-1">
              <div className="w-[40%] md:w-full">
                <h3 className="w-full border-r-4 p-3 border-r-white font-semibold dark:border-r-gray-500 dark:text-white">
                  Product Name
                </h3>
              </div>
              <div className="w-[30%]">
                <h3 className="w-full border-r-4 p-3 border-r-white font-semibold dark:border-r-gray-500 dark:text-white">
                  Price
                </h3>
              </div>
              <div className="w-[30%]">
                <h3 className="w-full p-3 font-semibold text-end dark:text-white">
                  Total
                </h3>
              </div>
            </div>
            <div>
              {cartItems?.map((product: any, index: number) => (
                <div
                  key={index}
                  className="border-b w-full my-1 dark:border-b-gray-500"
                >
                  <div className="flex justify-between items-center">
                    <div className="w-[40%] md:w-full flex items-center">
                      <div className="relative w-14 h-14">
                        <Image src={product.src} alt={product.name} fill />
                      </div>
                      <h3 className="border-r-4 p-3 w-full border-r-white dark:border-r-gray-500">
                        <Link
                          target={"_blank"}
                          className="hover:text-red-500 hover:underline dark:text-gray-300"
                          href={{
                            pathname: `/${product.name
                              .replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, "-")
                              .toLowerCase()}`,
                            query: { id: product.id },
                          }}
                        >
                          {product.name}
                        </Link>
                      </h3>
                    </div>
                    <div className="w-[30%]">
                      <h3 className="w-full border-r-4 p-3 border-r-white dark:border-r-gray-500 dark:text-gray-300">
                        <NumericFormat
                          displayType="text"
                          className="px-1"
                          value={product.discountPrice}
                          thousandSeparator=","
                        />
                        ৳ x {product.quantity}
                      </h3>
                    </div>
                    <div className="w-[30%]">
                      <h3 className="w-full p-3 text-end dark:text-gray-300">
                        <NumericFormat
                          displayType="text"
                          className="px-1"
                          value={product.itemTotal}
                          thousandSeparator=","
                        />
                        ৳ &nbsp; &nbsp;
                        <i
                          onClick={() => removeItem(product.id)}
                          className="fa-solid fa-close text-orange-500 hover:text-orange-700 hover:cursor-pointer hover:scale-110 dark:text-white"
                        ></i>
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div className="rounded flex justify-between items-center -mt-1">
                <div className="w-full"></div>
                <div className="w-[70%] md:w-[30%] lg:w-[40%] xl:w-[30%] bg-gray-100 border-b dark:bg-gray-600 dark:border-b-gray-500">
                  <h3 className="w-full border-r-4 p-3 border-r-white text-end dark:border-r-gray-500 dark:text-gray-300">
                    Sub Total:
                  </h3>
                </div>
                <div className="w-[60%] md:w-[30%] bg-gray-100 border-b dark:bg-gray-600 dark:border-b-gray-500">
                  <h3 className="w-full p-3 text-indigo-600 text-end dark:text-white">
                    <NumericFormat
                      displayType="text"
                      className="px-1"
                      value={inTotal}
                      thousandSeparator=","
                    />
                    ৳
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <Button
              onClick={() => router.push("/checkout")}
              className="shadow bg-indigo-600 hover:bg-indigo-700 capitalize text-base py-2 shadow-indigo-200 dark:shadow-gray-600 dark:text-gray-50"
              variant="contained"
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
