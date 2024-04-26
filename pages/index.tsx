import type { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import Layout from "../components/Layout";
import DrinkBlock from "../components/DrinkBlock";
import OrderButton from "@/components/OrderButton";
import { HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLocalAuth } from "@/contexts/AuthContext";
import { useAuth } from "@clerk/nextjs";
import { OrganizationSwitcher, Protect } from "@clerk/clerk-react";

const drinks = [
  { title: "Good Chemistry", href: "/drinks" },
  { title: "Wiper & True", href: "/drinks" },
  { title: "Beer", href: "/drinks" },
  { title: "Cider", href: "/drinks" },
  { title: "Wine", href: "/drinks" },
  { title: "Spirits", href: "/drinks" },
  { title: "Low to No", href: "/drinks" },
  { title: "Soft Drinks", href: "/drinks" },
];

const Page: NextPageWithLayout = () => {
  const { userRole } = useLocalAuth();

  console.log(userRole);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center flex-row mb-3">
        <div className="flex items-center">
          <Button className="mx-2 border border-green-800 p-2">
            <HomeIcon className="h-5 w-5 rounded-lg text-white-800" />
          </Button>
          <h1 className="text-2xl font-medium">Build your order</h1>
        </div>
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
