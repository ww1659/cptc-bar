"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "./ui/Button";
import {
  Form,
  FormControl,
  FormDescription,
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

const formSchema = z.object({
  drinkName: z.string().min(1, {
    message: "Drink name must be at least 1 character.",
  }),
  quantity: z.string().min(1, {
    message: "Must be a valid number",
  }),
  cost: z.string().min(1, {
    message: "Must be a valid number",
  }),
  sellingPrice: z.string().min(1, {
    message: "Must be a valid number",
  }),
  type: z.string().min(1, {
    message: "Must choose a type",
  }),
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

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 border-2 border-green-800 rounded-xl px-12 py-5"
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
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">Stock</FormLabel>
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
              name="cost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">
                    Drink Cost (per item)
                  </FormLabel>
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
              name="sellingPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">
                    Selling Price (per item)
                  </FormLabel>
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
                        <SelectContent>
                          <SelectItem value="wiper & true">
                            Wiper & True
                          </SelectItem>
                          <SelectItem value="good chemistry">
                            Good Chemistry
                          </SelectItem>
                          <SelectItem value="lager">Lager</SelectItem>
                          <SelectItem value="cider">Cider</SelectItem>
                          <SelectItem value="bitter">Bitter</SelectItem>
                          <SelectItem value="wine">Wine</SelectItem>
                          <SelectItem value="soft drink">Soft Drink</SelectItem>
                          <SelectItem value="low to no">Low-to-No</SelectItem>
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
        <Button type="submit" className="bg-green-800 text-white">
          Create Drink Item
        </Button>
      </form>
    </Form>
  );
}
