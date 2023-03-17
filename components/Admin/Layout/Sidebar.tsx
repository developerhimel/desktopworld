import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GroupIcon from "@mui/icons-material/Group";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import WebStoriesIcon from "@mui/icons-material/WebStories";
import SettingsIcon from "@mui/icons-material/Settings";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LogoutIcon from "@mui/icons-material/Logout";

function SideButtons(props: {
  title: string;
  icon: any;
  path: string;
  disabled: boolean;
}) {
  const router = useRouter();
  return (
    <Button
      disabled={props.disabled}
      onClick={() => router.push(props.path)}
      className={`w-full font-semibold capitalize text-left justify-start border-none mb-2 py-2 hover:bg-sky-50 dark:hover:bg-gray-800 ${
        router.pathname === props.path
          ? "text-sky-500 bg-sky-50 dark:bg-gray-800"
          : "text-gray-500 bg-white dark:bg-gray-700 dark:text-white"
      } ${props.disabled ? "text-gray-300 dark:text-gray-500" : ""}`}
      variant="outlined"
      startIcon={props.icon}
    >
      {props.title}
    </Button>
  );
}

function Sidebar() {
  const router = useRouter();
  return (
    <div className="w-72 bg-white dark:bg-gray-700 dark:border-gray-600 flex flex-col justify-between border-r rounded">
      <div>
        <div className="flex items-center justify-center border-b rounded dark:border-b-gray-500">
          <Link href={"/"}>
            <div className="w-32 h-16 relative">
              <Image
                alt="Logo"
                src={"/assets/logo/logo3.png"}
                fill
                priority={true}
                className="object-contain"
              />
            </div>
          </Link>
        </div>
        <div className="py-3 px-1 w-full">
          <SideButtons
            title="Dashboard"
            icon={<DashboardIcon />}
            path="/admin/dashboard"
            disabled={false}
          />
          <SideButtons
            title="Products"
            icon={<ShoppingBagIcon />}
            path="/admin/products"
            disabled={false}
          />
          <SideButtons
            title="Orders"
            icon={<ReceiptLongIcon />}
            path="/admin/orders"
            disabled={false}
          />
          <SideButtons
            title="Customers"
            icon={<GroupIcon />}
            path="/admin/customers"
            disabled={false}
          />
          {/* <SideButtons
            title="Categories"
            icon={<FormatListBulletedIcon />}
            path="/admin/productss"
            disabled={true}
          /> */}
          <SideButtons
            title="Banners"
            icon={<ViewCarouselIcon />}
            path="/admin/productss"
            disabled={true}
          />
          <SideButtons
            title="Sliders"
            icon={<WebStoriesIcon />}
            path="/admin/productss"
            disabled={true}
          />
          <SideButtons
            title="Offers & Deals"
            icon={<LocalOfferIcon />}
            path="/admin/productss"
            disabled={true}
          />
          <SideButtons
            title="Settings"
            icon={<SettingsIcon />}
            path="/admin/productss"
            disabled={true}
          />
        </div>
      </div>
      <div className="mx-1">
        <Button
          onClick={async () => {
            const res = await fetch("/api/admin/logout");
            const data = await res.json();
            if (data.message === "Successfuly logged out!") {
              localStorage.removeItem("adminUser");
              router.push("/");
            } else {
              alert("Something went wrong!");
            }
          }}
          className={`w-full font-semibold capitalize border-none my-2 py-2 hover:bg-red-500 bg-red-400 text-white`}
          variant="outlined"
          endIcon={<LogoutIcon />}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;
