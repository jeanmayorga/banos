import { Metadata } from 'next';

import { Header } from '#/components/Header';
import { Nav } from '#/components/Nav';
import { Input } from '#/components/ui/input';

export const metadata: Metadata = {
  title: 'Banos de Agua Santa | Ecuador',
};

interface Props {
  searchParams: {
    q?: string;
  };
}

export default function Page({ searchParams }: Props) {
  return (
    <>
      <Header hideSearch />
      <Nav />
      <div className="container mx-auto my-8">
        <div>
          <Input defaultValue={searchParams.q}
            autoFocus
            className="rounded-full"
            placeholder="Búscar..."
          />
        </div>
      </div>
    </>
  );
}
