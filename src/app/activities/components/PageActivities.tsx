"use client";

import { Metadata } from "next";
import { Suspense, useState } from "react";

import { Breadcrumds } from "@/components/Breadcrumb";
import { Container } from "@/components/container";
import { Search } from "@/components/search";
import { Typography } from "@/components/ui/typography";

import { useActivities } from "../hooks/useActivities";

import { Card } from "./Card";
import { CardSkeleton } from "./CardSkeleton";
import { Tabs } from "./Tabs";

export function PageActivities() {
  const { activities, isLoading } = useActivities();

  return (
    <Container>
      <Breadcrumds
        items={[
          {
            text: "Banos",
            href: "/",
          },
          {
            text: "Actividades",
            href: `/activities`,
          },
        ]}
      />
      <div className="mb-8">
        <Typography variant="h1" component="h1" className="mb-2">
          Actividades
        </Typography>
        <Typography variant="muted" component="p" className="mb-4">
          Descubre las mejores aventuras y actividades en el corazón de la naturaleza.
        </Typography>
        <Suspense>
          <Search />
          <Tabs />
        </Suspense>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {isLoading && [...Array(12).keys()].map((_number, idx) => <CardSkeleton key={idx} />)}
        {activities.map((activity, idx) => (
          <Card key={activity.fields.slug} activity={activity} idx={idx} />
        ))}
      </div>
    </Container>
  );
}
