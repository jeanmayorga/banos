import {
  CalendarClockIcon,
  CircleDollarSign,
  Clock,
  DollarSign,
  LinkIcon,
  MapPinnedIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Activity } from "#/app/activities/types";
import { Button } from "#/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { cn } from "#/utils";

import { Badge } from "./ui/badge";
import { Typography } from "./ui/typography";

interface Props {
  activity: Activity;
  className?: string;
  v2?: boolean;
}
export function ActivityCard({ activity, className, v2 }: Props) {
  if (v2) {
    return (
      <Link href={`/activities/${activity.slug}`} passHref className="group">
        <div
          className={cn(
            "w-full h-[180px] bg-black dark:bg-slate-900 rounded-lg relative overflow-hidden",
            className,
          )}
        >
          <div className="bg-black/30 group-hover:bg-black/10 absolute top-0 left-0 w-full h-full z-10 transition-all" />
          <Image
            src={activity.cover_picture_url}
            width={300}
            height={200}
            alt={activity.title}
            className="w-full absolute top-1/2 -translate-y-1/2 z-0"
          />
          <Badge variant="secondary" className="absolute bottom-2 left-2 z-10">
            <MapPinnedIcon className="w-4 h-4 mr-1" />
            {activity.place.name}
          </Badge>
        </div>
        <div className="w-full">
          <Typography variant="large" className="pt-2">
            {activity.title.substring(0, 30)}
          </Typography>
        </div>
        <Typography variant="muted" className="m-0 p-0 flex items-center">
          <Clock className="w-4 h-4 mr-1" /> {activity.open_time} - {activity.close_time}
        </Typography>
        <Typography variant="muted" className="m-0 p-0 flex items-center">
          <DollarSign className="w-4 h-4 mr-1" /> {activity.price.toFixed(2)} USD
        </Typography>
      </Link>
    );
  }

  return (
    <div>
      <Card key={activity.id} className={`overflow-hidden w-full ${className}`}>
        <Link
          href={`/activities/${activity.slug}`}
          passHref
          className="overflow-hidden relative w-full h-[180px] block"
        >
          <Image
            src={activity.cover_picture_url}
            width={300}
            height={200}
            alt={activity.title}
            className="w-full absolute top-1/2 -translate-y-1/2"
          />
        </Link>
        <CardHeader>
          <Link href={`/activities/${activity.slug}`} passHref>
            <CardTitle>{activity.title}</CardTitle>
          </Link>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-justify whitespace-normal ">
            {activity.body.slice(0, 120)}...
          </CardDescription>
        </CardContent>
        <CardFooter>
          <Link href={`/activities/${activity.slug}`} passHref className="w-full">
            <Button className="w-full rounded-full">
              <LinkIcon className="mr-2 h-4 w-4" /> Ver mas
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
