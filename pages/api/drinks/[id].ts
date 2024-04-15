import type { NextApiRequest, NextApiResponse } from "next";
import { Drink } from "../../../interfaces/Drink";
import { fetchDrinksByType } from "../../../lib/drinks";

interface ErrorMessage {
  message: string;
}

type DrinksResponse = Drink[] | ErrorMessage;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DrinksResponse>
) {
  const { id } = req.query;

  try {
    const drinks = await fetchDrinksByType(id as string);
    res.status(200).json(drinks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching drinks" });
  }
}
