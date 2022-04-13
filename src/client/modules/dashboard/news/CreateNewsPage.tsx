// import { useState } from "react";
import { Box, Container, Heading, Input } from "@chakra-ui/react";

export function CreateNewsPage() {
  return (
    <>
      <Box bg="gray.100">
        <Container maxW="container.xl" py={10}>
          <Heading as="h1" size="xl" color="gray.500">
            Crear una nueva noticia
          </Heading>
        </Container>
      </Box>
      <Container maxW="container.xl" py={10}>
        <Input placeholder="Titulo" />
      </Container>
    </>
  );
}
