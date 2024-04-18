import { type ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import Layout from "../components/Layout";
import { Sale } from "@/interfaces/Sale";
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
    <div className="w-full">
      <div className="flex flex-col max-w-3xl mx-auto items-start mb-3">
        <p className="text-2xl text-green-800 font-medium">Sales</p>
        <p className="text-md">Export and view previous sales</p>
      </div>
      <div className="max-w-3xl mx-auto my-1 mb-10">
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
