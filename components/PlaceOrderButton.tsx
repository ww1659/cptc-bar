import React, { useState } from "react";
import { Button } from "./ui/Button";
import { useOrder } from "@/contexts/OrderContext";
import { OrderState } from "@/interfaces/Drink";
import { useToast } from "../components/ui/UseToast";
import { useRouter } from "next/router";
import { OrderDialog } from "./OrderDialog";

interface PlaceOrderProps {
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PlaceOrderButton: React.FC<PlaceOrderProps> = ({ setDialogOpen }) => {
  const { order } = useOrder();

  const handleOrderClick = () => {
    setDialogOpen(true);
  };

  return (
    <div>
      <Button
        disabled={order.items.length === 0}
        className="w-full border border-green-800"
        onClick={() => handleOrderClick()}
      >
        Place Order
      </Button>
    </div>
  );
};

export default PlaceOrderButton;
