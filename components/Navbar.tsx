import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SignedOut, UserButton, useAuth } from "@clerk/nextjs";
import SignInButton from "../components/SignInButton";
import { useUser } from "@clerk/nextjs";

interface NavItem {
  text: string;
  href: string;
  protected: boolean;
}

const menuItems: NavItem[] = [
  { text: "Home", href: "/", protected: false },
  { text: "Sales", href: "/sales", protected: true },
  { text: "Stock", href: "/stock", protected: true },
  { text: "Order", href: "/order", protected: false },
];

export default function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <nav className="border-b-2 border-green-800 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image
              src="/images/cotham-mole-no-text.png"
              className="aspect-auto"
              width={50}
              height={100}
              alt="CPTC Logo"
              style={{ width: "100%", height: "auto" }}
              priority={true}
              placeholder="empty"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-green-800 dark:text-white">
              The Cotham Mole
            </span>
          </Link>
        </div>

        <div
          className="hidden w-full h-100 md:block md:w-auto  ml-auto"
          id="navbar-default"
        >
          <ul className="flex flex-col p-4 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-primary font-bold text-lg">
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

        <div className="flex flex-row items-center justify-between">
          <div className="mx-2">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-11 w-11",
                },
              }}
            />
            <SignedOut>
              <SignInButton />
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
}
