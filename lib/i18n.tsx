"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { translations, type Lang, type TKey } from "@/data/translations";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: TKey) => string };

const LangContext = createContext<Ctx>({
  lang: "en",
  setLang: () => {},
  t: (k) => translations.en[k],
});

const STORAGE_KEY = "lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Restore the saved preference after hydration (static HTML is always English).
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "sw" || saved === "en") {
        setLangState(saved);
      }
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "sw" ? "sw" : "en";
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {}
  }, []);

  const value = useMemo<Ctx>(() => ({ lang, setLang, t: (k) => translations[lang][k] ?? translations.en[k] }), [lang, setLang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export const useI18n = () => useContext(LangContext);
