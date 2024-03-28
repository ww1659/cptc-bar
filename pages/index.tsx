import type { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import { Inter } from "next/font/google";
import Layout from "../components/Layout";
import DrinkBlock from "../components/DrinkBlock";

const drinks = [
  { title: "Good Chemistry", href: "/drinks" },
  { title: "Wiper & True", href: "/drinks" },
  { title: "Beer", href: "/drinks" },
  { title: "Cider", href: "/drinks" },
  { title: "Wine", href: "/drinks" },
  { title: "Spirits", href: "/drinks" },
  { title: "Soft Drinks", href: "/drinks" },
];

const inter = Inter({ subsets: ["latin"] });

const Page: NextPageWithLayout = () => {
  return (
    <div className="w-full max-w-screen-xl">
      <p className="text-2xl">Welcome!</p>
      <div className="flex justify-center flex-row flex-wrap">
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
