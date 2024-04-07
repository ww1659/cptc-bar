export interface Sale {
  sale_id: any;
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

export interface SaleItem {
  saleItemId: number;
  saleId: number;
  drinkId: number;
  quantity: number;
  name: string;
  price: string;
  profit: string;
}
