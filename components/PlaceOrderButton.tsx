import React from "react";
import { Button } from "./ui/Button";
import { useOrder } from "@/contexts/OrderContext";
import { OrderState } from "@/interfaces/Drink";

const PlaceOrderButton: React.FC<{ discount: string }> = ({ discount }) => {
  const { order, clearOrder } = useOrder();

  const handleOrderClick = async (order: OrderState) => {
    console.log("Order Placed", order);

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sales: {
            salespersonId: 1,
            totalPrice: order.totalPrice,
            totalQuantity: order.items.reduce(
              (acc, item) => acc + item.quantityOrdered,
              0
            ),
            totalProfit: order.items.reduce(
              (acc, item) =>
                acc + Number(item.drink.profit_item) * item.quantityOrdered,
              0
            ),
            paid: true,
            paymentMethod: "card",
            discount: discount,
            notes: "",
          },
          items: order.items.map((item) => ({
            drinkId: item.drink.drinks_id,
            quantity: item.quantityOrdered,
            name: item.drink.name,
            price: item.drink.selling_price,
            profit: item.drink.profit_item,
          })),
        }),
      });

      if (!response.ok) {
        console.error("Failed to update sales and items:", response.statusText);
        return;
      } else {
        console.log("Order successfully placed!");
        clearOrder();
      }
    } catch (error) {
      console.error("Error updating drinks:", error);
    }
  };

  return (
    <Button
      className="w-full border border-green-800"
      onClick={() => handleOrderClick(order)}
    >
      Place Order
    </Button>
  );
};

export default PlaceOrderButton;
