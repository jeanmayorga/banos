import Head from "next/head";
import { NavBar } from "components";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { supabase } from "api";
import { Notice } from "modules";
import ReactMarkdown from "react-markdown";

export default function Page({ notice }: { notice: Notice }) {
  return (
    <div>
      <Head>
        <title>Baños de Agua Santa</title>
        <meta name="title" content={notice.title} />
        <meta name="description" content={notice.title.substring(0, 100)} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://banos.app/news/${notice.slug}`}
        />
        <meta property="og:title" content={notice.title} />
        <meta
          property="og:description"
          content={notice.title.substring(0, 100)}
        />
        <meta property="og:image" content={notice.cover} />
      </Head>
      <NavBar
        title={
          notice.title.length > 38
            ? `${notice.title.substring(0, 39)}...`
            : notice.title
        }
      />
      <div className="container m-auto">
        <div className="relative overflow-hidden flex items-center">
          <img src={notice.cover} />
          <div className="bg-[rgba(0,0,0,.2)] absolute w-full h-full" />
        </div>
        <div className="p-4">
          <h1 className="text-3xl font-semibold text-slate-800 mb-2">
            {notice.title}
          </h1>
          <div className="text-sm text-gray-700 mb-3">
            {format(
              new Date(`${notice.created_at}`),
              "EEEE, d 'de' LLLL 'del' yyyy",
              {
                locale: es,
              }
            )}
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

export async function getServerSideProps({ params }: any) {
  const { data: notice } = await supabase
    .from("news")
    .select("*")
    .eq("slug", encodeURI(params.slug))
    .single();

  return {
    props: {
      notice,
    },
  };
}
