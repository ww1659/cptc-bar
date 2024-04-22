import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/Card";
import { useOrder } from "@/contexts/OrderContext";
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
  const { order } = useOrder();

  const existingItemIndex = order.items.findIndex(
    (item) => item.drink.drinks_id === drinks_id
  );

  let quantityItem = 0;
  if (existingItemIndex !== -1) {
    quantityItem = order.items[existingItemIndex].quantityOrdered;
  } else {
    quantityItem = 0;
  }

  return (
    <div className="m-2">
      <Card className="w-[300px]">
        <CardHeader className="py-4">
          <div className="flex justify-between items-center flex-row">
            <div>
              <CardTitle className="text-green-800 text-lg">{name}</CardTitle>
              <p className="text-sm font-bold pt-1">{quantity} in stock</p>
            </div>
            <div>
              <CardDescription className="font-bold text-black text-xl mr-2 mb-2">
                {quantityItem === 0 ? null : <p>{quantityItem}</p>}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="py-0">
          <p className="text-2xl font-md">£{formatPrice(selling_price)}</p>
        </CardContent>
        <CardFooter className="flex justify-between py-4">
          <TakeFromOrderButton
            drinks_id={drinks_id}
            brewery={brewery}
            type={type}
            name={name}
            quantity={quantity}
            cost={cost}
            selling_price={selling_price}
            profit_item={profit_item}
            disabled={0}
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
