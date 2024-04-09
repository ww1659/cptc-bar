import { useState, type ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import Layout from "../components/Layout";
import { Sale, SaleItem } from "@/interfaces/Sale";
import useSWR from "swr";
import { DataTable } from "@/components/SalesTableV2";
import { SalesTableColumns } from "../components/SalesTableColumns";

interface SalesProps {
  sales: Sale[];
}

const salesFetcher = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

const Sales: NextPageWithLayout<SalesProps> = () => {
  const { data: sales, error, isLoading } = useSWR("/api/sales", salesFetcher);

  if (error) return <div>Error loading data {error}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full max-w-screen-xl">
      <div className="flex flex-row max-w-2xl mx-auto items-center mb-3">
        <p className="text-2xl text-green-800 font-medium">Drink Sales</p>
      </div>
      <div className="max-w-2xl mx-auto my-1 mb-10">
        {isLoading ? (
          <>
            <p>Loading Skeleton</p>
          </>
        ) : (
          <div>
            <DataTable columns={SalesTableColumns} data={sales} />
          </div>
        )}
      </div>
    </div>
  );
};

Sales.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Sales;
