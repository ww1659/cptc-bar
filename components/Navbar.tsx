import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, UserButton } from "@clerk/nextjs";
import SignOutButton from "../components/SignOutButton";

interface NavItem {
  text: string;
  href: string;
}

const menuItems: NavItem[] = [
  { text: "Home", href: "/" },
  { text: "Sales", href: "/sales" },
  { text: "Stock", href: "/stock" },
  { text: "Order", href: "/order" },
];

export default function Navbar() {
  return (
    <nav className="border-b-2 border-green-800 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div>
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
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              The Cotham Mole
            </span>
          </Link>
        </div>

        <SignedIn>
          <div
            className="hidden w-full h-100 md:block md:w-auto"
            id="navbar-default"
          >
            <ul className="flex flex-col p-4 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-primary font-bold text-lg">
              {menuItems.map((item) => (
                <li key={item.text}>
                  <Link className="hover:text-green-800" href={item.href}>
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </SignedIn>

        <div className="flex flex-row items-center justify-between">
          <SignedIn>
            <div className="mx-2">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
