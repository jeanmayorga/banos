import { Box, Text } from "@chakra-ui/react";

interface Props {
  variant?: "full" | "header";
  color?: "gray.100" | "gray.500" | "brand.500";
}
export function Logo({ variant, color = "gray.100" }: Props) {
  return (
    <Box width="200px" position="relative" userSelect="none">
      <Text
        as="div"
        fontFamily="'Satisfy', cursive"
        fontSize="7xl"
        lineHeight="none"
        color={color}
      >
        Banos
      </Text>
      <Text
        as="div"
        fontFamily="'Satisfy', cursive"
        fontSize="3xl"
        lineHeight="none"
        color={color}
        margin="-12px 0 0 30px"
      >
        de Agua Santa
      </Text>
    </Box>
  );
}
