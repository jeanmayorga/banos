import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  Link as ChakraLink,
} from "@chakra-ui/react";
import Link from "next/link";
import Img from "next/image";
import { Logo } from "../Logo";

const footer = [
  {
    title: "Banos de Agua Santa",
    links: [
      {
        label: "Información",
        href: "/informacion",
      },
      {
        label: "Acerca de",
        href: "/acerca",
      },
      {
        label: "Ubicación",
        href: "/ubicacion",
      },
      {
        label: "Historia",
        href: "/historia",
      },
    ],
  },
  {
    title: "Que hacer",
    links: [
      {
        label: "Rafting",
        href: "/rafting",
      },
      {
        label: "Caynoning",
        href: "/canyoning",
      },
      {
        label: "Puenting",
        href: "/puenting",
      },
      {
        label: "Canopy",
        href: "/canopy",
      },
      {
        label: "Tarabita",
        href: "/tarabita",
      },
      {
        label: "Parapente",
        href: "/parapente",
      },
    ],
  },
  {
    title: "Que visitar",
    links: [
      {
        label: "La casa del Arbol",
        href: "/la-casa-del-arbol",
      },
      {
        label: "Las manos de la Pachamama",
        href: "/las-manos-de-la-pachamama",
      },
      {
        label: "La resbaladera mas larga de America",
        href: "/la-resbaladera-mas-larga-de-america",
      },
      {
        label: "Las manos de Dios",
        href: "/las-manos-de-dios",
      },
      {
        label: "Los pies de Dios",
        href: "/los-pies-de-dios",
      },
    ],
  },
];

export function Footer() {
  return (
    <Box as="footer" bg="gray.50" borderTop="1px" borderColor="gray.300">
      <Box w="full" height="3px" position="relative">
        <Img src="/bottombar.jpg" layout="fill" />
      </Box>
      <Box marginY="16" display="flex" justifyContent="center">
        <Link href="/">
          <a>
            <Logo color="gray.500" />
          </a>
        </Link>
      </Box>

      <Container maxW="container.xl">
        <Box>
          <SimpleGrid columns={[1, null, 5]} spacing={16} mb={8}>
            {footer.map((item, index) => (
              <Box key={index}>
                <Heading
                  as="h4"
                  color="gray.500"
                  size="xs"
                  mb={2}
                  textTransform="uppercase"
                >
                  {item.title}
                </Heading>
                {item.links.map((link, index) => (
                  <Link key={index} href={link.href} passHref>
                    <ChakraLink fontSize="sm" display="block" mb="2">
                      {link.label}
                    </ChakraLink>
                  </Link>
                ))}
              </Box>
            ))}
          </SimpleGrid>
          <Box w={{ base: "100%", lg: "50%" }}>
            <Heading
              as="h4"
              color="gray.500"
              size="xs"
              mb={2}
              textTransform="uppercase"
            >
              Aviso legal
            </Heading>
            <Text fontSize="sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatem sequi officia eius eligendi facilis mollitia itaque
              recusandae accusamus, exercitationem ratione nemo. Perferendis
              enim eveniet blanditiis veniam rem praesentium eius magnam!
            </Text>
          </Box>
        </Box>
        <Flex
          marginTop="16"
          alignItems="center"
          justifyContent="space-between"
          borderTop="1px"
          borderColor="gray.200"
          py="4"
        >
          <Text fontSize="sm">Copyright @ 2022 All rights reserved</Text>
          <div>Ig</div>
        </Flex>
      </Container>
    </Box>
  );
}
