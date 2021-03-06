import Image from "next/image";
import {
  Box,
  Text,
  Grid,
  Flex,
  GridItem,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { Logo } from "client/components";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  email: string;
  pass: string;
};

export function SignInPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsLoading(true);
      console.log(data);
    } catch (error: any) {
      const errorMessage = error.message;
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Grid templateColumns="repeat(12, 1fr)">
      <GridItem
        colSpan={{ base: 12, lg: 4 }}
        padding={8}
        position="relative"
        height={{ base: "40vh", lg: "100vh" }}
        bg="black"
        overflow="hidden"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          position="absolute"
          zIndex={11}
          bg="rgba(0,0,0,.7)"
          w="full"
          h="full"
        />
        <Box position="absolute" zIndex={10} w="full" h="full">
          <Image
            src="/columpio.jpg"
            alt="cover"
            layout="fill"
            objectFit="cover"
            className="zoomInOut"
          />
        </Box>
        <Box zIndex={12}>
          <Flex
            marginBottom={{ base: 4, lg: 8 }}
            justifyContent={{ base: "center", lg: "start" }}
          >
            <Logo />
          </Flex>
          <Flex
            marginBottom={{ base: 2, lg: 8 }}
            justifyContent={{ base: "center", lg: "start" }}
          >
            <Box bg="white" h="3px" w="100px"></Box>
          </Flex>
          <Text
            textAlign={{ base: "center", lg: "left" }}
            marginBottom={{ base: 0, lg: 4 }}
            fontSize={{ base: "2xl", lg: "5xl" }}
            color="white"
            fontWeight="bold"
            lineHeight="none"
          >
            La ciudad tur??stica del Ecuador.
          </Text>
          <Text
            fontSize="lg"
            color="gray.100"
            lineHeight="none"
            display={{ base: "none", lg: "block" }}
          >
            Software para potenciar todos los puntos tur??stisticos de la ciudad.
          </Text>
        </Box>
      </GridItem>

      <GridItem
        height={{ base: "60vh", lg: "100vh" }}
        colSpan={{ base: 12, lg: 8 }}
        padding={4}
        display="flex"
        alignItems="center"
      >
        <Box w={{ base: "100%", lg: "350px" }} margin="auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Heading color="gray.600" mb={8}>
              Iniciar Sesi??n
            </Heading>

            {error && (
              <Alert status="error" mb={8} borderRadius="lg">
                <AlertIcon />
                {error}
              </Alert>
            )}

            <FormControl mb={6}>
              <FormLabel htmlFor="email">Correo electr??nico:</FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="john@email.com"
                size="lg"
                disabled={isLoading}
              />
            </FormControl>

            <FormControl mb={6}>
              <FormLabel htmlFor="pass">Contrase??a:</FormLabel>
              <Input
                id="pass"
                type="password"
                placeholder="Contrase??a"
                size="lg"
                disabled={isLoading}
              />
            </FormControl>

            <FormControl mb={6}>
              <Checkbox defaultChecked size="sm" disabled={isLoading}>
                He le??do y acepto{" "}
                <a href="/terms">los t??rminos y condiciones</a>
              </Checkbox>
            </FormControl>

            <Button
              colorScheme="brand"
              isFullWidth
              size="lg"
              isLoading={isLoading}
              type="submit"
            >
              Entrar
            </Button>
          </form>
        </Box>
      </GridItem>
    </Grid>
  );
}
