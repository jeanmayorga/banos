"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, ArrowRight, RefreshCcw, RefreshCcwIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

import { createActivity, getActivity, updateActivity } from "#/app/activities/services";
import { Activity } from "#/app/activities/types";
import { usePlaces } from "#/app/places/hooks";
import { revalidate } from "#/app/revalidate/services";
import { ActivityStepper } from "#/components/ActivityStepper";
import { CreateContentButton } from "#/components/CreateContentButton";
import { Header } from "#/components/Header";
import { Nav } from "#/components/Nav";
import { Button } from "#/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "#/components/ui/form";
import { Input } from "#/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#/components/ui/select";
import { Textarea } from "#/components/ui/textarea";
import { Typography } from "#/components/ui/typography";
import { slugify } from "#/utils/slugify";

const formSchema = z.object({
  title: z.string().min(1, "El titulo es requerido."),
  body: z.string().min(1, "La contenido es requerida."),
  description: z.string().min(1, "La descripcion es requerida."),
  keywords: z.string().min(1, "Los keywords son requeridos."),
  place_id: z.string({
    required_error: "El lugar es requerido",
  }),
  price: z.string(),
  open_time: z.string().optional(),
  close_time: z.string().optional(),
});

interface Props {
  searchParams: {
    slug: string | undefined;
  };
}
export default function Page({ searchParams }: Props) {
  const { slug } = searchParams;
  const isUpdating = Boolean(slug);

  const { places } = usePlaces();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRevalidating, setIsRevalidating] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
    reValidateMode: "onChange",
  });
  const {
    reset,
    watch,
    setValue,
    formState: { isValid },
  } = form;

  const router = useRouter();
  const { replace } = router;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const payload = {
      ...values,
      slug: slugify(values.title),
      place_id: Number(values.place_id),
      price: Number(values.price),
    };

    if (isUpdating) {
      await updateActivity(payload);
      toast.success("Actividad actualizada.");
    } else {
      await createActivity(payload);
      toast.success("Actividad creada.");
    }

    await revalidate(`/dashboard/activities`);
    await revalidate(`/activities`);
    await revalidate(`/activities/${payload.slug}`);

    replace(`/dashboard/activities/create/photos?slug=${payload.slug}`);
  }

  useEffect(() => {
    async function load() {
      if (slug) {
        const activity = await getActivity({ slug });
        setActivity(activity);

        reset({
          title: activity?.title,
          body: activity?.body,
          description: activity?.description,
          place_id: String(activity?.place_id),
          keywords: activity?.keywords || "",
          price: String(activity?.price),
          open_time: activity?.open_time,
          close_time: activity?.close_time,
        });
      }
    }

    load();
  }, [reset, setValue, slug]);

  async function handleRevalidate() {
    setIsRevalidating(true);
    await revalidate(`/activities/${activity?.slug}`);
    setIsRevalidating(false);
  }

  return (
    <>
      <main className="container max-w-6xl mx-auto my-16">
        <div className="flex justify-between bg-slate-100 dark:bg-slate-900 p-4 rounded-xl mb-8">
          <Button variant="ghost" onClick={() => replace("/dashboard/activities")}>
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            Regresar
          </Button>
          {isUpdating && (
            <Button variant="outline" isLoading={isRevalidating} onClick={handleRevalidate}>
              <RefreshCcwIcon className="w-4 h-4 mr-1" />
              Revalidar
            </Button>
          )}
        </div>
        <section className="flex gap-20">
          <ActivityStepper step={1} />
          <div className="w-full">
            <Typography variant="h2" className="mb-8">
              Contenido
            </Typography>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titulo de la actividad:</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        https://wwww.banos.app/activities/{slugify(watch("title") || "")}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="body"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Contenido:</FormLabel>
                        <CreateContentButton
                          disabled={!watch("title")}
                          prompt={`Crea 2 parrafos sobre ${watch("title")}`}
                          onCreate={(content) => setValue("body", content)}
                        />
                      </div>
                      <FormControl>
                        <Textarea {...field} rows={11} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>OpenGraph Description:</FormLabel>
                        <CreateContentButton
                          disabled={!watch("title")}
                          prompt={`Crea una descripcion rapida, corta, menos de un parrafo, y el resultado sin comillas para usar en google search basada en esta descripcion:
\n"${watch("body")}"`}
                          onCreate={(content) => setValue("description", content)}
                        />
                      </div>
                      <FormControl>
                        <Textarea {...field} rows={4} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="keywords"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>OpenGraph Keywords:</FormLabel>
                        <CreateContentButton
                          disabled={!watch("title")}
                          prompt={`Crea keywords claves para google search sobre ${watch(
                            "title",
                          )}, separados por comas no uses comillas ni ningun otro tipo de simbolos, todas en lowercase.`}
                          onCreate={(content) => setValue("keywords", content)}
                        />
                      </div>
                      <FormControl>
                        <Textarea {...field} rows={4} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="place_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lugar:</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un lugar" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {places.map((place) => (
                            <SelectItem key={place.id} value={String(place.id)}>
                              {place.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Precio:</FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          <Input {...field} className="w-14 mr-2" />
                          <div>USD</div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="open_time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hora que abren:</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="close_time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hora que cierran:</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end bg-slate-100 dark:bg-slate-900 p-4 rounded-xl">
                  <Button type="submit" disabled={!isValid || isLoading} isLoading={isLoading}>
                    Continuar
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </section>
      </main>
    </>
  );
}
