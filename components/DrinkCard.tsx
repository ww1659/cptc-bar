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
import { Drink } from "@/interfaces/Drink";
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
  return (
    <div className="m-2">
      <Card className="w-[300px] ">
        <CardHeader>
          <div className="flex justify-between items-center flex-row">
            <div>
              <CardTitle>{name}</CardTitle>
            </div>
            <div>
              <CardDescription className="text-green-800">
                {quantity}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl">Cost £{formatPrice(selling_price)}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <TakeFromOrderButton
            drinks_id={drinks_id}
            brewery={brewery}
            type={type}
            name={name}
            quantity={quantity}
            cost={cost}
            selling_price={selling_price}
            profit_item={profit_item}
          />
          <AddToOrderButton
            drinks_id={drinks_id}
            brewery={brewery}
            type={type}
            name={name}
            quantity={quantity}
            cost={cost}
            selling_price={selling_price}
            profit_item={profit_item}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default DrinkCard;
