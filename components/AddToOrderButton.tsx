import { useOrder } from "@/contexts/OrderContext";
import React from "react";
import { Button } from "./ui/Button";
import { PlusIcon } from "@radix-ui/react-icons";
import { DrinkOrder } from "@/interfaces/Drink";

const AddToOrderButton: React.FC<DrinkOrder> = ({
  drinks_id,
  type,
  name,
  selling_price,
}) => {
  const { addToOrder } = useOrder();

  const handleAddToOrder = (drink: DrinkOrder) => {
    addToOrder(drink);
  };

  return (
    <Button
      size="icon"
      onClick={() => handleAddToOrder({ drinks_id, type, name, selling_price })}
    >
      <PlusIcon className="h-5 w-5" />
    </Button>
  );
};

export default AddToOrderButton;
