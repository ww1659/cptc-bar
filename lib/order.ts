import { db } from "./connection";
import { SaleItem } from "@/interfaces/Sale";

interface SaleProps {
  sale_id: string;
  saleId: number;
  salespersonId: number;
  totalPrice: string;
  totalQuantity: number;
  totalProfit: string;
  paid: boolean;
  paymentMethod: string;
  discount: string;
  notes: string;
  createdAt: Date;
  saleItems: SaleItem[];
}

export async function createSaleAndItemsAndUpdateDrinks(
  salespersonId: number,
  totalPrice: number,
  totalQuantity: number,
  totalProfit: number,
  paid: boolean,
  paymentMethod: string,
  discount: number,
  notes: string,
  items: Array<{
    drinkId: number;
    quantity: number;
    name: string;
    price: number;
    profit: string;
  }>
) {
  const client = await db.connect();

  console.log(items);
  console.log(
    typeof items[0].drinkId,
    typeof items[0].quantity,
    typeof items[0].name,
    typeof items[0].price,
    typeof items[0].profit
  );

  try {
    await client.query("BEGIN");

    const createSaleQuery = `
      INSERT INTO sales 
      (salesperson_id, total_price, total_quantity, total_profit, paid, payment_method, discount, notes)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;
    const saleResult = await client.query<SaleProps>(createSaleQuery, [
      salespersonId,
      totalPrice,
      totalQuantity,
      totalProfit,
      paid,
      paymentMethod,
      discount,
      notes,
    ]);
    const saleId = saleResult.rows[0].sale_id;

    // Insert sale items
    for (const { drinkId, name, quantity, price, profit } of items) {
      const createSaleItemQuery = `
        INSERT INTO sale_items 
        (sale_id, drink_id, name, quantity_ordered, selling_price, profit)
        VALUES ($1, $2, $3, $4, $5, $6);
      `;
      const result = await client.query<{}>(createSaleItemQuery, [
        saleId,
        drinkId,
        name,
        quantity,
        price,
        profit,
      ]);
    }

    // Update drinks table
    for (const item of items) {
      const updateDrinksQuery = `
        UPDATE drinks 
        SET quantity = quantity - $1
        WHERE drinks_id = $2;
      `;
      await client.query(updateDrinksQuery, [item.quantity, item.drinkId]);
    }

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
