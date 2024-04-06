import type { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import { Inter } from "next/font/google";
import Layout from "../components/Layout";
import DrinkBlock from "../components/DrinkBlock";
import { useOrder } from "@/contexts/OrderContext";
import OrderButton from "@/components/OrderButton";

const drinks = [
  { title: "Good Chemistry", href: "/drinks" },
  { title: "Wiper & True", href: "/drinks" },
  { title: "Lager", href: "/drinks" },
  { title: "Bitter", href: "/drinks" },
  { title: "Ale", href: "/drinks" },
  { title: "Cider", href: "/drinks" },
  { title: "Wine", href: "/drinks" },
  { title: "Spirits", href: "/drinks" },
  { title: "Low to No", href: "/drinks" },
  { title: "Soft Drinks", href: "/drinks" },
];

const inter = Inter({ subsets: ["latin"] });

const Page: NextPageWithLayout = () => {
  const { order, addToOrder, clearOrder } = useOrder();

  console.log(order, "current ORDER");

  return (
    <div className="w-full max-w-screen-xl">
      <div className="flex justify-between items-center flex-row">
        <p className="text-2xl text-green-800">Build Order</p>
        <OrderButton />
      </div>
      <div className="flex justify-center flex-row flex-wrap my-5">
        {drinks.map((drink) => (
          <DrinkBlock key={drink.title} {...drink} />
        ))}
      </div>
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
