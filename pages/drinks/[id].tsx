import type { ReactElement } from "react";
import type { NextPageWithLayout } from ".././_app";
import { Inter } from "next/font/google";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

const Drinks: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  return <p>Welcome to the {id} Screen</p>;
};

Drinks.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Drinks;
