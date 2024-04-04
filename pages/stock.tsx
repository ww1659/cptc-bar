import type { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import { Inter } from "next/font/google";
import Layout from "../components/Layout";
import { Drink } from "@/interfaces/Drink";
import StockTable from "@/components/StockTable";

const inter = Inter({ subsets: ["latin"] });

interface DrinksProps {
  drinks: Drink[];
}

export async function getStaticProps() {
  const response = await fetch(`http://localhost:3000/api/stock`);
  const drinks: Drink[] = await response.json();

  return {
    props: {
      drinks,
    },
    revalidate: 60,
  };
}

const Stock: NextPageWithLayout<DrinksProps> = ({ drinks }) => {
  return (
    <div className="w-full max-w-screen-xl">
      <p>Welcome to the Stock Screen</p>
      <div className="max-w-xl m-auto mt-5">
        <StockTable drinks={drinks} />
      </div>
    </div>
  );
};

Stock.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Stock;
