import { Header } from "../Header";


interface Props {
  children: React.ReactNode;
}
export function Layout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
