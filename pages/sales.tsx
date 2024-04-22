import { type ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import Layout from "../components/Layout";
import { Sale } from "@/interfaces/Sale";
import useSWR from "swr";
import { DataTable } from "@/components/SalesTableV2";
import { SalesTableColumns } from "../components/SalesTableColumns";
import { Button } from "@/components/ui/Button";
import { downloadSalesCsv } from "@/utils/helperFunctions";
import { SignedIn } from "@clerk/nextjs";

interface SalesProps {
  sales: Sale[];
}

const salesFetcher = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

const Sales: NextPageWithLayout<SalesProps> = () => {
  const { data: sales, error, isLoading } = useSWR("/api/sales", salesFetcher);
  console.log(sales);

  const handleClick = async (sales: Sale[]) => {
    try {
      console.log(sales);
      downloadSalesCsv(sales);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  if (error) return <div>Error loading data {error}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between max-w-3xl items-center mx-auto mb-3">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl text-green-800 font-medium">Sales</h1>
          <h3 className="text-md">Export and view previous sales</h3>
        </div>
        <div>
          <SignedIn>
            <Button
              className="bg-green-800 text-white"
              onClick={() => handleClick(sales)}
            >
              Generate CSV
            </Button>
          </SignedIn>
        </div>
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
