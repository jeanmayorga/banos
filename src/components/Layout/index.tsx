import { Header } from 'components';

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
