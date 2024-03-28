import type { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import { Inter } from "next/font/google";
import Layout from "../components/Layout";

const inter = Inter({ subsets: ["latin"] });

const Sales: NextPageWithLayout = () => {
  return <p>Welcome to the Sales Screen</p>;
};

Sales.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Sales;
