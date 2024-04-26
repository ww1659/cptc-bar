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
import { SaleItem } from "@/interfaces/Sale";

interface DeleteDialogProps {
  saleId: number;
  saleItems: SaleItem[];
}

export const DeleteSaleDialog: React.FC<DeleteDialogProps> = ({
  saleId,
  saleItems,
}) => {
  const { toast } = useToast();

  const handleSaveClick = async () => {
    try {
      const response = await fetch("/api/sales", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          saleId: saleId,
          saleItems: saleItems.map((item) => ({
            drinkId: item.drinkId,
            quantity: item.quantity,
          })),
        }),
      });
      if (response.ok) {
        toast({
          title: "Sale Deleted",
          description: (
            <>
              Sale Number {saleId} was successfully deleted and stock updated.
            </>
          ),
        });
        mutate("/api/sales");
      } else {
        console.error("Failed to delete sale:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating sales:", error);
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
          <DialogTitle>Are you sure you want to delete this sale?</DialogTitle>
          <DialogDescription>
            This action will remove this sale and cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="bg-black hover:bg-black/90">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={() => handleSaveClick()}
              type="submit"
              className="bg-black hover:bg-black/90"
            >
              Delete Sale
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
