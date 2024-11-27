"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, SearchIcon } from "lucide-react";
// import Image from "next/image";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Container } from "@/components/container";
// import { Search } from "@/components/search";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormField, FormItem, FormControl, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Typography } from "@/components/ui/typography";

import { Card } from "./components/Card";
import { CardSkeleton } from "./components/CardSkeleton";
import { Tabs } from "./components/Tabs";
import { useActivities } from "./hooks/useActivities";

const FormSchema = z.object({
  date: z.date(),
  people: z.string().min(1),
});

export default function Page() {
  const { activities, isLoading } = useActivities();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      people: "1",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log({ data });
  }
  return (
    <>
      <Container className="mt-24">
        <Typography variant="h1" component="h1" className="mb-2">
          Actividades
        </Typography>

        <Typography variant="muted" component="p" className="mb-4">
          Si estás en Baños y no sabes qué hacer, no te preocupes. Nosotros te ayudamos.
        </Typography>

        <div className="mb-4 rounded-3xl bg-white p-4 shadow-sm">
          <div className="mb-4">
            <div className="relative">
              <Input placeholder="Búscar..." className="group w-full rounded-full md:w-[400px]" />
              <SearchIcon className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>

            {/* <div>
              <Select>
                <SelectTrigger className="rounded-full">
                  <SelectValue placeholder="Filtrar por lugar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="all">Centro de Baños</SelectItem>
                </SelectContent>
              </Select>
            </div> */}
          </div>
          <Suspense>
            <Tabs />
          </Suspense>
        </div>
        <div className="mb-24 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {isLoading && [...Array(12).keys()].map((_number, idx) => <CardSkeleton key={idx} />)}
          {activities.map((activity, idx) => (
            <Card key={activity.fields.slug} activity={activity} idx={idx} />
          ))}
        </div>
      </Container>
    </>
  );
}
