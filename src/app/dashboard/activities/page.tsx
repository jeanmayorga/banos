import { MoreVerticalIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { getActivities } from "#/app/activities/services";
import { revalidate } from "#/app/revalidate/services";
import { ActivityFilters } from "#/components/ActivityFilters";
import { Header } from "#/components/Header";
import { Nav } from "#/components/Nav";
import { Photo } from "#/components/Photo";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import { ScrollArea } from "#/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "#/components/ui/table";
import { Typography } from "#/components/ui/typography";

interface Props {
  searchParams: {
    sortBy: string;
    sortOrder: string;
  };
}
export default async function Page({ searchParams }: Props) {
  const activities = await getActivities({
    sortBy: searchParams?.sortBy,
    sortOrder: searchParams?.sortOrder,
    limit: 100,
  });

  return (
    <>
      <main className="container mx-auto max-w-7xl my-8">
        <div className="flex items-center justify-between mb-8">
          <Typography variant="h2">Activities</Typography>
          <Link href="/dashboard/activities/create" passHref>
            <Button size="sm">
              <PlusIcon className="w-4 h-4 mr-1" />
              Create
            </Button>
          </Link>
        </div>
        <ActivityFilters />
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Listing</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Visits</TableHead>
              <TableHead>Last modified</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell className="font-medium">
                  <Link href={`/dashboard/activities/create?slug=${activity.slug}`} passHref>
                    <div className="flex items-center">
                      {activity.photos && activity.photos.length > 0 && activity.photos[0].path && (
                        <Photo
                          path={activity.photos[0].path}
                          alt={activity.photos[0].alt}
                          width={45}
                          height={33}
                          className="mr-2 rounded-lg object-cover"
                        />
                      )}

                      {activity.title}
                    </div>
                  </Link>
                </TableCell>
                <TableCell>
                  {activity.is_active ? (
                    <Badge variant="default" className="bg-green-600 hover:bg-green-700">
                      active
                    </Badge>
                  ) : (
                    <Badge variant="destructive">inactive</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{activity.place.name.toLowerCase()}</Badge>
                </TableCell>
                <TableCell>{activity.visits}</TableCell>
                <TableCell>{activity.updated_at}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="inline">
                      <Button variant="outline" size="icon" className="rounded-full">
                        <MoreVerticalIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <Link href={`/dashboard/activities/create?slug=${activity.slug}`} passHref>
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem>Billing</DropdownMenuItem>
                      <DropdownMenuItem>Team</DropdownMenuItem>
                      <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </>
  );
}
