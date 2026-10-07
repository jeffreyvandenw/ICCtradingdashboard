import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 96,
          fontSize: 220,
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
