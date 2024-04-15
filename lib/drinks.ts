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
  const updateDrinkQuery = `
  UPDATE drinks 
  SET quantity = $2 
  WHERE drinks_id = $1 
  RETURNING *`;
  try {
    const data = await db.query(updateDrinkQuery, [drinkId, quantity]);
    const updatedDrink: Drink[] = data.rows;
    if (updatedDrink.length === 0) {
      return [];
    } else return updatedDrink;
  } catch (error) {
    console.error("Database Error:", error);
    throw error;
  }
}

export async function updateDrinksCost(
  drinkId: number,
  cost: number
): Promise<Drink[]> {
  const updateDrinkQuery = `UPDATE drinks SET cost = $2 WHERE drinks_id = $1 RETURNING *`;
  try {
    const data = await db.query(updateDrinkQuery, [drinkId, cost]);
    const updatedDrink: Drink[] = data.rows;
    if (updatedDrink.length === 0) {
      return [];
    } else return updatedDrink;
  } catch (error) {
    console.error("Database Error:", error);
    throw error;
  }
}

export async function updateDrinksPrice(
  drinkId: number,
  price: number
): Promise<Drink[]> {
  const updateDrinkQuery = `
  UPDATE drinks 
  SET selling_price = $2 
  WHERE drinks_id = $1 
  RETURNING *`;
  try {
    const data = await db.query(updateDrinkQuery, [drinkId, price]);
    const updatedDrink: Drink[] = data.rows;
    if (updatedDrink.length === 0) {
      return [];
    } else return updatedDrink;
  } catch (error) {
    console.error("Database Error:", error);
    throw error;
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
