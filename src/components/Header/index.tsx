import { Logo } from "components";
import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";

export function Header() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const closeMenu = () => {
    setIsOpenMenu(false);
  };

  return (
    <>
      <div className="bg-fuchsia-800 text-white w-full h-[60px] px-4 flex justify-between items-center border-b border-[rgba(255,255,255,.15)]">
        <div className="w-8"></div>
        <Link href="/" passHref>
          <Logo size="sm" />
        </Link>
        <div>
          <div
            onClick={() => setIsOpenMenu(!isOpenMenu)}
            className={clsx(
              isOpenMenu &&
                "bg-[rgba(255,255,255,.2)] hover:bg-[rgba(255,255,255,.4)]",
              "hover:bg-[rgba(255,255,255,.2)] rounded-full p-1 transition-all"
            )}
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
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
        </div>
      </div>
      {isOpenMenu && (
        <div
          className={clsx(
            "bg-fuchsia-900 text-white absolute w-full h-full z-20 text-center"
          )}
        >
          <Link href="/" passHref onClick={closeMenu}>
            <div className="w-full py-3 text-base font-semibold border-b border-[rgba(255,255,255,.15)]">
              Inicio
            </div>
          </Link>
          <Link href="/news" passHref onClick={closeMenu}>
            <div className="w-full py-3 text-base font-semibold border-b border-[rgba(255,255,255,.15)]">
              Noticias
            </div>
          </Link>
          <Link href="/party" passHref onClick={closeMenu}>
            <div className="w-full py-3 text-base font-semibold border-b border-[rgba(255,255,255,.15)]">
              Fiestas
            </div>
          </Link>
        </div>
      )}
    </>
  );
}
