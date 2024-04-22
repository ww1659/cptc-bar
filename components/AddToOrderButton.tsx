import { useOrder } from "@/contexts/OrderContext";
import React from "react";
import { Button } from "./ui/Button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Drink } from "@/interfaces/Drink";

const AddToOrderButton: React.FC<Drink> = ({
  drinks_id,
  brewery,
  type,
  name,
  quantity,
  cost,
  selling_price,
  profit_item,
}) => {
  const { addToOrder } = useOrder();

  const handleAddToOrder = (drink: Drink) => {
    addToOrder(drink);
  };

  return (
    <Button
      variant="outline"
      onClick={() =>
        handleAddToOrder({
          drinks_id,
          brewery,
          type,
          name,
          quantity,
          cost,
          selling_price,
          profit_item,
        })
      }
    >
      <PlusCircledIcon className="h-5 w-5" />
    </Button>
  );
};

export default AddToOrderButton;
