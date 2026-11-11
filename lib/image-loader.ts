/**
 * Custom next/image loader.
 * Unsplash images are resized by Unsplash's own CDN (fast, cached, auto WebP/AVIF),
 * everything else (e.g. flag PNGs) is served as-is.
 */
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 70));
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "crop");
    return url.toString();
  }
  return src;
}
