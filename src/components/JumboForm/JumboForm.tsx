import { Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { useState } from "react";

export function JumboForm() {
  const [people, setPeople] = useState<number>(0);

  return (
    <Grid
      templateColumns="repeat(4, 1fr)"
      gap={1}
      bg="white"
      py={4}
      w="full"
      borderRadius="lg"
      width="60%"
    >
      <GridItem px={4} borderRight="1px" borderColor="gray.100">
        <Text
          textColor="gray.500"
          fontSize="sm"
          lineHeight={1}
          marginBottom={1}
        >
          Personas:
        </Text>
        <Flex justifyContent="space-between" alignItems="center">
          <Button
            size="xs"
            rounded="full"
            disabled={people === 0}
            onClick={() => setPeople(people - 1)}
          >
            -
          </Button>
          <Text
            textColor="gray.600"
            fontWeight="bold"
            lineHeight={1}
            fontSize="lg"
          >
            {people}
          </Text>
          <Button
            size="xs"
            rounded="full"
            onClick={() => setPeople(people + 1)}
          >
            +
          </Button>
        </Flex>
      </GridItem>
      <GridItem colSpan={2} px={4} borderRight="1px" borderColor="gray.100">
        <Text
          textColor="gray.500"
          fontSize="sm"
          lineHeight={1}
          marginBottom={1}
        >
          Cuando:
        </Text>
        <Flex justifyContent="space-between" alignItems="center">
          <Text
            textColor="gray.600"
            fontWeight="bold"
            fontSize="lg"
            lineHeight={1}
          >
            Seleccionar Fecha
          </Text>
          <Button size="xs" rounded="full">
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </Button>
        </Flex>
      </GridItem>
      <GridItem px={4} borderRight="1px" borderColor="gray.100">
        <Button isFullWidth>Reservar</Button>
      </GridItem>
    </Grid>
  );
}
