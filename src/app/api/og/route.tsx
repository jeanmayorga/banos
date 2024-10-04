import { ImageResponse } from "next/og";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          letterSpacing: "-.02em",
          fontWeight: 700,
          background: "white",
        }}
      >
        <div
          style={{
            left: 42,
            top: 42,
            position: "absolute",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              width: 24,
              height: 24,
              background: "black",
              borderRadius: "50%",
            }}
          />
          <span
            style={{
              marginLeft: 8,
              fontSize: 20,
            }}
          >
            banos.app
          </span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 60,
            color: "black",
            width: "100%",
            height: "100%",
            paddingTop: 50,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>{title}</p>
          {/* <img
          width="1000"
          height="400"
          src={`https://res.cloudinary.com/da3uyv9xp/image/upload/v1703538726/bsigzf6hwkfhkimrne9s.jpg`}
          /> */}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
