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
import { useOrder } from "@/contexts/OrderContext";
import AddToOrderButton from "./AddToOrderButton";
import TakeFromOrderButton from "./TakeFromOrderButton";

const OrderTable: React.FC<{}> = () => {
  const { order } = useOrder();
  const { items, totalPrice } = order;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Drink</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead className="text-right">Price (£)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => {
          return (
            <TableRow key={item.drink.drinks_id}>
              <TableCell>{item.drink.name}</TableCell>
              <TableCell>
                {item.quantityOrdered}
                {"  "}
                <AddToOrderButton
                  drinks_id={item.drink.drinks_id}
                  type={item.drink.type}
                  name={item.drink.name}
                  selling_price={item.drink.selling_price}
                />
                {"  "}
                <TakeFromOrderButton
                  drinks_id={item.drink.drinks_id}
                  type={item.drink.type}
                  name={item.drink.name}
                  selling_price={item.drink.selling_price}
                />
              </TableCell>
              <TableCell className="text-right">
                {Math.round(
                  item.quantityOrdered * Number(item.drink.selling_price) * 100
                ) / 100}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default OrderTable;
