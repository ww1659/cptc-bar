import { useState, type ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import { Inter } from "next/font/google";
import Layout from "../components/Layout";
import { Drink } from "@/interfaces/Drink";
import StockTable from "@/components/StockTable";
import StockPagination from "@/components/StockPagination";
import useSWR from "swr";

const inter = Inter({ subsets: ["latin"] });

interface DrinksProps {
  drinks: Drink[];
}

const stockFetcher = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

const Stock: NextPageWithLayout<{}> = () => {
  const {
    data: drinks,
    error,
    isLoading,
  } = useSWR("http://localhost:3000/api/stock", stockFetcher);

  const [page, setPage] = useState(1);

  if (error) return <div>Error loading data {error}</div>;
  if (isLoading) return <div>Loading...</div>;

  const itemsPerPage = 10;
  const totalPages = Math.ceil(drinks.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, drinks.length);

  return (
    <div className="w-full max-w-screen-xl">
      <p>Welcome to the Stock Screen</p>
      <div className="max-w-2xl m-auto mt-5">
        <StockTable drinks={drinks.slice(startIndex, endIndex)} />
      </div>
      <div className="max-w-xl m-auto mt-5 text-secondary ">
        <StockPagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

Stock.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Stock;
