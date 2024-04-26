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

  // const handleOrderClick = async (order: OrderState) => {
  //   const totalWithDiscount =
  //     order.totalPrice * ((100 - Number(discount)) / 100);

  //   if (order.items.length === 0) {
  //     console.log("Cannot place order: no items in cart");
  //     return;
  //   }

  //   try {
  //     setOrderProcessing(true);
  //     const response = await fetch("/api/order", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         sales: {
  //           salespersonId: 1,
  //           totalPrice: totalWithDiscount,
  //           totalQuantity: order.items.reduce(
  //             (acc, item) => acc + item.quantityOrdered,
  //             0
  //           ),
  //           totalProfit: order.items.reduce((acc, item) => {
  //             const sellingPrice = Number(item.drink.selling_price);
  //             const discountFactor = (100 - Number(discount)) / 100;
  //             const costPerItem = Number(item.drink.cost);
  //             const quantity = item.quantityOrdered;

  //             const profitPerItem =
  //               (sellingPrice * discountFactor - costPerItem) * quantity;
  //             return acc + profitPerItem;
  //           }, 0),
  //           paid: true,
  //           paymentMethod: "card",
  //           discount: discount || "0",
  //           notes: "",
  //         },
  //         items: order.items.map((item) => ({
  //           drinkId: item.drink.drinks_id,
  //           quantity: item.quantityOrdered,
  //           name: item.drink.name,
  //           price:
  //             Number(item.drink.selling_price) *
  //             ((100 - Number(discount)) / 100),
  //           profit:
  //             Number(item.drink.selling_price) *
  //               ((100 - Number(discount)) / 100) -
  //             Number(item.drink.cost),
  //         })),
  //       }),
  //     });

  //     if (!response.ok) {
  //       console.error("Failed to update sales and items:", response.statusText);
  //       toast({
  //         title: "Uh Oh!",
  //         description: "Something went wrong, please try again",
  //       });
  //       setOrderProcessing(false);
  //       return;
  //     } else {
  //       toast({
  //         title: "Huzzah!",
  //         description: "Your order has been successfully placed :)",
  //       });
  //       setOrderProcessing(false);
  //       clearOrder();
  //       router.push("/");
  //     }
  //   } catch (error) {
  //     console.error("Error updating drinks:", error);
  //     setOrderProcessing(false);
  //   }
  // };

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
