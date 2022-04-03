import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { CalendarDefaultTheme } from "@uselessdev/datepicker";

const colors = {
  brand: {
    900: "#4133e0",
    800: "#4d3fea",
    700: "#5f53ec",
    600: "#5f53ec",
    500: "#7065f0",
    400: "#7267f0",
    300: "#F9F7FD",
    200: "#F9F7FD",
    100: "#F9F7FD",
    50: "#ebf0fe",
  },
};

const components = {
  Button: {
    baseStyle: {
      _focus: {
        boxShadow: "0 0 0 2px rgba(112,101,240,.4)",
      },
    },
  },
  CalendarDay: {
    variants: {
      selected: {
        bgColor: "brand.400",
        color: "white",
        borderRadius: "xl",

        _hover: {
          bgColor: "brand.700",
        },
      },
    },
  },
};

const theme = extendTheme(CalendarDefaultTheme, { colors, components });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
