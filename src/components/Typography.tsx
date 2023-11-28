interface Props {
  variant?: "h1";
  children: string;
}
export function Typography({ children, variant }: Props) {
  if (variant === "h1") {
    return <h1 className="text-5xl font-semibold">{children}</h1>;
  }
  return <p>{children}</p>;
}
