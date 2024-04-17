import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/Button";
import { totalItemsOrdered } from "@/utils/helperFunctions";
import { useRouter } from "next/router";
import { useOrder } from "@/contexts/OrderContext";
import { Beer } from "lucide-react";

const OrderButton: React.FC<{}> = () => {
  const router = useRouter();
  const { order } = useOrder();

  const handleClick = () => {
    router.push(`/order`);
  };

  return (
    <Button className="border border-green-800 p-2" onClick={handleClick}>
      <div className="flex flex-row">
        <Beer className="h-5 w-5 mx-1 text-green-800" />
        <p className="mx-1 ">Cart</p>
        <p className="mx-1 ">{totalItemsOrdered(order) | 0}</p>
      </div>
    </Button>
  );
};

export default OrderButton;
