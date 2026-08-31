import { ImageResponse } from "next/og";
import { business } from "@/lib/content";

export const alt =
  "3D Interactive Virtual Tours, real estate photography and virtual tours";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Share card. Typographic on purpose: the brand plate reads at thumbnail size,
 * and it never goes stale the way a baked-in property photograph would.
 */
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#07111f",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            color: "#c9a45c",
            fontSize: 20,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <div style={{ width: 64, height: 1, backgroundColor: "#c9a45c" }} />
          {business.positioning}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "#f4f0e8",
            fontSize: 82,
            lineHeight: 1.02,
            letterSpacing: -2,
            textTransform: "uppercase",
          }}
        >
          <span>3D Interactive</span>
          <span>Virtual Tours</span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid #1c2c40",
            paddingTop: 28,
            color: "#93a5ba",
            fontSize: 24,
          }}
        >
          <span>Real estate photography and immersive property marketing</span>
          <span style={{ color: "#c9a45c" }}>3divt.com</span>
        </div>
      </div>
    ),
    size,
  );
}
