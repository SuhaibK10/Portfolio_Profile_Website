import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Suhaib Khan: Thinker, Researcher, Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const avatarBuffer = await readFile(join(process.cwd(), "public/avatar.jpg"));
  const avatarSrc = `data:image/jpeg;base64,${avatarBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#141a24",
        }}
      >
        {/* Soft off-center glow, kept subtle rather than a centered sheen */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            backgroundImage:
              "radial-gradient(ellipse 55% 70% at 12% 8%, rgba(167,139,250,0.18) 0%, transparent 70%)",
          }}
        />

        {/* Edge vignette */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            backgroundImage:
              "radial-gradient(ellipse 120% 100% at 50% 50%, transparent 55%, rgba(0,0,0,0.35) 100%)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            width: "100%",
            padding: "0 90px",
            gap: 64,
          }}
        >
          <img
            src={avatarSrc}
            width={216}
            height={216}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid rgba(167,139,250,0.4)",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 20,
                letterSpacing: 6,
                textTransform: "uppercase",
                color: "#A78BFA",
                marginBottom: 18,
              }}
            >
              THINKER · RESEARCHER · ENGINEER
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 74,
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: -2,
                lineHeight: 1.05,
              }}
            >
              Suhaib Khan
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 22,
                fontSize: 28,
                color: "#CBD5E1",
                maxWidth: 620,
              }}
            >
              Building Intelligent Systems that Compound
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
