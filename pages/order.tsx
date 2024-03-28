import type { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import { Inter } from "next/font/google";
import Layout from "../components/Layout";

const inter = Inter({ subsets: ["latin"] });

const Order: NextPageWithLayout = () => {
  return <p>Welcome to the Order Screen</p>;
};

Order.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Order;
