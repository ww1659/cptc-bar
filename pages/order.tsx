import { useState, type ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import Layout from "../components/Layout";
import OrderTable from "@/components/OrderTable";
import { useOrder } from "@/contexts/OrderContext";
import PlaceOrderButton from "@/components/PlaceOrderButton";
import { DiscountSelector } from "@/components/DiscountSelector";
import { OrderDialog } from "@/components/OrderDialog";
import useSWR from "swr";

const formatTotal = (total: number) => {
  return total.toFixed(2);
};

const userFetcher = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

const Order: NextPageWithLayout = () => {
  const { order } = useOrder();
  const { totalPrice } = order;
  const [discount, setDiscount] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data: user } = useSWR("/api/user", userFetcher);

  let userRole = "";
  if (user) {
    userRole = user.userRole;
  }
  const totalWithDiscount = totalPrice * ((100 - Number(discount)) / 100);

  return (
    <div className="w-full">
      <div className="flex flex-col max-w-2xl mx-auto items-start mb-3">
        <p className="text-2xl text-green-800 font-medium">Order</p>
        <p className="text-md">View and manage items in your order</p>
      </div>

      <div className="max-w-xl mx-auto mt-5">
        <OrderTable discount={discount} />
        <div className="flex flex-row mr-4 my-4 justify-end">
          {discount !== "0" && discount !== "" ? (
            <p className="text-xl mr-3">£{formatTotal(totalWithDiscount)}</p>
          ) : null}
          {discount !== "0" && discount !== "" ? (
            <p className="text-xl line-through">£{formatTotal(totalPrice)}</p>
          ) : (
            <p className="text-xl">£{formatTotal(totalPrice)}</p>
          )}
        </div>
        <div>
          <PlaceOrderButton setDialogOpen={setDialogOpen} />
        </div>
        <div className="flex flex-row my-4 justify-end">
          <div>
            {userRole === "admin" && (
              <DiscountSelector value={discount} setValue={setDiscount} />
            )}
          </div>
        </div>
      </div>
      {dialogOpen ? (
        <OrderDialog
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          discount={discount}
        />
      ) : null}
    </div>
  );
};

Order.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Order;
