import type { NextApiRequest, NextApiResponse } from "next";
import { Sale } from "@/interfaces/Sale";
import { deleteSaleAndUpdateStock, fetchSales } from "@/lib/sales";
import { getAuth } from "@clerk/nextjs/server";

interface ErrorMessage {
  message: string;
}

type SalesResponse = Sale[] | ErrorMessage;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SalesResponse>
) {
  const { userId } = getAuth(req);
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
    if (req.method === "GET") {
      const sales = await fetchSales();
      res.status(200).json(sales);
    } else if (req.method === "DELETE") {
      const { saleId, saleItems } = req.body;
      await deleteSaleAndUpdateStock(saleId, saleItems);
      res.status(200).json({ message: "Sale removed" });
    } else {
      res.setHeader("Allow", ["GET", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "DB error fetching sales" });
  }
}
