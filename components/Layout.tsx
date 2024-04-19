import React, { PropsWithChildren } from "react";
import Navbar from "./Navbar";
import { Toaster } from "./ui/Toaster";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "./Footer";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <ClerkProvider
        appearance={{
          elements: {
            userButtonPopoverFooter: "hidden",
            footer: "hidden",
          },
          layout: {
            showOptionalFields: true,
          },
          variables: {
            colorPrimary: "#166534",
          },
        }}
      >
        <div className="">
          <Navbar />
          <main className="h-screen max-w-screen-xl mx-auto flex justify-center p-4">
            {children}
          </main>
          <Toaster />
        </div>
      </ClerkProvider>
    </>
  );
}
