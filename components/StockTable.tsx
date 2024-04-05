import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/Table";

import { Drink } from "@/interfaces/Drink";
import { Button } from "./ui/Button";
import UpdateDialog from "./UpdateQuantityDialog";
import { UpdateIcon } from "@radix-ui/react-icons";

interface DrinksProps {
  drinks: Drink[];
}

const StockTable: React.FC<DrinksProps> = ({ drinks }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentDrink, setCurrentDrink] = useState<Drink | null>(null);

  const handleUpdate = (drinkId: number) => {
    const drinkToUpdate = drinks.find((drink) => drink.drinks_id === drinkId);
    if (drinkToUpdate) {
      setCurrentDrink(drinkToUpdate);
      setDialogOpen(true);
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Drink No.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Cost (£)</TableHead>
            <TableHead>Selling Price (£)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {drinks.map((drink) => {
            return (
              <TableRow key={drink.drinks_id}>
                <TableCell>{drink.drinks_id}</TableCell>
                <TableCell>{drink.name}</TableCell>
                <TableCell>
                  {drink.quantity}{" "}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-green-700"
                    onClick={() => handleUpdate(drink.drinks_id)}
                  >
                    <UpdateIcon className="h-4 w-4" />
                  </Button>
                </TableCell>
                <TableCell>{drink.cost}</TableCell>
                <TableCell>{drink.selling_price}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {currentDrink && (
        <UpdateDialog
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          drink={currentDrink}
        />
      )}
    </div>
  );
};

export default StockTable;
