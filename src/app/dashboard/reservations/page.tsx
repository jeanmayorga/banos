import { DeleteIcon, TrashIcon } from "lucide-react";

import { ActivityReservation } from "@/app/activities/actions";
import { Title } from "@/components/Title";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const results = await supabase.from("a-reservations").select("*");
  const reservations = (results.data || []) as unknown as ActivityReservation[];

  return (
    <>
      <Title title="Tickets" subtitle="Aqui tienen todos las reservaciones" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actividad</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Personas</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations?.map((reservation) => (
            <TableRow key={reservation.id}>
              <TableCell className="font-medium">{reservation.uuid}</TableCell>
              <TableCell>{reservation.status}</TableCell>
              <TableCell>{reservation.slug}</TableCell>
              <TableCell>{reservation.date}</TableCell>
              <TableCell>
                {reservation.adults} Adultos y {reservation.children} Niños
              </TableCell>
              <TableCell className="text-right">
                <Button variant="secondary" size="icon">
                  <TrashIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
