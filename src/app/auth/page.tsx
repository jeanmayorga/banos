"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/typography";

import { authSignIn } from "./actions";

const Schema = z.object({
  email: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

export default function Page() {
  const router = useRouter();
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
    <div className="grid h-screen grid-cols-8">
      <div className="relative col-span-5 hidden overflow-hidden md:block">
        <img
          src="https://quitotourbus.com/wp-content/uploads/2022/10/Things-to-do-in-Banos-Ecuador-Casa-del-arbol.jpg"
          className="absolute top-1/2 w-full -translate-y-1/2"
        />
        <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/40" />
      </div>
      <div className="col-span-3 flex items-center px-16">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col space-y-4">
            <Typography variant="h1">Iniciar sesion</Typography>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo</FormLabel>
                  <FormControl>
                    <Input autoComplete="" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contrasena</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
