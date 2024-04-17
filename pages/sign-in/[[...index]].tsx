import { SignIn } from "@clerk/nextjs";
import React, { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import Layout from "@/components/Layout";

const Page: NextPageWithLayout = () => {
  return (
    <div className="my-10">
      <SignIn />
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
