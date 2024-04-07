import { useState, type ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import { Inter } from "next/font/google";
import Layout from "../components/Layout";
import SalesTable from "@/components/SalesTable";
import { Sale } from "@/interfaces/Sale";
import SalesPagination from "@/components/SalesPagination";

const inter = Inter({ subsets: ["latin"] });

interface SalesProps {
  sales: Sale[];
}

export async function getStaticProps() {
  const response = await fetch(process.env.URL + "/api/sales", {
    method: "GET",
  });

  const sales: Sale[] = await response.json();

  return {
    props: {
      sales,
    },
    revalidate: 60,
  };
}

const Sales: NextPageWithLayout<SalesProps> = ({ sales }) => {
  const [page, setPage] = useState(1);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(sales.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, sales.length);

  return (
    <div className="w-full max-w-screen-xl">
      <p className="text-2xl text-green-800">Sales</p>
      <p className="text-md">View and export sales here</p>
      <div className="max-w-2xl mx-auto mt-5">
        <SalesTable sales={sales.slice(startIndex, endIndex)} />
      </div>
      <div className="max-w-2xl m-auto mt-5 text-secondary ">
        <SalesPagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

Sales.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Sales;
