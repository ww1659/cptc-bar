import { MoreHorizontal, Rat } from "lucide-react";
import { Button } from "./ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { formatAsCurrency } from "@/utils/helperFunctions";
import { useState } from "react";
import { mutate } from "swr";
import { DialogClose } from "@radix-ui/react-dialog";
import { UpdateIcon } from "@radix-ui/react-icons";

interface DialogProps {
  drinkId: number;
  drinkName: string;
  drinkQuantity: number;
  drinkCost: string;
  drinkPrice: string;
}

export const UpdateDrinkDialog: React.FC<DialogProps> = ({
  drinkId,
  drinkName,
  drinkQuantity,
  drinkCost,
  drinkPrice,
}) => {
  const [quantityInput, setQuantityInput] = useState(drinkQuantity.toString());
  const [costInput, setCostInput] = useState(formatAsCurrency(drinkCost));
  const [priceInput, setPriceInput] = useState(formatAsCurrency(drinkPrice));

  const handleQuantityInput = (value: string) => {
    setQuantityInput(value);
  };

  const handleCostInput = (value: string) => {
    setCostInput(value);
  };

  const handlePriceInput = (value: string) => {
    setPriceInput(value);
  };

  const handleSaveClick = async () => {
    const quantityInt = parseInt(quantityInput, 10);
    const costInt = parseFloat(costInput);
    const priceInt = parseFloat(priceInput);

    try {
      const response = await fetch("/api/stock", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          drinkId: drinkId,
          quantity: quantityInt,
          cost: costInt,
          price: priceInt,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Updated drinks:", data);
        mutate("/api/stock");
      } else {
        console.error("Failed to update drinks:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating drinks:", error);
    }
  };

  return (
    <Dialog modal>
      <DialogTrigger asChild>
        <Button variant="ghost" className="hover:text-green-800">
          <UpdateIcon className="h-4 w-4 mr-2" />
          Update
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Update <span className="text-green-800">{drinkName}</span>
          </DialogTitle>
          <DialogDescription>
            Make changes to your drink details here. Click save when you are
            done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <Input
              id="quantity"
              placeholder={`${drinkQuantity}`}
              value={quantityInput}
              onChange={(e) => handleQuantityInput(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cost" className="text-right">
              Cost (£)
            </Label>
            <Input
              id="cost"
              placeholder={formatAsCurrency(drinkCost)}
              value={costInput}
              onChange={(e) => handleCostInput(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price (£)
            </Label>
            <Input
              id="price"
              placeholder={formatAsCurrency(drinkPrice)}
              value={priceInput}
              onChange={(e) => handlePriceInput(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={() => handleSaveClick()} type="submit">
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
