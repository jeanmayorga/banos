import { Bars3Icon } from "@heroicons/react/24/solid";
import { Metadata } from "next";

import { JumboHome } from "#/components/JumboHome";
import { Nav } from "#/components/Nav";
import { Button } from "#/components/ui/button";
import { Typography } from "#/components/ui/typography";

export const metadata: Metadata = {
  title: "Banos de Agua Santa | Ecuador",
};

export default function Page() {
  return (
    <>
      <div className="lg:grid lg:grid-cols-12 bg-grey-lighter min-h-screen">
        <JumboHome className="lg:col-span-9 w-full h-screen" />
        <div className="lg:col-span-3">
          <div className="w-full mb-8 p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <Typography variant="h4">Explorar</Typography>

              <Button size="icon" variant="ghost">
                <Bars3Icon />
              </Button>
            </div>

            <Nav />
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Búscar..."
                className="pl-10 block w-full bg-gray-50 border border-gray-300 rounded-full py-2 text-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* <div className="w-full h-[200px] bg-fuchsia-800 mb-8 grid grid-cols-6">
            <div className="col-span-4 p-4">
              <h1 className="font-extrabold text-4xl tracking-tight text-white mb-4">
                Compras tus entradas aqui
              </h1>
              <p className="text-lg text-slate-300">
                Somos el unico portal autorizado para vender entradas.
              </p>
            </div>
            <div className="col-span-2 overflow-hidden p-4">
              <img src="/hands.png" className="h-full" />
            </div>
          </div> */}
          <div>
            <div className="mx-4 mb-4 flex items-center justify-between">
              <Typography variant="h2">Mas visitados</Typography>
              <Button variant="link" size="sm">
                Ver todos
              </Button>
            </div>
            <div className="flex pl-4">
              <div className="rounded-2xl bg-white shadow-lg w-[310px] overflow-hidden">
                <div className="w-full">
                  <img src="/manoDios.jpg" className="w-full" />
                </div>
                <div className="py-4 px-4">
                  <Typography variant="h4">Las manos de Dios</Typography>
                  <Typography className="mt-0">
                    Una atracción única que ofrece vistas impresionantes del volcán Tungurahua
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
