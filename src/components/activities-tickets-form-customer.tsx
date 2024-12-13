"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon, Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Session } from "@/app/services/session.service";
import { updateUser } from "@/app/services/users.services";
import { updateTicket } from "@/app/tickets/actions";
import { Ticket } from "@/app/tickets/types";
import countries from "@/components/countries.json";
import { Paper } from "@/components/paper";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Checkbox } from "./ui/checkbox";

const FormSchema = z.object({
  customer_email: z
    .string()
    .email("Debe ser un email válido")
    .min(2, { message: "Mínimo debe tener 2 caracteres." }),
  customer_name: z.string().min(2, { message: "Mínimo debe tener 2 caracteres." }),
  customer_document: z.string(),
  customer_id: z.string().min(2, { message: "Mínimo debe tener 2 caracteres." }),
  customer_phone_country_code: z.string(),
  customer_phone: z.string().min(2, { message: "Mínimo debe tener 2 caracteres." }),
  save_phone: z.boolean(),
  save_document: z.boolean(),
});

interface Props {
  uuid: string;
  ticket?: Ticket | null;
  session?: Session | null;
}
export function ActivitiesTicketsFormCustomer({ uuid, ticket, session }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      customer_email: session?.user.email || ticket?.customer_email || "",
      customer_name: session?.user.full_name || ticket?.customer_name || "",
      customer_document:
        session?.user.document || ticket?.customer_document || "cedula_de_identidad",
      customer_id: session?.user.document_id || ticket?.customer_id || "",
      customer_phone_country_code:
        session?.user.phone_country_code || ticket?.customer_phone_country_code || "EC+593",
      customer_phone: session?.user.phone || ticket?.customer_phone || "",
      save_phone: true,
      save_document: true,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    await updateTicket({
      uuid: uuid,
      customer_email: data.customer_email,
      customer_name: data.customer_name,
      customer_document: data.customer_document,
      customer_id: data.customer_id,
      customer_phone_country_code: data.customer_phone_country_code,
      customer_phone: data.customer_phone,
    });

    if (session) {
      if (data.save_phone) {
        await updateUser({
          uuid: session?.user.uuid,
          phone_country_code: data.customer_phone_country_code,
          phone: data.customer_phone,
        });
      }
      if (data.save_document) {
        await updateUser({
          uuid: session?.user.uuid,
          document: data.customer_document,
          document_id: data.customer_id,
        });
      }
    }

    router.push(`/activities/tickets/${uuid}/payment`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Paper className="mb-8 p-8">
          <h2 className="text-xl leading-none tracking-tight text-gray-600">
            ¿A dónde enviamos tus tickets?
          </h2>
          <p className="mb-4 text-sm text-gray-400">
            El email o whatsapp que elijas será fundamental para que gestiones tu reserva.
          </p>
          <FormField
            control={form.control}
            name="customer_email"
            render={({ field }) => (
              <FormItem className="mb-4 space-y-0">
                <FormLabel className="text-gray-600">Correo electrónico</FormLabel>
                <FormControl>
                  <Input placeholder="ejemplo@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <FormField
              control={form.control}
              name="customer_phone_country_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600">Código de país</FormLabel>

                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem
                          key={`${country.code}${country.phone_code}`}
                          value={`${country.code}${country.phone_code}`}
                        >
                          <div className="flex items-center">
                            <img
                              alt={country.name}
                              src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country.code}.svg`}
                              width={20}
                              height={15}
                              className="mr-1 rounded-sm"
                            />
                            <span>
                              {country.name} ({country.phone_code})
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="customer_phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600">Número de whatsapp</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {session && (
            <FormField
              control={form.control}
              name="save_phone"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 px-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Guardar mi número de whatsapp para futuras compras</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          )}
        </Paper>
        <Paper className="mb-8 p-8">
          <h2 className="mb-4 text-xl leading-none tracking-tight text-gray-600">
            ¿A qué nombre ponemos los tickets?
          </h2>

          <FormField
            control={form.control}
            name="customer_name"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-gray-600">Nombre completo</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <FormField
              control={form.control}
              name="customer_document"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600">Tipo de documento</FormLabel>

                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="cedula_de_identidad">Cédula de identidad</SelectItem>
                      <SelectItem value="pasaporte">Pasaporte</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="customer_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600">Número de documento</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {session && (
            <FormField
              control={form.control}
              name="save_document"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 px-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Guardar mi número de documento</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          )}
        </Paper>
        <div className="flex justify-end">
          <Button type="submit" className="rounded-3xl" disabled={loading}>
            Siguiente
            {loading ? <Loader2Icon className="animate-spin" /> : <ArrowRightIcon />}
          </Button>
        </div>
      </form>
    </Form>
  );
}
