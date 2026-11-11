import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name}: Kenyan talent, global careers`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #0B1B3F 0%, #112657 60%, #2847D9 140%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, border: "2px solid #F5B841", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 34, height: 34, borderRadius: 999, border: "3px solid #F5B841" }} />
          </div>
          <div style={{ fontSize: 30, fontWeight: 700 }}>{site.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ width: 120, height: 4, background: "#F5B841", borderRadius: 4, marginBottom: 28 }} />
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05 }}>Kenyan talent.</div>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, color: "#F5B841" }}>Global careers.</div>
          <div style={{ fontSize: 28, marginTop: 24, color: "rgba(255,255,255,0.75)" }}>
            Verified jobs in the UK, Germany, Canada, Poland, Japan, UAE, Qatar &amp; Australia
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#F5B841" }}>{site.licence}</div>
      </div>
    ),
    size,
  );
}
