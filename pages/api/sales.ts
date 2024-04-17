import type { NextApiRequest, NextApiResponse } from "next";
import { Sale } from "@/interfaces/Sale";
import { fetchSales } from "@/lib/sales";
import { getAuth } from "@clerk/nextjs/server";

interface ErrorMessage {
  message: string;
}

type SalesResponse = Sale[] | ErrorMessage;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SalesResponse>
) {
  // const { userId } = getAuth(req);
  // if (!userId) {
  //   res.status(401).json({ message: "Unauthorized" });
  //   return;
  // }
  try {
    const sales = await fetchSales();
    res.status(200).json(sales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching sales" });
  }
}
