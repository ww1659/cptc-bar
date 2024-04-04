import { useOrder } from "@/contexts/OrderContext";
import React from "react";
import { Button } from "./ui/Button";
import { MinusIcon } from "@radix-ui/react-icons";
import { DrinkOrder } from "@/interfaces/Drink";

const TakeFromOrderButton: React.FC<DrinkOrder> = ({
  drinks_id,
  type,
  name,
  selling_price,
}) => {
  const { takeFromOrder } = useOrder();

  const handleTakeFromOrder = (drink: DrinkOrder) => {
    takeFromOrder(drink);
  };

  return (
    <Button
      size="icon"
      onClick={() =>
        handleTakeFromOrder({ drinks_id, type, name, selling_price })
      }
    >
      <MinusIcon className="h-5 w-5" />
    </Button>
  );
};

export default TakeFromOrderButton;
