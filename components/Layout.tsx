import React, { PropsWithChildren } from "react";
import Navbar from "./Navbar";
import { Toaster } from "./ui/Toaster";
import { ClerkProvider, SignedIn } from "@clerk/nextjs";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <ClerkProvider
        appearance={{
          elements: {
            // formInternal: "bg-green-800",
            // formButtonPrimary:
            //   "bg-green-800 hover:bg-green-800 text-sm normal-case",
            // formFieldAction: "text-green-800 hover:text-green-900",
            // footerActionLink: "text-green-800 hover:text-green-900",
            // formFieldInput: "accent-green-800",
            // identityPreviewEditButton: "text-green-800 hover:text-green-900",
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
