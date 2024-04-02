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

interface DrinkCardProps {
  drinks_id: number;
  brewery: string;
  type: string;
  name: string;
  quantity: number;
  cost: number;
  selling_price: number;
  profit_item: number;
}

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
      <Card className="w-[350px] ">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>Stock: {quantity}</CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter className="flex justify-between">
          <Button size="icon">
            <MinusIcon className="h-5 w-5" />
          </Button>
          <Button size="icon">
            <PlusIcon className="h-5 w-5" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DrinkCard;
