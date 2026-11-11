import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = site.tagline;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "radial-gradient(circle at 75% 55%, #0a4a40 0%, #031f1b 55%, #021411 100%)", color: "#fffdf8", padding: 72, position: "relative" }}>
        <div style={{ position: "absolute", right: 90, top: 115, width: 400, height: 400, borderRadius: 400, border: "2px solid #0e9f6e", display: "flex", boxShadow: "0 0 120px 20px rgba(14,159,110,0.35)" }} />
        <div style={{ position: "absolute", right: 245, top: 115, width: 90, height: 400, borderRadius: 400, border: "1.5px solid rgba(14,159,110,0.6)", display: "flex" }} />
        <div style={{ position: "absolute", right: 300, top: 330, width: 22, height: 22, borderRadius: 22, background: "#ff6b4a", boxShadow: "0 0 30px 8px rgba(255,107,74,0.8)", display: "flex" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 640 }}>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, color: "#5fd3a8", textTransform: "uppercase" }}>{site.licence}</div>
          <div style={{ fontSize: 78, fontWeight: 800, lineHeight: 1.02, marginTop: 24 }}>Your career journey starts in</div>
          <div style={{ fontSize: 78, fontWeight: 800, lineHeight: 1.02, color: "#ff6b4a" }}>Nairobi.</div>
          <div style={{ display: "flex", fontSize: 28, marginTop: 28, color: "#f6ebdd" }}>{site.name} · 8 countries · No hidden fees</div>
        </div>
      </div>
    ),
    size
  );
}
