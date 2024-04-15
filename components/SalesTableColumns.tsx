import {
  formatAsCurrency,
  formatDate,
  formatName,
} from "@/utils/helperFunctions";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "./ui/Badge";
import { ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/Button";
import { Checkbox } from "./ui/CheckBox";
import { SaleItem } from "@/interfaces/Sale";

export type SaleColumns = {
  id: string;
  paid: boolean;
  createdAt: string;
  paymentMethod: "card" | "bank transfer";
  totalQuantity: number;
  discount: string | null;
  totalPrice: string;
  saleItems: SaleItem[];
};

export const SalesTableColumns: ColumnDef<SaleColumns>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "paid",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("paid");
      if (status) {
        return (
          <Badge className="text-green-800" variant="outline">
            Paid
          </Badge>
        );
      } else {
        return (
          <Badge className="text-red-800" variant="outline">
            Owed
          </Badge>
        );
      }
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Time
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formattedDate = formatDate(row.getValue("createdAt")).date;
      const formattedTime = formatDate(row.getValue("createdAt")).time;

      return (
        <div className="font-medium">
          <div>{formattedTime}</div>
          <div className="text-xs text-green-800">{formattedDate}</div>
        </div>
      );
    },
  },

  {
    accessorKey: "paymentMethod",
    header: () => <div>Payment Method</div>,
    cell: ({ row }) => {
      const formattedName = formatName(row.getValue("paymentMethod"));
      return <div className="font-medium">{formattedName}</div>;
    },
  },
  {
    accessorKey: "totalQuantity",
    header: "No. Drinks",
  },
  {
    accessorKey: "discount",
    header: () => <div className="">Discount</div>,
    cell: ({ row }) => {
      const discount: any = row.getValue("discount");
      if (discount !== "0") {
        return <div className="text-xs text-green-800">{discount}%</div>;
      } else {
        return <div className="font-small"> ---</div>;
      }
    },
  },
  {
    accessorKey: "totalPrice",
    header: () => <div className="text-right">Total (£)</div>,
    cell: ({ row }) => {
      const formattedPrice = formatAsCurrency(row.getValue("totalPrice"));
      return <div className="text-right font-medium">{formattedPrice}</div>;
    },
  },

  // leave this as the 7th column - need to update the way the row expands but this is the func at the moment
  {
    accessorKey: "saleItems",
    header: () => null,
    cell: () => null,
  },

  {
    id: "expander",
    cell: ({ row }) => {
      const isExpanded = row.getIsExpanded();
      const toggleExpanded = (expanded: boolean) => {
        row.toggleExpanded(!expanded);
      };
      return (
        <Button
          variant="ghost"
          className="h-8 w-8 p-0"
          onClick={() => toggleExpanded(isExpanded)}
        >
          <span className="sr-only">Expand Row</span>
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronUp className="h-4 w-4" />
          )}
        </Button>
      );
    },

    enableSorting: false,
    enableHiding: false,
  },
];
