import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/Table";
import { useOrder } from "@/contexts/OrderContext";
import AddToOrderButton from "./AddToOrderButton";
import TakeFromOrderButton from "./TakeFromOrderButton";
import RemoveItemButton from "./RemoveItemButton";
import { formatAsCurrency } from "@/utils/helperFunctions";

const formatItemPrice = (quantity: number, price: string) => {
  const total = Math.round(quantity * Number(price) * 100) / 100;
  return total.toFixed(2);
};

const formatTotal = (total: number) => {
  return total.toFixed(2);
};

const OrderTable: React.FC<{ discount: string }> = ({ discount }) => {
  const { order } = useOrder();
  const { items } = order;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left"></TableHead>
          <TableHead>Drink</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Price (£)</TableHead>
          <TableHead className="text-right">Update Order</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => {
          const itemPrice = formatItemPrice(
            item.quantityOrdered,
            item.drink.selling_price
          );

          const discountedItemPrice =
            Number(itemPrice) * ((100 - Number(discount)) / 100);

          return (
            <TableRow key={item.drink.drinks_id}>
              <TableCell>
                <RemoveItemButton
                  drinks_id={item.drink.drinks_id}
                  brewery={item.drink.brewery}
                  type={item.drink.type}
                  name={item.drink.name}
                  quantity={item.drink.quantity}
                  cost={item.drink.cost}
                  selling_price={item.drink.selling_price}
                  profit_item={item.drink.profit_item}
                />
              </TableCell>
              <TableCell className="text-green-800 font-bold">
                {item.drink.name}
              </TableCell>
              <TableCell>{item.quantityOrdered}</TableCell>
              <TableCell className="">
                {discount !== "0" && discount !== "" ? (
                  <>
                    <p className="line-through">{itemPrice}</p>
                    <p>{formatTotal(discountedItemPrice)}</p>{" "}
                  </>
                ) : (
                  itemPrice
                )}
              </TableCell>
              <TableCell className="text-right">
                <TakeFromOrderButton
                  drinks_id={item.drink.drinks_id}
                  brewery={item.drink.brewery}
                  type={item.drink.type}
                  name={item.drink.name}
                  quantity={item.drink.quantity}
                  cost={item.drink.cost}
                  selling_price={item.drink.selling_price}
                  profit_item={item.drink.profit_item}
                  disabled={1}
                />
                {"  "}
                <AddToOrderButton
                  drinks_id={item.drink.drinks_id}
                  brewery={item.drink.brewery}
                  type={item.drink.type}
                  name={item.drink.name}
                  quantity={item.drink.quantity}
                  cost={item.drink.cost}
                  selling_price={item.drink.selling_price}
                  profit_item={item.drink.profit_item}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default OrderTable;
