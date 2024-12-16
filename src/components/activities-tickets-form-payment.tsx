import { ArrowRightIcon, MailIcon, PhoneIcon } from "lucide-react";

import { Ticket } from "@/app/tickets/types";

import { H4 } from "./h4";
import { WhatsappIcon } from "./icon-whatsapp";
import { Paper } from "./paper";
import { TitleMini } from "./title-mini";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

interface Props {
  uuid: string;
  ticket?: Ticket | null;
}
export function ActivitiesFormTicketPayment({ uuid, ticket }: Props) {
  return (
    <>
      <Paper className="mb-8 p-8">
        <h2 className="mb-8 text-xl leading-none tracking-tight text-gray-600 dark:text-gray-100">
          ¿Cómo te gustaría pagar?
        </h2>
        <div>
          <Accordion type="single" collapsible defaultValue="banco_pichincha">
            <AccordionItem value="banco_pichincha">
              <AccordionTrigger>
                <span className="flex items-center gap-2">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Banco-Pichincha.png"
                    className="h-8 w-8"
                  />
                  Transferencia Banco Pichincha (Proceso manual)
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="mb-4 rounded-3xl bg-gray-50 p-6 dark:bg-gray-900">
                  <TitleMini className="mb-4">Datos para la transferencia</TitleMini>
                  <p>Daniel Esteban Chávez</p>
                  <p>Cuenta de ahorro transaccional</p>
                  <p>2204592801</p>
                </div>
                <div>
                  <a
                    href={`https://wa.me/593996658237?text=Hola+mi+ticket+es+${uuid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="secondary" className="rounded-full">
                      <WhatsappIcon />
                      Compartir comprobante de pago
                    </Button>
                  </a>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="paypal" disabled>
              <AccordionTrigger>
                <span className="flex items-center gap-2">Paypal (Próximamente)</span>
              </AccordionTrigger>
              <AccordionContent>Paypal</AccordionContent>
            </AccordionItem>
            <AccordionItem value="credit_card" disabled>
              <AccordionTrigger>
                <span className="flex items-center gap-2">Tarjeta de crédito (Próximamente)</span>
              </AccordionTrigger>
              <AccordionContent>Tarjeta de crédito</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Paper>

      <Paper className="mb-8 p-8">
        <h2 className="mb-8 text-xl leading-none tracking-tight text-gray-600 dark:text-gray-100">
          Persona asignada para el pago manual
        </h2>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="/daniel.jpg" />
              <AvatarFallback>DC</AvatarFallback>
            </Avatar>
            <div>
              <H4>Daniel Esteban Chávez</H4>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-300">
                daniel@banos.app
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <a
              href={`https://wa.me/593996658237?text=Hola+mi+ticket+es+${uuid}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="rounded-full" variant="secondary" size="icon">
                <WhatsappIcon />
              </Button>
            </a>
            <a href="mailto:dani3l579@gmail.com">
              <Button className="rounded-full" variant="secondary" size="icon">
                <MailIcon />
              </Button>
            </a>
            <a href="tel:+593996658237">
              <Button className="rounded-full" variant="secondary" size="icon">
                <PhoneIcon />
              </Button>
            </a>
          </div>
        </div>
      </Paper>

      <div className="flex justify-end">
        <Button type="submit" className="rounded-3xl" disabled>
          Siguiente <ArrowRightIcon />
        </Button>
      </div>
    </>
  );
}
