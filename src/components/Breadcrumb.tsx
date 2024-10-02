import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

interface Props {
  items: {
    href: string;
    text: string | React.ReactNode;
  }[];
}
export function Breadcrumds({ items }: Props) {
  return (
    <div className="flex items-center space-x-1 py-6 text-sm text-muted-foreground">
      {items.map((item, idx) => {
        if (idx === items.length - 1) {
          return (
            <Link key={item.href} href={item.href} passHref className="font-medium text-foreground">
              {item.text}
            </Link>
          );
        }

        return (
          <Fragment key={item.href}>
            <Link
              href={item.href}
              passHref
              className="overflow-hidden text-ellipsis whitespace-nowrap"
            >
              {item.text}
            </Link>
            <ChevronRight className="h-4 w-4" />
          </Fragment>
        );
      })}
    </div>
  );
}
