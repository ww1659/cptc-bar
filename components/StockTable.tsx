import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/Table";

import { Drink } from "@/interfaces/Drink";
import { Button } from "./ui/Button";
import { UpdateIcon } from "@radix-ui/react-icons";
import UpdateQuantityDialog from "./UpdateQuantityDialog";
import UpdatePriceDialog from "./UpdatePriceDialog";
import UpdateCostDialog from "./UpdateCostDialog";
import { formatAsCurrency, formatName } from "@/utils/helperFunctions";

interface DrinksProps {
  drinks: Drink[];
}

const StockTable: React.FC<DrinksProps> = ({ drinks }) => {
  const [quantityDialogOpen, setQuantityDialogOpen] = useState(false);
  const [costDialogOpen, setCostDialogOpen] = useState(false);
  const [priceDialogOpen, setPriceDialogOpen] = useState(false);
  const [currentDrink, setCurrentDrink] = useState<Drink | null>(null);

  const handleQuantityUpdate = (drinkId: number) => {
    const drinkToUpdate = drinks.find((drink) => drink.drinks_id === drinkId);
    if (drinkToUpdate) {
      setCurrentDrink(drinkToUpdate);
      setQuantityDialogOpen(true);
    }
  };

  const handleCostUpdate = (drinkId: number) => {
    const drinkToUpdate = drinks.find((drink) => drink.drinks_id === drinkId);
    if (drinkToUpdate) {
      setCurrentDrink(drinkToUpdate);
      setCostDialogOpen(true);
    }
  };

  const handlePriceUpdate = (drinkId: number) => {
    const drinkToUpdate = drinks.find((drink) => drink.drinks_id === drinkId);
    if (drinkToUpdate) {
      setCurrentDrink(drinkToUpdate);
      setPriceDialogOpen(true);
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="font-bold">
            <TableHead>Drink</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Cost (£)</TableHead>
            <TableHead>Selling Price (£)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {drinks.map((drink) => {
            return (
              <TableRow key={drink.drinks_id}>
                <TableCell className="text-green-800 font-bold">
                  <div className="flex flex-col">
                    <div className="flex">
                      <span className="text-black text-xs font-normal">
                        {drink.brewery ? formatName(drink.brewery) : null}
                      </span>
                    </div>
                    <div className="flex"> {drink.name}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-green-800 border"
                    onClick={() => handleQuantityUpdate(drink.drinks_id)}
                  >
                    <UpdateIcon className="h-4 w-4" />
                  </Button>{" "}
                  {drink.quantity}
                </TableCell>
                <TableCell>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-green-800 border"
                    onClick={() => handleCostUpdate(drink.drinks_id)}
                  >
                    <UpdateIcon className="h-4 w-4" />
                  </Button>{" "}
                  {formatAsCurrency(drink.cost)}
                </TableCell>
                <TableCell>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-green-800 border"
                    onClick={() => handlePriceUpdate(drink.drinks_id)}
                  >
                    <UpdateIcon className="h-4 w-4" />
                  </Button>{" "}
                  {formatAsCurrency(drink.selling_price)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {currentDrink && (
        <UpdateQuantityDialog
          quantityDialogOpen={quantityDialogOpen}
          setQuantityDialogOpen={setQuantityDialogOpen}
          drink={currentDrink}
        />
      )}
      {currentDrink && (
        <UpdateCostDialog
          costDialogOpen={costDialogOpen}
          setCostDialogOpen={setCostDialogOpen}
          drink={currentDrink}
        />
      )}
      {currentDrink && (
        <UpdatePriceDialog
          priceDialogOpen={priceDialogOpen}
          setPriceDialogOpen={setPriceDialogOpen}
          drink={currentDrink}
        />
      )}
    </div>
  );
};

export default StockTable;
