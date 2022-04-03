import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
  useOutsideClick,
} from "@chakra-ui/react";
import {
  Calendar,
  CalendarControls,
  CalendarDate,
  CalendarDays,
  CalendarMonth,
  CalendarMonthName,
  CalendarMonths,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarValues,
  CalendarWeek,
} from "@uselessdev/datepicker";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useRef, useState } from "react";

export function JumboForm() {
  const [people, setPeople] = useState<number>(0);
  const [date, setDate] = useState<CalendarDate>(new Date());

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const calendarRef = useRef(null);

  const handleSelectDate = (value: CalendarDate) => {
    setDate(value);
    onClose();
  };

  useOutsideClick({
    ref: calendarRef,
    handler: onClose,
    enabled: isOpen,
  });

  return (
    <Grid
      templateColumns={{ base: "1fr", lg: "repeat(4, 1fr)" }}
      gap={1}
      bg="white"
      py={4}
      w="full"
      borderRadius="lg"
      width={{ base: "100%", lg: "60%" }}
    >
      <GridItem
        py={{ base: 2, lg: 0 }}
        px={4}
        borderWidth={{ base: 0, lg: "0 1px 0 0" }}
        borderColor="gray.100"
      >
        <Text
          textColor="gray.600"
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
            aria-label="menos"
            variant="outline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              width="18px"
              height="18px"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
            </svg>
          </Button>
          <Text
            textColor="gray.600"
            fontWeight="bold"
            lineHeight={1}
            fontSize="md"
            userSelect="none"
          >
            {people}
          </Text>
          <Button
            size="xs"
            rounded="full"
            onClick={() => setPeople(people + 1)}
            aria-label="mas"
            variant="outline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              width="18px"
              height="18px"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </Button>
        </Flex>
      </GridItem>
      <GridItem
        colSpan={2}
        borderColor="gray.100"
        py={{ base: 2, lg: 0 }}
        px={4}
        borderWidth={{ base: 0, lg: "0 1px 0 0" }}
      >
        <Text
          textColor="gray.600"
          fontSize="sm"
          lineHeight={1}
          marginBottom={1}
          userSelect="none"
        >
          Cuando:
        </Text>
        <Flex justifyContent="space-between" alignItems="center">
          <Text
            textColor="gray.600"
            fontWeight="bold"
            fontSize="md"
            lineHeight={1}
            userSelect="none"
          >
            {format(date, "EEEE, dd MMMM yyyy", { locale: es })}
          </Text>
          <Popover
            placement="auto"
            isOpen={isOpen}
            onClose={onClose}
            initialFocusRef={initialRef}
            isLazy
          >
            <PopoverTrigger>
              <Box onClick={onOpen} ref={initialRef}>
                <Button
                  size="xs"
                  rounded="full"
                  aria-label="calendario"
                  variant="outline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    width="18px"
                    height="18px"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </Button>
              </Box>
            </PopoverTrigger>

            <PopoverContent
              p={0}
              w="min-content"
              border="none"
              outline="none"
              _focus={{ boxShadow: "none" }}
              ref={calendarRef}
            >
              <Calendar
                value={{ start: date }}
                onSelectDate={(date) => handleSelectDate(date as CalendarDate)}
                locale={es}
                singleDateSelection
              >
                <PopoverBody p={0}>
                  <CalendarControls>
                    <CalendarPrevButton />
                    <CalendarNextButton />
                  </CalendarControls>
                  <CalendarMonths>
                    <CalendarMonth>
                      <CalendarMonthName />
                      <CalendarWeek />
                      <CalendarDays />
                    </CalendarMonth>
                  </CalendarMonths>
                </PopoverBody>
              </Calendar>
            </PopoverContent>
          </Popover>
        </Flex>
      </GridItem>
      <GridItem px={4} py={{ base: 2, lg: 0 }}>
        <Button isFullWidth aria-label="reservar" colorScheme="brand">
          Reservar
        </Button>
      </GridItem>
    </Grid>
  );
}
