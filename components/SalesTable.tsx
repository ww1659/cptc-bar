import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/Table";
import { Sale } from "@/interfaces/Sale";
import {
  formatAsCurrency,
  formatDate,
  formatName,
} from "@/utils/helperFunctions";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface SalesTableProps {
  sales: Sale[];
}

const SalesTable: React.FC<SalesTableProps> = ({ sales }) => {
  const [openSaleId, setOpenSaleId] = useState<number | null>(null);

  const handleDropdownClick = (saleId: number) => {
    setOpenSaleId(openSaleId === saleId ? null : saleId);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left">Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Payment Method</TableHead>
          <TableHead>No. Drinks</TableHead>
          <TableHead>Total (£)</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sales.map((sale) => {
          const date = formatDate(sale.createdAt).date;
          const time = formatDate(sale.createdAt).time;
          return (
            <>
              <TableRow
                key={sale.saleId}
                className={openSaleId === sale.saleId ? "border-black" : ""}
              >
                <TableCell className="text-left">
                  {sale.paid ? (
                    <Badge className="text-green-800" variant="outline">
                      Paid
                    </Badge>
                  ) : (
                    <Badge className="text-red-800" variant="outline">
                      Owed
                    </Badge>
                  )}
                </TableCell>
                <TableCell>{date}</TableCell>
                <TableCell>{time}</TableCell>
                <TableCell>{formatName(sale.paymentMethod)}</TableCell>
                <TableCell>{sale.totalQuantity}</TableCell>
                <TableCell>
                  <p className="font-bold">
                    {formatAsCurrency(sale.totalPrice)}
                  </p>
                  {sale.discount !== "0" ? (
                    <p className="text-xs text-green-800">-{sale.discount}%</p>
                  ) : null}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-green-800 border"
                    onClick={() => handleDropdownClick(sale.saleId)}
                  >
                    {openSaleId ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </TableCell>
              </TableRow>
              {openSaleId === sale.saleId && (
                <TableRow className="border-0">
                  <TableHead className="text-left "></TableHead>
                  <TableHead></TableHead>
                  <TableHead></TableHead>
                  <TableHead className="text-xs text-green-800 font-bold">
                    Drink
                  </TableHead>
                  <TableHead className="text-xs text-green-800 font-bold">
                    Quantity
                  </TableHead>
                  <TableHead className="text-xs text-green-800 font-bold">
                    Price (£)
                  </TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              )}
              {openSaleId === sale.saleId && (
                <>
                  {sale.saleItems.map((saleItem, index) => (
                    <TableRow
                      className={`${
                        index === sale.saleItems.length - 1
                          ? "border-black"
                          : "border-0"
                      }`}
                      key={saleItem.saleItemId}
                    >
                      <TableCell className="text-right py-1"></TableCell>
                      <TableCell className="py-1"></TableCell>
                      <TableCell className="py-1"></TableCell>
                      <TableCell className="font-bold py-1 text-xs">
                        {saleItem.name}
                      </TableCell>
                      <TableCell className="font-bold py-1 text-xs">
                        {saleItem.quantity}
                      </TableCell>
                      <TableCell className="font-bold py-1 text-xs">
                        {formatAsCurrency(saleItem.price)}
                      </TableCell>
                      <TableCell className="py-1"></TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default SalesTable;
