// eslint-disable-next-line
import { useEffect, useState } from "react";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/pagination";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { CartProvider } from "react-use-cart";
import AdminLayout from "../components/Admin/AdminLayout";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const use = async () => {
      (await import("tw-elements")).default;
    };
    use();
  }, []);

  return (
    <>
      {router.route.match("/admin") ? (
        <>
          {router.route.includes("/admin/login") ||
          router.route.includes("/admin/register") ? (
            <Component {...pageProps} />
          ) : (
            <AdminLayout>
              <Component {...pageProps} />
            </AdminLayout>
          )}
        </>
      ) : (
        <CartProvider id="cccart">
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CartProvider>
      )}
    </>
  );
}
