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
  costDialogOpen: boolean;
  setCostDialogOpen: (isOpen: boolean) => void;
}

const UpdateCostDialog: React.FC<UpdateDialogProps> = ({
  drink,
  costDialogOpen,
  setCostDialogOpen,
}) => {
  const [costInput, setCostInput] = useState("");

  const onClose = () => {
    setCostDialogOpen(false);
  };

  const handleCostInput = (value: string) => {
    setCostInput(value);
  };

  const handleSaveClick = async (drink: Drink) => {
    const costInt = parseFloat(costInput);

    try {
      const response = await fetch(`http://localhost:3000/api/stock`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          drinkId: drink.drinks_id,
          cost: costInt,
          action: "updateCost",
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Updated drinks:", data);
        mutate("http://localhost:3000/api/stock");
        setCostDialogOpen(false);
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
      open={costDialogOpen}
      modal
      defaultOpen={costDialogOpen}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Update <span className="text-green-800">{drink.name}</span> cost
          </DialogTitle>
          <DialogDescription>
            Update cost here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Cost (£)
            </Label>
            <Input
              id="cost"
              placeholder={drink.cost}
              value={costInput}
              onChange={(e) => handleCostInput(e.target.value)}
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

export default UpdateCostDialog;
