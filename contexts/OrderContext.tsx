// src/context/state.js
import { createContext, useState, useContext, FC, ReactNode } from "react";
import { DrinkOrder } from "@/interfaces/Drink";

interface OrderItem {
  drink: DrinkOrder;
  quantityOrdered: number;
}

interface OrderState {
  items: OrderItem[];
  totalPrice: number;
}

interface IOrderContext {
  order: OrderState;
  addToOrder: (drink: DrinkOrder) => void;
  takeFromOrder: (drink: DrinkOrder) => void;
  clearOrder: () => void;
}

const OrderContext = createContext<IOrderContext>({
  order: { items: [], totalPrice: 0 },
  addToOrder: () => {},
  takeFromOrder: () => {},
  clearOrder: () => {},
});

const OrderProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const [order, setOrder] = useState<OrderState>({ items: [], totalPrice: 0 });

  const addToOrder = (drink: DrinkOrder) => {
    setOrder((currentOrder) => {
      const existingItemIndex = currentOrder.items.findIndex(
        (item) => item.drink.drinks_id === drink.drinks_id
      );

      let updatedItems: OrderItem[];

      if (existingItemIndex !== -1) {
        updatedItems = [...currentOrder.items];
        updatedItems[existingItemIndex].quantityOrdered++;
      } else {
        updatedItems = [...currentOrder.items, { drink, quantityOrdered: 1 }];
      }

      const totalPrice = currentOrder.totalPrice + Number(drink.selling_price);
      const totalPriceFormatted = Math.round(totalPrice * 100) / 100;

      return {
        ...currentOrder,
        items: updatedItems,
        totalPrice: totalPriceFormatted,
      };
    });
  };

  const takeFromOrder = (drink: DrinkOrder) => {
    setOrder((currentOrder) => {
      const existingItemIndex = currentOrder.items.findIndex(
        (item) => item.drink.drinks_id === drink.drinks_id
      );

      let updatedItems: OrderItem[];
      let totalPrice: number;

      if (existingItemIndex !== -1) {
        updatedItems = [...currentOrder.items];
        if (updatedItems[existingItemIndex].quantityOrdered > 0) {
          updatedItems[existingItemIndex].quantityOrdered--;
          totalPrice = currentOrder.totalPrice - Number(drink.selling_price);
        } else {
          totalPrice = currentOrder.totalPrice;
        }
      } else {
        updatedItems = [...currentOrder.items, { drink, quantityOrdered: 0 }];
        totalPrice = currentOrder.totalPrice;
      }
      totalPrice = Math.max(totalPrice, 0);

      const totalPriceFormatted = Math.round(totalPrice * 100) / 100;

      return {
        ...currentOrder,
        items: updatedItems,
        totalPrice: totalPriceFormatted,
      };
    });
  };

  const clearOrder = () => {
    setOrder({ items: [], totalPrice: 0 });
  };

  const totalItems = () => {
    return null;
  };

  return (
    <OrderContext.Provider
      value={{
        order,
        addToOrder,
        takeFromOrder,
        clearOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};

export { OrderProvider, useOrder };
