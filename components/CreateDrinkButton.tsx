import React from "react";
import { Button } from "./ui/Button";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/router";

const CreateDrinkButton: React.FC<{ userRole: string }> = ({ userRole }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/create-new-drink");
  };

  return (
    <Button
      disabled={userRole !== "admin"}
      className="rounded-full bg-green-800"
    >
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
