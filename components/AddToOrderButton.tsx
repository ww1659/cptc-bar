import { useOrder } from "@/contexts/OrderContext";
import React from "react";
import { Button } from "./ui/Button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Drink } from "@/interfaces/Drink";

interface AddToOrderButtonProps extends Drink {
  drinkCard?: boolean;
}

const AddToOrderButton: React.FC<AddToOrderButtonProps> = ({
  drinks_id,
  brewery,
  type,
  name,
  quantity,
  cost,
  selling_price,
  profit_item,
  drinkCard,
}) => {
  const { addToOrder } = useOrder();

  const handleAddToOrder = (drink: Drink) => {
    addToOrder(drink);
  };

  return (
    <Button
      variant={`${drinkCard ? "ghost" : "outline"}`}
      className={`${drinkCard ? "h-[56px] w-[158px]" : ""}`}
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
      <PlusCircledIcon className={`${drinkCard ? "h-7 w-7" : "h-5 w-5"}`} />
    </Button>
  );
};

export default AddToOrderButton;
