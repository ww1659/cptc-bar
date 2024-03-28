import React, { PropsWithChildren } from "react";
import Navbar from "./Navbar";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <main className="h-screen flex justify-center p-4">{children}</main>
    </>
  );
}
