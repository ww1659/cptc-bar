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
    <Button className="p-2 mx-2" onClick={handleClick}>
      <div className="flex flex-row">
        <Beer className="h-5 w-5 mx-1 text-white" />
        <p className="mx-1 text-white">Cart</p>
        <p className="mx-1 text-white">{totalItemsOrdered(order) | 0}</p>
      </div>
    </Button>
  );
};

export default OrderButton;
