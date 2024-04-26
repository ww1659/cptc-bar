import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SignedOut, UserButton, useAuth } from "@clerk/nextjs";
import SignInButton from "../components/SignInButton";
import { useUser } from "@clerk/nextjs";
import { MenuDialog } from "./MenuDialog";

interface NavItem {
  text: string;
  href: string;
  protected: boolean;
}

const menuItems: NavItem[] = [
  { text: "Home", href: "/", protected: false },
  { text: "Sales", href: "/sales", protected: false },
  { text: "Stock", href: "/stock", protected: true },
  { text: "Order", href: "/order", protected: false },
];

export default function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <nav className="border-b-2 border-green-800">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div>
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image
              src="/images/cotham-mole-no-text.png"
              className="aspect-auto"
              width={60}
              height={60}
              alt="CPTC Logo"
              style={{ width: "100%", height: "auto" }}
              priority={true}
              quality={100}
              placeholder="empty"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-green-800">
              The Cotham Mole
            </span>
          </Link>
        </div>

        <div className="flex ml-auto md:hidden">
          <MenuDialog menuItems={menuItems} />
        </div>

        <div
          className="hidden w-full h-100 md:block md:w-auto ml-auto"
          id="navbar-default"
        >
          <ul className="flex flex-col p-4 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 font-bold text-lg">
            {menuItems.map((item) => {
              if (item.protected && !isSignedIn) {
                return null;
              } else {
                return (
                  <li key={item.text}>
                    <Link className="hover:text-green-800" href={item.href}>
                      {item.text}
                    </Link>
                  </li>
                );
              }
            })}
          </ul>
        </div>

        <div className="hidden flex flex-row items-center justify-between md:block">
          <div className="mx-2">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-11 w-11",
                },
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
