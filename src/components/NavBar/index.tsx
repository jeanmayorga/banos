import { useRouter } from "next/router";

interface Props {
  title: string;
  icon?: React.ReactNode;
}
export function NavBar({ title, icon }: Props) {
  const router = useRouter();

  const handleBack = () => {
    return router.push("/");
  };

  return (
    <div className="bg-fuchsia-900 text-white px-4 text-ellipsis whitespace-nowrap w-full flex items-center h-14">
      {icon ? (
        <div className="mr-2">{icon}</div>
      ) : (
        <div
          className="mr-2 bg-[rgba(255,255,255,.2)] rounded-full p-1"
          onClick={handleBack}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </div>
      )}
      {title}
    </div>
  );
}
