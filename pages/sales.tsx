import type { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import { Inter } from "next/font/google";
import Layout from "../components/Layout";

const inter = Inter({ subsets: ["latin"] });

const Sales: NextPageWithLayout = () => {
  return (
    <div className="w-full max-w-screen-xl">
      <p className="text-2xl text-green-800">Sales</p>
      <p className="text-md">View and export sales here</p>
    </div>
  );
};

Sales.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Sales;
