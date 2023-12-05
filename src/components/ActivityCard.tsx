import { LinkIcon } from "lucide-react";
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

interface Props {
  activity: Activity;
  className?: string;
}
export function ActivityCard({ activity, className }: Props) {
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
