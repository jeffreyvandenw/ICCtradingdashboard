import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #1c1d21 0%, #0a0a0c 100%)",
          fontSize: 80,
          fontWeight: 700,
          color: "#d4b06e",
          fontFamily: "sans-serif",
        }}
      >
        IH
      </div>
    ),
    { ...size },
  );
}
