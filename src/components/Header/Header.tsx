import { Box, Container, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

export function Header() {
  return (
    <Box
      as="header"
      w="full"
      bg="white"
      borderBottom="1px"
      borderColor="gray.300"
    >
      <Container maxW="container.xl">
        <Flex justifyContent="space-between" alignItems="center" height="60px">
          <Box>
            <Link href="/">
              <a>
                <Text
                  userSelect="none"
                  fontSize="4xl"
                  // fontWeight="bold"
                  lineHeight="none"
                  color="brand.500"
                  fontFamily="'Satisfy', cursive"
                >
                  Banos
                </Text>
              </a>
            </Link>
          </Box>
          <Box>Search</Box>
          <Box>Actions</Box>
        </Flex>
      </Container>
    </Box>
  );
}
