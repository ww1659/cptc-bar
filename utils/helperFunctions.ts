import { DrinkOrder, OrderItem, OrderState } from "@/interfaces/Drink";

export const totalItemsOrdered = (order: OrderState) => {
  const totalQuantityOrdered = order.items.reduce((total, item) => {
    return total + item.quantityOrdered;
  }, 0);

  return totalQuantityOrdered;
};
