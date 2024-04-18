import type { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import Layout from "../components/Layout";
import DrinkBlock from "../components/DrinkBlock";
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

const Page: NextPageWithLayout = () => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center flex-row mb-3">
        <p className="text-2xl font-medium">Build your Order</p>
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
