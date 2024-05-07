"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "./ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/Form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/Select";
import { Input } from "./ui/Input";
import { useRouter } from "next/router";
import { useToast } from "./ui/UseToast";

const currencyRegex = /^\d+(\.\d{1,2})?$/;
const quantityRegex = /^\d+$/;

const formSchema = z.object({
  drinkName: z.string().min(1, {
    message: "Drink name must be at least 1 character.",
  }),
  quantity: z
    .string()
    .min(1, { message: "Quantity must be greater than 0." })
    .regex(quantityRegex, {
      message: "Must be a valid number",
    }),
  cost: z
    .string()
    .min(1, { message: "Cost must be greater than 0." })
    .regex(currencyRegex, {
      message: "Cost must be in valid currency format (0.00).",
    }),
  sellingPrice: z
    .string()
    .min(1, { message: "Price must be greater than 0." })
    .regex(currencyRegex, {
      message: "Cost must be in valid currency format (0.00).",
    }),
  type: z.string().min(1, { message: "Must choose a drink type." }),
});

export function NewDrinkForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      drinkName: "",
      quantity: "",
      cost: "",
      sellingPrice: "",
      type: "",
    },
  });
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (formValues: z.infer<typeof formSchema>) => {
    console.log(formValues);

    try {
      const response = await fetch("/api/create-new-drink", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newDrink: {
            drinkName: formValues.drinkName,
            drinkType: formValues.type,
            drinkQuantity: formValues.quantity,
            drinkCost: formValues.cost,
            drinkPrice: formValues.sellingPrice,
            drinkProfitItem:
              Number(formValues.sellingPrice) - Number(formValues.cost),
            drinkStockValue:
              Number(formValues.quantity) * Number(formValues.cost),
            drinkSellingValue:
              Number(formValues.quantity) * Number(formValues.sellingPrice),
            drinkInc:
              (Number(formValues.sellingPrice) - Number(formValues.cost)) /
              Number(formValues.cost),
          },
        }),
      });

      if (!response.ok) {
        console.error("Failed to update sales and items:", response.statusText);
        return;
      } else {
        toast({
          title: "Success!",
          description: "You have created a new drink",
        });
        router.push("/stock");
      }
    } catch (error) {
      console.error("Error updating drinks:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 border-2 border-ston-100 rounded-xl px-12 py-5"
      >
        <div className="flex flex-row justify-start items-center">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="drinkName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">Drink Name</FormLabel>
                  <div className="flex flex-row items-center justify-between">
                    <FormControl className="w-1/2">
                      <Input placeholder="Enter Drink Name" {...field} />
                    </FormControl>
                    <FormMessage className="w-1/2 text-xs text-red-700 ml-3" />
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex flex-row justify-start items-center">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">Type of Drink</FormLabel>
                  <div className="flex flex-row items-center justify-between">
                    <div className="w-1/2">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select drink type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white border border-green-800 shadow">
                          <SelectItem value="wiper&true">
                            Wiper & True
                          </SelectItem>
                          <SelectItem value="goodchemistry">
                            Good Chemistry
                          </SelectItem>
                          <SelectItem value="lager">Lager</SelectItem>
                          <SelectItem value="cider">Cider</SelectItem>
                          <SelectItem value="stout">Stout</SelectItem>
                          <SelectItem value="bitter">Bitter</SelectItem>
                          <SelectItem value="spirits">Spirits</SelectItem>
                          <SelectItem value="wine">Wine</SelectItem>
                          <SelectItem value="softdrink">Soft Drink</SelectItem>
                          <SelectItem value="lowtono">Low-to-No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <FormMessage className="w-1/2 text-xs text-red-700 ml-3 " />
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex flex-row justify-start items-center">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">Stock</FormLabel>
                  <div className="flex flex-row items-center justify-between">
                    <FormControl className="w-1/2">
                      <Input placeholder="Enter number of drinks" {...field} />
                    </FormControl>
                    <FormMessage className="w-1/2 text-xs text-red-700 ml-3" />
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex flex-row justify-start items-center">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="cost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">
                    Drink Cost (£ per item)
                  </FormLabel>
                  <div className="flex flex-row items-center justify-between">
                    <FormControl className="w-1/2">
                      <Input placeholder="e.g. 1.50" {...field} />
                    </FormControl>
                    <FormMessage className="w-1/2 text-xs text-red-700 ml-3" />
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex flex-row justify-start items-center">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="sellingPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">
                    Selling Price (£ per item)
                  </FormLabel>
                  <div className="flex flex-row items-center justify-between">
                    <FormControl className="w-1/2">
                      <Input placeholder="e.g. 2.00" {...field} />
                    </FormControl>
                    <FormMessage className="w-1/2 text-xs text-red-700 ml-3" />
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" className="bg-green-800 text-white">
          Create Drink Item
        </Button>
      </form>
    </Form>
  );
}
