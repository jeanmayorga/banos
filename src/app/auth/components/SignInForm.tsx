"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { authSignIn } from "../actions";

const Schema = z.object({
  email: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

export function SignInForm() {
  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof Schema>) {
    const error = await authSignIn({ email: data.email, password: data.password });

    if (error) {
      toast.error("Tus credenciales estan incorrectas.");
    }
  }

  return (
    <div className="flex w-full items-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electrónico:</FormLabel>
                <FormControl>
                  <Input
                    placeholder="jean@hotmail.com"
                    autoComplete=""
                    {...field}
                    className="rounded-full bg-gray-100"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FormLabel>Contraseña</FormLabel>
                  <Input
                    placeholder="password"
                    type="******"
                    {...field}
                    className="rounded-full bg-gray-100"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="rounded-full">
            Entrar
          </Button>
        </form>
      </Form>
    </div>
  );
}
