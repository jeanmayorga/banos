"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CircleUserRoundIcon, LoaderIcon, LogInIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { Separator } from "@/components/ui/separator";

import { authSignIn } from "../actions";

const Schema = z.object({
  email: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

export function SignInButton() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);

  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof Schema>) {
    setLoading(true);
    const error = await authSignIn({ email: data.email, password: data.password });

    if (error) {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <>
      <Button className="rounded-full" variant="secondary" onClick={() => setOpen(true)}>
        <CircleUserRoundIcon className="h-4 w-4" /> Cuenta
      </Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-3xl">Cuenta</AlertDialogTitle>
            <AlertDialogDescription className="!mt-0">
              Gestiona tus tickets de forma fácil y rápida
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Separator />
          <Button
            className="absolute right-2 top-2 rounded-full"
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
          >
            <XIcon />
          </Button>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Tus credenciales estan incorrectas.</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Correo electrónico:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="jean@hotmail.com"
                        autoComplete=""
                        className="rounded-full bg-gray-50"
                        disabled={loading}
                        {...field}
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
                    <FormLabel>Contraseña:</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        disabled={loading}
                        className="rounded-full bg-gray-50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AlertDialogFooter className="mt-8">
                <AlertDialogCancel className="rounded-full">Cancelar</AlertDialogCancel>
                <Button className="rounded-full" type="submit" disabled={loading}>
                  {loading ? <LoaderIcon /> : <LogInIcon />}
                  Iniciar sesión
                </Button>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
