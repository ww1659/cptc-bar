import type { NextApiRequest, NextApiResponse } from "next";
import { Drink } from "../../interfaces/Drink";
import { deleteDrink, fetchDrinks, updateDrink } from "../../lib/drinks";
import { getAuth } from "@clerk/nextjs/server";

interface ErrorMessage {
  message: string;
}

type DrinksResponse = Drink[] | ErrorMessage;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DrinksResponse>
) {
  const { userId } = getAuth(req);
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
    if (req.method === "GET") {
      const drinks = await fetchDrinks();
      res.status(200).json(drinks);
    } else if (req.method === "PUT") {
      const { drinkId, quantity, cost, price } = req.body;
      const updatedDrink = await updateDrink(drinkId, quantity, cost, price);
      res.status(200).json(updatedDrink);
    } else if (req.method === "DELETE") {
      const { drinkId } = req.body;
      await deleteDrink(drinkId);
      res.status(200).json({ message: "Drink removed" });
    } else {
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching drinks" });
  }
}
