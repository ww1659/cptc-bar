import type { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import { Inter } from "next/font/google";
import Layout from "../components/Layout";
import OrderTable from "@/components/OrderTable";
import { useOrder } from "@/contexts/OrderContext";
import PlaceOrderButton from "@/components/PlaceOrderButton";

const inter = Inter({ subsets: ["latin"] });

const Order: NextPageWithLayout = () => {
  const { order } = useOrder();
  const { totalPrice } = order;

  return (
    <div className="w-full max-w-screen-xl">
      <p>Welcome to the Orders Screen</p>
      <div className="max-w-md mx-auto m-top-5">
        <OrderTable />
        <div className="m-3 text-right">Total: £{totalPrice}</div>
        <div>
          <PlaceOrderButton />
        </div>
      </div>
    </div>
  );
};

Order.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Order;
