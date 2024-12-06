interface Props {
  title: string;
  subtitle?: string;
}
export function Title({ title, subtitle }: Props) {
  return (
    <header>
      <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight text-gray-700 dark:text-gray-100 md:text-5xl">
        {title}
      </h1>
      <p className="mb-4 text-base text-muted-foreground">{subtitle}</p>
    </header>
  );
}
