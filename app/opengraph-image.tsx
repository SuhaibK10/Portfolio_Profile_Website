import { ImageResponse } from "next/og";

export const alt = "Suhaib Khan: Engineer, Researcher, Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#141a24",
          backgroundImage:
            "radial-gradient(ellipse 75% 90% at 50% 0%, rgba(99,102,241,0.28) 0%, transparent 70%)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#A78BFA",
            marginBottom: 32,
          }}
        >
          ENGINEER · RESEARCHER · BUILDER
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 92,
            fontWeight: 700,
            color: "#FFFFFF",
            letterSpacing: -2,
          }}
        >
          Suhaib Khan
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 30,
            color: "#CBD5E1",
            maxWidth: 860,
            textAlign: "center",
          }}
        >
          Building Intelligent Systems that Compound
        </div>
      </div>
    ),
    { ...size },
  );
}
