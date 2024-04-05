import { db } from "./connection";
import { Drink } from "../interfaces/Drink";

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
  const getDrinksQuery = `SELECT * FROM drinks WHERE type=$1;`;
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

export async function updateDrinksStock(
  drinkId: number,
  quantity: number
): Promise<Drink[]> {
  const updateDrinkQuery = `UPDATE drinks SET quantity = $2 WHERE drinks_id = $1 RETURNING *`;
  try {
    const data = await db.query(updateDrinkQuery, [drinkId, quantity]);
    const updatedDrinks: Drink[] = data.rows;
    if (updatedDrinks.length === 0) {
      return [];
    } else return updatedDrinks;
  } catch (error) {
    console.error("Database Error:", error);
    throw error;
  }
}
