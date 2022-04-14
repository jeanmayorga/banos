import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { CalendarDefaultTheme } from "@uselessdev/datepicker";
import { Layout } from "client/components";
import "../client/styles/globals.css";
import Script from "next/script";

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
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-4WJMRLZSCE"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-4WJMRLZSCE');
        `}
      </Script>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
