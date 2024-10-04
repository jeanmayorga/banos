import { Container } from "@/components/container";

import { Typography } from "#/components/ui/typography";

export default function NotFound() {
  return (
    <div className="flex h-60 items-center justify-center">
      <Container>
        <Typography variant="h1">No se encontro esa página.</Typography>
      </Container>
    </div>
  );
}
