export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export const formatBytes = (b: number) =>
  b < 1024 * 1024 ? `${Math.max(1, Math.round(b / 1024))} KB` : `${(b / 1024 / 1024).toFixed(1)} MB`;

export const whatsappLink = (digits: string, text: string) => `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;

/** Normalises +254 7XX…, 2547XX…, 07XX…, 01XX… to +2547XXXXXXXX. Returns null if invalid. */
export function normaliseKenyanPhone(raw: string): string | null {
  const d = raw.replace(/[\s()-]/g, "");
  const m = d.match(/^(?:\+?254|0)([17]\d{8})$/);
  return m ? `+254${m[1]}` : null;
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function makeReference(prefix: string) {
  const year = new Date().getFullYear();
  const num = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}-${year}-${num}`;
}
