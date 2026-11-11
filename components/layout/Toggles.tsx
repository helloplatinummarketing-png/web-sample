"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface/70 text-fg transition hover:border-royal hover:text-royal dark:hover:border-gold dark:hover:text-gold"
    >
      {dark ? <Sun className="h-[18px] w-[18px]" aria-hidden="true" /> : <Moon className="h-[18px] w-[18px]" aria-hidden="true" />}
    </button>
  );
}

export function LanguageToggle() {
  const { lang, setLang, t } = useI18n();
  return (
    <div role="group" aria-label={t("ui.language")} className="flex h-10 items-center rounded-xl border border-line bg-surface/70 p-1 text-xs font-bold">
      {(["en", "sw"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          aria-label={l === "en" ? "English" : "Kiswahili"}
          className={`h-full rounded-lg px-2.5 uppercase transition ${
            lang === l ? "bg-navy text-gold dark:bg-gold dark:text-navy" : "text-muted hover:text-fg"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
