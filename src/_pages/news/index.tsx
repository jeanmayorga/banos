import { supabase } from '#/api';
import { Notice } from '#/modules';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Page() {
  const [news, setNews] = useState<Notice[]>([]);

  useEffect(() => {
    supabase
      .from('news')
      .select('*')
      .then(({ data }) => {
        setNews(data as Notice[]);
      });
  }, []);

  return (
    <div>
      <Head>
        <title>Noticias | Baños de Agua Santa</title>
      </Head>
      <div className="container m-auto mt-8 px-4">
        {news.length > 0 ? (
          news.map((notice) => (
            <Link key={notice.id} href={`/news/${notice.slug}`} passHref>
              <div className="shadow-md rounded overflow-hidden">
                <div className="relative h-[180px] overflow-hidden flex items-center">
                  <Image
                    src={notice.cover}
                    alt={notice.title}
                    fill
                    className="object-cover"
                  />
                  <div className="bg-[rgba(0,0,0,.5)] absolute w-full h-full" />
                </div>
                <div className="p-3">
                  <div className="text-2xl font-light mb-1">{notice.title}</div>
                  <div className="text-sm">{notice.body.substring(0, 200)}</div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="shadow-md rounded overflow-hidden mb-4">
            <div className="relative h-[150px] overflow-hidden flex items-center">
              <div className="bg-[rgba(0,0,0,.3)] absolute w-full h-full" />
            </div>
            <div className="p-3">
              <div className="mb-3">
                <div className="bg-[rgba(0,0,0,.3)] w-40 h-[32px]" />
              </div>
              <div className="">
                <div className="bg-[rgba(0,0,0,.3)] w-full h-[14px] mb-1" />
                <div className="bg-[rgba(0,0,0,.3)] w-full h-[14px] mb-1" />
                <div className="bg-[rgba(0,0,0,.3)] w-full h-[14px] mb-1" />
                <div className="bg-[rgba(0,0,0,.3)] w-full h-[14px] mb-1" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const { data: news } = await supabase.from('news').select('*');

  return {
    props: {
      news,
    },
  };
}
