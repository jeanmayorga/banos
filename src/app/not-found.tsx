import { Header } from "#/components/Header";
import { Nav } from "#/components/Nav";
import { Typography } from "#/components/ui/typography";

export default function NotFound() {
  return (
    <div>
      <Header />
      <Nav />
      <div className="flex h-60 items-center justify-center">
        <Typography variant="h1">No se encontro esa página.</Typography>
      </div>
    </div>
  );
}
