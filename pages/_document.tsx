import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://cdn.jsdelivr.net/gh/hung1001/font-awesome-pro-v6@44659d9/css/all.min.css"
          rel="stylesheet"
          type="text/css"
        />
      </Head>
      <body className="bg-gray-50 w-full dark:bg-gray-800 relative">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
