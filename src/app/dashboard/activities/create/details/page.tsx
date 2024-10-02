"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowLeftIcon, ArrowRight } from "lucide-react";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

import { getActivity, updateActivity } from "#/app/activities/services";
import { Activity } from "#/app/activities/types";
import { revalidate } from "#/app/revalidate/services";
import { ActivityStepper } from "#/components/ActivityStepper";
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
import { Switch } from "#/components/ui/switch";
import { Typography } from "#/components/ui/typography";

const formSchema = z.object({
  is_active: z.boolean().optional(),
  has_free_parking: z.boolean().optional(),
  map_url: z.string().optional(),
  tik_tok_video_id: z.string().optional(),
  youtube_video_id: z.string().optional(),
});

interface Props {
  searchParams: {
    slug: string | undefined;
  };
}
export default function Page({ searchParams }: Props) {
  const { slug } = searchParams;
  const [activity, setActivity] = useState<Activity | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { reset } = form;

  const router = useRouter();
  const { replace } = router;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsCreating(true);
    const payload = { slug, ...values };

    await updateActivity(payload);
    toast.success("Detalles actualizados.");

    await revalidate(`/dashboard/activities`);
    await revalidate(`/activities`);
    await revalidate(`/activities/${payload.slug}`);
    setIsCreating(false);

    replace("/dashboard/activities");
  }

  useEffect(() => {
    async function load() {
      const activity = await getActivity({ slug });
      setActivity(activity);

      reset({
        map_url: activity?.map_url || "",
        has_free_parking: activity?.has_free_parking || false,
        is_active: activity?.is_active,
        tik_tok_video_id: activity?.tik_tok_video_id || "",
        youtube_video_id: activity?.youtube_video_id || "",
      });
    }

    load();
  }, [reset, slug]);

  return (
    <>
      <main className="container mx-auto my-16 max-w-6xl">
        <div className="mb-8 flex justify-between rounded-xl bg-slate-100 p-4 dark:bg-slate-900">
          <Button variant="ghost" onClick={() => replace("/dashboard/activities")}>
            <ArrowLeftIcon className="mr-1 h-4 w-4" />
            Regresar
          </Button>
        </div>
        <section className="flex gap-40">
          <ActivityStepper step={3} />
          <div className="w-full">
            <Typography variant="h2" className="mb-8">
              Detalles
            </Typography>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="is_active"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Activo</FormLabel>
                        <FormDescription>Deberia mostrarse en el sitio.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="has_free_parking"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Parqueo</FormLabel>
                        <FormDescription>El lugar cuenta con parqueo</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="map_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Map url:</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tik_tok_video_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tik tok video id:</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="youtube_video_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Youtube video id:</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between rounded-xl bg-slate-100 p-4 dark:bg-slate-900">
                  <Button
                    variant="outline"
                    onClick={() =>
                      replace(`/dashboard/activities/create/photos?slug=${activity?.slug}`)
                    }
                  >
                    <ArrowLeft className="ml-1 h-4 w-4" />
                    Regresar
                  </Button>
                  <Button type="submit" disabled={isCreating}>
                    Guardar
                    <ArrowRight className="ml-1 h-4 w-4" />
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
