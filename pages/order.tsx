import type { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import { Inter } from "next/font/google";
import Layout from "../components/Layout";
import OrderTable from "@/components/OrderTable";
import { useOrder } from "@/contexts/OrderContext";
import PlaceOrderButton from "@/components/PlaceOrderButton";

const inter = Inter({ subsets: ["latin"] });

const formatTotal = (total: number) => {
  return total.toFixed(2);
};

const Order: NextPageWithLayout = () => {
  const { order } = useOrder();
  const { totalPrice } = order;

  console.log(order);

  return (
    <div className="w-full max-w-screen-xl">
      <p className="text-2xl text-green-800">Your Order</p>
      <p className="text-md">View and manage your order</p>
      <div className="max-w-xl mx-auto mt-5">
        <OrderTable />
        <div className="flex flex-row mr-4 my-4 justify-end">
          <p className="text-xl">£{formatTotal(totalPrice)}</p>
        </div>
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
