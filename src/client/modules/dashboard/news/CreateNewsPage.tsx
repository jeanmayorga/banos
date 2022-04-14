import { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  Flex,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { createNew } from "../../../services";

type Inputs = {
  title: string;
  body: string;
  cover: string;
};

export function CreateNewsPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsLoading(true);
      await createNew({
        title: data.title,
        body: data.body,
        cover: data.cover,
      });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box bg="gray.50" borderBottom="1px" borderColor="gray.200">
        <Container
          maxW="container.md"
          height="130px"
          display="flex"
          alignItems="center"
        >
          <Heading as="h1" size="xl" color="gray.500">
            Crear una nueva noticia
          </Heading>
        </Container>
      </Box>
      <Container maxW="container.md" py={10}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl mb={10}>
            <FormLabel htmlFor="title">Titulo</FormLabel>
            <Input id="title" type="text" {...register("title")} size="lg" />
          </FormControl>
          <FormControl mb={10}>
            <FormLabel htmlFor="cover">Imagen Url</FormLabel>
            <Input id="cover" type="text" {...register("cover")} size="lg" />
          </FormControl>
          <FormControl mb={10}>
            <FormLabel htmlFor="body">Body</FormLabel>
            <Textarea id="body" {...register("body")} />
          </FormControl>
          <Flex justifyContent="flex-end" gap={5}>
            <Button
              type="submit"
              variant="solid"
              colorScheme="brand"
              size="lg"
              isLoading={isLoading}
            >
              Crear
            </Button>
          </Flex>
        </form>
      </Container>
    </>
  );
}
