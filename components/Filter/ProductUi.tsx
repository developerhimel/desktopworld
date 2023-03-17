import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import Image from "next/image";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DifferenceIcon from "@mui/icons-material/Difference";
import Link from "next/link";
import { Button } from "@mui/material";
import { Modal, Pagination, Skeleton } from "antd";
import type { PaginationProps } from "antd";
import { useCart } from "react-use-cart";
import { useRouter } from "next/router";

function ProductUi(props: { data: any; limit: number; prevLoading: any }) {
  const router = useRouter();
  const [modal, contextHolder] = Modal.useModal();
  const { addItem } = useCart();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [slice, setSlice] = useState(0);
  const [data, setData] = useState(undefined as any);

  const onShowSizeChange: PaginationProps["onChange"] = (current, pageSize) => {
    setLoading(true);
    props.prevLoading(true);
    const slice = current === 1 ? 0 : current * 20 - 20;

    const newData = props.data.slice(slice, slice + 20);
    setCurrentPage(current);
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setData(newData);
      setLoading(false);
      props.prevLoading(false);
    }, 1000);
  };

  useEffect(() => {
    setLoading(true);
    setData(props.data?.slice(0, 20));
  }, [props.data]);

  return (
    <>
      {contextHolder}
      <div className="my-2 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 mx-2 lg:mx-0">
        {data?.map((item: any, index: number) => (
          <div
            key={index}
            className="bg-white shadow-md min-h-[580px] rounded-md group/main hover:shadow-pink-300 dark:bg-gray-700"
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
                      .replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, "-")
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
              {item.keyFeatures.slice(0, 4).map((item: any, index: number) => (
                <div
                  key={index}
                  className="text-xs flex justify-start items-start my-2 text-gray-700 dark:text-gray-200"
                >
                  <i className="fa-solid fa-circle text-[4px] mr-2 mt-[5px]"></i>
                  <p className="line-clamp-1 text-ellipsis">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="pt-2 flex flex-row flex-wrap justify-center items-center px-3">
              <div className="flex flex-row justify-start text-sky-600 font-semibold">
                <NumericFormat
                  displayType="text"
                  className=""
                  value={item.discountPrice ? item.discountPrice : item.price}
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
                  addItem({
                    ...item,
                    quantity: 1,
                    id: item._id,
                    price: item.discountPrice,
                  });
                  modal.success({
                    centered: true,
                    closable: true,
                    okText: "Done",
                    title: "Added on cart",
                    content: `${item?.name}`,
                    bodyStyle: { padding: "20px 24px" },
                  });
                }}
                startIcon={<ShoppingCartIcon />}
                className="bg-indigo-50 text-indigo-700 hover:text-white w-full shadow-none font-semibold capitalize hover:bg-indigo-700 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                variant="contained"
              >
                Buy Now
              </Button>
              <Button
                onClick={() => router.push("/compare")}
                startIcon={<DifferenceIcon />}
                className="bg-white mt-2 text-gray-700 w-full shadow-none capitalize hover:bg-gray-100 text-xs dark:bg-gray-500 dark:text-white dark:hover:bg-gray-400"
                variant="contained"
              >
                Add to Compare
              </Button>
            </div>
          </div>
        ))}
      </div>
      {props.data && (
        <div className="py-3">
          <Pagination
            total={props.data.length}
            defaultPageSize={20}
            defaultCurrent={1}
            current={currentPage}
            onChange={onShowSizeChange}
          />
        </div>
      )}
    </>
  );
}

export default ProductUi;
