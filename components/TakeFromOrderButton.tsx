import { useOrder } from "@/contexts/OrderContext";
import React from "react";
import { Button } from "./ui/Button";
import { MinusCircledIcon } from "@radix-ui/react-icons";
import { Drink } from "@/interfaces/Drink";

interface TakeFromOrderButtonProps extends Drink {
  disabled?: number;
  drinkCard?: boolean;
}

const TakeFromOrderButton: React.FC<TakeFromOrderButtonProps> = ({
  drinks_id,
  brewery,
  type,
  name,
  quantity,
  cost,
  selling_price,
  profit_item,
  disabled,
  drinkCard,
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
      variant={`${drinkCard ? "ghost" : "outline"}`}
      disabled={drinkQuantity === disabled}
      className={`${drinkCard ? "h-[56px] w-[158px]" : ""}`}
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
      <MinusCircledIcon className={`${drinkCard ? "h-7 w-7" : "h-5 w-5"}`} />
    </Button>
  );
};

export default TakeFromOrderButton;
