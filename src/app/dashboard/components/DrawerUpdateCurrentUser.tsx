"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, SaveIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
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

import { CurrentUser, updateCurrentUser } from "../actions";

const FormSchema = z.object({
  firstName: z.string().min(2, { message: "minimo de 2 caracteres" }),
  lastName: z.string().min(2, { message: "minimo de 2 caracteres" }),
  businessName: z.string().min(2, { message: "minimo de 2 caracteres" }),
});

interface Props {
  currentUser: CurrentUser;
  open: boolean;
  setOpen: (open: boolean) => void;
}
export function DrawerUpdateCurrentUser({ currentUser, open, setOpen }: Props) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: currentUser.firstName || "",
      lastName: currentUser.lastName || "",
      businessName: currentUser.businessName || "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    await updateCurrentUser(data);
    location.reload();
  }

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Actualizar cuenta</AlertDialogTitle>
          </AlertDialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <Input value={currentUser.email} disabled className="mb-6" />
              <div className="mb-4 grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apellido</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Nombre del negocio:</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-full">Cancelar</AlertDialogCancel>
                <Button type="submit" className="rounded-full" disabled={loading}>
                  {loading ? <Loader /> : <SaveIcon />}
                  Guardar
                </Button>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
