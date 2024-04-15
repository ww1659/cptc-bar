import React from "react";
import { Button } from "./ui/Button";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/router";

const CreateDrinkButton: React.FC<{}> = () => {
  const router = useRouter();

  const handleClick = () => {
    console.log("boom");
    router.push("/create-new-drink");
  };

  return (
    <Button className="rounded-full bg-green-800">
      <PlusIcon
        className="h-6 w-6 text-white"
        onClick={() => {
          handleClick();
        }}
      />
    </Button>
  );
};

export default CreateDrinkButton;
