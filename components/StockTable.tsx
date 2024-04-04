import React from "react";
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

interface DrinksProps {
  drinks: Drink[];
}

const StockTable: React.FC<DrinksProps> = ({ drinks }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Drink #</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Cost (£)</TableHead>
          <TableHead className="text-right">Selling Price (£)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {drinks.map((drink) => {
          return (
            <TableRow key={drink.drinks_id}>
              <TableCell>{drink.drinks_id}</TableCell>
              <TableCell>{drink.name}</TableCell>
              <TableCell>{drink.quantity}</TableCell>
              <TableCell>{drink.cost}</TableCell>
              <TableCell className="text-right">
                {drink.selling_price}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default StockTable;
