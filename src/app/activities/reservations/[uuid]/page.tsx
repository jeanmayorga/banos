import { TicketCheckIcon } from "lucide-react";
import { notFound } from "next/navigation";

import { Container } from "@/components/container";
import ScrollUp from "@/components/ScrollUp";
import { Title } from "@/components/Title";
import { Separator } from "@/components/ui/separator";

import { getActivityBySlug, getActivityReservation } from "../../actions";
import { ReservationPersonalInformation } from "../../components/ReservationPersonalInformation";

interface Props {
  params: {
    uuid: string;
  };
}

export default async function Page({ params }: Props) {
  const uuid = params.uuid;
  const reservation = await getActivityReservation(uuid);
  const activity = await getActivityBySlug(reservation.slug);

  if (!reservation || !activity) return notFound();

  const adultPrice = activity.fields.adultPrice || 0;
  const childPrice = activity.fields.childPrice || 0;

  return (
    <>
      <ScrollUp />
      <Container className="my-4 md:my-24">
        <Title title="Reserva" subtitle={`Código de reserva: #${uuid.split("-")[4]}`} />
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <ReservationPersonalInformation />
          </div>

          <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white p-4 py-8 shadow-sm dark:border-gray-800 dark:bg-black dark:shadow-black">
            <div className="mb-6">
              <h2 className="text-xl leading-none tracking-tight text-gray-600">Resumen</h2>
            </div>
            <Separator />

            <div className="tracking-tight">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Total adultos:</span>
                <span>${Number(2).toFixed(2)}</span>
              </div>
              <div className="mb-4 flex justify-between text-sm text-gray-500">
                <span>Total menores:</span>
                <span>${Number(2).toFixed(2)}</span>
              </div>
              <Separator className="mb-4" />
              <div className="flex justify-between text-base font-medium text-gray-600">
                <span>Total con impuestos</span>
                <span>${reservation.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
