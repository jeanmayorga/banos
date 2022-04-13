import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
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
        <Flex justifyContent="space-between" alignItems="center" height="70px">
          <Link href="/">
            <a>
              <Text
                userSelect="none"
                fontSize="4xl"
                lineHeight="none"
                color="brand.500"
                fontFamily="'Satisfy', cursive"
              >
                Banos
              </Text>
            </a>
          </Link>
          <Box>
            <InputGroup>
              <Input
                rounded="full"
                _focus={{
                  width: "600px",
                }}
                transition="all .3s"
                width="300px"
                fontSize="sm"
                placeholder="¿Qué estás búscando en Baños?"
              />
              <InputRightElement>
                <IconButton
                  colorScheme="brand"
                  aria-label="Search"
                  size="sm"
                  rounded="full"
                >
                  <Icon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </Icon>
                </IconButton>
              </InputRightElement>
            </InputGroup>
          </Box>
          <Box display="flex" alignItems="center" gap={2}>
            {/* <Menu>
              <MenuButton as={Button} variant="outline" rounded="full">
                <Flex alignItems="center">
                  <Avatar
                    name="Paul Mayorga"
                    src="https://bit.ly/dan-abramov"
                    size="sm"
                    mr="2"
                  />
                  Jean
                </Flex>
              </MenuButton>
              <MenuList zIndex={100}>
                <MenuItem>New File</MenuItem>
                <MenuItem>New Window</MenuItem>
                <MenuDivider />
                <MenuItem>Open...</MenuItem>
                <MenuItem>Save File</MenuItem>
              </MenuList>
            </Menu> */}
            <Button
              variant="outline"
              rounded="full"
              leftIcon={
                <Icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </Icon>
              }
            >
              Menu
            </Button>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
