import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse, Select, Slider } from "antd";
import {
  Backdrop,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import ProductUi from "./ProductUi";
import _ from "lodash";

const { Panel } = Collapse;

function ScgComponent() {
  const router = useRouter();
  const query = router.query;
  const [loading, setLoading] = useState(false);
  const [range, setRange] = useState<[number, number]>();
  const [minPriceRange, setMinPriceRange] = useState(undefined as any);
  const [maxPriceRange, setMaxPriceRange] = useState(undefined as any);
  const [max, setMax] = useState<number>();
  const [data, setData] = useState(undefined as any);
  const [filteredData, setFilteredData] = useState(undefined as any);
  const [showCount, setShowCount] = useState<number>(20);
  const [updatedBrands, setUpdatedBrands] = useState(undefined as any);
  const [brand, setBrand] = useState(undefined as any);

  const handleChangeBrand = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBrand(event.target.value);
  };

  const handleChangehl = (value: string) => {
    setLoading(true);
    if (filteredData) {
      const newDataAsc = [...filteredData].sort(
        (a: any, b: any) => a.discountPrice - b.discountPrice
      );
      const newDataDesc = [...filteredData].sort(
        (a: any, b: any) => b.discountPrice - a.discountPrice
      );
      if (value === "Low to High") {
        setTimeout(() => {
          setFilteredData(newDataAsc);
          setLoading(false);
        }, 500);
      } else if (value === "High to Low") {
        setTimeout(() => {
          setFilteredData(newDataDesc);
          setLoading(false);
        }, 500);
      } else {
        setTimeout(() => {
          setFilteredData(data);
          setLoading(false);
        }, 500);
      }
    } else {
      const newDataAsc = [...data].sort(
        (a: any, b: any) => a.discountPrice - b.discountPrice
      );
      const newDataDesc = [...data].sort(
        (a: any, b: any) => b.discountPrice - a.discountPrice
      );
      if (value === "Low to High") {
        setTimeout(() => {
          setFilteredData(newDataAsc);
          setLoading(false);
        }, 500);
      } else if (value === "High to Low") {
        setTimeout(() => {
          setFilteredData(newDataDesc);
          setLoading(false);
        }, 500);
      } else {
        setTimeout(() => {
          setFilteredData(data);
          setLoading(false);
        }, 500);
      }
    }
  };

  const handleChange = (value: string) => {
    setLoading(true);
    if (data) {
      if (value === "20") {
        setTimeout(() => {
          setShowCount(20);
          setLoading(false);
        }, 500);
      } else if (value === "30") {
        setTimeout(() => {
          setShowCount(30);
          setLoading(false);
        }, 500);
      } else if (value === "40") {
        setTimeout(() => {
          setShowCount(40);
          setLoading(false);
        }, 500);
      } else if (value === "50") {
        setTimeout(() => {
          setShowCount(50);
          setLoading(false);
        }, 500);
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    fetch("/api/filter/scg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cg: query.cg,
        scg: query.scg,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.filteredProducts);
        setFilteredData(data.filteredProducts);
        setMaxPriceRange(data.highToLow);
        setMax(data.highToLow);
        setLoading(false);
      });
    setRange([0, 100]);
    setBrand("");
    setMinPriceRange(0);
    setMaxPriceRange(0);
  }, [query.cg, query.scg]);

  useEffect(() => {
    const brands = filteredData?.filter(
      (ele: any, index: number) =>
        index ===
        filteredData?.findIndex((elem: any) => elem.brand === ele.brand)
    );
    let sorted = _.sortBy(brands, [
      function (o) {
        return o.brand;
      },
    ]);
    setUpdatedBrands(sorted);
  }, [data, filteredData]);

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
                    pathname: `/category/${(query.cg as any)
                      ?.replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, "-")
                      .toLowerCase()}`,
                    query: { cg: query.cg },
                  }}
                  className="ml-1 text-xs font-medium text-gray-700 hover:text-red-500 hover:underline md:ml-2 dark:text-gray-400 dark:hover:text-white"
                >
                  {query.cg}
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
                  {query.scg}
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      {/* Breadcamp section end */}
      <div className="container m-auto min-h-screen">
        <div className="py-5 flex gap-5">
          <div className="hidden lg:block max-w-xs">
            <Collapse
              bordered={false}
              defaultActiveKey={["1", "2", "3"]}
              expandIconPosition="end"
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
              className="bg-transparent dark:text-white"
            >
              <Panel
                className="shadow-none dark:border-none mb-2 bg-white text-base rounded dark:bg-gray-700 dark:text-white"
                header="Price Range"
                key="1"
              >
                <div className="border-t py-2 dark:border-t-gray-500">
                  <Slider
                    range={{ draggableTrack: true }}
                    defaultValue={range}
                    value={range}
                    onAfterChange={(value: [number, number]) => {
                      setLoading(true);
                      setTimeout(() => {
                        const newDataByRange = data.filter(
                          (item: any) =>
                            item.discountPrice >=
                              (value[0] / 100) *
                                (max !== undefined ? max : 0) &&
                            item.discountPrice <=
                              (value[1] / 100) * (max !== undefined ? max : 0)
                        );
                        setFilteredData(newDataByRange);
                        setLoading(false);
                      }, 500);
                    }}
                    onChange={(value: [number, number]) => {
                      setRange(value);
                      const x =
                        (value[0] / 100) * (max !== undefined ? max : 0);
                      const y =
                        (value[1] / 100) * (max !== undefined ? max : 0);
                      setMinPriceRange(x);
                      setMaxPriceRange(y);
                    }}
                    tooltip={{ open: false }}
                  />
                </div>
                <div className="flex justify-between flex-row w-full pb-2">
                  <input
                    className="w-1/2 mr-2 py-2 bg-white rounded shadow-sm px-3 border border-gray-200 dark:border-gray-500 dark:bg-gray-600 dark:text-white"
                    type="number"
                    value={minPriceRange}
                    onChange={(e) =>
                      setMinPriceRange(Number(e.target.value).toFixed(0))
                    }
                  />
                  <input
                    className="w-1/2 ml-2 py-2 bg-white rounded shadow-sm px-3 border border-gray-200 dark:border-gray-500 dark:bg-gray-600 dark:text-white"
                    type="number"
                    value={maxPriceRange}
                    onChange={(e) =>
                      setMaxPriceRange(Number(e.target.value).toFixed(0))
                    }
                  />
                </div>
              </Panel>
              <Panel
                className="shadow-none dark:border-none mb-2 bg-white text-base rounded dark:bg-gray-700 dark:text-white"
                header="Availability"
                key="2"
              >
                <div className="border-t py-2 dark:border-t-gray-500">
                  <div className="flex flex-col justify-center">
                    <FormControlLabel
                      className="hover:bg-gray-100 m-0 dark:hover:bg-gray-600 dark:text-white"
                      control={
                        <Checkbox
                          size="small"
                          className="dark:text-white"
                          defaultChecked={false}
                        />
                      }
                      label="In Stock"
                    />
                    <FormControlLabel
                      className="hover:bg-gray-100 m-0 dark:hover:bg-gray-600 dark:text-white"
                      control={
                        <Checkbox
                          size="small"
                          className="dark:text-white"
                          defaultChecked={false}
                        />
                      }
                      label="Pre Order"
                    />
                    <FormControlLabel
                      className="hover:bg-gray-100 m-0 dark:hover:bg-gray-600 dark:text-white"
                      control={
                        <Checkbox
                          size="small"
                          className="dark:text-white"
                          defaultChecked={false}
                        />
                      }
                      label="Up Coming"
                    />
                  </div>
                </div>
                {/* invisible div start */}
                <div className="flex justify-between flex-row w-full invisible h-0">
                  <input
                    className="w-1/2 bg-white rounded shadow-sm border border-gray-200 h-0"
                    type="number"
                    disabled
                  />
                  <input
                    className="w-1/2 bg-white rounded shadow-sm border border-gray-200 h-0"
                    type="number"
                    disabled
                  />
                </div>
                {/* invisible div end */}
              </Panel>
              <Panel
                className="shadow-none dark:border-none mb-2 bg-white text-base rounded dark:bg-gray-700 dark:text-white"
                header="Brands"
                key="3"
              >
                <div className="border-t py-2 dark:border-t-gray-500">
                  <div className="flex flex-col justify-center">
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={brand}
                      onChange={handleChangeBrand}
                      className="dark:text-white"
                    >
                      {updatedBrands?.map((item: any, index: number) => (
                        <>
                          {item.brand !== "" && (
                            <FormControlLabel
                              key={index}
                              value={item.brand}
                              control={
                                <Radio
                                  size="small"
                                  className="dark:text-white"
                                />
                              }
                              label={item.brand}
                            />
                          )}
                        </>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
                {/* invisible div start */}
                <div className="flex justify-between flex-row w-full invisible h-0">
                  <input
                    className="w-1/2 bg-white rounded shadow-sm border border-gray-200 h-0"
                    type="number"
                    disabled
                  />
                  <input
                    className="w-1/2 bg-white rounded shadow-sm border border-gray-200 h-0"
                    type="number"
                    disabled
                  />
                </div>
                {/* invisible div end */}
              </Panel>
            </Collapse>
          </div>
          <div className="w-full">
            <div className="bg-white py-2 px-3 mx-2 lg:mx-0 rounded shadow flex justify-between items-center dark:bg-gray-700 dark:text-white">
              <h2>
                {query.scg} -{" "}
                {filteredData ? filteredData.length : data?.length}
              </h2>
              <div className="flex gap-3">
                <div>
                  <span className="text-sm font-semibold mr-1">Sort by: </span>
                  <Select
                    defaultValue="Default"
                    style={{ width: 100 }}
                    onChange={handleChangehl}
                    options={[
                      { value: "Default", label: "Default" },
                      { value: "Low to High", label: "Low to High" },
                      { value: "High to Low", label: "High to Low" },
                    ]}
                  />
                </div>
                <div>
                  <span className="text-sm font-semibold mr-1">Show: </span>
                  <Select
                    defaultValue="20"
                    style={{ width: 60 }}
                    onChange={handleChange}
                    options={[
                      {
                        value: "20",
                        label: "20",
                        disabled: filteredData
                          ? filteredData.length < 20
                            ? true
                            : false
                          : data?.length < 20
                          ? true
                          : false,
                      },
                      {
                        value: "30",
                        label: "30",
                        disabled: filteredData
                          ? filteredData.length < 30
                            ? true
                            : false
                          : data?.length < 30
                          ? true
                          : false,
                      },
                      {
                        value: "40",
                        label: "40",
                        disabled: filteredData
                          ? filteredData.length < 40
                            ? true
                            : false
                          : data?.length < 40
                          ? true
                          : false,
                      },
                      {
                        value: "50",
                        label: "50",
                        disabled: filteredData
                          ? filteredData.length < 50
                            ? true
                            : false
                          : data?.length < 50
                          ? true
                          : false,
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
            {filteredData ? (
              <ProductUi
                limit={showCount}
                data={filteredData}
                prevLoading={setLoading}
              />
            ) : (
              <ProductUi
                limit={showCount}
                data={data}
                prevLoading={setLoading}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScgComponent;
