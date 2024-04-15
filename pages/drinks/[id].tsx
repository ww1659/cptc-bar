import type { ReactElement } from "react";
import type { NextPageWithLayout } from ".././_app";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { useRouter } from "next/router";
import useSWR from "swr";

//components
import Layout from "../../components/Layout";
import DrinkCard from "../../components/DrinkCard";

//interfaces
import { Drink } from "../../interfaces/Drink";
import { Button } from "@/components/ui/Button";
import { useOrder } from "@/contexts/OrderContext";
import OrderButton from "@/components/OrderButton";
import { ArrowLeft } from "lucide-react";

interface DrinksProps {
  drinks: Drink[];
}

const drinksFetcher = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

const Drinks: NextPageWithLayout<DrinksProps> = () => {
  const router = useRouter();
  const { id } = router.query;
  const { clearOrder } = useOrder();
  const {
    data: drinks,
    error,
    isLoading,
  } = useSWR(`/api/drinks/${id}`, drinksFetcher);

  const handleClearOrder = () => {
    clearOrder();
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="w-full max-w-screen-xl">
      <div className="flex justify-between items-center flex-row mb-5">
        <div className="flex">
          <Button
            className="mx-2 border border-green-800"
            onClick={handleGoBack}
          >
            <ArrowLeft className="h-4 w-4 text-green-800" />
          </Button>
          <p className="text-2xl text-green-800 font-medium mx-2">
            <span className="text-black">drinks/</span>
            {id}
          </p>
        </div>
        <div>
          <OrderButton />
        </div>
      </div>
      {drinks ? (
        <div className="flex justify-center flex-row flex-wrap">
          {drinks.map((drink: Drink) => (
            <DrinkCard key={drink.drinks_id} {...drink} />
          ))}
        </div>
      ) : null}

      <div className="flex justify-center flex-row flex-wrap">
        <Button onClick={() => handleClearOrder()}>Clear Order</Button>
      </div>
    </div>
  );
};

Drinks.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Drinks;
