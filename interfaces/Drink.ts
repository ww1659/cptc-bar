export interface Drink {
  drinks_id: number;
  brewery: string;
  type: string;
  name: string;
  quantity: number;
  cost: string;
  selling_price: string;
  profit_item: string;
  inc: string;
}

export interface OrderItem {
  drink: Drink;
  quantityOrdered: number;
}

export interface OrderState {
  items: OrderItem[];
  totalPrice: number;
}
