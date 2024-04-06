import React from "react";
import Link from "next/link";
import Image from "next/image";

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
    <nav className="bg-stone-200 border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          {/* <Image
            src="/images/CPTCLOGO.png"
            className="aspect-auto"
            width={100}
            height={0}
            alt="CPTC Logo"
            style={{ width: "100%", height: "auto" }}
          /> */}
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            CPTC Bar Inventory
          </span>
        </Link>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-black rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-primary">
            {menuItems.map((item) => (
              <li key={item.text}>
                <Link href={item.href}>{item.text}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
