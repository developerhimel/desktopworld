import { MongoClient, ObjectId } from "mongodb";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import Product from "../../components/Products/Product";

const ProductPage: NextPage = (props: any) => {
  return (
    <>
      <Product />
    </>
  );
};

export default ProductPage;
