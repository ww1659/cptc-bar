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
      <div className="hover:text-green-800 hover:scale-105 p-3 m-3 rounded-xl shadow-lg flex flex-col items-center justify-center gap-2 w-40 h-40 border border">
        {icon && <div className="mb-2">{icon}</div>}
        <h3 className="text-xl font-medium">{title}</h3>
      </div>
    </button>
  );
};

export default DrinkBlock;
