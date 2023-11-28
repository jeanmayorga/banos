import { Metadata } from "next";

import { Logo } from "#/components/Logo";
import { Typography } from "#/components/Typography";
import { JumboHome } from "#/components/JumboHome";

const Card = ({
  title,
  location,
  image,
}: {
  title: string;
  location: string;
  image: string;
}) => (
  <div
    className="flex-shrink-0 rounded-lg overflow-hidden shadow-lg mx-2"
    style={{ minWidth: "300px" }}
  >
    <img src={image} alt={title} className="w-full h-56 object-cover" />
    <div className="p-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-500">{location}</p>
    </div>
  </div>
);

export const metadata: Metadata = {
  title: "Banos de Agua Santa | Ecuador",
};

export default function Page() {
  return (
    <>
      <div className="lg:grid lg:grid-cols-12 bg-grey-lighter min-h-screen">
        <JumboHome className="lg:col-span-8 w-full h-screen" />
        <div className="lg:col-span-4 py-8 px-8">
          <div className="w-full h-[200px] rounded-lg bg-fuchsia-800 mb-8 grid grid-cols-6">
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
          </div>
          <div className="relative mb-8">
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
          <h2 className="text-4xl font-bold mb-4">Descubre</h2>
          <p></p>
          <div className="flex gap-x-4 items-center mb-4">
            <div className="text-red-500 font-semibold relative">
              Experiencias
              <div className="h-[2px] bg-red-500" />
            </div>
            <div className="hover:text-red-400 transition-all">Lugares</div>

            <div className="hover:text-red-400 transition-all">Tours</div>
          </div>

          <div className="overflow-hidden">
            <div className="flex space-x-4 py-4">
              <Card
                title="Kayaking at the village Gudvangen"
                location="Norway"
                image="https://quitotourbus.com/wp-content/uploads/2022/10/Things-to-do-in-Banos-Ecuador-Casa-del-arbol.jpg"
              />
              <Card
                title="Kayaking at the village Gudvangen"
                location="Norway"
                image="https://quitotourbus.com/wp-content/uploads/2022/10/Things-to-do-in-Banos-Ecuador-Casa-del-arbol.jpg"
              />
              <Card
                title="Kayaking at the village Gudvangen"
                location="Norway"
                image="https://quitotourbus.com/wp-content/uploads/2022/10/Things-to-do-in-Banos-Ecuador-Casa-del-arbol.jpg"
              />
            </div>
          </div>

          <div className="overflow-hidden">
            <div className="flex space-x-4 py-4">
              <Card
                title="Kayaking at the village Gudvangen"
                location="Norway"
                image="https://quitotourbus.com/wp-content/uploads/2022/10/Things-to-do-in-Banos-Ecuador-Casa-del-arbol.jpg"
              />
              <Card
                title="Kayaking at the village Gudvangen"
                location="Norway"
                image="https://quitotourbus.com/wp-content/uploads/2022/10/Things-to-do-in-Banos-Ecuador-Casa-del-arbol.jpg"
              />
              <Card
                title="Kayaking at the village Gudvangen"
                location="Norway"
                image="https://quitotourbus.com/wp-content/uploads/2022/10/Things-to-do-in-Banos-Ecuador-Casa-del-arbol.jpg"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
