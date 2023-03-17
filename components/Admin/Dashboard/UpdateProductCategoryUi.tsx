import { Button } from "@mui/material";
import { Select } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import menu from "../../../json/menu.json";
import Image from "next/image";

function UpdateProductCategoryUi(props: { item: any }) {
  const [loading, setLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  // Category functions start
  const [category, setCategory] = useState<{
    value: string;
    label: string;
    index: number;
  }>();
  const [subCategory, setSubCategory] = useState<{
    value: string;
    label: string;
    index: number;
    extraSub: boolean;
  }>();
  const [extraSubCategory, setExtraSubCategory] = useState<string>();

  const categoryItem =
    category?.index !== undefined ? menu[category?.index] : undefined;

  const subCategoryItem =
    subCategory?.index !== undefined
      ? categoryItem?.items[subCategory?.index]
      : undefined;

  // Category functions end

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!category || !subCategory) return;
    setLoading(true);

    const res = await fetch("/api/update/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: props.item._id,
        cg: category.value,
        scg: subCategory.value,
        escg: extraSubCategory,
      }),
    });
    const data = await res.json();
    console.log(data);

    if (data) {
      setIsUpdated(true);
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleUpdate}
      className="p-4 bg-gray-50 my-5 rounded border"
    >
      <div className="flex gap-5 border-b mb-3">
        <div className="w-14 h-14 relative mr-2">
          <Image
            loading="lazy"
            src={props.item.src}
            fill
            alt={props.item.name}
            className=" object-contain"
          />
        </div>
        <div className="w-full">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold py-1 text-gray-700">
              {props.item.name}
            </h2>
            <Link
              target={"_blank"}
              href={{
                pathname: `https://www.google.com/search`,
                query: { q: props.item.name },
              }}
            >
              <i className="fa-duotone fa-arrow-up-right-from-square"></i>
            </Link>
          </div>
          <h2 className="pb-3 pt-1 font-semibold text-gray-400 text-sm">
            Product ID: - {props.item._id}
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div className="bg-white border shadow shadow-indigo-200 p-3 rounded">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label
                htmlFor="category"
                className="form-label inline-block mb-2 text-indigo-700 text-base"
              >
                Choose Category <span className="text-red-500">*</span>
              </label>
              <br />
              <Select
                aria-required={true}
                showSearch
                id="category"
                style={{ width: "100%" }}
                size="large"
                placeholder="Select category"
                optionFilterProp="children"
                onChange={(value, options: any) => setCategory(options)}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={menu.map((item: any, index: number) => ({
                  value: item.name,
                  label: item.name,
                  index: index,
                }))}
              />
            </div>
            <div>
              <label
                htmlFor="subcategory"
                className="form-label inline-block mb-2 text-indigo-700 text-base"
              >
                Choose Sub-category <span className="text-red-500">*</span>
              </label>
              <br />
              <Select
                aria-required
                showSearch
                disabled={!category ? true : false}
                id="subcategory"
                style={{ width: "100%" }}
                size="large"
                placeholder="Select sub-category"
                optionFilterProp="children"
                onChange={(value, options: any) => setSubCategory(options)}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={categoryItem?.items.map(
                  (item: any, index: number) => ({
                    value: item.name,
                    label: item.name,
                    index: index,
                    extraSub: item.items ? true : false,
                  })
                )}
              />
            </div>
          </div>
          {subCategory?.extraSub && (
            <div className="mt-3">
              <label
                htmlFor="extrasubcategory"
                className="form-label inline-block mb-2 text-indigo-700 text-base"
              >
                Choose Extra-sub-category
              </label>
              <br />
              <Select
                showSearch
                disabled={!category ? true : false}
                id="extrasubcategory"
                style={{ width: "100%" }}
                size="large"
                placeholder="Select extra-sub-category"
                optionFilterProp="children"
                onChange={(value) => setExtraSubCategory(value)}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={subCategoryItem?.items?.map(
                  (item: any, index: number) => ({
                    value: item.name,
                    label: item.name,
                    index: index,
                  })
                )}
              />
            </div>
          )}
        </div>
      </div>
      <Button
        type="submit"
        disabled={loading || isUpdated}
        className={`font-semibold ${
          loading ? "bg-gray-300" : isUpdated ? "bg-green-500" : "bg-sky-500"
        } shadow-none py-2 hover:bg-sky-600 capitalize mt-5`}
        variant="contained"
      >
        {loading && (
          <div
            className="spinner-border animate-spin inline-block w-3 h-3 border-2 rounded-full mr-2"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        {loading ? "Updating..." : isUpdated ? "Updated" : "Update"}
      </Button>
    </form>
  );
}

export default UpdateProductCategoryUi;
