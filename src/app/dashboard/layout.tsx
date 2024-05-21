import Script from "next/script";

import { Header } from "#/components/Header";
import { Nav } from "#/components/Nav";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <Nav />
      {children}
      <Script src="https://upload-widget.cloudinary.com/global/all.js" />
    </>
  );
}
