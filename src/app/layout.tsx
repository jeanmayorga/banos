import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import Script from "next/script";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "react-hot-toast";

import "./global.css";

import { Footer } from "#/components/Footer";
import { Header } from "#/components/Header";
import { Nav } from "#/components/Nav";

import { LayoutReactQuery } from "./layout-react-query";
import { ThemeProvider } from "./theme-provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="es" className={inter.className}>
      <body>
        <LayoutReactQuery>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NuqsAdapter>
              <Header />
              <Nav />
              {children}
              <Footer />
              <Toaster />
            </NuqsAdapter>
          </ThemeProvider>
        </LayoutReactQuery>
        <Analytics />
      </body>
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
    </html>
  );
}
