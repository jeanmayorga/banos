import Link from "next/link";

import { Button } from "./ui/button";

export function Hero() {
  return (
    <section
      className="relative mb-8 h-[400px] w-full rounded-3xl bg-slate-500 bg-cover"
      style={{
        backgroundImage:
          "url('https://i1.wp.com/pasaportesindestino.net/wp-content/uploads/2018/04/2.png?zoom=2&resize=718%2C399&ssl=1')",
      }}
    >
      <h1 className="mb-2 text-6xl font-semibold tracking-tight text-white">
        Compra tus entradas aqui.
      </h1>
      <p className="mb-10 text-lg font-light text-white/70">
        Compra tus entradas con nosotros y ahorra descuentos únicos.
      </p>
      <Link href="/activities">
        <Button className="rounded-full px-8 py-5" variant="default">
          ⚡ Ver todas las actividades
        </Button>
      </Link>
    </section>
  );
}
