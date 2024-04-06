import { useOrder } from "@/contexts/OrderContext";
import React from "react";
import { Button } from "./ui/Button";
import { MinusCircledIcon } from "@radix-ui/react-icons";
import { Drink } from "@/interfaces/Drink";

const TakeFromOrderButton: React.FC<Drink> = ({
  drinks_id,
  brewery,
  type,
  name,
  quantity,
  cost,
  selling_price,
  profit_item,
}) => {
  const { takeFromOrder, order } = useOrder();

  const handleTakeFromOrder = (drink: Drink) => {
    takeFromOrder(drink);
  };

  const drinkIndex = order.items.findIndex(
    (item) => item.drink.drinks_id === drinks_id
  );

  let drinkQuantity = 0;
  if (drinkIndex !== -1) {
    drinkQuantity = order.items[drinkIndex].quantityOrdered;
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      className="text-green-800 border"
      disabled={drinkQuantity < 2}
      onClick={() =>
        handleTakeFromOrder({
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
      <MinusCircledIcon className="h-5 w-5" />
    </Button>
  );
};

export default TakeFromOrderButton;
