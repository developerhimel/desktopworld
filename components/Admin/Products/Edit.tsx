import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Modal, Select } from "antd";
import brands from "../../../json/brands.json";
import { Alert } from "@mui/material";

function Edit() {
  const router = useRouter();
  const query = router.query;
  const [modal, contextHolder] = Modal.useModal();
  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState("");
  const [regularPrice, setRegularPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [productStatus, setProductStatus] = useState("");
  const [description, setDescription] = useState("");
  const [product, setProduct] = useState(undefined as any);

  useEffect(() => {
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
        setProduct(data);
        setProductName(data?.name);
        setRegularPrice(data?.price);
        setDiscountPrice(data?.discountPrice);
        setBrand(data?.brand);
        setProductStatus(data?.productStatus);
        setDescription(data?.description);
      });
  }, [query.id]);

  const handleUpdateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/admin/updateProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: productName,
        price: regularPrice,
        discountPrice: discountPrice,
        brand: brand,
        productStatus: productStatus,
        description: description,
        id: product?._id,
      }),
    });
    const data = await res.json();

    if (data.message === "success") {
      modal.success({
        centered: true,
        closable: false,
        okText: "Done",
        onOk: () => router.push("/admin/products"),
        title: "Product Updated",
        content: `${productName}`,
        bodyStyle: { padding: "20px 24px" },
      });
      setLoading(false);
    } else {
      modal.error({
        centered: true,
        closable: true,
        okText: "Ok",
        title: "Something went wrong.",
      });
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Alert className="mt-5" severity="warning">
        Image and Categories function coming soon — Stay with us!
      </Alert>
      <h1 className="text-xl my-5 border-b py-2 dark:border-b-gray-500">
        Edit Product
      </h1>
      <form
        onSubmit={handleUpdateProduct}
        className="grid grid-cols-2 gap-3 bg-white p-5 rounded-md border mb-32"
      >
        <div className="border-r pr-3 pb-4">
          {/* Product title section */}
          <div className="flex justify-start pt-5">
            <div className="mb-3 xl:w-full">
              <label
                htmlFor="productName"
                className="form-label inline-block mb-2 text-indigo-700 text-base"
              >
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="form-control block w-full px-3 py-1.5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="productName"
                placeholder="Product Name..."
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
          </div>
          {/* Product price section */}
          <div className="flex justify-start gap-2">
            <div className="mb-3 xl:w-96">
              <label
                htmlFor="regularPrice"
                className="form-label inline-block mb-2 text-indigo-700 text-base"
              >
                Regular Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                className="form-control block w-full px-3 py-1.5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="regularPrice"
                placeholder=""
                required
                value={regularPrice !== 0 ? regularPrice : ""}
                onChange={(e) => setRegularPrice(Number(e.target.value))}
              />
            </div>
            <div className="mb-3 xl:w-96">
              <label
                htmlFor="discountPrice"
                className="form-label inline-block mb-2 text-indigo-700 text-base"
              >
                Discount Price
              </label>
              <input
                type="number"
                className="form-control block w-full px-3 py-1.5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="discountPrice"
                placeholder=""
                value={discountPrice !== 0 ? discountPrice : ""}
                onChange={(e) => setDiscountPrice(Number(e.target.value))}
              />
            </div>
          </div>
          {/* Product brands and product status */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label
                htmlFor="brand"
                className="form-label inline-block mb-2 text-indigo-700 text-base"
              >
                Choose Brand <span className="text-red-500">*</span>
              </label>
              <br />
              <Select
                showSearch
                id="brand"
                style={{ width: "100%" }}
                size="large"
                placeholder="Select brand"
                optionFilterProp="children"
                onChange={(value) => setBrand(value)}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={brands}
                defaultValue={brand}
                value={brand}
              />
            </div>
            <div>
              <label
                htmlFor="brand"
                className="form-label inline-block mb-2 text-indigo-700 text-base"
              >
                Product Status <span className="text-red-500">*</span>
              </label>
              <br />
              <Select
                defaultValue={productStatus}
                value={productStatus}
                size="large"
                style={{ width: "100%" }}
                onChange={(value) => setProductStatus(value)}
                options={[
                  { value: "In Stock", label: "In Stock" },
                  { value: "Out of Stock", label: "Out of Stock" },
                  { value: "Pre Order", label: "Pre Order" },
                  { value: "Up Coming", label: "Up Coming" },
                ]}
              />
            </div>
          </div>
        </div>
        <div className="py-5">
          <div>
            <label
              htmlFor="productDescription"
              className="form-label inline-block mb-2 text-indigo-700 text-base"
            >
              Product Description <span className="text-red-500">*</span>
            </label>
            <textarea
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleFormControlTextarea1"
              rows={10}
              required
              placeholder="Product descriptions..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="flex gap-3 pt-5">
            <div className="w-full"></div>
            <button
              type="submit"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              disabled={loading}
              className="inline-block w-full px-6 py-2.5 bg-green-600 text-white font-medium text-sm leading-tight rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              {loading && (
                <div
                  className="spinner-border animate-spin inline-block w-3 h-3 border-2 rounded-full mr-2"
                  role="status"
                />
              )}
              {loading ? "Publishing..." : "Update Product"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Edit;
