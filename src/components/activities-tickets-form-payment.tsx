"use client";

import { ArrowRightIcon, CopyIcon, MailIcon, PhoneIcon } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";

import { Ticket } from "@/app/tickets/types";

import { H3 } from "./h3";
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
  useEffect(() => {
    const whatsappNumber = `${ticket?.customer_phone_country_code?.split(
      "+",
    )[1]}${ticket?.customer_phone}`;
    console.log(`Send whatsapp message -> ${whatsappNumber}`);
  }, [ticket?.customer_phone, ticket?.customer_phone_country_code]);

  async function copyBankAccount() {
    await navigator.clipboard.writeText("2204219584");
    toast.success("Copiado en el portapapeles");
  }

  return (
    <>
      <Paper className="mb-8 px-4 py-6 md:p-8">
        <h2 className="mb-2 text-xl leading-none tracking-tight text-gray-600 dark:text-gray-100 md:mb-8">
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
                <div className="mb-4 grid rounded-3xl border border-dashed md:grid-cols-2">
                  <div className="border-b border-dashed p-6 md:border-b-0 md:border-r">
                    <TitleMini className="mb-2">Total:</TitleMini>
                    <p className="mb-4 text-base font-semibold leading-none tracking-tight">
                      $ {ticket?.total_amount.toFixed(2)} USD
                    </p>
                    <TitleMini className="mb-2">Datos para la transferencia</TitleMini>

                    <p className="text-base font-semibold leading-none tracking-tight">
                      Daniel Esteban Chávez
                    </p>
                    <p className="text-sm leading-none">Cuenta de ahorro</p>
                    <p className="mb-4 text-sm leading-none">2204219584</p>
                    <Button
                      className="w-full rounded-full"
                      variant="outline"
                      onClick={copyBankAccount}
                    >
                      2204219584 <CopyIcon />
                    </Button>
                  </div>
                  <div className="flex items-center justify-center p-6">
                    <a
                      href={`https://wa.me/593996658237?text=Hola+mi+ticket+es+${uuid}+aqui+esta+mi+transferencia`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button variant="outline" className="w-full rounded-full">
                        <WhatsappIcon />
                        Compartir comprobante
                      </Button>
                    </a>
                  </div>
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
          Persona de soporte para el pago manual
        </h2>
        <div className="flex flex-col justify-between md:flex-row">
          <div className="mb-4 flex items-center gap-2 md:mb-0">
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
              href={`https://wa.me/593996658237?text=Hola+mi+ticket+es+${uuid}+aqui+esta+mi+transferencia`}
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
