import { useOrder } from "@/contexts/OrderContext";
import React from "react";
import { Button } from "./ui/Button";
import { Drink } from "@/interfaces/Drink";
import { Trash2 } from "lucide-react";

const RemoveItemButton: React.FC<Drink> = ({
  drinks_id,
  brewery,
  type,
  name,
  quantity,
  cost,
  selling_price,
  profit_item,
}) => {
  const { removeItem } = useOrder();

  const handleRemoveItem = (drink: Drink) => {
    removeItem(drink);
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      className="text-red-700"
      onClick={() =>
        handleRemoveItem({
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
      <Trash2 className="h-4 w-4" />
    </Button>
  );
};

export default RemoveItemButton;
