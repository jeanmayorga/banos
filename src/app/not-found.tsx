import { Header } from "#/components/Header";
import { Nav } from "#/components/Nav";
import { Typography } from "#/components/ui/typography";

export default function NotFound() {
  return (
    <div>
      <Header />
      <Nav />
      <div className="flex items-center justify-center h-60">
        <Typography variant="h1">
          No se encontro esa página.
        </Typography>
      </div>
    </div>
  )
}