import { db } from "./connection";
import { Drink } from "../interfaces/Drink";
import { NewDrink } from "@/interfaces/NewDrink";

export async function fetchDrinks(): Promise<Drink[]> {
  const getDrinksQuery = `SELECT * FROM drinks ORDER BY drinks_id ASC;`;
  try {
    const data = await db.query(getDrinksQuery);
    const drinks: Drink[] = data.rows;
    if (drinks.length === 0) {
      return [];
    } else return drinks;
  } catch (error) {
    console.error("Database Error:", error);
    throw error;
  }
}

export async function fetchDrinksByType(drinkType: string): Promise<Drink[]> {
  let getDrinksQuery = "";
  if (drinkType === "beer") {
    getDrinksQuery = `SELECT * FROM drinks WHERE type=$1 OR type=$2 OR type=$3 OR type=$4 OR type=$5;`;
    try {
      const data = await db.query(getDrinksQuery, [
        "ale",
        "stout",
        "lager",
        "bitter",
        "wheatbeer",
      ]);
      const drinks: Drink[] = data.rows;
      if (drinks.length === 0) {
        return [];
      } else return drinks;
    } catch (error) {
      console.error("Database Error:", error);
      throw error;
    }
  } else {
    getDrinksQuery = `SELECT * FROM drinks WHERE type=$1;`;
    try {
      const data = await db.query(getDrinksQuery, [drinkType]);
      const drinks: Drink[] = data.rows;
      if (drinks.length === 0) {
        return [];
      } else return drinks;
    } catch (error) {
      console.error("Database Error:", error);
      throw error;
    }
  }
}

export async function updateDrink(
  drinkId: number,
  quantity: number,
  cost: number,
  price: number
): Promise<Drink[]> {
  const updateDrinkQuery = `
    UPDATE drinks 
    SET quantity = $2, cost = $3, selling_price = $4
    WHERE drinks_id = $1 
    RETURNING *`;
  try {
    const data = await db.query(updateDrinkQuery, [
      drinkId,
      quantity,
      cost,
      price,
    ]);
    const updatedDrink: Drink[] = data.rows;
    if (updatedDrink.length === 0) {
      return [];
    } else return updatedDrink;
  } catch (error) {
    console.error("Database Error:", error);
    throw error;
  }
}

export async function deleteDrink(drinkId: number): Promise<void> {
  const deleteDrinkQuery = `
    DELETE FROM drinks 
    WHERE drinks_id = $1`;

  try {
    await db.query(deleteDrinkQuery, [drinkId]);
  } catch (error) {
    console.error("Database Error:", error);
    throw error;
  }
}

export async function createDrink(
  drinkName: string,
  drinkQuantity: string,
  drinkCost: string,
  drinkPrice: string,
  drinkType: string,
  drinkBrewery: string,
  drinkProfitItem: number,
  drinkStockValue: number,
  drinkSellingValue: number,
  drinkInc: number
) {
  const createDrinkQuery = `
    INSERT INTO drinks 
    (name, quantity, cost, selling_price, type, brewery, profit_item, stock_value, selling_value, inc) 
    VALUES 
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
    RETURNING *`;

  try {
    const data = await db.query<NewDrink>(createDrinkQuery, [
      drinkName,
      drinkQuantity,
      drinkCost,
      drinkPrice,
      drinkType,
      drinkBrewery,
      drinkProfitItem,
      drinkStockValue,
      drinkSellingValue,
      drinkInc,
    ]);
    const newDrink: NewDrink[] = data.rows;
    return newDrink;
  } catch (error) {
    console.error("Database Error:", error);
    throw error;
  }
}
