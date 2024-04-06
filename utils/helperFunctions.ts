import { DrinkOrder, OrderItem, OrderState } from "@/interfaces/Drink";

export const totalItemsOrdered = (order: OrderState) => {
  const totalQuantityOrdered = order.items.reduce((total, item) => {
    return total + item.quantityOrdered;
  }, 0);

  return totalQuantityOrdered;
};

export const formatAsCurrency = (numStr: string): string => {
  const num = parseFloat(numStr);
  const isInteger = Number.isInteger(num);

  if (isInteger) {
    return num.toFixed(2);
  } else {
    return parseFloat(num.toFixed(2)).toLocaleString("en-GB", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
};

export const formatName = (name: string) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
