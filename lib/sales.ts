import { Sale, SaleItem } from "@/interfaces/Sale";
import { db } from "./connection";

export async function fetchSales(): Promise<Sale[]> {
  const getSalesQuery = `
  SELECT s.sale_id, 
       s.salesperson_id, 
       s.total_price, 
       s.total_quantity, 
       s.total_profit, 
       s.paid, 
       s.payment_method, 
       s.discount, 
       s.notes, 
       s.created_at,
       si.sale_item_id, 
       si.drink_id, 
       si.name, 
       si.quantity_ordered AS sale_item_quantity, 
       si.selling_price AS sale_item_price, 
       si.profit AS sale_item_profit
  FROM sales s
  LEFT JOIN (
    SELECT sale_id, 
           ARRAY_AGG(sale_item_id) AS sale_item_id, 
           ARRAY_AGG(drink_id) AS drink_id, 
           ARRAY_AGG(name) AS name, 
           ARRAY_AGG(quantity_ordered) AS quantity_ordered, 
           ARRAY_AGG(selling_price) AS selling_price, 
           ARRAY_AGG(profit) AS profit
    FROM sale_items
    GROUP BY sale_id
) si ON s.sale_id = si.sale_id
ORDER BY s.created_at DESC;
      `;

  try {
    const data = await db.query(getSalesQuery);
    const sales: Sale[] = data.rows;

    if (sales.length === 0) {
      return [];
    }
    return mapSalesData(sales);
  } catch (error) {
    console.error("Database Error:", error);
    throw error;
  }
}

const mapSalesData = (data: any[]): Sale[] => {
  return data.map((sale) => ({
    saleId: sale.sale_id,
    salespersonId: sale.salesperson_id,
    totalPrice: sale.total_price,
    totalQuantity: sale.total_quantity,
    totalProfit: sale.total_profit,
    paid: sale.paid,
    paymentMethod: sale.payment_method,
    discount: sale.discount,
    notes: sale.notes,
    createdAt: new Date(sale.created_at),
    saleItems: sale.sale_item_id.map((saleItemId: number, index: number) => ({
      saleItemId,
      drinkId: sale.drink_id[index],
      name: sale.name[index],
      quantity: sale.sale_item_quantity[index],
      price: sale.sale_item_price[index],
      profit: sale.sale_item_profit[index],
    })),
  }));
};

export async function fetchSaleItemsById(saleId: number): Promise<SaleItem[]> {
  const getSaleItemsQuery = `
      SELECT * 
      FROM sale_items 
      WHERE sale_id = $1 
      ;`;
  try {
    const data = await db.query(getSaleItemsQuery);

    const saleItems: SaleItem[] = data.rows;

    if (saleItems.length === 0) {
      return [];
    }
    return mapSaleItemsData(saleItems);
  } catch (error) {
    console.error("Database Error:", error);
    throw error;
  }
}

const mapSaleItemsData = (data: any[]): SaleItem[] => {
  return data.map((saleItem) => ({
    saleItemId: saleItem.sale_item_id,
    saleId: saleItem.sale_id,
    drinkId: saleItem.drink_id,
    name: saleItem.name,
    quantity: saleItem.total_quantity,
    price: saleItem.selling_price,
    profit: saleItem.profit,
  }));
};
