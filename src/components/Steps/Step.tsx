import clsx from 'clsx';
import { Event } from 'modules';
import Image from 'next/image';

function Place({ place, cover }: { place: string; cover: string | null }) {
  return (
    <span
      className={clsx(
        'text-slate-400 cursor-pointer text-xs leading-none inline-flex items-center bg-slate-200 rounded px-2 py-1 font-bold hover:bg-slate-300 transition-all',
        cover && 'mb-4',
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5 mr-1"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
        />
      </svg>
      {place}
    </span>
  );
}

interface Props {
  event: Event;
}
export function Step({ event }: Props) {
  const { title, time, cover, place, placeUrl, description } = event;
  return (
    <div className="p-4 flex relative group">
      <div>
        <div className="bg-fuchsia-100 text-fuchsia-600 font-semibold text-xs rounded-lg p-1 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {time}
        </div>
        <div className="w-1 h-full bg-fuchsia-100 absolute left-[50px] group-last:hidden" />
      </div>
      <div className="ml-4 border-gray-200 border-b border-dashed group-last:border-0 pb-8 w-full">
        <h2 className="text-fuchsia-600 text-xl leading-none mb-4">{title}</h2>
        {place && placeUrl ? (
          <a href={placeUrl} target="_blank" rel="noreferrer">
            <Place place={place} cover={cover} />
          </a>
        ) : (
          <Place place={place} cover={cover} />
        )}
        {description && (
          <div className="my-2 text-base text-gray-400">{description}</div>
        )}
        {cover && (
          <div className="relative rounded-lg w-full overflow-hidden h-[200px]">
            <div className="absolute z-10 bg-[rgba(0,0,0,.3)] w-full h-full" />
            <Image src={cover} alt={title} fill className=" object-cover" />
          </div>
        )}
      </div>
    </div>
  );
}
