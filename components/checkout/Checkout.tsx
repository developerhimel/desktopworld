import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "react-use-cart";
import { NumericFormat } from "react-number-format";
import { useRouter } from "next/router";

function Checkout() {
  const router = useRouter();
  const { items, removeItem, cartTotal, emptyCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [deliveryMethod, setDeliveryMethod] = useState("Home Delivery");
  const [deliveryCharge, setDeliveryCharge] = useState(65);
  const [user, setUser] = useState(undefined as any);
  const [cartItems, setCartItems] = useState(undefined as any);
  const [inTotal, setInTotal] = useState(undefined as any);
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState(undefined as any);
  const [lastName, setLastName] = useState(undefined as any);
  const [address, setAddress] = useState(undefined as any);
  const [phoneNumber, setPhoneNumber] = useState(undefined as any);
  const [emailAddress, setEmailAddress] = useState(undefined as any);
  const [city, setCity] = useState(undefined as any);
  const [state, setState] = useState(undefined as any);
  const [cusComment, setCusComment] = useState(undefined as any);

  const handleChangePayment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.target.value);
  };
  const handleChangeDelivery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeliveryMethod(event.target.value);
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
  }, []);

  useEffect(() => {
    setCartItems(items);
    setInTotal(cartTotal);
  }, [items, cartTotal]);

  const handleSubmitOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (paymentMethod === "Online Payment") {
      setTimeout(() => {
        setLoading(false);
        alert(
          "Online payment will be activated by sslcommerz within 48 hours."
        );
        setPaymentMethod("Cash on Delivery");
      }, 2000);
      return;
    }
    const order = {
      cusInfo: {
        firstName: firstName,
        lastName: lastName,
        address: address,
        phoneNumber: phoneNumber,
        emailAddress: emailAddress,
        city: city,
        state: state,
        cusComment: cusComment,
      },
      userInfo: user,
      userId: user._id,
      paymentMethod: paymentMethod,
      deliveryMethod: deliveryMethod,
      products: cartItems,
      subTotal: inTotal,
      orderStatus: "pending",
      total:
        deliveryMethod === "Home Delivery" ? inTotal + deliveryCharge : inTotal,
    };

    const res = await fetch("/api/order/newOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: order,
      }),
    });
    const data = await res.json();

    if (data.message === "new order inserted.") {
      setLoading(false);
      emptyCart();
      router.push({ pathname: "/checkout/success", query: { id: data.id } });
    } else {
      console.log(data);
    }
  };

  return (
    <div>
      {/* Breadcamp section start */}
      <div className="bg-white dark:bg-gray-700 py-3 shadow">
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
            <li>
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
                <Link
                  href={"/checkout/cart"}
                  className="ml-1 text-xs font-medium text-gray-700 hover:text-red-500 hover:underline md:ml-2 dark:text-gray-400 dark:hover:text-white"
                >
                  Shopping Cart
                </Link>
              </div>
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
                  Checkout
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      {/* Breadcamp section end */}
      <div className="container m-auto">
        <h1 className="text-xl my-5 mx-3 md:mx-0 dark:text-white">Checkout</h1>
        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-5 mb-5">
            <div className="bg-white dark:bg-gray-700 shadow p-5 rounded-md text-sm mb-5 mx-3 lg:mx-0">
              <div className="flex items-center border-b pb-3 pt-1 dark:border-b-gray-500">
                <span className="bg-indigo-50 text-indigo-600 w-8 h-8 rounded-full text-center justify-center text-sm font-bold items-center flex">
                  1
                </span>
                <h2 className="ml-3 font-semibold text-lg dark:text-white">
                  Customer Information
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-5 my-1">
                <div className="flex flex-col dark:text-white">
                  <label htmlFor="FirstName" className="py-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="FirstName"
                    id="FirstName"
                    placeholder="First Name*"
                    className="p-2 border outline-none border-gray-300 rounded text-sm dark:bg-gray-600 dark:border-gray-600"
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col dark:text-white">
                  <label htmlFor="LastName" className="py-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="LastName"
                    id="LastName"
                    placeholder="Last Name*"
                    className="p-2 border outline-none border-gray-300 rounded text-sm dark:bg-gray-600 dark:border-gray-600"
                    required
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col my-2 dark:text-white">
                <label htmlFor="Address" className="py-2">
                  Address
                </label>
                <input
                  type="text"
                  name="Address"
                  id="Address"
                  placeholder="Address*"
                  className="p-2 border outline-none border-gray-300 rounded text-sm dark:bg-gray-600 dark:border-gray-600"
                  required
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="flex flex-col my-2 dark:text-white">
                <label htmlFor="PhoneNumber" className="py-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="PhoneNumber"
                  id="PhoneNumber"
                  placeholder="Telephone*"
                  className="p-2 border outline-none border-gray-300 rounded text-sm dark:bg-gray-600 dark:border-gray-600"
                  required
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="flex flex-col my-2 dark:text-white">
                <label htmlFor="email" className="py-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email*"
                  className="p-2 border outline-none border-gray-300 rounded text-sm dark:bg-gray-600 dark:border-gray-600"
                  required
                  onChange={(e) => setEmailAddress(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-5 my-1">
                <div className="flex flex-col dark:text-white">
                  <label htmlFor="city" className="py-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="City*"
                    className="p-2 border outline-none border-gray-300 rounded text-sm dark:bg-gray-600 dark:border-gray-600"
                    required
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="flex flex-col dark:text-white">
                  <label htmlFor="State" className="py-2">
                    State
                  </label>
                  <input
                    type="text"
                    name="State"
                    id="State"
                    placeholder="State*"
                    className="p-2 border outline-none border-gray-300 rounded text-sm dark:bg-gray-600 dark:border-gray-600"
                    required
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col my-2 dark:text-white">
                <label htmlFor="cusComment" className="py-2">
                  Customer Comment - (Optional)
                </label>
                <textarea
                  name="cusComment"
                  id="cusComment"
                  cols={30}
                  rows={5}
                  placeholder="Comment"
                  className="p-2 border outline-none border-gray-300 rounded text-sm dark:bg-gray-600 dark:border-gray-600"
                  onChange={(e) => setCusComment(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="col-span-2 mx-3 lg:mx-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-5">
                <div className="bg-white dark:bg-gray-700 shadow p-5 rounded-md mb-5">
                  <div className="flex items-center border-b pb-3 pt-1 dark:border-b-gray-500">
                    <span className="bg-indigo-50 text-indigo-600 w-8 h-8 rounded-full text-center justify-center text-sm font-bold items-center flex">
                      2
                    </span>
                    <h2 className="ml-3 font-semibold text-lg dark:text-white">
                      Payment Method
                    </h2>
                  </div>
                  <div className="my-2">
                    <h3 className="text-sm dark:text-white">
                      Select a payment method
                    </h3>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={paymentMethod}
                      onChange={handleChangePayment}
                      className="mt-3 dark:text-white"
                    >
                      <FormControlLabel
                        value="Cash on Delivery"
                        className="hover:bg-indigo-50 rounded dark:hover:bg-gray-500"
                        control={
                          <Radio
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: 14,
                              },
                            }}
                          />
                        }
                        label="Cash on Delivery"
                      />
                      <FormControlLabel
                        value="Online Payment"
                        className="hover:bg-indigo-50 rounded dark:hover:bg-gray-500"
                        control={
                          <Radio
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: 14,
                              },
                            }}
                          />
                        }
                        label="Online Payment"
                      />
                    </RadioGroup>
                    <div className="w-full">
                      <h2 className="text-sm font-semibold mt-5 dark:text-white">
                        Accepted methods:
                      </h2>
                      <div className="relative w-8/12 h-8 my-1">
                        <Image
                          src={"/assets/images/methods/payment-methods.png"}
                          fill
                          alt="Payment Methods"
                          className="object-contain w-full h-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-700 p-5 rounded-md mb-5">
                  <div className="flex items-center border-b pb-3 pt-1 dark:border-b-gray-500">
                    <span className="bg-indigo-50 text-indigo-600 w-8 h-8 rounded-full text-center justify-center text-sm font-bold items-center flex">
                      3
                    </span>
                    <h2 className="ml-3 font-semibold text-lg dark:text-white">
                      Delivery Method
                    </h2>
                  </div>
                  <div className="my-2">
                    <h3 className="text-sm dark:text-white">
                      Select a delivery method
                    </h3>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={deliveryMethod}
                      onChange={handleChangeDelivery}
                      className="mt-3 dark:text-white"
                    >
                      <FormControlLabel
                        value="Home Delivery"
                        className="hover:bg-indigo-50 rounded dark:hover:bg-gray-500"
                        control={
                          <Radio
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: 14,
                              },
                            }}
                          />
                        }
                        label={`Home Delivery - ${deliveryCharge}৳`}
                      />
                      <FormControlLabel
                        value="Store Pickup"
                        className="hover:bg-indigo-50 rounded dark:hover:bg-gray-500"
                        control={
                          <Radio
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: 14,
                              },
                            }}
                          />
                        }
                        label="Store Pickup - 0৳"
                      />
                    </RadioGroup>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-700 shadow p-5 rounded-md text-sm mb-5">
                <div className="flex items-center border-b pb-3 pt-1 dark:border-b-gray-500">
                  <span className="bg-indigo-50 text-indigo-600 w-8 h-8 rounded-full text-center justify-center text-sm font-bold items-center flex">
                    4
                  </span>
                  <h2 className="ml-3 font-semibold text-lg dark:text-white">
                    Order Overview
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
                        <div className="w-[40%] md:w-full">
                          <h3 className="border-r-4 p-3 border-r-white dark:border-r-gray-500">
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
                  <div className="rounded flex justify-between items-center">
                    <div className="w-full"></div>
                    <div className="w-[110%] sm:w-[70%] md:w-[30%] lg:w-[40%] xl:w-[30%] bg-gray-100 border-b dark:bg-gray-600 dark:border-b-gray-500">
                      <h3 className="w-full border-r-4 p-3 border-r-white text-end dark:text-gray-300 dark:border-r-gray-500">
                        {deliveryMethod === "Home Delivery"
                          ? "Home Delivery:"
                          : "Store Pickup"}
                      </h3>
                    </div>
                    <div className="w-[60%] md:w-[30%] bg-gray-100 border-b dark:bg-gray-600 dark:border-b-gray-500">
                      <h3 className="w-full p-3 text-indigo-600 text-end dark:text-white">
                        {deliveryMethod === "Home Delivery"
                          ? deliveryCharge
                          : "0"}
                        ৳
                      </h3>
                    </div>
                  </div>
                  <div className="rounded flex justify-between items-center">
                    <div className="w-full"></div>
                    <div className="w-[70%] md:w-[30%] lg:w-[40%] xl:w-[30%] bg-gray-100 rounded-bl-md dark:bg-gray-600">
                      <h3 className="w-full border-r-4 p-3 border-r-white font-semibold text-end dark:text-white dark:border-r-gray-500">
                        Total:
                      </h3>
                    </div>
                    <div className="w-[60%] md:w-[30%] bg-gray-100 rounded-br-md dark:bg-gray-600">
                      <h3 className="w-full p-3 font-semibold text-orange-600 text-end dark:text-indigo-300">
                        <NumericFormat
                          displayType="text"
                          className="px-1"
                          value={
                            deliveryMethod === "Home Delivery"
                              ? inTotal + deliveryCharge
                              : inTotal
                          }
                          thousandSeparator=","
                        />
                        ৳
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-10 flex justify-between items-center flex-col-reverse gap-3 lg:gap-0 lg:flex-row">
            <div className="flex items-center dark:text-white">
              <Checkbox defaultChecked />
              <h2>
                I have read and agree to the{" "}
                <Link
                  className="text-red-500 hover:underline text-sm"
                  href={"/"}
                >
                  Terms and Conditions
                </Link>
                ,{" "}
                <Link
                  className="text-red-500 hover:underline text-sm"
                  href={"/"}
                >
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link
                  className="text-red-500 hover:underline text-sm"
                  href={"/"}
                >
                  Refund and Return Policy
                </Link>
              </h2>
            </div>
            {user ? (
              <Button
                type="submit"
                className="shadow bg-indigo-600 hover:bg-indigo-700 capitalize text-base py-2 shadow-indigo-200 dark:shadow-gray-600 dark:text-gray-50"
                variant="contained"
              >
                {loading && (
                  <div
                    className="spinner-border animate-spin inline-block w-3 h-3 border-2 rounded-full mr-2"
                    role="status"
                  />
                )}
                {loading ? "Processing" : "Confirm Order"}
              </Button>
            ) : (
              <Button
                onClick={() =>
                  router.push({
                    pathname: "/login",
                    query: { rf: "checkout" },
                  })
                }
                className="shadow bg-indigo-600 hover:bg-indigo-700 capitalize text-base py-2 shadow-indigo-200 dark:shadow-gray-600 dark:text-gray-50"
                variant="contained"
              >
                Login To Procced
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
