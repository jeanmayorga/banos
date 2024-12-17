"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

import { Tab } from "./tab";

interface Props {
  href: string;
  children?: ReactNode;
}
export function TabLink({ href, children }: Props) {
  const pathname = usePathname();

  console.log(pathname, href, pathname === href);

  return (
    <Link href={href}>
      <Tab active={pathname === href}>{children}</Tab>
    </Link>
  );
}
