import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface Props {
  items: {
    href: string;
    text: string;
  }[];
}
export function Breadcrumds({ items }: Props) {
  return (
    <div className="py-6 flex items-center space-x-1 text-sm text-muted-foreground">
      {items.map((item, idx) => {
        if (idx === items.length - 1) {
          return (
            <Link key={item.href} href={item.href} passHref className="font-medium text-foreground">
              {item.text}
            </Link>
          );
        }

        return (
          <>
            <Link
              key={item.href}
              href={item.href}
              passHref
              className="overflow-hidden text-ellipsis whitespace-nowrap"
            >
              {item.text}
            </Link>
            <ChevronRight className="h-4 w-4" />
          </>
        );
      })}
    </div>
  );
}
