import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import Image from "next/image";
import { JumboForm } from "./Form";

interface Props {
  title: string;
  description: string;
  image: string;
}

export function Jumbo({ title, description, image }: Props) {
  return (
    <Box
      position="relative"
      height={{ base: "100vh", lg: "500px" }}
      bg="black"
      overflow="hidden"
      borderRadius={{ base: "none", lg: "lg" }}
    >
      <Box position="absolute" zIndex={10} w="full" h="full">
        <Image
          src={image}
          alt="cover"
          layout="fill"
          objectFit="cover"
          className="zoomInOut"
        />
      </Box>
      <Box
        position="absolute"
        zIndex={10}
        bg="rgba(0,0,0,.5)"
        w="full"
        h="full"
      />
      <Box
        position="absolute"
        zIndex={20}
        top="50%"
        transform="translateY(-50%)"
        w="full"
        px={{ base: 5, lg: 20 }}
      >
        <SimpleGrid columns={{ base: 1, lg: 2 }} mb={4}>
          <div>
            <Heading as="h1" size="3xl" color="white" mb={4}>
              {title}
            </Heading>
            <Text fontSize="md" color="gray.200">
              {description}
            </Text>
          </div>
        </SimpleGrid>
        <JumboForm />
      </Box>
    </Box>
  );
}
