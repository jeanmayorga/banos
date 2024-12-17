import { Container } from "@/components/container";

import { Typography } from "#/components/ui/typography";

export default function NotFound() {
  return (
    <>
      <div className="flex h-60 items-center justify-center">
        <Container>
          <Typography variant="h1" className="text-center text-6xl text-gray-500">
            404
          </Typography>
        </Container>
      </div>
    </>
  );
}
