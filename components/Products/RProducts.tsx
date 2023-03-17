import React from "react";
import Image from "next/image";
import Link from "next/link";

function RProducts(props: { ritems: any }) {
  return (
    <div className="w-full">
      <Link
        href={{
          pathname: `/${props.ritems.name
            .replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, "-")
            .toLowerCase()}`,
          query: { id: props.ritems._id },
        }}
      >
        <div className="flex items-center hover:bg-indigo-50 p-2 cursor-pointer border-b dark:border-b-gray-500 hover:border-indigo-400 rounded group dark:hover:bg-gray-700 dark:text-white">
          <div className="w-14 h-14 relative mr-2">
            <Image
              loading="lazy"
              src={props.ritems.src}
              fill
              alt={props.ritems.name}
              className="object-contain"
            />
          </div>
          <div className="w-full">
            <h2 className="text-sm group-hover:text-red-500 group-hover:underline text-gray-800 line-clamp-2 text-ellipsis max-w-full dark:text-white dark:group-hover:text-red-400">
              {props.ritems.name}
            </h2>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default RProducts;
