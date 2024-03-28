import type { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import { Inter } from "next/font/google";
import Layout from "../components/Layout";

const inter = Inter({ subsets: ["latin"] });

const Stock: NextPageWithLayout = () => {
  return <p>Welcome to the Stock Screen</p>;
};

Stock.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Stock;
