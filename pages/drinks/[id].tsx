import type { ReactElement } from "react";
import type { NextPageWithLayout } from ".././_app";
import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { useRouter } from "next/router";

//components
import Layout from "../../components/Layout";
import DrinkCard from "../../components/DrinkCard";

//interfaces
import { Drink } from "../../interfaces/Drink";
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

  // Make API call to fetch drinks by category using id
  console.log(id, "id page");
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

  return (
    <div className="w-full max-w-screen-xl">
      <p className="text-2xl">Welcome to the {id} screen!</p>
      <div className="flex justify-center flex-row flex-wrap">
        {drinks.map((drink) => (
          <DrinkCard key={drink.drinks_id} {...drink} />
        ))}
      </div>
    </div>
  );
};

Drinks.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Drinks;
