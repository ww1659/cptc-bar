import { db } from "./connection";
import { Drink } from "../interfaces/Drink";

export async function fetchDrinks(): Promise<Drink[]> {
  const getDrinksQuery = `SELECT * FROM drinks;`;
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
