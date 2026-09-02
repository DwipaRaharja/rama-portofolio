import { ImageResponse } from "next/og";

export const alt = "Ramadwipa Portfolio, Full Stack Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "white",
          color: "black",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: "54px",
          width: "100%",
        }}
      >
        <div
          style={{
            border: "4px solid black",
            borderRadius: "32px",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
            padding: "54px 62px",
            position: "relative",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", fontSize: 32, fontWeight: 800 }}>
            Ramadwipa.
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 76,
                fontWeight: 900,
                letterSpacing: "-4px",
                lineHeight: 1.03,
                maxWidth: "880px",
              }}
            >
              Building Modern Digital Solutions for Business.
            </div>
            <div
              style={{
                color: "#555",
                display: "flex",
                fontSize: 27,
                marginTop: "28px",
              }}
            >
              Full Stack Developer · Next.js · Laravel
            </div>
          </div>

          <div
            style={{
              alignItems: "center",
              background: "black",
              borderRadius: "999px",
              color: "white",
              display: "flex",
              fontSize: 24,
              fontWeight: 700,
              height: "72px",
              justifyContent: "center",
              position: "absolute",
              right: "62px",
              top: "54px",
              width: "190px",
            }}
          >
            PORTFOLIO
          </div>
        </div>
      </div>
    ),
    size,
  );
}
