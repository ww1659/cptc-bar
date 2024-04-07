import { Drink } from "@/interfaces/Drink";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/Dialog";

import { Label } from "./ui/Label";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { useState } from "react";
import { mutate } from "swr";

interface UpdateDialogProps {
  drink: Drink;
  quantityDialogOpen: boolean;
  setQuantityDialogOpen: (isOpen: boolean) => void;
}

const UpdateQuantityDialog: React.FC<UpdateDialogProps> = ({
  drink,
  quantityDialogOpen,
  setQuantityDialogOpen,
}) => {
  const [quantityInput, setQuantityInput] = useState("");

  const onClose = () => {
    setQuantityDialogOpen(false);
  };

  const handleQuantityInput = (value: string) => {
    setQuantityInput(value);
  };

  const handleSaveClick = async (drink: Drink) => {
    const quantityInt = parseInt(quantityInput, 10);

    try {
      const response = await fetch("/api/stock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          drinkId: drink.drinks_id,
          quantity: quantityInt,
          action: "updateQuantity",
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Updated drinks:", data);
        mutate("/api/stock");
        setQuantityDialogOpen(false);
      } else {
        console.error("Failed to update drinks:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating drinks:", error);
    }
  };

  return (
    <Dialog
      onOpenChange={() => onClose()}
      open={quantityDialogOpen}
      modal
      defaultOpen={quantityDialogOpen}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Update <span className="text-green-800">{drink.name}</span> stock
          </DialogTitle>
          <DialogDescription>
            Update stock here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Quantity
            </Label>
            <Input
              id="quantity"
              placeholder="Enter new stock value..."
              value={quantityInput}
              onChange={(e) => handleQuantityInput(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => handleSaveClick(drink)}
            className="text-green-700"
            type="submit"
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateQuantityDialog;
