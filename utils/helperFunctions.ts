import { OrderState } from "@/interfaces/Drink";
import { Sale } from "@/interfaces/Sale";
import { format } from "date-fns";

interface SaleCSV {
  saleId: number;
  salespersonId: number;
  totalPrice: string;
  totalQuantity: number;
  totalProfit: string;
  paid: boolean;
  paymentMethod: string;
  discount: string;
  notes: string;
  date: string;
  time: string;
}

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

export const createCsvData = (sales: Sale[]): string => {
  if (!Array.isArray(sales) || sales.length === 0) {
    return "";
  }

  const salesArr = sales.map((sale) => {
    const formattedDate = formatDate(sale.createdAt);
    const { createdAt, ...saleWithoutCreatedAt } = sale;
    return {
      ...saleWithoutCreatedAt,
      date: formattedDate.date,
      time: formattedDate.time,
    };
  });

  // // Extract column headers for sales
  // const saleColumnHeaders = Object.keys(salesArr[0]);
  // const columns = saleColumnHeaders.filter((column) => column !== "saleItems");

  const columnOrder: (keyof SaleCSV)[] = [
    "saleId",
    "salespersonId",
    "paid",
    "paymentMethod",
    "date",
    "time",
    "totalQuantity",
    "totalPrice",
    "discount",
    "totalProfit",
    "notes",
  ];

  // Create rows of CSV data for sales
  const saleCsvRows = salesArr.map((sale) =>
    columnOrder
      .map((header) => {
        const value = sale[header as keyof SaleCSV];
        if (header === "totalPrice" || header === "totalProfit") {
          // Format date for createdAt column
          return formatAsCurrency(value.toString());
        } else return value;
      })
      .join(",")
  );

  // Join column headers and rows with newline characters
  return [columnOrder.join(","), ...saleCsvRows].join("\n");
};

export const downloadSalesCsv = (sales: Sale[], filename = "data.csv") => {
  let csvData = createCsvData(sales);
  let blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  let url = URL.createObjectURL(blob);

  let a = document.createElement("a");
  a.href = url;
  a.setAttribute("download", filename);
  a.click();
};
