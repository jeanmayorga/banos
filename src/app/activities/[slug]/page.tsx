import { Metadata } from 'next';

import { Header } from '#/components/Header';
import { supabase } from '#/api';
import { Activity } from '../types';
import { Nav } from '#/components/Nav';
import { Button } from '#/components/ui/button';

export const metadata: Metadata = {
  title: 'Banos de Agua Santa | Ecuador',
};

export default async function Page() {
  const request = await supabase
    .from('activities')
    .select('*')
    .eq('slug', 'la-casa-del-arbol')
    .single();

  const data = request.data as Activity;

  return (
    <>
      <Header />
      <Nav />

      <Button variant="default">Hoola</Button>
      <Button variant="destructive">Hoola</Button>
      <Button variant="outline">Hoola</Button>
      <Button variant="secondary">Hoola</Button>
      <Button variant="ghost">Hoola</Button>
    </>
  );
}
