import type { NextApiRequest, NextApiResponse } from "next";
import { Drink } from "../../interfaces/Drink";
import {
  fetchDrinks,
  updateDrinksCost,
  updateDrinksPrice,
  updateDrinksStock,
} from "../../lib/drinks";

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
      const { action, drinkId, quantity, cost, price } = req.body;
      if (action === "updateQuantity") {
        const updatedDrink = await updateDrinksStock(drinkId, quantity);
        res.status(200).json(updatedDrink);
      } else if (action === "updateCost") {
        const updatedDrink = await updateDrinksCost(drinkId, cost);
        res.status(200).json(updatedDrink);
      } else if (action === "updatePrice") {
        const updatedDrink = await updateDrinksPrice(drinkId, price);
        res.status(200).json(updatedDrink);
      } else {
        return res.status(400).json({ message: "Invalid action" });
      }
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching drinks" });
  }
}
