import { BookTypeIcon, ImageIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function Step1({ step }: { step: number }) {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const slugContent = slug ? `?slug=${slug}` : "";

  return (
    <Link href={`/dashboard/activities/create${slugContent}`} passHref>
      <li className="mb-10 ms-6">
        {step >= 1 ? (
          <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
            <svg
              className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 12"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5.917 5.724 10.5 15 1.5"
              />
            </svg>
          </span>
        ) : (
          <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
            <BookTypeIcon className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
          </span>
        )}

        <h3 className="font-medium leading-tight">Contenido</h3>
        <p className="text-sm">contenido de la actividad</p>
      </li>
    </Link>
  );
}
function Step2({ step }: { step: number }) {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const slugContent = slug ? `?slug=${slug}` : "";

  return (
    <Link href={`/dashboard/activities/create/photos${slugContent}`} passHref>
      <li className="mb-10 ms-6">
        {step >= 2 ? (
          <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
            <svg
              className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 12"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5.917 5.724 10.5 15 1.5"
              />
            </svg>
          </span>
        ) : (
          <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
            <BookTypeIcon className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
          </span>
        )}

        <h3 className="font-medium leading-tight">Fotos</h3>
        <p className="text-sm">Una lista de fotos</p>
      </li>
    </Link>
  );
}
function Step3({ step }: { step: number }) {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const slugContent = slug ? `?slug=${slug}` : "";

  return (
    <Link href={`/dashboard/activities/create/details${slugContent}`} passHref>
      <li className="mb-10 ms-6">
        {step >= 3 ? (
          <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
            <svg
              className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 12"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5.917 5.724 10.5 15 1.5"
              />
            </svg>
          </span>
        ) : (
          <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
            <BookTypeIcon className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
          </span>
        )}

        <h3 className="font-medium leading-tight">Detalles</h3>
        <p className="text-sm">Detalles de la actividad</p>
      </li>
    </Link>
  );
}

interface Props {
  step: number;
}
export function ActivityStepper({ step }: Props) {
  return (
    <div className="flex-none">
      <ol
        className={
          "relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400"
        }
      >
        <Step1 step={step} />
        <Step2 step={step} />
        <Step3 step={step} />
      </ol>
    </div>
  );
}
