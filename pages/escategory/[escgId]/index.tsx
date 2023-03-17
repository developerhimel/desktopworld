import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import EscgComponent from "../../../components/Filter/EscgComponent";

const ExtraSubCategoryFilterPage: NextPage = (props: any) => {
  const router = useRouter();
  const query = router.query;
  return (
    <>
      <Head>
        <title>
          {`${query.escg} - Classic Computer || Largest tech accessories shop
          in Bangladesh`}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content={`${query.escg} - Classic Computer - Largest tech accessories shop
          in Bangladesh`}
        />
        <meta
          name="keywords"
          content={`${query.escg} Classic Computer the largest tech accessories shop
          in Bangladesh`}
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <EscgComponent />
    </>
  );
};

export default ExtraSubCategoryFilterPage;
