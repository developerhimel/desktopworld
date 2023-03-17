import React, { useEffect, useState } from "react";
import GradientBb from "../../reusable/svg/GradientBb";
import CheckIcon from "@mui/icons-material/Check";
import { Skeleton } from "antd";
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
import MuiSkeleton from "./MuiSkeleton";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import DnsIcon from "@mui/icons-material/Dns";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { NumericFormat } from "react-number-format";

function Products() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(undefined as any);
  const [filteredProducts, setFilteredProducts] = useState(undefined as any);
  const [searchby, setSearchby] = useState("Product Name");
  const [searchText, setSearchText] = useState(undefined as any);

  const instock = products?.filter(
    (item: any) => item.productStatus === "In Stock"
  );
  const outofstock = products?.filter(
    (item: any) => item.productStatus === "Out of Stock"
  );

  const handleChange = (event: SelectChangeEvent) => {
    setSearchby(event.target.value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (searchby === "Product Id") {
        const result = products?.filter((item: any) => item._id === searchText);
        setFilteredProducts(result);
        setLoading(false);
      } else {
        const result = products?.filter(
          (item: any) =>
            item.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
        );
        setFilteredProducts(result);
        setLoading(false);
      }
    }, 1000);
  };
  useEffect(() => {
    setLoading(true);
    fetch("/api/admin/getProducts")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      });
  }, []);
  return (
    <div className="my-5">
      <h1 className="text-xl">Products Overview</h1>
      <div className="grid grid-cols-4 gap-5 pt-3">
        <div className="bg-white dark:bg-gray-700 dark:border-gray-600 font-semibold flex flex-row justify-start items-center p-3 gap-2 rounded-md border relative">
          <div className="bg-orange-200 text-white p-2 rounded-full">
            <ShoppingBagIcon className="text-orange-500" />
          </div>
          <div className="ml-2">
            <h2 className="font-normal text-sm">Total Products</h2>
            {loading ? (
              <Skeleton.Input className="h-5 my-1" active={loading} />
            ) : (
              <h2 className="text-xl">{products?.length}</h2>
            )}
          </div>
          <GradientBb />
        </div>
        <div className="bg-white dark:bg-gray-700 dark:border-gray-600 font-semibold flex flex-row justify-start items-center p-3 gap-2 rounded-md border relative">
          <div className="bg-indigo-200 text-white p-2 rounded-full">
            <DnsIcon className="text-indigo-500" />
          </div>
          <div className="ml-2">
            <h2 className="font-normal text-sm">Featured Products</h2>
            {loading ? (
              <Skeleton.Input className="h-5 my-1" active={loading} />
            ) : (
              <h2 className="text-xl">79</h2>
            )}
          </div>
          <GradientBb />
        </div>
        <div className="bg-white dark:bg-gray-700 dark:border-gray-600 font-semibold flex flex-row justify-start items-center p-3 gap-2 rounded-md border relative">
          <div className="bg-green-200 text-white p-2 rounded-full">
            <CheckIcon className="text-green-500" />
          </div>
          <div className="ml-2">
            <h2 className="font-normal text-sm">In Stock Products</h2>
            {loading ? (
              <Skeleton.Input className="h-5 my-1" active={loading} />
            ) : (
              <h2 className="text-xl">{instock?.length}</h2>
            )}
          </div>
          <GradientBb />
        </div>
        <div className="bg-white dark:bg-gray-700 dark:border-gray-600 font-semibold flex flex-row justify-start items-center p-3 gap-2 rounded-md border relative">
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
                setFilteredProducts(products);
                setLoading(false);
              }, 1000);
            }
            setSearchText(e.target.value);
          }}
          type="search"
          name="search"
          id="search"
          placeholder={
            searchby === "Product Id"
              ? "Search by product id."
              : "Search by product name."
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
            <MenuItem value={"Product Id"}>Product Id</MenuItem>
            <MenuItem value={"Product Name"}>Product Name</MenuItem>
          </Select>
        </FormControl>
        <Button
          onClick={() => router.push("/admin/products/add")}
          startIcon={<AddIcon />}
          className="text-xs w-40 border-none bg-gray-50 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-800 dark:text-white py-2.5 font-semibold capitalize"
        >
          Add Product
        </Button>
        <GradientBb />
      </form>
      <div className="w-full mt-10 pb-32">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 px-3 sm:px-0 gap-5">
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
              {filteredProducts
                ?.slice(0, 30)
                .map((item: any, index: number) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-700 group/main py-4 rounded-lg flex flex-col justify-between shadow-sm hover:shadow-md dark:hover:shadow-sky-300 hover:shadow-sky-200 relative"
                  >
                    <div className="border-b-[5px] border-b-gray-50 dark:border-b-gray-800">
                      <div className="p-3 relative w-full h-[120px] overflow-hidden my-2">
                        {item.src && (
                          <Link
                            target={"_blank"}
                            href={{
                              pathname: `/${item.name
                                .replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, "-")
                                .toLowerCase()}`,
                              query: { id: item._id },
                            }}
                          >
                            <Image
                              loading="lazy"
                              src={item.src}
                              fill
                              alt={"product image"}
                              className="w-full group-hover/main:scale-105 ease-in-out duration-300 object-contain"
                            />
                          </Link>
                        )}
                      </div>
                    </div>
                    <div className="p-4 pt-4 w-full">
                      <div>
                        <Link
                          target={"_blank"}
                          href={{
                            pathname: `/${item.name
                              .replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, "-")
                              .toLowerCase()}`,
                            query: { id: item._id },
                          }}
                          className="text-sm text-ellipsis line-clamp-3 hover:underline hover:text-pink-600 dark:text-gray-100"
                        >
                          {item.name}
                        </Link>
                      </div>
                    </div>
                    <div className="pt-2 flex flex-row flex-wrap justify-center items-end">
                      <div className="flex flex-row justify-start text-sky-600 font-semibold">
                        <NumericFormat
                          displayType="text"
                          className=""
                          value={
                            item.discountPrice ? item.discountPrice : item.price
                          }
                          thousandSeparator=","
                        />
                        <span className="ml-1">৳</span>
                      </div>
                      {item.discountPrice && (
                        <div className="flex flex-row justify-start text-xs dark:text-gray-300 ml-3 line-through">
                          <NumericFormat
                            displayType="text"
                            className=""
                            value={item.price}
                            thousandSeparator=","
                          />
                          <span className="ml-1">৳</span>
                        </div>
                      )}
                    </div>
                    <div className="w-full">
                      <div className="w-full mt-3 px-2">
                        <ButtonGroup
                          className="w-full"
                          variant="outlined"
                          aria-label="outlined button group"
                        >
                          <Button
                            onClick={() =>
                              router.push({
                                pathname: "/admin/products/details",
                                query: { id: item._id },
                              })
                            }
                            className="text-xs w-full border-none bg-gray-50 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-800 dark:text-white"
                          >
                            <VisibilityIcon />
                          </Button>
                          <Button
                            onClick={() =>
                              router.push({
                                pathname: "/admin/products/edit",
                                query: { id: item._id },
                              })
                            }
                            className="text-xs w-full border-none bg-gray-50 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-800 dark:text-white"
                          >
                            <EditIcon />
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

export default Products;
