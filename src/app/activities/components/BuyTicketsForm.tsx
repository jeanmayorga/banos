"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// import { toast } from "@/components/hooks/use-toast";

const FormSchema = z.object({
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
});

interface Props {
  adultPrice?: number;
  childPrice?: number;
}
export function BuyTicketsForm({ adultPrice, childPrice }: Props) {
  const [total, setTotal] = useState(adultPrice);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log({ data });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mb-8 rounded-3xl bg-white p-4 py-4 shadow-sm"
      >
        <div className="mb-8 border-b border-dashed pb-4 text-[22px] font-medium text-gray-600">
          ${adultPrice?.toFixed(2)} <span className="text-base font-light">usd / persona</span>
        </div>

        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="mb-4 flex flex-col">
              <FormLabel>Email:</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full rounded-xl bg-gray-100 pl-3 text-left font-normal text-gray-500 hover:text-gray-700",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: es })
                      ) : (
                        <span>Selecciona una fecha...</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full rounded-xl bg-[#00a7ac] text-white" size="lg">
          Comprar entradas
        </Button>

        <div className="text-base font-medium text-gray-600">
          <div className="mt-8 flex justify-between border-t border-dashed pt-4">
            <span>Total con impuestos</span>
            <span>${total?.toFixed(2)}</span>
          </div>
        </div>
      </form>
    </Form>
  );
}
