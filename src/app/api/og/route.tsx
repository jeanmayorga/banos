import { ImageResponse } from "next/og";

import { cn } from "#/utils/cn";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const image = searchParams.get("image");

    // ?title=<title>
    const hasTitle = searchParams.has("title");
    const title = hasTitle ? searchParams.get("title")?.slice(0, 100) : "Que hacer en banos?";

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: "black",
            backgroundSize: "150px 150px",
            height: "100%",
            width: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            flexWrap: "nowrap",
          }}
        >
          <div tw="flex">
            {image && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  justifyItems: "center",
                }}
              >
                <img
                  width="500"
                  height="350"
                  src={image}
                  style={{
                    borderRadius: 30,
                  }}
                />
              </div>
            )}
            <div tw="flex flex-col items-center justify-center ml-8">
              <h2 tw="text-6xl tracking-tight text-gray-200 font-extrabold">{title}</h2>
              <h2 tw="text-2xl font-bold tracking-tight text-gray-400">
                Banos de Agua Santa, Ecuador
              </h2>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
