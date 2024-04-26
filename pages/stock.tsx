import { useState, type ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import Layout from "../components/Layout";
import { StockTable } from "@/components/StockTableV2";
import useSWR from "swr";
import { StockTableColumns } from "@/components/StockTableColumns";
import CreateDrinkButton from "@/components/CreateDrinkButton";
import { useAuth } from "@clerk/nextjs";
import { useLocalAuth } from "@/contexts/AuthContext";

interface DrinkFromDB {
  drinks_id: number;
  brewery: string;
  type: string;
  name: string;
  quantity: number;
  cost: string;
  selling_price: string;
  profit_item: string;
  inc: string;
}

const stockFetcher = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

const Stock: NextPageWithLayout<{}> = () => {
  const { data: drinks, error, isLoading } = useSWR("/api/stock", stockFetcher);
  const { userRole } = useLocalAuth();

  const { isLoaded, userId } = useAuth();
  if (!isLoaded || !userId) {
    return null;
  }

  if (error) return <div>Error loading data {error}</div>;
  if (isLoading) return <div>Loading...</div>;
  else if (!isLoading && !error) {
    const stockTableData = drinks.map((drink: DrinkFromDB) => {
      return {
        ...drink,
        inc: Number(drink.inc).toFixed(2),
        profit_item: Number(drink.profit_item).toFixed(2),
      };
    });

    return (
      <div className="w-full">
        <div className="flex flex-row justify-between max-w-4xl mx-auto items-center mb-3">
          <div className="flex flex-col items-start">
            <p className="text-2xl text-green-800 font-medium">Stock</p>
            <p className="text-md">View, update and manage your stock</p>
          </div>
          <div>
            <CreateDrinkButton userRole={userRole} />
          </div>
        </div>
        <div className="max-w-4xl m-auto my-1 mb-10">
          {isLoading ? (
            <>
              <p>Loading Skeleton</p>
            </>
          ) : (
            <div>
              <StockTable
                columns={StockTableColumns}
                data={stockTableData}
                userRole={userRole}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
};

Stock.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Stock;
