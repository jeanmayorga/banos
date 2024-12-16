import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import Script from "next/script";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "react-hot-toast";

import "./globals.css";

import { Header } from "@/components/header";

import { Footer } from "#/components/Footer";

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
      <body className="bg-gray-50 dark:bg-black">
        <LayoutReactQuery>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NuqsAdapter>
              <Header />
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
