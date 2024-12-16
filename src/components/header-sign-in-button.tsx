"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CircleUserRoundIcon, Loader2Icon, LogInIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { authSignIn } from "@/app/auth/actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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

const Schema = z.object({
  email: z.string().min(1, { message: "El email es requerido." }).email("No es un email válido."),
  password: z.string().min(2, {
    message: "Tu contraseña esta incompleta.",
  }),
});

export function HeaderSignInButton() {
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
    const currentUrl = window.location.href;
    const error = await authSignIn({
      email: data.email,
      password: data.password,
      redirectTo: currentUrl,
    });

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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-3xl">Cuenta</DialogTitle>
          </DialogHeader>
          <Separator />

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
                        placeholder="micorreo@hotmail.com"
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
                        placeholder="********"
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
              <div className="mt-8 flex justify-end">
                <Button className="rounded-full" type="submit" disabled={loading}>
                  {loading ? <Loader2Icon className="animate-spin" /> : <LogInIcon />}
                  Iniciar sesión
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
