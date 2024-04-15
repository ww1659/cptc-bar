import { formatAsCurrency, formatName } from "@/utils/helperFunctions";
import { ColumnDef } from "@tanstack/react-table";
import {
  AppleIcon,
  ArrowUpDown,
  BeerIcon,
  BeerOffIcon,
  GlassWater,
  MartiniIcon,
  Wine,
  WineIcon,
} from "lucide-react";
import { Button } from "./ui/Button";
import { Checkbox } from "./ui/CheckBox";
import { UpdateDrinkDialog } from "./UpdateDrinkDialog";

export type StockTableColumnsProps = {
  id: string;
  drinks_id: number;
  name: string;
  quantity: number;
  cost: string;
  selling_price: string;
  brewery: string;
  type: string;
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
      // return (
      //   <Button
      //     variant="ghost"
      //     className="pl-0"
      //     onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      //   >
      //     <ArrowUpDown className="ml-2 h-4 w-4" />
      //   </Button>
      // );
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
          <div>{row.getValue("name")}</div>
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
          Quantity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("quantity")}</div>;
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
    id: "actions",
    header: () => {
      return <div className="text-right">Update</div>;
    },
    cell: ({ row }) => {
      const drink = row.original;
      return (
        <div className="text-right">
          <UpdateDrinkDialog
            drinkId={drink.drinks_id}
            drinkName={drink.name}
            drinkQuantity={drink.quantity}
            drinkCost={drink.cost}
            drinkPrice={drink.selling_price}
          />
        </div>
      );
    },
  },
];
