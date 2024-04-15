import type { NextApiRequest, NextApiResponse } from "next";
import { Drink } from "../../interfaces/Drink";
import { fetchDrinks, updateDrink } from "../../lib/drinks";

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
    } else if (req.method === "PUT") {
      const { drinkId, quantity, cost, price } = req.body;
      const updatedDrink = await updateDrink(drinkId, quantity, cost, price);
      res.status(200).json(updatedDrink);
    } else {
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching drinks" });
  }
}
