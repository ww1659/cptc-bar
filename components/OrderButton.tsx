import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/Button";
import { totalItemsOrdered } from "@/utils/helperFunctions";
import { useRouter } from "next/router";
import { useOrder } from "@/contexts/OrderContext";
import { DrinkOrder } from "@/interfaces/Drink";

const OrderButton: React.FC<{}> = () => {
  const router = useRouter();
  const { order } = useOrder();

  const handleClick = () => {
    router.push(`/order`);
  };

  return (
    <Button onClick={handleClick}>
      <PlusCircledIcon className="h-5 w-5" />
      <p>Cart</p>
      <p>{totalItemsOrdered(order)}</p>
    </Button>
  );
};

export default OrderButton;
