import Link from "next/link";
import React from "react";
import Image from "next/image";

function Footer() {
  return (
    <div className="w-full bg-gray-900">
      <div className="container m-auto text-sm text-white">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-1 md:gap-2 lg:gap-5 py-10">
          <div className="flex flex-col justify-between items-center md:items-start">
            <Link href={"/"}>
              <div className="w-40 h-20 relative">
                <Image
                  alt="Logo"
                  src={"/assets/logo/logo-footer.png"}
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <div className="pb-2">
              <span className="flex flex-row justify-start items-center py-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
                  />
                </svg>
                <span className="ml-2 text-base">Shop Address:</span>
              </span>
              <p className="text-gray-400">
                Classic Computer, Modern Mor - Charubabur Mor Rd, Dinajpur 5200
              </p>
              <span className="flex flex-row justify-start items-center py-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                <span className="ml-2 text-base">Email:</span>
              </span>
              <Link
                href={"mailto: classiccomputer101@gmail.com"}
                className="text-gray-400 hover:text-red-500 hover:underline"
              >
                classiccomputer101@gmail.com
              </Link>
            </div>
          </div>
          <div className="col-span-3 flex flex-col items-center lg:items-start justify-between mt-2">
            <h1 className="text-lg font-normal tracking-widest mb-3">
              About Us
            </h1>
            <div className="grid grid-cols-1 w-full lg:grid-cols-3">
              <div className="flex flex-row lg:flex-col justify-center lg:justify-start items-center lg:items-start text-gray-400 ">
                <Link
                  className="text-sm hover:text-red-500 hover:underline my-2 px-2 md:px-0"
                  href={"/"}
                >
                  EMI Terms
                </Link>
                <Link
                  className="text-sm hover:text-red-500 hover:underline my-2 px-2 md:px-0"
                  href={"/privacy-policy"}
                >
                  Privacy Policy
                </Link>
                <Link
                  className="text-sm hover:text-red-500 hover:underline my-2 px-2 md:px-0"
                  href={"/"}
                >
                  CC Point Policy
                </Link>
                <Link
                  className="text-sm hover:text-red-500 hover:underline my-2 px-2 md:px-0"
                  href={"/brands"}
                >
                  Brands
                </Link>
              </div>
              <div className="flex flex-row lg:flex-col justify-center lg:justify-start items-center lg:items-start text-gray-400 ">
                <Link
                  className="text-sm hover:text-red-500 hover:underline my-2 px-2 md:px-0"
                  href={"/about"}
                >
                  About us
                </Link>
                <Link
                  className="text-sm hover:text-red-500 hover:underline my-2 px-2 md:px-0"
                  href={"/"}
                >
                  Terms & Conditions
                </Link>
                <Link
                  className="text-sm hover:text-red-500 hover:underline my-2 px-2 md:px-0"
                  href={"/"}
                >
                  Blog
                </Link>
                <Link
                  className="text-sm text-red-500 hover:underline my-2 px-2 md:px-0"
                  href={"/"}
                >
                  Online Service Support
                </Link>
              </div>
              <div className="flex flex-row lg:flex-col justify-center lg:justify-start items-center lg:items-start text-gray-400 ">
                <Link
                  className="text-sm hover:text-red-500 hover:underline my-2 px-2 md:px-0"
                  href={"/"}
                >
                  Online Delivery
                </Link>
                <Link
                  className="text-sm hover:text-red-500 hover:underline my-2 px-2 md:px-0"
                  href={"/"}
                >
                  Refund and Return Policy
                </Link>
                <Link
                  className="text-sm hover:text-red-500 hover:underline my-2 px-2 md:px-0"
                  href={"/"}
                >
                  Contact us
                </Link>
                <Link
                  className="text-sm text-red-500 hover:underline my-2 px-2 md:px-0"
                  href={"/"}
                >
                  Complain / Advice
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between mt-2">
            <h1 className="text-lg font-normal text-center tracking-widest mb-3">
              Support
            </h1>
            <div className="flex flex-row items-center px-3 py-2 border border-gray-700 rounded-full cursor-pointer hover:border-red-500 my-2">
              <div className="pr-3 mr-3 border-r border-r-gray-700 py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-300 py-1">9AM - 10PM</p>
                <h2 className="font-bold text-red-500 text-lg">01718443892</h2>
              </div>
            </div>
            <Link
              target={"_blank"}
              href={"https://goo.gl/maps/cMDbbB5in1zyUSjU6"}
              className="flex flex-row items-center px-3 py-2 border border-gray-700 rounded-full cursor-pointer hover:border-red-500 my-2"
            >
              <div className="pr-3 mr-3 border-r border-r-gray-700 py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-300 py-1">Store Locator</p>
                <h2 className="font-bold text-red-500 text-lg">
                  Find Our Store
                </h2>
              </div>
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center py-5 border-t border-gray-700">
          <h2 className="pb-5 text-gray-300">
            Experience Classic Computer App on your mobile
          </h2>
          <div className="flex lg:flex-row">
            <button className="bg-gray-600 inline-flex py-1 px-2 rounded-md items-center hover:bg-gray-700 focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="w-5 h-5"
                viewBox="0 0 512 512"
              >
                <path d="M99.617 8.057a50.191 50.191 0 00-38.815-6.713l230.932 230.933 74.846-74.846L99.617 8.057zM32.139 20.116c-6.441 8.563-10.148 19.077-10.148 30.199v411.358c0 11.123 3.708 21.636 10.148 30.199l235.877-235.877L32.139 20.116zM464.261 212.087l-67.266-37.637-81.544 81.544 81.548 81.548 67.273-37.64c16.117-9.03 25.738-25.442 25.738-43.908s-9.621-34.877-25.749-43.907zM291.733 279.711L60.815 510.629c3.786.891 7.639 1.371 11.492 1.371a50.275 50.275 0 0027.31-8.07l266.965-149.372-74.849-74.847z"></path>
              </svg>
              <span className="ml-2 flex items-start flex-col leading-none">
                <span className="text-xs text-gray-400">Download on</span>
                <span className="text-sm">Google Play</span>
              </span>
            </button>
            <div className="px-1" />
            <button
              type="button"
              data-te-ripple-init
              data-te-ripple-color="light"
              className="bg-gray-600 inline-flex py-1 px-2 rounded-md items-center hover:bg-gray-700 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="w-5 h-5"
                viewBox="0 0 305 305"
              >
                <path d="M40.74 112.12c-25.79 44.74-9.4 112.65 19.12 153.82C74.09 286.52 88.5 305 108.24 305c.37 0 .74 0 1.13-.02 9.27-.37 15.97-3.23 22.45-5.99 7.27-3.1 14.8-6.3 26.6-6.3 11.22 0 18.39 3.1 25.31 6.1 6.83 2.95 13.87 6 24.26 5.81 22.23-.41 35.88-20.35 47.92-37.94a168.18 168.18 0 0021-43l.09-.28a2.5 2.5 0 00-1.33-3.06l-.18-.08c-3.92-1.6-38.26-16.84-38.62-58.36-.34-33.74 25.76-51.6 31-54.84l.24-.15a2.5 2.5 0 00.7-3.51c-18-26.37-45.62-30.34-56.73-30.82a50.04 50.04 0 00-4.95-.24c-13.06 0-25.56 4.93-35.61 8.9-6.94 2.73-12.93 5.09-17.06 5.09-4.64 0-10.67-2.4-17.65-5.16-9.33-3.7-19.9-7.9-31.1-7.9l-.79.01c-26.03.38-50.62 15.27-64.18 38.86z"></path>
                <path d="M212.1 0c-15.76.64-34.67 10.35-45.97 23.58-9.6 11.13-19 29.68-16.52 48.38a2.5 2.5 0 002.29 2.17c1.06.08 2.15.12 3.23.12 15.41 0 32.04-8.52 43.4-22.25 11.94-14.5 17.99-33.1 16.16-49.77A2.52 2.52 0 00212.1 0z"></path>
              </svg>
              <span className="ml-2 flex items-start flex-col leading-none">
                <span className="text-xs text-gray-400">Download on</span>
                <span className="text-sm">App Store</span>
              </span>
            </button>
          </div>
          <div className="flex mt-4 gap-4 ">
            <Link
              href="https://www.facebook.com/classiccomputer.bd/"
              target={"_blank"}
              className="text-gray-500 hover:text-red-500"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Facebook page</span>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-red-500">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
              <span className="sr-only">Twitter page</span>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-red-500">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Dribbbel account</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#0d121c]">
        <div className="container m-auto text-gray-300">
          <div className="py-3 flex flex-row justify-between items-center">
            <h3 className="text-xs">
              © 2023 Classic Computer - Tech & Accessories Shop in BD | All
              rights reserved
            </h3>
            <div>
              <div className="text-xs">
                <span>Powered by - </span>
                <Link className="hover:text-red-500 hover:underline" href={"/"}>
                  Teamdh
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
