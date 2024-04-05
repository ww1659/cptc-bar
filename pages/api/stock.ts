import type { NextApiRequest, NextApiResponse } from "next";
import { Drink } from "../../interfaces/Drink";
import { fetchDrinks, updateDrinksStock } from "../../lib/drinks";

interface ErrorMessage {
  message: string;
}

type DrinksResponse = Drink[] | ErrorMessage;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DrinksResponse>
) {
  try {
    if (req.method === "GET") {
      const drinks = await fetchDrinks();
      res.status(200).json(drinks);
    } else if (req.method === "POST") {
      const { drinkId, quantity } = req.body;
      const updatedDrinks = await updateDrinksStock(drinkId, quantity);
      res.status(200).json(updatedDrinks);
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching drinks" });
  }
}
