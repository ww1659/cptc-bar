import type { ReactElement } from "react";
import type { NextPageWithLayout } from ".././_app";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { useRouter } from "next/router";

//components
import Layout from "../../components/Layout";
import DrinkCard from "../../components/DrinkCard";

//interfaces
import { Drink } from "../../interfaces/Drink";
import { Button } from "@/components/ui/Button";
import { useOrder } from "@/contexts/OrderContext";
import OrderButton from "@/components/OrderButton";

interface DrinksProps {
  drinks: Drink[];
}

export async function getStaticPaths() {
  const types = [
    "goodchemistry",
    "wiper&true",
    "lager",
    "bitter",
    "ale",
    "cider",
    "wine",
    "spirits",
    "lowtono",
    "softdrinks",
  ];

  return {
    paths: types.map((category) => ({ params: { id: category } })),
    fallback: "blocking",
  };
}

export async function getStaticProps(context: { params: { id: string } }) {
  const { id } = context.params;

  const response = await fetch(`http://localhost:3000/api/drinks/${id}`);
  const drinks: Drink[] = await response.json();

  return {
    props: {
      drinks,
    },
    revalidate: 60,
  };
}

const Drinks: NextPageWithLayout<DrinksProps> = ({ drinks }) => {
  const router = useRouter();
  const { id } = router.query;
  const { order, addToOrder, clearOrder } = useOrder();

  const handleClearOrder = () => {
    clearOrder();
  };

  return (
    <div className="w-full max-w-screen-xl">
      <p className="text-2xl">Welcome to the {id} screen!</p>

      <div className="flex justify-center flex-row flex-wrap">
        {drinks.map((drink) => (
          <DrinkCard key={drink.drinks_id} {...drink} />
        ))}
      </div>
      <div className="flex justify-center flex-row flex-wrap">
        <Button onClick={() => handleClearOrder()}>Clear Order</Button>
      </div>
      <div>
        <OrderButton />
      </div>
    </div>
  );
};

Drinks.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Drinks;
