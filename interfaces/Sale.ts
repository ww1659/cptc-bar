export interface Sale {
  sale_id: any;
  salespersonId: number;
  totalPrice: number;
  totalQuantity: number;
  totalProfit: number;
  paid: boolean;
  paymentMethod: string;
  discount: number;
  notes: string;
  createdAt: Date;
}

export interface SaleItem {
  drinkId: number;
  quantity: number;
  name: string;
  price: number;
  profit: number;
}
