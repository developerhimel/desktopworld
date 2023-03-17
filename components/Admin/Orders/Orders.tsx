import React, { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Skeleton } from "antd";
import GradientBb from "../../reusable/svg/GradientBb";
import CachedIcon from "@mui/icons-material/Cached";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckIcon from "@mui/icons-material/Check";
import {
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Image from "next/image";
import moment from "moment";
import { NumericFormat } from "react-number-format";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";

function Orders() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [orders, setOrders] = useState(undefined as any);
  const [filteredOrders, setFilteredOrders] = useState(undefined as any);
  const [searchby, setSearchby] = useState("Order Id");
  const [searchText, setSearchText] = useState(undefined as any);
  const [sliceorders, setSliceorders] = useState(10);

  const handleChange = (event: SelectChangeEvent) => {
    setSearchby(event.target.value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (searchby === "Order Id") {
      const result = orders?.filter((item: any) => item._id === searchText);
      setFilteredOrders(result);
      setLoading(false);
    } else {
      const result = orders?.filter(
        (item: any) =>
          item.userInfo.fullName
            .toLowerCase()
            .indexOf(searchText.toLowerCase()) !== -1
      );
      setFilteredOrders(result);
      setLoading(false);
    }
  };

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

  useEffect(() => {
    setLoading(true);
    fetch("/api/admin/getOrders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setFilteredOrders(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="pb-32">
      <h1 className="text-xl mt-5">Orders Overview</h1>
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
      {/*  */}

      <form
        onSubmit={(e) => handleSearch(e)}
        className="flex items-center w-full mt-5 p-5 bg-white dark:bg-gray-700 dark:border-gray-500 rounded-md border relative"
      >
        <input
          onChange={(e) => {
            if (e.target.value === "") {
              setLoading(true);
              setTimeout(() => {
                setFilteredOrders(orders);
                setLoading(false);
              }, 1000);
            }
            setSearchText(e.target.value);
          }}
          type="search"
          name="search"
          id="search"
          placeholder={
            searchby === "Order Id"
              ? "Search by order id."
              : "Search by customer name."
          }
          className="w-full px-3 py-2 rounded-md border border-gray-200 bg-gray-50 dark:bg-gray-600 dark:border-gray-600 dark:text-white"
        />
        <input type="submit" value="" hidden />
        <FormControl
          className="dark:text-white"
          sx={{ m: 1, minWidth: 160 }}
          size="small"
        >
          <InputLabel className="dark:text-white" id="demo-select-small">
            Search By
          </InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={searchby}
            label="Search By"
            onChange={handleChange}
            className="dark:text-white"
          >
            <MenuItem value={"Order Id"}>Order Id</MenuItem>
            <MenuItem value={"Customer Name"}>Customer Name</MenuItem>
          </Select>
        </FormControl>
        <GradientBb />
      </form>

      {/*  */}
      {loading ? (
        <div className="">
          <Skeleton active={loading} className="my-1" />
          <Skeleton active={loading} className="my-1" />
          <Skeleton active={loading} className="my-1" />
        </div>
      ) : (
        <div className="">
          {filteredOrders
            ?.slice(0, sliceorders)
            .map((item: any, index: number) => (
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
                      {moment(item.createdAt).format("DD/MM/YYYY   h:mm:ss A")}
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
                      <ButtonGroup
                        className="w-full"
                        variant="outlined"
                        aria-label="outlined button group"
                      >
                        <Button
                          onClick={async () => {
                            setBtnLoading(true);
                            const res = await fetch("/api/admin/updateOrder", {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                id: item._id,
                                action: "approve",
                              }),
                            });
                            const data = await res.json();
                            console.log(data);
                            if (data.message === "success") {
                              setBtnLoading(false);
                              router.reload();
                            }
                          }}
                          className="text-xs w-full border-none bg-indigo-500 text-white hover:bg-indigo-600 py-2.5 capitalize font-semibold dark:bg-gray-600 dark:hover:bg-gray-800 dark:text-white"
                        >
                          Approve
                        </Button>
                        <Button
                          onClick={async () => {
                            setBtnLoading(true);
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
                              setBtnLoading(false);
                              router.reload();
                            }
                          }}
                          className="text-xs w-full border-none bg-rose-500 text-white hover:bg-rose-600 py-2.5 capitalize font-semibold dark:bg-gray-600 dark:hover:bg-gray-800 dark:text-white"
                        >
                          Cancel
                        </Button>
                      </ButtonGroup>
                    ) : item.orderStatus === "processing" ? (
                      <ButtonGroup
                        className="w-full"
                        variant="outlined"
                        aria-label="outlined button group"
                      >
                        <Button
                          onClick={async () => {
                            setBtnLoading(true);
                            const res = await fetch("/api/admin/updateOrder", {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                id: item._id,
                                action: "complete",
                              }),
                            });
                            const data = await res.json();
                            console.log(data);
                            if (data.message === "success") {
                              setBtnLoading(false);
                              router.reload();
                            }
                          }}
                          className="text-xs w-full border-none bg-green-500 text-white hover:bg-green-600 py-2.5 capitalize font-semibold dark:bg-gray-600 dark:hover:bg-gray-800 dark:text-white"
                        >
                          Complete
                        </Button>
                        <Button
                          onClick={async () => {
                            setBtnLoading(true);
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
                              setBtnLoading(false);
                              router.reload();
                            }
                          }}
                          className="text-xs w-full border-none bg-gray-100 text-gray-700 hover:bg-gray-200 py-2.5 capitalize font-semibold dark:bg-gray-600 dark:hover:bg-gray-800 dark:text-white"
                        >
                          Cancel
                        </Button>
                      </ButtonGroup>
                    ) : item.orderStatus === "delivered" ? (
                      <Button
                        disabled
                        className="text-xs w-40 border-none bg-gray-50 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-800 dark:text-white py-2.5 font-semibold capitalize"
                      >
                        Completed
                      </Button>
                    ) : (
                      <Button
                        disabled
                        className="text-xs w-40 border-none bg-gray-50 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-800 dark:text-white py-2.5 font-semibold capitalize"
                      >
                        Cancelled
                      </Button>
                    )}
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
      {filteredOrders?.length > 10 && (
        <div className="w-full flex justify-center items-center">
          <Button
            onClick={() => {
              setSliceorders(sliceorders + 10);
            }}
            className="text-xs w-40 underline border-none bg-gray-50 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-800 dark:text-white py-2.5 font-semibold capitalize"
          >
            Load more
          </Button>
        </div>
      )}
    </div>
  );
}

export default Orders;
