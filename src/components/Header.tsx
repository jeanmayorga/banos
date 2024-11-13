import Link from "next/link";

import { Container } from "./container";
import { Logo } from "./Logo";
import { ModeToggle } from "./mode-toggle";

export function Header() {
  return (
    <header className="px-4 py-2 dark:border-b-gray-800 dark:bg-black">
      <Container className="relative flex items-center justify-center">
        <Link href="/">
          <Logo size="md" className="py-2 text-[#00a7ac] dark:text-white" />
        </Link>
        <div className="absolute right-4">
          <ModeToggle />
        </div>
      </Container>
    </header>
  );
}
