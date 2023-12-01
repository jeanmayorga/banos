import { Metadata } from 'next';
import Markdown from 'react-markdown';

import { Typography } from '#/components/ui/typography';
import { ActivityImage } from '#/components/ActivityImage';
import { supabase } from '#/api';
import { ActivitiesForm } from '#/components/ActivitiesForm';
import { Activity } from './types';
import { Badge } from '#/components/ui/badge';
import { ShareButton } from '#/components/ShareButton';
import { Header } from '#/components/Header';
import { Breadcrumds } from '#/components/Breadcrumb';
import { Nav } from '#/components/Nav';

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

      <div className="container mx-auto">
        <Breadcrumds
          items={[
            {
              text: 'Banos de agua santa',
              href: '/',
            },
            {
              text: 'Runtun',
              href: '/places/runtun',
            },
            {
              text: 'La casa del arbol',
              href: '/activities/la-casa-del-arbol',
            },
          ]}
        />

        <div className="mb-8 sm:flex sm:items-center sm:justify-between">
          <div className='mb-4'>
            <Badge variant="outline" className="mb-2 bg-fuchsia-700 text-white">
              Uno de los lugares mas visitados
            </Badge>
            <h1 className="text-5xl font-semibold text-slate-800 mb-4 sm:mb-0">
              {data.title}
            </h1>
            <a
              href="/places/runtun"
              className="text-lg font-light text-slate-700"
            >
              Runtun
            </a>
          </div>

          <ShareButton />
        </div>

        <ActivityImage src="/columpio.jpg" />

        <div className="sm:grid sm:grid-cols-6 gap-8 relative">
          <div className="col-span-4">
            <h2 className="text-xl font-medium">
              La casa del arbol en Banos Ecuador
            </h2>

            <Markdown
              className="mb-8"
              components={{
                h2: (e) => <Typography variant="h2">{e.children}</Typography>,
                p: (e) => <Typography variant="p">{e.children}</Typography>,
              }}
            >
              {data.body}
            </Markdown>
            <Markdown
              className="mb-8"
              components={{
                h2: (e) => <Typography variant="h2">{e.children}</Typography>,
                p: (e) => <Typography variant="p">{e.children}</Typography>,
              }}
            >
              {data.body}
            </Markdown>
            <Markdown
              className="mb-8"
              components={{
                h2: (e) => <Typography variant="h2">{e.children}</Typography>,
                p: (e) => <Typography variant="p">{e.children}</Typography>,
              }}
            >
              {data.body}
            </Markdown>
            <Markdown
              className="mb-8"
              components={{
                h2: (e) => <Typography variant="h2">{e.children}</Typography>,
                p: (e) => <Typography variant="p">{e.children}</Typography>,
              }}
            >
              {data.body}
            </Markdown>
            <Markdown
              className="mb-8"
              components={{
                h2: (e) => <Typography variant="h2">{e.children}</Typography>,
                p: (e) => <Typography variant="p">{e.children}</Typography>,
              }}
            >
              {data.body}
            </Markdown>
            <Markdown
              className="mb-8"
              components={{
                h2: (e) => <Typography variant="h2">{e.children}</Typography>,
                p: (e) => <Typography variant="p">{e.children}</Typography>,
              }}
            >
              {data.body}
            </Markdown>
            <Markdown
              className="mb-8"
              components={{
                h2: (e) => <Typography variant="h2">{e.children}</Typography>,
                p: (e) => <Typography variant="p">{e.children}</Typography>,
              }}
            >
              {data.body}
            </Markdown>
            <Markdown
              className="mb-8"
              components={{
                h2: (e) => <Typography variant="h2">{e.children}</Typography>,
                p: (e) => <Typography variant="p">{e.children}</Typography>,
              }}
            >
              {data.body}
            </Markdown>
            <Markdown
              className="mb-8"
              components={{
                h2: (e) => <Typography variant="h2">{e.children}</Typography>,
                p: (e) => <Typography variant="p">{e.children}</Typography>,
              }}
            >
              {data.body}
            </Markdown>
            <Markdown
              className="mb-8"
              components={{
                h2: (e) => <Typography variant="h2">{e.children}</Typography>,
                p: (e) => <Typography variant="p">{e.children}</Typography>,
              }}
            >
              {data.body}
            </Markdown>
            <Markdown
              className="mb-8"
              components={{
                h2: (e) => <Typography variant="h2">{e.children}</Typography>,
                p: (e) => <Typography variant="p">{e.children}</Typography>,
              }}
            >
              {data.body}
            </Markdown>
            <Markdown
              className="mb-8"
              components={{
                h2: (e) => <Typography variant="h2">{e.children}</Typography>,
                p: (e) => <Typography variant="p">{e.children}</Typography>,
              }}
            >
              {data.body}
            </Markdown>
            <Markdown
              className="mb-8"
              components={{
                h2: (e) => <Typography variant="h2">{e.children}</Typography>,
                p: (e) => <Typography variant="p">{e.children}</Typography>,
              }}
            >
              {data.body}
            </Markdown>
            <Markdown
              className="mb-8"
              components={{
                h2: (e) => <Typography variant="h2">{e.children}</Typography>,
                p: (e) => <Typography variant="p">{e.children}</Typography>,
              }}
            >
              {data.body}
            </Markdown>
            <Markdown
              className="mb-8"
              components={{
                h2: (e) => <Typography variant="h2">{e.children}</Typography>,
                p: (e) => <Typography variant="p">{e.children}</Typography>,
              }}
            >
              {data.body}
            </Markdown>
            <Markdown
              className="mb-8"
              components={{
                h2: (e) => <Typography variant="h2">{e.children}</Typography>,
                p: (e) => <Typography variant="p">{e.children}</Typography>,
              }}
            >
              {data.body}
            </Markdown>
            <Markdown
              className="mb-8"
              components={{
                h2: (e) => <Typography variant="h2">{e.children}</Typography>,
                p: (e) => <Typography variant="p">{e.children}</Typography>,
              }}
            >
              {data.body}
            </Markdown>
            <Markdown
              className="mb-8"
              components={{
                h2: (e) => <Typography variant="h2">{e.children}</Typography>,
                p: (e) => <Typography variant="p">{e.children}</Typography>,
              }}
            >
              {data.body}
            </Markdown>
            <Markdown
              className="mb-8"
              components={{
                h2: (e) => <Typography variant="h2">{e.children}</Typography>,
                p: (e) => <Typography variant="p">{e.children}</Typography>,
              }}
            >
              {data.body}
            </Markdown>
            <Markdown
              components={{
                h2: (e) => <Typography variant="h2">{e.children}</Typography>,
                p: (e) => <Typography variant="p">{e.children}</Typography>,
              }}
            >
              {data.body}
            </Markdown>
          </div>
          <div className="col-span-2">
            <ActivitiesForm />
          </div>
        </div>
      </div>
    </>
  );
}
