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
import { mutate } from "swr";
import { DialogClose } from "@radix-ui/react-dialog";
import { useToast } from "./ui/UseToast";
import { Trash2Icon } from "lucide-react";

interface DeleteDialogProps {
  drinkId: number;
  drinkName: string;
}

export const DeleteDrinkDialog: React.FC<DeleteDialogProps> = ({
  drinkId,
  drinkName,
}) => {
  const { toast } = useToast();

  const handleSaveClick = async () => {
    try {
      const response = await fetch("/api/stock", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          drinkId: drinkId,
        }),
      });
      if (response.ok) {
        toast({
          title: "Drink Deleted",
          description: (
            <>
              <span className="text-green-800 font-bold">{drinkName}</span> was
              removed from your stock successfully
            </>
          ),
        });
        mutate("/api/stock");
      } else {
        console.error("Failed to delete drink:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating drinks:", error);
    }
  };

  return (
    <Dialog modal>
      <DialogTrigger asChild>
        <Button variant="ghost" className="hover:text-red-700">
          <Trash2Icon className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Delete <span className="text-green-800">{drinkName}</span>?
          </DialogTitle>
          <DialogDescription>
            This action will remove this drink item from your stock, and cannot
            be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={() => handleSaveClick()}
              type="submit"
              className="text-red-700"
            >
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
