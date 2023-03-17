import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { FloatButton } from "antd";
import Image from "next/image";
import { useCart } from "react-use-cart";
import DifferenceIcon from "@mui/icons-material/Difference";
import { NumericFormat } from "react-number-format";
import { useRouter } from "next/router";

function FloatBox() {
  const router = useRouter();
  const {
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
    cartTotal,
  } = useCart();
  const [open, setOpen] = useState(false);
  const [totalCartUniqueItemsLength, setTotalCartUniqueItemsLength] =
    useState(0);

  useEffect(() => {
    setTotalCartUniqueItemsLength(totalUniqueItems);
  }, [totalUniqueItems]);

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-300 sm:duration-300"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-300 sm:duration-300"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white dark:bg-gray-700 shadow-xl">
                      <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white">
                            Shopping cart
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="-m-2 p-2 text-gray-400 hover:text-gray-500 dark:text-white dark:hover:text-gray-200"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200 dark:divide-gray-500"
                            >
                              {items?.map((product: any) => (
                                <li key={product.id} className="flex py-6">
                                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <Image
                                      src={product.src}
                                      alt={product.name}
                                      fill
                                      className="object-contain"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-sm font-medium text-gray-900 dark:text-white">
                                        <h3>
                                          <Link
                                            className="hover:text-red-500 hover:underline"
                                            onClick={() => setOpen(false)}
                                            href={{
                                              pathname: `/${product.name
                                                .replace(
                                                  /[&\/\\#, +()$~%.'":*?<>{}]/g,
                                                  "-"
                                                )
                                                .toLowerCase()}`,
                                              query: { id: product.id },
                                            }}
                                          >
                                            {product.name}
                                          </Link>
                                        </h3>
                                        <p className="ml-4">
                                          <NumericFormat
                                            displayType="text"
                                            className="px-1"
                                            value={product.discountPrice}
                                            thousandSeparator=","
                                          />
                                          ৳
                                        </p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {product.color}
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-gray-500 dark:text-gray-300">
                                        Qty {product.quantity}
                                      </p>

                                      <div className="flex">
                                        <button
                                          onClick={() => removeItem(product.id)}
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 py-6 px-4 sm:px-6 dark:border-gray-500">
                        <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                          <p>Subtotal</p>
                          <p>
                            <NumericFormat
                              displayType="text"
                              className="px-1"
                              value={cartTotal}
                              thousandSeparator=","
                            />
                            ৳
                          </p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-300">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6 flex w-full gap-3">
                          <Link
                            href={"/checkout/cart"}
                            onClick={() => setOpen(false)}
                            className="flex items-center w-full justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          >
                            View Cart
                          </Link>
                          <Link
                            href={"/checkout"}
                            onClick={() => setOpen(false)}
                            className="flex items-center w-full justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          >
                            Checkout
                          </Link>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500 dark:text-gray-300">
                          <p>
                            or
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500 mx-2 dark:text-indigo-400"
                              onClick={() => setOpen(false)}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="hidden fixed bottom-24 right-4 lg:flex flex-col gap-3 z-50">
        <div
          onClick={() => setOpen(true)}
          className="bg-gray-900 border border-gray-600 relative h-[60px] w-[60px] rounded hover:bg-gray-500 cursor-pointer flex justify-center items-center flex-col"
        >
          <span className="absolute -right-1 -top-1 border-4 border-gray-900 bg-red-500 text-white font-bold w-6 h-6 text-center text-xs flex items-center justify-center rounded-full">
            {totalCartUniqueItemsLength}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
          <h3 className="text-xs text-white mt-1">Cart</h3>
        </div>
        <div
          onClick={() => router.push("/compare")}
          className="bg-gray-900 border border-gray-600 relative h-[60px] w-[60px] rounded hover:bg-gray-500 cursor-pointer flex justify-center items-center flex-col"
        >
          <span className="absolute -right-1 -top-1 border-4 border-gray-900 bg-red-500 text-white font-bold w-6 h-6 text-center text-xs flex items-center justify-center rounded-full">
            0
          </span>
          <DifferenceIcon className="text-white" />
          <h3 className="text-xs text-white mt-1">Compare</h3>
        </div>
      </div>
      <FloatButton.BackTop />
    </>
  );
}

export default FloatBox;
