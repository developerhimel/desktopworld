import React from "react";
import AddProducts from "../Products/AddProducts";
import Categories from "./Categories";

function Products() {
  return (
    <div className="w-full bg-white">
      <div className="m-10 pt-5">
        <div className="p-5 pb-0 border rounded-md shadow">
          <h1>Add Products</h1>
          <ul
            className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b pl-0"
            id="tabs-tab3"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <a
                href="#tabs-home3"
                className="nav-link w-full flex items-center font-medium text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-4 py-3 hover:border-transparent hover:bg-gray-100 focus:border-transparent active"
                id="tabs-home-tab3"
                data-bs-toggle="pill"
                data-bs-target="#tabs-home3"
                role="tab"
                aria-controls="tabs-home3"
                aria-selected="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>
                Add Product
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                href="#tabs-profile3"
                className="nav-link w-full block font-medium text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 hover:border-transparent hover:bg-gray-100 focus:border-transparent"
                id="tabs-profile-tab3"
                data-bs-toggle="pill"
                data-bs-target="#tabs-profile3"
                role="tab"
                aria-controls="tabs-profile3"
                aria-selected="false"
              >
                Categories
              </a>
            </li>
          </ul>
          <div className="tab-content" id="tabs-tabContent3">
            <div
              className="tab-pane fade show active"
              id="tabs-home3"
              role="tabpanel"
              aria-labelledby="tabs-home-tab3"
            >
              <AddProducts />
            </div>
            <div
              className="tab-pane fade"
              id="tabs-profile3"
              role="tabpanel"
              aria-labelledby="tabs-profile-tab3"
            >
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
