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
      <Card className="w-[320px] border">
        <CardHeader className="py-4">
          <div className="flex justify-between items-center flex-row">
            <div>
              <div className="flex flex-row items-center">
                <CardTitle className="text-green-800 text-xl">{name}</CardTitle>
              </div>

              <p className="text-md pt-1">{quantity} in stock</p>
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
        <CardFooter className="flex justify-between p-0 mt-3">
          <div className="w-1/2 border">
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
              drinkCard={true}
            />
          </div>
          <div className="w-1/2 border">
            <AddToOrderButton
              drinks_id={drinks_id}
              brewery={brewery}
              type={type}
              name={name}
              quantity={quantity}
              cost={cost}
              selling_price={selling_price}
              profit_item={profit_item}
              drinkCard={true}
            />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DrinkCard;
