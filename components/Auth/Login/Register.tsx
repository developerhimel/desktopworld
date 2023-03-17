import { Button } from "@mui/material";
import { message, Modal } from "antd";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

function Register() {
  const router = useRouter();
  const [messageApi, contextHolderMessage] = message.useMessage();
  const [modal, contextHolderModal] = Modal.useModal();
  const [loading, setLoading] = useState(false);
  const [registerFullName, setRegisterFullName] = useState(undefined as any);
  const [registerEmail, setRegisterEmail] = useState(undefined as any);
  const [registerPhoneNumber, setRegisterPhoneNumber] = useState(
    undefined as any
  );
  const [registerPassword, setRegisterPassword] = useState(undefined as any);

  const handleRegister = async () => {
    setLoading(true);
    if (!registerFullName || !registerEmail || !registerPassword) {
      messageApi.open({
        type: "warning",
        content: "Fields cannot be empty!",
      });
      setLoading(false);
      return;
    }
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: registerFullName,
        email: registerEmail,
        phone: registerPhoneNumber as number,
        password: registerPassword,
      }),
    });
    const data = await res.json();
    console.log(data);

    if (data.message === "user inserted") {
      setLoading(false);
      modal.success({
        centered: true,
        closable: false,
        okText: "Login",
        title: "Registered",
        onOk: () => router.push("/login"),
        content:
          "You have successfully registered on Classic Computer. Login now.",
        bodyStyle: { padding: "20px 24px" },
      });
    } else if (data.message === "email already exists") {
      messageApi.open({
        type: "error",
        content: "email already exists!",
      });
      setLoading(false);
    }
  };
  return (
    <>
      {contextHolderMessage}
      <>{contextHolderModal}</>
      <div className="w-full bg-white dark:bg-gray-800 mb-10">
        <div className="container m-auto">
          <div className="flex justify-center items-center">
            <form className="bg-white mx-3 lg:mx-0 shadow-sky-200 border shadow rounded-lg mt-14 w-[600px] p-10 dark:bg-gray-700 dark:border-gray-600 dark:shadow-gray-600">
              <div className="flex justify-center">
                <Link href={"/"}>
                  <div className="w-28 h-14 relative">
                    <Image
                      alt="Logo"
                      src={"/assets/logo/logo1.png"}
                      fill
                      priority={true}
                      className="object-contain"
                    />
                  </div>
                </Link>
              </div>
              <h1 className="text-lg font-semibold text-center dark:text-white">
                Account Registration
              </h1>
              <div className="flex flex-col mt-2 dark:text-white">
                <label className="my-2" htmlFor="loginEmail">
                  Full Name :
                </label>
                <input
                  required
                  type="text"
                  aria-autocomplete="none"
                  name="registerFullName"
                  id="registerFullName"
                  placeholder="Full Name"
                  className="rounded border border-gray-300 dark:border-gray-500 dark:bg-gray-600"
                  onChange={(e) => setRegisterFullName(e.target.value)}
                />
              </div>
              <div className="flex flex-col mt-2 dark:text-white">
                <label className="my-2" htmlFor="loginEmail">
                  Email Address :
                </label>
                <input
                  required
                  type="text"
                  aria-autocomplete="none"
                  name="registerEmail"
                  id="registerEmail"
                  placeholder="Email"
                  className="rounded border border-gray-300 dark:border-gray-500 dark:bg-gray-600"
                  onChange={(e) => setRegisterEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col mt-2 dark:text-white">
                <label className="my-2" htmlFor="loginEmail">
                  Phone Number :
                </label>
                <input
                  required
                  type="number"
                  aria-autocomplete="none"
                  name="registerPhoneNumber"
                  id="registerPhoneNumber"
                  placeholder="+880 -"
                  className="rounded border border-gray-300 dark:border-gray-500 dark:bg-gray-600"
                  onChange={(e) => setRegisterPhoneNumber(e.target.value)}
                />
              </div>
              <div className="flex flex-col mt-2 dark:text-white">
                <label className="my-2" htmlFor="loginPassword">
                  Password :
                </label>
                <input
                  required
                  type="password"
                  aria-autocomplete="none"
                  name="registerPassword"
                  id="registerPassword"
                  placeholder="password"
                  className="rounded border border-gray-300 dark:border-gray-500 dark:bg-gray-600"
                  onChange={(e) => setRegisterPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-end my-3">
                <button
                  className="text-red-500 text-sm hover:underline hover:scale-105 duration-300 ease-in-out dark:text-gray-300"
                  type="button"
                >
                  Forgotten Password?
                </button>
              </div>
              <Button
                type="submit"
                disabled={loading}
                onClick={() => handleRegister()}
                className={`w-full font-semibold ${
                  loading ? "bg-gray-200" : "bg-sky-500"
                } shadow-none py-2 hover:bg-sky-600`}
                variant="contained"
              >
                Register
                {loading && (
                  <div
                    className="spinner-border animate-spin inline-block w-3 h-3 border-2 rounded-full ml-2"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
              </Button>
              <div className="grid grid-cols-3 items-center gap-3 my-5">
                <div className="w-full border-b dark:border-b-gray-500" />
                <div>
                  <h1 className="text-sm text-center dark:text-white">
                    Already have an account
                  </h1>
                </div>
                <div className="w-full border-b dark:border-b-gray-500" />
              </div>
              <Button
                onClick={() => router.push("/login")}
                className="w-full font-semibold hover:bg-sky-600 shadow-none py-2 border border-sky-600 bg-white text-sky-600 hover:text-white dark:bg-gray-600 dark:text-white dark:hover:bg-sky-600"
                variant="outlined"
              >
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
