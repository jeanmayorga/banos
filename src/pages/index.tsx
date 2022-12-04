import Head from "next/head";
export default function Page() {
  return (
    <div>
      <Head>
        <title>Elección de la reina de Baños de Agua Santa</title>
        <meta
          name="title"
          content="Elección de la reina de Baños de Agua Santa"
        />
        <meta
          name="description"
          content="Elección y Coronación de la Belleza y la Mujer Baneña - 2022"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://banos.app/" />
        <meta
          property="og:title"
          content="Elección de la reina de Baños de Agua Santa"
        />
        <meta
          property="og:description"
          content="Elección y Coronación de la Belleza y la Mujer Baneña - 2022"
        />
        <meta
          property="og:image"
          content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png"
        />
      </Head>
      <div className="bg-fuchsia-900 text-white p-4 py-3 text-ellipsis whitespace-nowrap w-full">
        Elección y Coronación de la Belleza Baneña
      </div>
      <div className="container m-auto">
        <div>
          <iframe
            src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fbanosturismo%2Fvideos%2F676028337395989%2F&show_text=false&width=560&t=0"
            style={{
              border: "none",
              overflow: "hidden",
            }}
            scrolling="no"
            frameBorder="0"
            allowFullScreen
            className="border-none w-full h-[500px]"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          />
        </div>
      </div>
    </div>
  );
}
