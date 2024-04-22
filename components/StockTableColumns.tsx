import { formatAsCurrency, formatName } from "@/utils/helperFunctions";
import { ColumnDef } from "@tanstack/react-table";
import {
  AppleIcon,
  ArrowUpDown,
  BeerIcon,
  BeerOffIcon,
  GlassWater,
  MartiniIcon,
  MoreHorizontal,
  WineIcon,
} from "lucide-react";
import { Button } from "./ui/Button";
import { Checkbox } from "./ui/CheckBox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";
import { UpdateDrinkDialog } from "./UpdateDrinkDialog";
import { DeleteDrinkDialog } from "./DeleteDrinkDialog";
import { UpdateIcon } from "@radix-ui/react-icons";

export type StockTableColumnsProps = {
  id: string;
  drinks_id: number;
  name: string;
  quantity: number;
  cost: string;
  selling_price: string;
  brewery: string;
  type: string;
  profit_item: string;
  inc: number;
};

export const StockTableColumns: ColumnDef<StockTableColumnsProps>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const drinkType = row.getValue("type");
      if (
        drinkType === "goodchemistry" ||
        drinkType === "wiper&true" ||
        drinkType === "lager" ||
        drinkType === "bitter" ||
        drinkType === "ale"
      ) {
        return <BeerIcon className="w-5, h-5" />;
      } else if (drinkType === "cider") {
        return <AppleIcon className="w-5, h-5" />;
      } else if (drinkType === "lowtono") {
        return <BeerOffIcon className="w-5, h-5" />;
      } else if (drinkType === "softdrinks") {
        return <GlassWater className="w-5, h-5" />;
      } else if (drinkType === "wine") {
        return <WineIcon className="w-5, h-5" />;
      } else if (drinkType === "spirits") {
        return <MartiniIcon className="w-5, h-5" />;
      }
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Drink Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      let brewery = row.original.brewery;
      if (brewery !== null) {
        brewery = formatName(row.original.brewery);
      }
      return (
        <div className="font-medium">
          <div>{formatName(row.getValue("name"))}</div>
          {brewery !== null ? (
            <div className="text-xs text-green-800">{brewery}</div>
          ) : null}
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stock
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div
          className={`font-medium ${
            (row.getValue("quantity") as number) < 10 ? "text-red-800" : ""
          }`}
        >
          {row.getValue("quantity")}
        </div>
      );
    },
  },
  {
    accessorKey: "cost",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cost (£) <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formattedCost = formatAsCurrency(row.getValue("cost"));
      return <div className="font-medium">{formattedCost}</div>;
    },
  },
  {
    accessorKey: "selling_price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price (£) <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formattedPrice = formatAsCurrency(row.getValue("selling_price"));
      return <div className="font-medium">{formattedPrice}</div>;
    },
  },
  {
    accessorKey: "inc",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Inc
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const percentageIncrease = (Number(row.getValue("inc")) * 100).toFixed(0);
      return <div className="font-medium">{percentageIncrease}%</div>;
    },
  },
  {
    accessorKey: "profit_item",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Profit (£)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const profitItem = Number(row.getValue("profit_item")).toFixed(2);
      return <div className="font-medium">{profitItem}</div>;
    },
  },
  {
    id: "actions",
    header: () => {
      null;
    },
    cell: ({ row }) => {
      const drink = row.original;
      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              side="right"
              sideOffset={30}
              className="bg-white"
            >
              <div className="flex flex-col">
                <div className="flex flex-row py-1 items-center">
                  <UpdateDrinkDialog
                    drinkId={drink.drinks_id}
                    drinkName={drink.name}
                    drinkQuantity={drink.quantity}
                    drinkCost={drink.cost}
                    drinkPrice={drink.selling_price}
                  />
                </div>
                <div className="flex flex-row py-1 items-center">
                  <DeleteDrinkDialog
                    drinkId={drink.drinks_id}
                    drinkName={drink.name}
                  />
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
