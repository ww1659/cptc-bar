import { OrderState } from "@/interfaces/Drink";

export const totalItemsOrdered = (order: OrderState) => {
  const totalQuantityOrdered = order.items.reduce((total, item) => {
    return total + item.quantityOrdered;
  }, 0);

  return totalQuantityOrdered;
};

export const formatAsCurrency = (numStr: string | number): string => {
  let num;
  if (typeof numStr === "string") {
    num = parseFloat(numStr);
  } else num = numStr;
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
  const utcDate = new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes()
    )
  );
  const day = utcDate.getUTCDate().toString().padStart(2, "0");
  const month = (utcDate.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = utcDate.getUTCFullYear().toString().slice(-2);
  const hours = utcDate.getUTCHours().toString().padStart(2, "0");
  const minutes = utcDate.getUTCMinutes().toString().padStart(2, "0");
  return { date: `${day}-${month}-${year}`, time: `${hours}:${minutes}` };
};
