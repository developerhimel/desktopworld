import React, { useEffect, useState } from "react";
import GradientBb from "../../reusable/svg/GradientBb";
import CheckIcon from "@mui/icons-material/Check";
import { Avatar, Skeleton } from "antd";
import Link from "next/link";
import Image from "next/image";
import {
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useRouter } from "next/router";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MuiSkeleton from "../Products/MuiSkeleton";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import DnsIcon from "@mui/icons-material/Dns";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { UserOutlined } from "@ant-design/icons";
import moment from "moment";

function Customers() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState(undefined as any);
  const [filteredUsers, setFilteredUsers] = useState(undefined as any);
  const [searchby, setSearchby] = useState("Name");
  const [searchText, setSearchText] = useState(undefined as any);

  const activeCustomers = users?.filter((item: any) => item.verified === true);
  const bannedUsers = users?.filter((item: any) => item.verified === false);

  const handleChange = (event: SelectChangeEvent) => {
    setSearchby(event.target.value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (searchby === "Id") {
        const result = users?.filter((item: any) => item._id === searchText);
        setFilteredUsers(result);
        setLoading(false);
      } else {
        const result = users?.filter(
          (item: any) =>
            item.fullName.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
        );
        setFilteredUsers(result);
        setLoading(false);
      }
    }, 1000);
  };
  useEffect(() => {
    setLoading(true);
    fetch("/api/admin/getUsers")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
        setLoading(false);
      });
  }, []);
  return (
    <div className="my-5">
      <h1 className="text-xl">Customers Overview</h1>
      <div className="grid grid-cols-3 gap-5 pt-3">
        <div className="bg-white dark:bg-gray-700 dark:border-gray-600 font-semibold flex flex-row justify-start items-center p-3 gap-2 rounded-md border relative">
          <div className="bg-orange-200 text-white p-2 rounded-full">
            <ShoppingBagIcon className="text-orange-500" />
          </div>
          <div className="ml-2">
            <h2 className="font-normal text-sm">Total Customers</h2>
            {loading ? (
              <Skeleton.Input className="h-5 my-1" active={loading} />
            ) : (
              <h2 className="text-xl">{users?.length}</h2>
            )}
          </div>
          <GradientBb />
        </div>
        <div className="bg-white dark:bg-gray-700 dark:border-gray-600 font-semibold flex flex-row justify-start items-center p-3 gap-2 rounded-md border relative">
          <div className="bg-green-200 text-white p-2 rounded-full">
            <CheckIcon className="text-green-500" />
          </div>
          <div className="ml-2">
            <h2 className="font-normal text-sm">Active Customers</h2>
            {loading ? (
              <Skeleton.Input className="h-5 my-1" active={loading} />
            ) : (
              <h2 className="text-xl">{activeCustomers?.length}</h2>
            )}
          </div>
          <GradientBb />
        </div>
        <div className="bg-white dark:bg-gray-700 dark:border-gray-600 font-semibold flex flex-row justify-start items-center p-3 gap-2 rounded-md border relative">
          <div className="bg-indigo-200 text-white p-2 rounded-full">
            <DnsIcon className="text-indigo-500" />
          </div>
          <div className="ml-2">
            <h2 className="font-normal text-sm">Banned Customers</h2>
            {loading ? (
              <Skeleton.Input className="h-5 my-1" active={loading} />
            ) : (
              <h2 className="text-xl">{bannedUsers?.length}</h2>
            )}
          </div>
          <GradientBb />
        </div>
        {/* <div className="bg-white dark:bg-gray-700 dark:border-gray-600 font-semibold flex flex-row justify-start items-center p-3 gap-2 rounded-md border relative">
          <div className="bg-rose-200 text-white p-2 rounded-full">
            <CloseIcon className="text-rose-500" />
          </div>
          <div className="ml-2">
            <h2 className="font-normal text-sm">Out of Stock Products</h2>
            {loading ? (
              <Skeleton.Input className="h-5 my-1" active={loading} />
            ) : (
              <h2 className="text-xl">{outofstock?.length}</h2>
            )}
          </div>
          <GradientBb />
        </div> */}
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
                setFilteredUsers(users);
                setLoading(false);
              }, 1000);
            }
            setSearchText(e.target.value);
          }}
          type="search"
          name="search"
          id="search"
          placeholder={
            searchby === "Id" ? "Search by user id." : "Search by name."
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
            <MenuItem value={"Name"}>Name</MenuItem>
            <MenuItem value={"Id"}>Id</MenuItem>
          </Select>
        </FormControl>
        <GradientBb />
      </form>
      <div className="w-full mt-10 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-3 sm:px-0 gap-5">
          {loading ? (
            <>
              <MuiSkeleton />
              <MuiSkeleton />
              <MuiSkeleton />
              <MuiSkeleton />
              <MuiSkeleton />
              <MuiSkeleton />
              <MuiSkeleton />
              <MuiSkeleton />
              <MuiSkeleton />
              <MuiSkeleton />
            </>
          ) : (
            <>
              {filteredUsers?.slice(0, 30).map((item: any, index: number) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-700 group/main py-4 rounded-lg flex flex-col justify-between shadow-sm hover:shadow-md dark:hover:shadow-sky-300 hover:shadow-sky-200 relative"
                >
                  <div className="w-full">
                    <div className="flex flex-col justify-center items-center">
                      <Avatar
                        className="flex justify-center items-center"
                        size={64}
                        icon={<UserOutlined />}
                      />
                      <h2 className="my-1">{item.fullName}</h2>
                      <h2 className="text-sm w-full break-all px-2 text-center">
                        {item.email}
                      </h2>
                      <h2 className="text-sm w-full break-all px-2 text-center my-1">
                        Id: {item._id}
                      </h2>
                      <h2 className="text-sm w-full break-all px-2 text-center my-1">
                        Registered:{" "}
                        {moment(item.createdAt).format("DD MMM YYYY")}
                      </h2>
                    </div>
                    <div className="w-full mt-3 px-2">
                      <ButtonGroup
                        className="w-full"
                        variant="outlined"
                        aria-label="outlined button group"
                      >
                        {item.verified ? (
                          <Button
                            onClick={async () => {
                              const res = await fetch("/api/admin/updateUser", {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                  id: item._id,
                                  action: "ban",
                                }),
                              });
                              const data = await res.json();
                              console.log(data);
                              if (data.message === "success") {
                                router.reload();
                              }
                            }}
                            className="text-xs w-full border-none text-orange-500 py-2 bg-gray-50 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-800 dark:text-white"
                          >
                            Ban
                          </Button>
                        ) : (
                          <Button
                            onClick={async () => {
                              const res = await fetch("/api/admin/updateUser", {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                  id: item._id,
                                  action: "unban",
                                }),
                              });
                              const data = await res.json();
                              console.log(data);
                              if (data.message === "success") {
                                router.reload();
                              }
                            }}
                            className="text-xs w-full border-none text-orange-500 py-2 bg-gray-50 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-800 dark:text-white"
                          >
                            Unban
                          </Button>
                        )}
                        <Button
                          onClick={async () => {
                            const res = await fetch("/api/admin/updateUser", {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                id: item._id,
                                action: "delete",
                              }),
                            });
                            const data = await res.json();
                            console.log(data);
                            if (data.message === "success") {
                              router.reload();
                            }
                          }}
                          className="text-xs w-full border-none text-orange-500 py-2 bg-gray-50 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-800 dark:text-white"
                        >
                          Delete
                        </Button>
                      </ButtonGroup>
                    </div>
                  </div>
                  <GradientBb />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Customers;
