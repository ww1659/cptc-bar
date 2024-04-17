import React, { PropsWithChildren } from "react";
import Navbar from "./Navbar";
import { Toaster } from "./ui/Toaster";
import { ClerkProvider } from "@clerk/nextjs";

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
        <Navbar />
        <main className="h-screen flex justify-center p-4">{children}</main>
        <Toaster />
      </ClerkProvider>
    </>
  );
}
