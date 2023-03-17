import { Avatar } from "@mui/material";
import { Dropdown, MenuProps, Tooltip } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function Logout(props: { user: any; setUser: any }) {
  const router = useRouter();
  return (
    <Tooltip placement="bottom" title="Logout">
      <button
        type="button"
        onClick={async () => {
          const res = await fetch("/api/auth/logout");
          const data = await res.json();
          if (data.message === "Successfuly logged out!") {
            localStorage.removeItem("user");
            props.setUser(undefined);
            router.push("/");
          } else {
            alert("Something went wrong!");
          }
        }}
        className="bg-red-200 dark:bg-gray-800 w-12 group hover:bg-red-300 rounded-r"
      >
        <i className="fa-duotone fa-right-from-bracket text-red-500 group-hover:scale-110"></i>
      </button>
    </Tooltip>
  );
}

function user(props: { user: any; setUser: any }) {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link href={"/user/profile"}>
          <div className="flex flex-row items-center group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-indigo-500"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>
            <h2 className="ml-2 text-indigo-500">Profile</h2>
          </div>
        </Link>
      ),
    },
    // {
    //   key: "2",
    //   label: (
    //     <Link href={"/user/settings"}>
    //       <div className="flex flex-row items-center group">
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           viewBox="0 0 24 24"
    //           fill="currentColor"
    //           className="w-5 h-5 text-sky-500"
    //         >
    //           <path
    //             fillRule="evenodd"
    //             d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 01-.517.608 7.45 7.45 0 00-.478.198.798.798 0 01-.796-.064l-.453-.324a1.875 1.875 0 00-2.416.2l-.243.243a1.875 1.875 0 00-.2 2.416l.324.453a.798.798 0 01.064.796 7.448 7.448 0 00-.198.478.798.798 0 01-.608.517l-.55.092a1.875 1.875 0 00-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 01-.064.796l-.324.453a1.875 1.875 0 00.2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 01.796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 01.517-.608 7.52 7.52 0 00.478-.198.798.798 0 01.796.064l.453.324a1.875 1.875 0 002.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 01-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 001.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 01-.608-.517 7.507 7.507 0 00-.198-.478.798.798 0 01.064-.796l.324-.453a1.875 1.875 0 00-.2-2.416l-.243-.243a1.875 1.875 0 00-2.416-.2l-.453.324a.798.798 0 01-.796.064 7.462 7.462 0 00-.478-.198.798.798 0 01-.517-.608l-.091-.55a1.875 1.875 0 00-1.85-1.566h-.344zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
    //             clipRule="evenodd"
    //           />
    //         </svg>
    //         <h2 className="ml-2 text-sky-500">Settings</h2>
    //       </div>
    //     </Link>
    //   ),
    // },
  ];

  function stringAvatar(name: string) {
    return {
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }
  return (
    <div className="flex bg-gray-50 dark:bg-gray-700 dark:border-gray-700 rounded-md border">
      <Dropdown menu={{ items }} placement="bottom" arrow>
        <div className="flex flex-row items-center hover:cursor-pointer rounded-full shadow shadow-sky-200 dark:shadow-gray-800 dark:border-gray-800 border my-1 mx-2">
          <Avatar
            className="bg-white dark:bg-gray-800 text-gray-600 dark:text-white text-sm font-semibold w-[35px] h-[35px]"
            {...stringAvatar(props.user.fullName)}
          />
        </div>
      </Dropdown>
      <Logout user={props.user} setUser={props.setUser} />
    </div>
  );
}

export default user;
