import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Image, Modal, Skeleton } from "antd";
import { NumericFormat } from "react-number-format";
import { RadioGroup } from "@headlessui/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { DotChartOutlined } from "@ant-design/icons";
import { useCart } from "react-use-cart";
import RProducts from "./RProducts";

function Product() {
  const router = useRouter();
  const { addItem } = useCart();
  const query = router.query;
  const [modal, contextHolder] = Modal.useModal();
  const [paymentType, setPaymentType] = useState("normal");
  const [buyQuantity, setBuyQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pmimg, setPmimg] = useState(true);
  const [product, setProduct] = useState(undefined as any);
  const [rProducts, setRProducts] = useState(undefined as any);
  const [rvp, setRvp] = useState(undefined as any);

  const emifloat = (Number(product?.price) + 5000) / 12;
  const imagesLength = product?.images.length;

  const handleBuy = () => {
    addItem({
      ...product,
      quantity: 1,
      id: product._id,
      price: product.discountPrice,
    });
    modal.success({
      centered: true,
      closable: true,
      okText: "Done",
      title: "Added on cart",
      content: `${product?.name}`,
      bodyStyle: { padding: "20px 24px" },
    });
  };

  useEffect(() => {
    setLoading(true);
    fetch("/api/product", {
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
        if (data) {
          const rvp = localStorage.getItem("rvp");
          const rvpJson = JSON.parse(rvp as string);
          const checkrvpExist = rvpJson?.filter(
            (item: any) => item._id === data._id
          );
          const rvpAdd = rvpJson?.filter((item: any) => item._id !== data._id);

          if (rvpAdd) {
            localStorage.setItem("rvp", JSON.stringify([data, ...rvpAdd]));
          } else {
            localStorage.setItem("rvp", JSON.stringify([data]));
          }
          setRvp(rvpAdd);
        }
        setProduct(data);
        setLoading(false);
      });
  }, [query.id]);

  useEffect(() => {
    fetch("/api/filter/rproducts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cg: product?.category,
        scg: product?.subCategory,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setRProducts(data.filteredProducts);
      });
  }, [product]);

  return (
    <>
      {contextHolder}
      <Head>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Head>
        <title>{product?.name}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content={`Buy ${product?.description} at competitive price in Bangladesh. Order online or visit Classic Computer store.`}
        />
        <meta name="keywords" content={`${product?.name}`} />
      </Head>
      <div className="w-full bg-white min-h-screen dark:bg-gray-700">
        <div className="">
          <div className="container m-auto py-3 px-5">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link
                    href="#"
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
                {product?.category && (
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
                        href={{
                          pathname: `/category/${product?.category
                            ?.replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, "-")
                            .toLowerCase()}`,
                          query: { cg: product?.category },
                        }}
                        className="ml-1 text-xs font-medium text-gray-700 hover:text-red-500 hover:underline md:ml-2 dark:text-gray-400 dark:hover:text-white line-clamp-1 text-ellipsis"
                      >
                        {product?.category}
                      </Link>
                    </div>
                  </li>
                )}
                {product?.subCategory && (
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
                        href={{
                          pathname: `/sub-category/${product?.subCategory
                            .replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, "-")
                            .toLowerCase()}`,
                          query: {
                            cg: product?.category,
                            scg: product?.subCategory,
                          },
                        }}
                        className="ml-1 text-xs font-medium text-gray-700 hover:text-red-500 hover:underline md:ml-2 dark:text-gray-400 dark:hover:text-white line-clamp-1 text-ellipsis"
                      >
                        {product?.subCategory}
                      </Link>
                    </div>
                  </li>
                )}
                <li className="max-w-full" aria-current="page">
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
                    <span className="ml-1 text-xs font-medium text-gray-500 md:ml-2 dark:text-gray-400 line-clamp-1 text-ellipsis">
                      {product?.name}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          {loading ? (
            <div className="container m-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-10">
                <div className="w-full h-[500px]">
                  <Skeleton.Image className="w-full h-full" active={loading} />
                </div>
                <div className="col-span-2 w-full h-[500px]">
                  <Skeleton className="w-full py-2" active={loading} />
                  <Skeleton className="w-full py-2" active={loading} />
                  <Skeleton.Input
                    className="w-full py-2"
                    active={loading}
                    size="large"
                  />
                  <div className="grid grid-cols-2 gap-5">
                    <Skeleton.Node className="w-full py-2" active={loading}>
                      <DotChartOutlined
                        style={{ fontSize: 40, color: "#bfbfbf" }}
                      />
                    </Skeleton.Node>
                    <Skeleton.Node className="w-full py-2" active={loading}>
                      <DotChartOutlined
                        style={{ fontSize: 40, color: "#bfbfbf" }}
                      />
                    </Skeleton.Node>
                  </div>
                </div>
              </div>
              <div className="my-20">
                <Skeleton className="w-full py-2" active={loading} />
              </div>
            </div>
          ) : (
            <>
              {product && (
                <div>
                  <div className="container m-auto px-5 sm:px-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-10 mb-20">
                      <div>
                        <div className="flex flex-col justify-center items-center h-[500px]">
                          {pmimg && (
                            <Skeleton.Image
                              className="w-full h-full"
                              active={pmimg}
                            />
                          )}
                          <Image
                            className="w-full object-contain"
                            placeholder
                            src={product.src}
                            alt={product.name}
                            onLoad={() => setPmimg(false)}
                          />
                        </div>
                        <div className="w-full justify-center items-center flex flex-row py-3">
                          <Image.PreviewGroup>
                            {product.images.map((item: any, index: number) => {
                              return (
                                <div
                                  key={index}
                                  className={`w-14 h-14 border border-gray-300 ${
                                    index === 0
                                      ? "rounded-l overflow-hidden"
                                      : index === imagesLength - 1
                                      ? "rounded-r overflow-hidden"
                                      : null
                                  } justify-center items-center flex`}
                                >
                                  <Image
                                    className="w-full h-auto"
                                    src={item.src}
                                    alt="Product Sub Image"
                                  />
                                </div>
                              );
                            })}
                          </Image.PreviewGroup>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <h1 className="text-xl font-semibold text-gray-600 dark:text-white">
                          {product.name}
                        </h1>
                        <div className="flex flex-row py-4 gap-2 flex-wrap">
                          <div className="flex flex-row justify-start items-center text-sm font-semibold bg-purple-50 px-3 py-2 rounded-full dark:bg-gray-600 dark:text-white">
                            <div>
                              <span>Price:</span>
                              <NumericFormat
                                displayType="text"
                                className="pl-1"
                                value={
                                  product.discountPrice
                                    ? product.discountPrice
                                    : product.price
                                }
                                thousandSeparator=","
                              />
                              <span>৳</span>
                            </div>
                            {product.discountPrice && (
                              <div className="ml-1 line-through text-gray-500 dark:text-gray-300">
                                <NumericFormat
                                  displayType="text"
                                  className="pl-1"
                                  value={product.price}
                                  thousandSeparator=","
                                />
                                <span>৳</span>
                              </div>
                            )}
                          </div>
                          <div className="flex flex-row justify-start items-center text-sm font-semibold bg-purple-50 px-3 py-2 rounded-full dark:bg-gray-600 dark:text-white">
                            <div>
                              <span>Regular Price:</span>
                              <NumericFormat
                                displayType="text"
                                className="pl-1 text-gray-500 dark:text-gray-300"
                                value={product.price}
                                thousandSeparator=","
                              />
                              <span className="text-gray-500 dark:text-gray-300">
                                ৳
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-row justify-start items-center text-sm font-semibold bg-purple-50 px-3 py-2 rounded-full dark:bg-gray-600 dark:text-white">
                            <div className="flex flex-row">
                              <div className="flex flex-row gap-1 justify-center items-center">
                                <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                                <span>Status:</span>
                              </div>
                              <span className="ml-1 text-gray-500 dark:text-gray-300">
                                {product.productStatus}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-row justify-start items-center text-sm font-semibold bg-purple-50 px-3 py-2 rounded-full dark:bg-gray-600 dark:text-white">
                            <div>
                              <span>Brand:</span>
                              <span className="text-gray-500 ml-1 dark:text-gray-300">
                                {product.brand}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row max-w-xs justify-start items-center text-sm font-semibold bg-purple-50 px-3 py-2 rounded-full dark:bg-gray-600 dark:text-white">
                          <div>
                            <span>Product ID:</span>
                            <span className="text-gray-500 ml-1 dark:text-gray-300">
                              {product._id}
                            </span>
                          </div>
                        </div>
                        <div className="">
                          <h2 className="font-semibold text-gray-600 text-lg py-2 dark:text-gray-300">
                            Key Features
                          </h2>
                          <div className="flex flex-col gap-1 text-[15px] text-gray-700 dark:text-gray-400">
                            {product.keyFeatures.map(
                              (item: any, index: number) => (
                                <div
                                  key={index}
                                  className="flex flex-row gap-1"
                                >
                                  <span>{item.value}</span>
                                </div>
                              )
                            )}
                            <div>
                              <Link
                                className="text-base text-red-500 border-b pb-1 border-red-500 hover:border-b-2 animate-pulse dark:text-red-400 dark:border-red-400"
                                href={"#specificationsId"}
                              >
                                Explore More...
                              </Link>
                            </div>
                          </div>
                        </div>
                        {/* Payment Options */}
                        <div className="pt-5 pb-8 border-b">
                          <h2 className="font-semibold text-gray-600 text-lg py-2 dark:text-gray-300">
                            Payment Options
                          </h2>
                          <div className="grid grid-cols-3">
                            <RadioGroup
                              className={
                                "grid grid-cols-1 sm:grid-cols-2 col-span-3 2xl:col-span-2 gap-2 mt-3"
                              }
                              value={paymentType}
                              onChange={setPaymentType}
                            >
                              <RadioGroup.Option value="normal">
                                {({ checked }) => (
                                  <div
                                    className={`border-2 ${
                                      checked
                                        ? "border-green-400 bg-white dark:bg-gray-600"
                                        : "border-gray-200 bg-gray-600"
                                    }  flex flex-row justify-start text-lg rounded cursor-pointer hover:shadow-md hover:border-green-400 dark:hover:bg-gray-500 hover:bg-green-50 shadow-green-700 font-semibold`}
                                  >
                                    <div
                                      className={`${
                                        checked ? "bg-green-200" : "bg-gray-200"
                                      } rounded-br-full w-8 h-8 items-center`}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className={`w-6 h-6 ${
                                          checked
                                            ? "text-green-500"
                                            : "text-gray-400"
                                        }`}
                                      >
                                        {checked ? (
                                          <path
                                            fillRule="evenodd"
                                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                            clipRule="evenodd"
                                          />
                                        ) : (
                                          <path
                                            fillRule="evenodd"
                                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                                            clipRule="evenodd"
                                          />
                                        )}
                                      </svg>
                                    </div>
                                    <div className="dark:text-white">
                                      <div className="flex flex-row justify-start items-center ml-2 pt-3 dark:text-white">
                                        <NumericFormat
                                          displayType="text"
                                          className=""
                                          value={
                                            product.discountPrice
                                              ? product.discountPrice
                                              : product.price
                                          }
                                          thousandSeparator=","
                                        />
                                        <span className="ml-1">৳</span>
                                        {product.discountPrice && (
                                          <div className="flex flex-row justify-start text-sm ml-3 line-through">
                                            <NumericFormat
                                              displayType="text"
                                              className=""
                                              value={product.price}
                                              thousandSeparator=","
                                            />
                                            <span className="ml-1">৳</span>
                                          </div>
                                        )}
                                      </div>
                                      <div className="text-xs font-normal ml-1 py-1 mb-3">
                                        <h2>Cash Discount Price</h2>
                                        <h2 className="text-xs mt-1">
                                          Online / Cash Payment
                                        </h2>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </RadioGroup.Option>
                              <RadioGroup.Option value="emi">
                                {({ checked }) => (
                                  <div
                                    className={`border-2 ${
                                      checked
                                        ? "border-indigo-400 bg-white dark:bg-gray-600"
                                        : "border-gray-200 dark:bg-gray-600"
                                    }  flex flex-row justify-start text-lg rounded cursor-pointer hover:shadow-md hover:border-indigo-400 dark:hover:bg-gray-500 hover:bg-indigo-50 shadow-indigo-700 font-semibold`}
                                  >
                                    <div
                                      className={`${
                                        checked
                                          ? "bg-indigo-200"
                                          : "bg-gray-200"
                                      } rounded-br-full w-8 h-8 items-center`}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className={`w-6 h-6 ${
                                          checked
                                            ? "text-indigo-500"
                                            : "text-gray-400"
                                        }`}
                                      >
                                        {checked ? (
                                          <path
                                            fillRule="evenodd"
                                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                            clipRule="evenodd"
                                          />
                                        ) : (
                                          <path
                                            fillRule="evenodd"
                                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                                            clipRule="evenodd"
                                          />
                                        )}
                                      </svg>
                                    </div>
                                    <div className="dark:text-white">
                                      <div className="flex flex-row justify-start items-center ml-2 pt-3">
                                        <NumericFormat
                                          displayType="text"
                                          className=""
                                          value={emifloat.toFixed()}
                                          thousandSeparator=","
                                        />
                                        <span className="ml-1">৳ / Month</span>
                                      </div>
                                      <div className="mb-4">
                                        <div className="text-xs flex flex-row gap-1 items-center font-normal ml-1 py-1">
                                          <h2>Regular Price: </h2>
                                          <NumericFormat
                                            displayType="text"
                                            className=""
                                            value={Number(product.price) + 5000}
                                            thousandSeparator=","
                                          />
                                          <span className="ml-1">৳</span>
                                        </div>
                                        <h2 className="text-xs ml-1 font-normal">
                                          0% EMI for 6 Months(12 Months on
                                          Store)
                                        </h2>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </RadioGroup.Option>
                            </RadioGroup>
                          </div>
                          <div className="w-full bg-gray-5 h-10 mt-4 flex flex-row justify-start items-center gap-6">
                            <div className="flex flex-row h-full items-center bg-green-100 rounded-md overflow-hidden">
                              <button
                                disabled={buyQuantity <= 0 ? true : false}
                                onClick={() => setBuyQuantity(buyQuantity - 1)}
                                className={`w-14 h-full ${
                                  buyQuantity <= 0
                                    ? "hover:bg-green-100"
                                    : "hover:bg-green-300"
                                } -mr-1`}
                              >
                                -
                              </button>
                              <button
                                disabled
                                className="w-16 border-l border-l-white rounded-l-md h-full border-r border-r-white rounded-r-md z-[1] bg-green-200"
                              >
                                {buyQuantity}
                              </button>
                              <button
                                onClick={() => setBuyQuantity(buyQuantity + 1)}
                                className="w-14 h-full hover:bg-green-300 -ml-1"
                              >
                                +
                              </button>
                            </div>
                            <div className="w-full h-full">
                              <button
                                type="button"
                                onClick={handleBuy}
                                disabled={
                                  paymentType === "normal" ? false : true
                                }
                                className={`${
                                  paymentType === "normal"
                                    ? "bg-green-500"
                                    : "bg-indigo-500"
                                } w-44 rounded h-full text-gray-50 hover:shadow-[inset_13rem_0_0_0] hover:shadow-[#18181842] duration-[400ms,700ms] transition-[color,box-shadow]`}
                              >
                                {paymentType === "normal"
                                  ? "Buy Now"
                                  : "Unavailable"}
                              </button>
                            </div>
                          </div>
                        </div>
                        {/* Shareable section */}
                        <div></div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-50 dark:bg-gray-800 py-3 px-5 sm:px-0">
                    <div className="container m-auto grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-5">
                      <div className="col-span-3">
                        <div id="specificationsId" className="w-full pt-8">
                          <div className="p-5 rounded bg-white dark:bg-gray-700">
                            <h1 className="text-gray-800 font-bold text-lg px-1 tracking-wider dark:text-white">
                              Specifications
                            </h1>
                            {product.specifications.map(
                              (item: any, index: number) => (
                                <div key={index}>
                                  <div className="bg-indigo-50 rounded dark:bg-indigo-900">
                                    <h1 className="mt-5 text-base font-semibold text-blue-500 dark:text-white py-2 ml-4">
                                      {item.title}
                                    </h1>
                                  </div>
                                  <table className="w-full">
                                    <tbody className="w-full text-sm">
                                      {item.items.map(
                                        (item: any, index: number) => (
                                          <tr
                                            key={index}
                                            className="border-b bg-white dark:bg-gray-700 dark:text-white dark:border-b-gray-500 dark:hover:bg-gray-600 hover:bg-gray-100 p-3 flex"
                                          >
                                            <td className="flex-1">
                                              {item.key}
                                            </td>
                                            <td className="flex-1">
                                              {item.value}
                                            </td>
                                          </tr>
                                        )
                                      )}
                                    </tbody>
                                  </table>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                        <div id="descriptionId" className="w-full pt-8">
                          <div className="p-5 rounded bg-white dark:bg-gray-700">
                            <h1 className="text-gray-800 font-bold text-lg tracking-wider dark:text-white">
                              Description
                            </h1>
                            <h2 className="text-gray-600 text-sm mt-3 text-justify dark:text-gray-200">
                              {product.description}
                            </h2>
                          </div>
                        </div>
                        <div id="questionsId" className="w-full pt-8">
                          <div className="p-5 rounded bg-white dark:bg-gray-700">
                            <div className="flex flex-wrap flex-row justify-between items-center border-b pb-5 pt-3 dark:border-b-gray-500">
                              <div>
                                <h1 className="text-gray-800 font-bold text-lg tracking-wider dark:text-white">
                                  Questions (0)
                                </h1>
                                <h1 className="text-gray-600 text-sm dark:text-gray-200">
                                  Have question about this product? Get specific
                                  details about this product from expert.
                                </h1>
                              </div>
                              <button
                                className={`bg-indigo-600 text-sm px-3 py-2 rounded h-full text-gray-50 hover:shadow-[inset_13rem_0_0_0] hover:shadow-[#18181842] duration-[400ms,700ms] transition-[color,box-shadow]`}
                              >
                                Ask Question
                              </button>
                            </div>
                            <div>
                              <div className="flex flex-col justify-center items-center">
                                <div className="bg-indigo-50 p-8 rounded-full mt-10 dark:bg-gray-500">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    className="w-12 h-12 text-indigo-600 dark:text-indigo-400"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                                <p className="text-sm py-5 dark:text-white">
                                  There are no questions asked yet. Be the first
                                  one to ask a question.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div id="reviewsId" className="w-full py-8">
                          <div className="p-5 rounded bg-white dark:bg-gray-700">
                            <div className="flex flex-wrap flex-row justify-between items-center border-b pb-5 pt-3 dark:border-b-gray-500">
                              <div>
                                <h1 className="text-gray-800 font-bold text-lg tracking-wider dark:text-white">
                                  Reviews (0)
                                </h1>
                                <h1 className="text-gray-600 text-sm dark:text-gray-200">
                                  Get specific details about this product from
                                  customers who own it.
                                </h1>
                              </div>
                              <button
                                className={`bg-indigo-600 text-sm px-3 py-2 rounded h-full text-gray-50 hover:shadow-[inset_13rem_0_0_0] hover:shadow-[#18181842] duration-[400ms,700ms] transition-[color,box-shadow]`}
                              >
                                Write a Review
                              </button>
                            </div>
                            <div>
                              <div className="flex flex-col justify-center items-center">
                                <div className="bg-indigo-50 p-8 rounded-full mt-10 dark:bg-gray-500">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    className="w-12 h-12 text-indigo-600 dark:text-indigo-400"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z"
                                      clipRule="evenodd"
                                    />
                                    <path
                                      fillRule="evenodd"
                                      d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                                <p className="text-sm py-5 dark:text-white">
                                  This product has no reviews yet. Be the first
                                  one to write a review.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full pt-0 md:pt-8">
                        <div className="bg-white rounded dark:bg-gray-700">
                          <h1 className="text-center font-bold text-indigo-500 py-3 text-lg rounded bg-indigo-100 dark:bg-gray-700 dark:text-white">
                            Related Products
                          </h1>
                          <div className="w-full dark:bg-gray-600">
                            {rProducts
                              ?.slice(0, 10)
                              .map((ritems: any, index: number) => (
                                <div className="w-full" key={index}>
                                  <RProducts ritems={ritems} />
                                </div>
                              ))}
                          </div>
                        </div>
                        <div className="bg-white rounded mt-5 dark:bg-gray-700">
                          <h1 className="text-center font-bold text-indigo-500 py-3 text-lg rounded bg-indigo-100 dark:bg-gray-700 dark:text-white">
                            Recently Viewed
                          </h1>
                          <div className="w-full dark:bg-gray-600">
                            {rvp?.slice(0, 5).map((rvp: any, index: number) => (
                              <div className="w-full" key={index}>
                                <RProducts ritems={rvp} />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Product;
