import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  AppleIcon,
  BeerIcon,
  BeerOffIcon,
  GlassWaterIcon,
  MartiniIcon,
  WineIcon,
} from "lucide-react";

interface DrinkBlockProps {
  title: string;
  href: string;
  icon?: React.ReactNode;
}

const DrinkBlock: React.FC<DrinkBlockProps> = ({ title, href, icon }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/drinks/${title.split(" ").join("").toLowerCase()}`);
  };

  return (
    <button onClick={handleClick} className="...">
      <div className="hover:text-green-800 hover:scale-105 m-3 rounded-xl shadow-lg flex flex-col items-center justify-center gap-2 w-52 h-52 border">
        {icon && <div className="mb-2">{icon}</div>}
        {title === "Good Chemistry" ? (
          <div className="rounded-xl overflow-hidden">
            <Image
              src="/images/logos/gc-logo.png"
              className="aspect-auto"
              width={500}
              height={500}
              alt="gc logo"
              quality={100}
              placeholder="empty"
            />
          </div>
        ) : title === "Wiper & True" ? (
          <Image
            src="/images/logos/wt-logo.png"
            className="aspect-auto"
            width={150}
            height={150}
            alt="w&t logo"
            quality={100}
            placeholder="empty"
          />
        ) : (
          <div className="flex flex-col items-center">
            <h3 className="flex text-2xl font-medium mb-2">{title}</h3>
            <div className="flex mt-2">
              {title === "Lager" ? (
                <BeerIcon className="h-7 w-7" />
              ) : title === "Bitter" ? (
                <BeerIcon className="h-7 w-7" />
              ) : title === "Ale" ? (
                <BeerIcon className="h-7 w-7" />
              ) : title === "Wine" ? (
                <WineIcon className="h-7 w-7" />
              ) : title === "Cider" ? (
                <AppleIcon className="h-7 w-7" />
              ) : title === "Soft Drinks" ? (
                <GlassWaterIcon className="h-7 w-7" />
              ) : title === "Low to No" ? (
                <BeerOffIcon className="h-7 w-7" />
              ) : title === "Spirits" ? (
                <MartiniIcon className="h-7 w-7" />
              ) : null}
            </div>
          </div>
        )}
      </div>
    </button>
  );
};

export default DrinkBlock;
