import { site } from "@/data/site";

const icons: Record<string, { label: string; path: string }> = {
  facebook: { label: "Facebook", path: "M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H7v4h2v9h4v-9h3l1-4h-4V9c0-.6.4-1 1-1z" },
  instagram: {
    label: "Instagram",
    path: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM17.5 5.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z",
  },
  linkedin: {
    label: "LinkedIn",
    path: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3V9.5zm7 0h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.37 2.65 4.37 6.1V21h-4v-5.1c0-1.22-.02-2.8-1.7-2.8-1.72 0-1.98 1.34-1.98 2.71V21H10V9.5z",
  },
  tiktok: {
    label: "TikTok",
    path: "M16.5 2h-3.3v13.2a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V9a6.3 6.3 0 1 0 5.3 6.2V8.6a7.7 7.7 0 0 0 4.5 1.4V6.7a4.5 4.5 0 0 1-4.5-4.7z",
  },
  youtube: {
    label: "YouTube",
    path: "M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z",
  },
};

export function SocialIcons() {
  return (
    <ul className="flex flex-wrap gap-2.5">
      {Object.entries(site.socials).map(([key, href]) => {
        const icon = icons[key];
        if (!icon) return null;
        return (
          <li key={key}>
            <a
              href={href}
              aria-label={icon.label}
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/80 transition hover:-translate-y-0.5 hover:border-gold hover:text-gold"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" fillRule="evenodd" aria-hidden="true">
                <path d={icon.path} />
              </svg>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export function WhatsAppIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.4h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.38 9.38 0 0 1-1.44-5c0-5.18 4.22-9.4 9.41-9.4 2.51 0 4.87.98 6.65 2.76a9.34 9.34 0 0 1 2.75 6.65c0 5.18-4.22 9.4-9.4 9.4m8-17.42A11.24 11.24 0 0 0 12.05.67C5.82.67.74 5.74.74 11.98c0 2 .52 3.94 1.51 5.65L.65 23.33l5.83-1.53a11.3 11.3 0 0 0 5.56 1.42h.01c6.24 0 11.31-5.07 11.31-11.31 0-3.02-1.17-5.86-3.31-8" />
    </svg>
  );
}
