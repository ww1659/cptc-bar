import { useState, type ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import Layout from "../components/Layout";
import { NewDrinkForm } from "@/components/NewDrinkForm";

const CreateNewDrink: NextPageWithLayout = () => {
  return (
    <div className="w-full max-w-screen-xl">
      <div className="flex max-w-2xl mx-auto justify-center items-start mb-3">
        <p className="text-2xl text-green-800 font-medium">
          Create a New Drink Item
        </p>
      </div>
      <div className="max-w-2xl mx-auto my-1">
        <NewDrinkForm />
      </div>
    </div>
  );
};

CreateNewDrink.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default CreateNewDrink;
