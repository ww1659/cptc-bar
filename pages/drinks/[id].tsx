import type { ReactElement } from "react";
import type { NextPageWithLayout } from ".././_app";
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
import DrinkCardSkeleton from "@/components/DrinkCardSkeleton";

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

  if (error) return <div>Error loading data {error}</div>;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center flex-row mb-5">
        <div className="flex">
          <Button
            className="mx-2 border border-green-800"
            onClick={handleGoBack}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <p className="hidden text-2xl text-green-800 font-medium mx-2 sm:block">
            <span className="text-black">drinks/</span>
            {id}
          </p>
        </div>
        <div className="flex flex-row">
          {/* <div className="mr-1 ">
            <Button className="p-2" onClick={() => handleClearOrder()}>
              <Trash2Icon className="h-5 w-5 mx-1 text-red-700" />
            </Button>
          </div> */}
          <div className="ml-1">
            <OrderButton />
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center flex-row flex-wrap">
          <DrinkCardSkeleton />
          <DrinkCardSkeleton />
          <DrinkCardSkeleton />
          <DrinkCardSkeleton />
          <DrinkCardSkeleton />
          <DrinkCardSkeleton />
        </div>
      ) : (
        <div className="flex justify-center flex-row flex-wrap">
          {drinks.map((drink: Drink) => {
            if (drink.quantity === 0) {
              return null;
            }
            return (
              <>
                <DrinkCard key={drink.drinks_id} {...drink} />{" "}
              </>
            );
          })}
        </div>
      )}
    </div>
  );
};

Drinks.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Drinks;
