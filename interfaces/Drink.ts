export interface Drink {
  drinks_id: number;
  brewery: string;
  type: string;
  name: string;
  quantity: number;
  cost: string;
  selling_price: string;
  profit_item: string;
}

export interface DrinkOrder {
  drinks_id: number;
  type: string;
  name: string;
  selling_price: string;
}

export interface OrderItem {
  drink: DrinkOrder;
  quantityOrdered: number;
}

export interface OrderState {
  items: OrderItem[];
  totalPrice: number;
}
