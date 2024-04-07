import type { NextApiRequest, NextApiResponse } from "next";
import { Sale } from "@/interfaces/Sale";
import { fetchSales } from "@/lib/sales";

interface ErrorMessage {
  message: string;
}

type SalesResponse = Sale[] | ErrorMessage;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SalesResponse>
) {
  try {
    const sales = await fetchSales();
    res.status(200).json(sales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching sales" });
  }
}
