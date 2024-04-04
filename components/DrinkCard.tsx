import * as React from "react";
import { PlusIcon, MinusIcon } from "@radix-ui/react-icons";

import { Button } from "./ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/Card";
import { useOrder } from "@/contexts/OrderContext";
import { DrinkOrder } from "@/interfaces/Drink";
import TakeFromOrderButton from "./TakeFromOrderButton";
import AddToOrderButton from "./AddToOrderButton";

interface DrinkCardProps {
  drinks_id: number;
  brewery: string;
  type: string;
  name: string;
  quantity: number;
  cost: string;
  selling_price: string;
  profit_item: string;
}

const formatPrice = (price?: string) => {
  return Number(price)?.toFixed(2) || "N/A";
};

const DrinkCard: React.FC<DrinkCardProps> = ({
  drinks_id,
  brewery,
  type,
  name,
  quantity,
  cost,
  selling_price,
  profit_item,
}) => {
  const { order, addToOrder, takeFromOrder, clearOrder } = useOrder();

  const handleAddToOrder = (drink: DrinkOrder) => {
    addToOrder(drink);
  };

  const handleTakeFromOrder = (drink: DrinkOrder) => {
    takeFromOrder(drink);
  };

  return (
    <div className="m-2">
      <Card className="w-[350px] ">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          {quantity < 5 ? (
            <CardDescription>Low Stock: Only {quantity} left!</CardDescription>
          ) : null}
        </CardHeader>
        <CardContent>
          <p className="text-2xl">Cost £{formatPrice(selling_price)}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <TakeFromOrderButton
            drinks_id={drinks_id}
            type={type}
            name={name}
            selling_price={selling_price}
          />
          <AddToOrderButton
            drinks_id={drinks_id}
            type={type}
            name={name}
            selling_price={selling_price}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default DrinkCard;
