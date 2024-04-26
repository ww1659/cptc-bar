import { MenuIcon } from "lucide-react";
import { Button } from "./ui/Button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/Sheet";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";

interface NavItem {
  text: string;
  href: string;
  protected: boolean;
}

interface MenuDialogProps {
  menuItems: NavItem[];
}

export const MenuDialog: React.FC<MenuDialogProps> = ({ menuItems }) => {
  const { isSignedIn } = useUser();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[250px]">
        <SheetHeader>
          <SheetTitle className="text-green-800 text-left">Menu</SheetTitle>
        </SheetHeader>
        <ul className="flex flex-col items-center rounded-lg font-bold text-lg">
          {menuItems.map((item) => {
            if (item.protected && !isSignedIn) {
              return null;
            } else {
              return (
                <li key={item.text} className="my-4">
                  <SheetClose asChild>
                    <Link className="hover:text-green-800" href={item.href}>
                      {item.text}
                    </Link>
                  </SheetClose>
                </li>
              );
            }
          })}
        </ul>
        <SheetFooter className="sm:justify-center">
          <SheetClose asChild>
            <div className="my-4">{isSignedIn ? <SignOutButton /> : null}</div>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
