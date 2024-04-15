import { useState, type ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import Layout from "../components/Layout";
import { StockTable } from "@/components/StockTableV2";
import useSWR from "swr";
import { StockTableColumns } from "@/components/StockTableColumns";
import CreateDrinkButton from "@/components/CreateDrinkButton";

const stockFetcher = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

const Stock: NextPageWithLayout<{}> = () => {
  const { data: drinks, error, isLoading } = useSWR("/api/stock", stockFetcher);

  if (error) return <div>Error loading data {error}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full max-w-screen-xl">
      <div className="flex flex-row justify-between max-w-2xl mx-auto items-center mb-3">
        <div className="flex flex-col items-start">
          <p className="text-2xl text-green-800 font-medium">Stock</p>
          <p className="text-md">View, update and manage your stock here...</p>
        </div>
        <div>
          <CreateDrinkButton />
        </div>
      </div>
      <div className="max-w-2xl m-auto my-1 mb-10">
        {isLoading ? (
          <>
            <p>Loading Skeleton</p>
          </>
        ) : (
          <div>
            <StockTable columns={StockTableColumns} data={drinks} />
          </div>
        )}
      </div>
    </div>
  );
};

Stock.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Stock;
