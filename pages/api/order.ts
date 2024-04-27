import type { NextApiRequest, NextApiResponse } from "next";
import { createSaleAndItemsAndUpdateDrinks } from "@/lib/order";
import { Sale } from "@/interfaces/Sale";
import { getAuth } from "@clerk/nextjs/server";

interface ErrorMessage {
  message: string;
}

interface UserData {
  userId: string | null;
}

type SaleResponse = Sale[] | ErrorMessage | UserData;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SaleResponse>
) {
  const { userId } = getAuth(req);
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  if (req.method === "POST") {
    try {
      const { sales, items } = req.body;
      const {
        salespersonId,
        totalPrice,
        totalQuantity,
        totalProfit,
        paid,
        paymentMethod,
        discount,
        notes,
      } = sales;

      await createSaleAndItemsAndUpdateDrinks(
        salespersonId,
        totalPrice,
        totalQuantity,
        totalProfit,
        paid,
        paymentMethod,
        discount,
        notes,
        items
      );

      res.status(200).json({ message: "Order placed successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error placing order" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
