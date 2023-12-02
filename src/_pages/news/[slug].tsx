import { format } from "date-fns";
import { es } from "date-fns/locale";
import Head from "next/head";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

import { supabase } from "#/api";
import { Calendar } from "#/components/Calendar";
import { NavBar } from "#/components/NavBar";
import { Notice } from "#/modules";

export default function Page({ notice }: { notice: Notice }) {
  return (
    <div>
      <Head>
        <title>{notice.title} | Baños de Agua Santa</title>
        <meta name="title" content={notice.title} />
        <meta name="description" content={notice.title.substring(0, 100)} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://banos.app/news/${notice.slug}`} />
        <meta property="og:title" content={notice.title} />
        <meta property="og:description" content={notice.title.substring(0, 100)} />
        <meta property="og:image" content={notice.ogCover || notice.cover} />
      </Head>
      <Calendar />
      <NavBar
        title={notice.title.length > 38 ? `${notice.title.substring(0, 39)}...` : notice.title}
      />
      <div className="container m-auto">
        <div className="relative overflow-hidden flex items-center h-[600px] lg:h-[1000px]">
          <Image src={notice.cover} alt={notice.title} fill className=" object-cover" />
          <div className="bg-[rgba(0,0,0,.2)] absolute w-full h-full" />
        </div>
        <div className="px-4 pt-4 text-xs">Foto: Alex Guevara</div>
        <div className="p-4">
          <h1 className="text-3xl font-semibold text-slate-800 mb-2">{notice.title}</h1>
          <div className="text-sm text-gray-400 mb-3">
            {format(new Date(`${notice.created_at}`), "EEEE, d 'de' LLLL 'del' yyyy", {
              locale: es,
            }).toLocaleUpperCase()}
          </div>
          <ReactMarkdown
            className="text-justify"
            components={{
              p: ({ node, ...props }) => <p className="mb-8" {...props} />,
            }}
          >
            {notice.body}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const { data: news } = await supabase.from("news").select("slug");

  const paths = news?.map((notice) => {
    return {
      params: {
        slug: notice.slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const { data: notice } = await supabase
    .from("news")
    .select("*")
    .eq("slug", encodeURI(params.slug))
    .single();

  return {
    props: {
      notice,
    },
    revalidate: 3600,
  };
}
