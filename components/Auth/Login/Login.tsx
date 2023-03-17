import { Button } from "@mui/material";
import { message } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";

function Login() {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(undefined as any);
  const [password, setPassword] = useState(undefined as any);

  const handleLogin = async () => {
    setLoading(true);
    if (!email || !password) {
      messageApi.open({
        type: "warning",
        content: "Email / Password cannot be empty!",
      });
      setLoading(false);
      return;
    }
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await res.json();
    console.log(data);

    if (data.message === "success") {
      messageApi
        .open({
          type: "success",
          content: "You have successfully logged in.",
        })
        .then(() => {
          localStorage.setItem("user", data.userId);
          setLoading(false);
          router.query.rf
            ? router.push(`/${router.query.rf}`)
            : router.push("/");
        });
    } else if (data.message === "user not found") {
      messageApi.open({
        type: "error",
        content: "user not found!",
      });
      setLoading(false);
    } else if (data.message === "invalid password") {
      messageApi.open({
        type: "error",
        content: "You have entered invalid password!",
      });
      setLoading(false);
    } else if (data.message === "unverified user") {
      messageApi.open({
        type: "error",
        content: "Your account no longer active.",
      });
      setLoading(false);
    }
  };
  return (
    <>
      {contextHolder}
      <div className="w-full min-h-[70vh] bg-white dark:bg-gray-800">
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
                Account Login
              </h1>
              <div className="flex flex-col mt-2 dark:text-white">
                <label className="my-2" htmlFor="loginEmail">
                  Email Address :
                </label>
                <input
                  required
                  type="email"
                  name="loginEmail"
                  id="loginEmail"
                  placeholder="Email"
                  className="rounded border border-gray-300 dark:bg-gray-600 dark:text-white dark:border-gray-500"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col mt-2 dark:text-white">
                <label className="my-2" htmlFor="loginPassword">
                  Password :
                </label>
                <input
                  required
                  type="password"
                  name="loginPassword"
                  id="loginPassword"
                  placeholder="password"
                  className="rounded border border-gray-300 dark:bg-gray-600 dark:text-white dark:border-gray-500"
                  onChange={(e) => setPassword(e.target.value)}
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
                onClick={() => handleLogin()}
                className={`w-full font-semibold ${
                  loading ? "bg-gray-200" : "bg-sky-500"
                } shadow-none py-2 hover:bg-sky-600`}
                variant="contained"
              >
                Login
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
                    Dont have an account
                  </h1>
                </div>
                <div className="w-full border-b dark:border-b-gray-500" />
              </div>
              <Button
                onClick={() => router.push("/register")}
                className="w-full font-semibold hover:bg-sky-600 shadow-none py-2 border border-sky-600 bg-white text-sky-600 hover:text-white dark:bg-gray-600 dark:text-white dark:hover:bg-sky-600"
                variant="outlined"
              >
                Register
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
