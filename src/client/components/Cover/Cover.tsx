import Image from "next/image";
import { Box, Container } from "@chakra-ui/react";

interface Props {
  src: string;
  alt: string;
}
export function Cover({ src, alt }: Props) {
  return (
    <Container maxW="container.xl" padding={{ base: "0", lg: "auto" }} mb="8">
      <Box
        position="relative"
        height={{ base: "200px", lg: "500px" }}
        bg="black"
        overflow="hidden"
        borderRadius={{ base: "none", lg: "lg" }}
      >
        <Image src={src} alt={alt} layout="fill" objectFit="cover" />
      </Box>
    </Container>
  );
}
