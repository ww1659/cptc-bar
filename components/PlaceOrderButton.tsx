import React from "react";
import { Button } from "./ui/Button";
import { useOrder } from "@/contexts/OrderContext";
import { OrderState } from "@/interfaces/Drink";

const PlaceOrderButton: React.FC<{}> = () => {
  const { order } = useOrder();

  const handleOrderClick = (order: OrderState) => {
    console.log("Order Placed", order);

    //api call to reduce the amount of stock of certain drink
    //api call to create a new sales order
  };

  return (
    <Button className="w-full" onClick={() => handleOrderClick(order)}>
      Place Order
    </Button>
  );
};

export default PlaceOrderButton;
