import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

import { cn } from "#/utils";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-5xl font-semibold tracking-tight",
      h2: "scroll-m-20 text-3xl font-semibold tracking-tight",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      h5: "scroll-m-20 text-base font-semibold tracking-tight",
      h6: "",
      p: "leading-7 font-light",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      muted: "text-sm text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "p",
  },
});

export interface TypographyProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof typographyVariants> {
  children: React.ReactNode;
  component?: React.ElementType;
}

const Typography = React.forwardRef<HTMLButtonElement, TypographyProps>(
  ({ className, variant, component, ...props }, ref) => {
    const Comp: React.ElementType = component ? component : "p";

    return <Comp className={cn(typographyVariants({ variant, className }))} ref={ref} {...props} />;
  },
);
Typography.displayName = "Typography";

export { Typography, typographyVariants };
