import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Image, Modal, Skeleton } from "antd";
import { NumericFormat } from "react-number-format";
import { RadioGroup } from "@headlessui/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { DotChartOutlined } from "@ant-design/icons";
import { useCart } from "react-use-cart";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

function Details() {
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
      <div className="w-full bg-white min-h-screen dark:bg-gray-700 my-5 py-5">
        <div className="">
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
            </div>
          ) : (
            <>
              {product && (
                <div>
                  <div className="container m-auto px-5 sm:px-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-10 mb-20">
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
                      <div className="">
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
                              <span>Product Code:</span>
                              <span className="text-gray-500 ml-1 dark:text-gray-300">
                                30687
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
                          </div>
                        </div>
                        <div className="mt-3">
                          <h2 className="font-semibold text-gray-600 text-lg py-2 dark:text-gray-300">
                            Description
                          </h2>
                          <h1 className="text-sm font-semibold text-gray-600 dark:text-white">
                            {product.description}
                          </h1>
                        </div>

                        <Button
                          onClick={() =>
                            router.push({
                              pathname: "/admin/products/edit",
                              query: { id: product._id },
                            })
                          }
                          endIcon={<EditIcon />}
                          className="capitalize font-semibold my-5 border-none bg-gray-50 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-800 dark:text-white"
                        >
                          Edit
                        </Button>
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

export default Details;
