import React from "react";
import { CaretRightOutlined } from "@ant-design/icons";
import Link from "next/link";
import menu from "../../../json/menu.json";
import { useRouter } from "next/router";

function Menu() {
  const router = useRouter();
  const MenuItems = (props: { name: string; mainItem: any; id: number }) => {
    return (
      <>
        <Link
          href={{
            pathname: `/category/${props.name
              .replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, "-")
              .toLowerCase()}`,
            query: { cg: props.name },
          }}
          className="text-sm hover:underline"
        >
          {props.name}
        </Link>
        {props.mainItem.items && (
          <div
            className={`absolute top-full ${
              props.id < 8 ? "left-0" : "right-0"
            } z-10 w-48 py-1 origin-top scale-y-0 group-hover/main:scale-y-100`}
          >
            <ul className="w-full shadow-md border border-gray-200 dark:border-gray-700 rounded-md">
              {props.mainItem.items.map((subItem: any, index: number) => {
                const subCategoryName = subItem.name;
                return (
                  <li
                    className={`p-2 w-full ${
                      index === 0
                        ? "rounded-t-md"
                        : index === props.mainItem.items.length - 1
                        ? "rounded-b-md"
                        : ""
                    } bg-white group/sub relative dark:bg-gray-700 dark:hover:bg-gray-800 hover:bg-sky-600 text-gray-800 hover:text-white dark:text-white`}
                    key={index}
                  >
                    <div className="flex flex-row justify-between items-center">
                      {subItem.value === "sl" ? (
                        <Link
                          href={{
                            pathname: `/category/${subItem.name
                              .replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, "-")
                              .toLowerCase()}`,
                            query: { cg: props.name },
                          }}
                          className="text-sm hover:underline cursor-pointer text-left"
                        >
                          {subItem.name}
                        </Link>
                      ) : (
                        <Link
                          href={{
                            pathname: `/sub-category/${subItem.name
                              .replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, "-")
                              .toLowerCase()}`,
                            query: { cg: props.name, scg: subItem.name },
                          }}
                          className="text-sm hover:underline cursor-pointer text-left"
                        >
                          {subItem.name}
                        </Link>
                      )}
                      {subItem.items && <CaretRightOutlined />}
                    </div>
                    {subItem.items && (
                      <div
                        className={`absolute px-1 top-0 ${
                          props.id < 8
                            ? "left-full origin-left"
                            : "right-full origin-right"
                        } w-48 z-10 scale-x-0 ease-in-out duration-200 group-hover/sub:scale-x-100`}
                      >
                        <ul className="w-full bg-white dark:bg-gray-700 shadow-md border border-gray-200 dark:border-gray-700 rounded-md">
                          {subItem.items.map(
                            (exsubItem: any, index: number) => (
                              <li
                                className={`p-2 hover:bg-sky-500 ${
                                  index === 0
                                    ? "rounded-t-md"
                                    : index === subItem.items.length - 1
                                    ? "rounded-b-md"
                                    : ""
                                } bg-white dark:bg-gray-700 dark:hover:bg-gray-800 text-gray-800 hover:text-white dark:text-white`}
                                key={index}
                              >
                                <Link
                                  className="hover:underline"
                                  href={{
                                    pathname: `/escategory/${exsubItem.name
                                      .replace(
                                        /[&\/\\#, +()$~%.'":*?<>{}]/g,
                                        "-"
                                      )
                                      .toLowerCase()}`,
                                    query: {
                                      cg: props.name,
                                      scg: subCategoryName,
                                      escg: exsubItem.name,
                                    },
                                  }}
                                >
                                  {exsubItem.name}
                                </Link>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </>
    );
  };
  return (
    <ul className="main_menu_wrapper flex flow-row justify-between items-center flex-wrap">
      {menu.map((item: any, index: number) => (
        <li
          className="text-gray-800 relative group/main font-semibold px-2 py-3 dark:text-white hover:bg-gray-800 hover:text-white rounded-b-md ease-in-out duration-200 hover:shadow-md cursor-pointer"
          key={index}
        >
          <MenuItems name={item.name} mainItem={item} id={index} />
        </li>
      ))}
    </ul>
  );
}

export default Menu;
