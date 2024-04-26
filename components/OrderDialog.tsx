import { Button } from "./ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/Dialog";
import { useState } from "react";
import { useOrder } from "@/contexts/OrderContext";
import { useToast } from "./ui/UseToast";
import { useRouter } from "next/router";
import { OrderState } from "@/interfaces/Drink";
import { formatAsCurrency } from "@/utils/helperFunctions";
import Image from "next/image";

interface OrderDialogProps {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  discount: string;
}

export const OrderDialog: React.FC<OrderDialogProps> = ({
  discount,
  dialogOpen,
  setDialogOpen,
}) => {
  const { order, clearOrder } = useOrder();
  const { toast } = useToast();
  const router = useRouter();
  const [orderProcessing, setOrderProcessing] = useState(false);

  const handleOrderClick = async (order: OrderState) => {
    setOrderProcessing(true);
    setTimeout(async () => {
      const totalWithDiscount =
        order.totalPrice * ((100 - Number(discount)) / 100);

      if (order.items.length === 0) {
        console.log("Cannot place order: no items in cart");
        return;
      }

      try {
        const response = await fetch("/api/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sales: {
              salespersonId: 1,
              totalPrice: totalWithDiscount,
              totalQuantity: order.items.reduce(
                (acc, item) => acc + item.quantityOrdered,
                0
              ),
              totalProfit: order.items.reduce((acc, item) => {
                const sellingPrice = Number(item.drink.selling_price);
                const discountFactor = (100 - Number(discount)) / 100;
                const costPerItem = Number(item.drink.cost);
                const quantity = item.quantityOrdered;

                const profitPerItem =
                  (sellingPrice * discountFactor - costPerItem) * quantity;
                return acc + profitPerItem;
              }, 0),
              paid: true,
              paymentMethod: "card",
              discount: discount || "0",
              notes: "",
            },
            items: order.items.map((item) => ({
              drinkId: item.drink.drinks_id,
              quantity: item.quantityOrdered,
              name: item.drink.name,
              price:
                Number(item.drink.selling_price) *
                ((100 - Number(discount)) / 100),
              profit:
                Number(item.drink.selling_price) *
                  ((100 - Number(discount)) / 100) -
                Number(item.drink.cost),
            })),
          }),
        });

        if (!response.ok) {
          console.error(
            "Failed to update sales and items:",
            response.statusText
          );
          toast({
            title: "Uh Oh!",
            description: "Something went wrong, please try again",
          });
          setDialogOpen(false);
          setOrderProcessing(false);
          return;
        } else {
          toast({
            title: "Huzzah!",
            description: "Your order has been successfully placed :)",
          });
          setDialogOpen(false);
          setOrderProcessing(false);
          clearOrder();
          router.push("/");
        }
      } catch (error) {
        console.error("Error updating drinks:", error);
        setDialogOpen(false);
        setOrderProcessing(false);
      }
    }, 1000);
  };

  const handleCancelClick = () => {
    setDialogOpen(false);
  };

  return (
    <Dialog modal open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogDescription>Total Cost:</DialogDescription>
          <DialogTitle className="text-4xl ">
            £{formatAsCurrency(order.totalPrice)}
          </DialogTitle>
          <DialogDescription>
            Please make a payment using the card reader.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-2">
          <Image
            src="/images/card-reader.png"
            className="aspect-auto"
            width={70}
            height={70}
            alt="Card Reader Image"
            priority={true}
            quality={100}
            placeholder="empty"
          />
        </div>
        {orderProcessing ? (
          <DialogFooter>
            <div className="flex justify-center items-center bg-black w-full hover:bg-0 rounded-md h-9">
              <p className="text-white text-lg">Processing</p>
            </div>
          </DialogFooter>
        ) : (
          <DialogFooter className="">
            <Button
              className="bg-black hover:bg-red-800"
              onClick={() => handleCancelClick()}
              type="button"
            >
              Cancel
            </Button>

            <Button
              className="bg-black"
              onClick={() => handleOrderClick(order)}
              type="submit"
            >
              Paid
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
