import { OrderState } from "@/interfaces/Drink";

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

export const formatDate = (dateString: any) => {
  const date = new Date(dateString);
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear().toString().slice(-2);
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  return { date: `${day}-${month}-${year}`, time: `${hours}:${minutes}` };
};
