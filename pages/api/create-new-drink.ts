import type { NextApiRequest, NextApiResponse } from "next";
import { createDrink } from "../../lib/drinks";
import { NewDrink } from "@/interfaces/NewDrink";
import { getAuth } from "@clerk/nextjs/server";

interface ErrorMessage {
  message: string;
}

type DrinksResponse = NewDrink[] | ErrorMessage;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DrinksResponse>
) {
  const { userId } = getAuth(req);
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  if (req.method === "POST") {
    try {
      const { newDrink } = req.body;
      const {
        drinkName,
        drinkType,
        drinkQuantity,
        drinkCost,
        drinkPrice,
        drinkProfitItem,
        drinkStockValue,
        drinkSellingValue,
        drinkInc,
      } = newDrink;

      let drinkBrewery = "";
      if (drinkType === "goodchemistry") {
        drinkBrewery = "good chemistry";
      } else if (drinkType === "wiper&true") {
        drinkBrewery = "wiper & true";
      } else {
        drinkBrewery = "";
      }

      await createDrink(
        drinkName,
        drinkQuantity,
        drinkCost,
        drinkPrice,
        drinkType,
        drinkBrewery,
        drinkProfitItem,
        drinkStockValue,
        drinkSellingValue,
        drinkInc
      );

      res.status(200).json({ message: "New drink created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating new drink" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
