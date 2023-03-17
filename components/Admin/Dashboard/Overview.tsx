import React, { useEffect, useState } from "react";
import LayersIcon from "@mui/icons-material/Layers";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentsIcon from "@mui/icons-material/Payments";
import { NumericFormat } from "react-number-format";
import GradientBb from "../../reusable/svg/GradientBb";
import CachedIcon from "@mui/icons-material/Cached";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckIcon from "@mui/icons-material/Check";
import { Skeleton } from "antd";
import WeeklySales from "./Charts/WeeklySales";
import BestSellingProducts from "./Charts/BestSellingProducts";
import { useRouter } from "next/router";
import moment from "moment";

function Overview() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState(undefined as any);

  const pendingOrders = orders?.filter(
    (item: any) => item.orderStatus === "pending"
  );
  const processingOrders = orders?.filter(
    (item: any) => item.orderStatus === "processing"
  );
  const deliveredOrders = orders?.filter(
    (item: any) => item.orderStatus === "delivered"
  );

  const cancelledOrders = orders?.filter(
    (item: any) => item.orderStatus === "cancelled"
  );

  const withoutCancelled = orders?.filter(
    (item: any) => item.orderStatus !== "cancelled"
  );

  const totalAmount = withoutCancelled?.reduce(
    (total: any, currentValue: any) =>
      (total =
        total + (currentValue === undefined ? 0 : currentValue?.subTotal)),
    0
  );

  // 1 day earnings
  const minus1days = moment().add(-1, "days").utc().format();

  const withoutCancelled1days = withoutCancelled?.filter(
    (item: any) => item.createdAt >= minus1days
  );

  const totalAmount1days = withoutCancelled1days?.reduce(
    (total: any, currentValue: any) =>
      (total =
        total + (currentValue === undefined ? 0 : currentValue?.subTotal)),
    0
  );

  // 1 day earnings
  const minus30days = moment().add(-30, "days").utc().format();

  const withoutCancelled30days = withoutCancelled?.filter(
    (item: any) => item.createdAt >= minus30days
  );

  const totalAmount30days = withoutCancelled30days?.reduce(
    (total: any, currentValue: any) =>
      (total =
        total + (currentValue === undefined ? 0 : currentValue?.subTotal)),
    0
  );

  console.log(totalAmount30days);

  useEffect(() => {
    setLoading(true);
    fetch("/api/admin/getOrders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="my-5">
      <h1 className="text-xl">Dashboard Overview</h1>
      <div className="grid grid-cols-3 gap-5 my-5">
        <div className="bg-teal-700 font-semibold text-white flex flex-col justify-center items-center p-6 gap-2 rounded-md">
          <LayersIcon className="text-4xl" />
          <h2 className="font-normal">Todays Orders</h2>
          {loading ? (
            <Skeleton.Input className="h-5 my-1" active={loading} />
          ) : (
            <h2 className="text-2xl">
              <NumericFormat
                displayType="text"
                className="pr-1"
                value={totalAmount1days}
                thousandSeparator=","
              />
              <span>৳</span>
            </h2>
          )}
        </div>
        <div className="bg-green-700 font-semibold text-white flex flex-col justify-center items-center p-6 gap-2 rounded-md">
          <ShoppingCartIcon className="text-4xl" />
          <h2 className="font-normal">This Month</h2>
          {loading ? (
            <Skeleton.Input className="h-5 my-1" active={loading} />
          ) : (
            <h2 className="text-2xl">
              <NumericFormat
                displayType="text"
                className="pr-1"
                value={totalAmount30days}
                thousandSeparator=","
              />
              <span>৳</span>
            </h2>
          )}
        </div>
        <div className="bg-indigo-700 font-semibold text-white flex flex-col justify-center items-center p-6 gap-2 rounded-md">
          <PaymentsIcon className="text-4xl" />
          <h2 className="font-normal">Total Orders</h2>
          {loading ? (
            <Skeleton.Input className="h-5 my-1" active={loading} />
          ) : (
            <h2 className="text-2xl">
              <NumericFormat
                displayType="text"
                className="pr-1"
                value={totalAmount}
                thousandSeparator=","
              />
              <span>৳</span>
            </h2>
          )}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-5 pt-3">
        <div className="bg-white dark:bg-gray-700 dark:border-gray-600 font-semibold flex flex-row justify-start items-center p-3 gap-2 rounded-md border relative">
          <div className="bg-orange-200 text-white p-2 rounded-full">
            <ShoppingCartIcon className="text-orange-500" />
          </div>
          <div className="ml-2">
            <h2 className="font-normal text-sm">Total Orders</h2>
            {loading ? (
              <Skeleton.Input className="h-5 my-1" active={loading} />
            ) : (
              <h2 className="text-xl">{orders?.length}</h2>
            )}
          </div>
          <GradientBb />
        </div>
        <div className="bg-white dark:bg-gray-700 dark:border-gray-600 font-semibold flex flex-row justify-start items-center p-3 gap-2 rounded-md border relative">
          <div className="bg-indigo-200 text-white p-2 rounded-full">
            <CachedIcon className="text-indigo-500" />
          </div>
          <div className="ml-2">
            <h2 className="font-normal text-sm">Pending Orders</h2>
            {loading ? (
              <Skeleton.Input className="h-5 my-1" active={loading} />
            ) : (
              <h2 className="text-xl">{pendingOrders?.length}</h2>
            )}
          </div>
          <GradientBb />
        </div>
        <div className="bg-white dark:bg-gray-700 dark:border-gray-600 font-semibold flex flex-row justify-start items-center p-3 gap-2 rounded-md border relative">
          <div className="bg-teal-200 text-white p-2 rounded-full">
            <LocalShippingIcon className="text-teal-500" />
          </div>
          <div className="ml-2">
            <h2 className="font-normal text-sm">Processing Orders</h2>
            {loading ? (
              <Skeleton.Input className="h-5 my-1" active={loading} />
            ) : (
              <h2 className="text-xl">{processingOrders?.length}</h2>
            )}
          </div>
          <GradientBb />
        </div>
        <div className="bg-white dark:bg-gray-700 dark:border-gray-600 font-semibold flex flex-row justify-start items-center p-3 gap-2 rounded-md border relative">
          <div className="bg-green-200 text-white p-2 rounded-full">
            <CheckIcon className="text-green-500" />
          </div>
          <div className="ml-2">
            <h2 className="font-normal text-sm">Delivered Orders</h2>
            {loading ? (
              <Skeleton.Input className="h-5 my-1" active={loading} />
            ) : (
              <h2 className="text-xl">{deliveredOrders?.length}</h2>
            )}
          </div>
          <GradientBb />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 my-5">
        <div className="bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 p-5 rounded-md border">
          <h2 className="font-semibold border-b pb-2 mb-2 dark:border-gray-600">
            Weekly Sales
          </h2>
          <WeeklySales />
        </div>
        <div className="bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 p-5 rounded-md border">
          <h2 className="font-semibold border-b pb-2 mb-2 dark:border-gray-600">
            Best Selling Products
          </h2>
          <BestSellingProducts />
        </div>
      </div>
    </div>
  );
}

export default Overview;
