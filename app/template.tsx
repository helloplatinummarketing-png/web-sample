"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";

/** Re-mounts on each navigation for a soft page transition (movement only, so content is never hidden). */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <m.div initial={{ y: 14 }} animate={{ y: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </m.div>
  );
}
