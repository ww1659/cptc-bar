import React from "react";
import { useRouter } from "next/router";

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
      <div className="hover:text-green-700 hover:scale-105 bg-stone-100 p-4 m-4 rounded-lg shadow-lg flex flex-col items-center justify-center gap-2 w-48 h-48 border">
        {icon && <div className="mb-2">{icon}</div>}
        <h3 className="text-xl font-medium">{title}</h3>
      </div>
    </button>
  );
};

export default DrinkBlock;
