"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function ReservationPersonalInformation() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }
  return (
    <section className="overflow-hidden rounded-3xl border border-gray-100 bg-white p-4 py-8 shadow-sm dark:border-gray-800 dark:bg-black dark:shadow-black">
      <h2 className="mb-6 text-xl leading-none tracking-tight text-gray-600">
        Información personal
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-1 text-sm tracking-tight text-gray-600">
                  Nombre completo:
                </FormLabel>
                <FormControl>
                  <Input placeholder="Juan Pérez" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-1 text-sm tracking-tight text-gray-600">
                  Correo electrónico:
                </FormLabel>
                <FormControl>
                  <Input placeholder="jean@hotmail.com" {...field} />
                </FormControl>
                <FormDescription>
                  Enviaremos un código QR a este correo para que puedas usarlo para entrar.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-1 text-sm tracking-tight text-gray-600">
                  Tu número de Whatsapp:
                </FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  Enviaremos un código QR a este número para que puedas usarlo para entrar.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end pt-8">
            <Button type="submit">
              Siguiente
              <ArrowRightIcon />
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
