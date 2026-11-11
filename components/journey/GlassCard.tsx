"use client";

import { ArrowUpRight, Check, Quote } from "lucide-react";
import type { JourneyNode } from "@/lib/journey-types";
import { go } from "@/lib/scroll";
import { Flag } from "../ui/primitives";

/**
 * The glass content card for a journey node. Used three ways:
 *  - anchored to the node in 3D (drei <Html>, aria-hidden duplicate)
 *  - docked to the bottom of the screen on mobile
 *  - as the readable HTML timeline (lite mode + screen readers)
 * `data-s` marks the reveal order: pill → title → text → image → button.
 */
export function GlassCard({
  node,
  decorative = false,
  className = "",
  headingLevel = "h3",
  compact = false,
}: {
  node: JourneyNode;
  decorative?: boolean;
  className?: string;
  headingLevel?: "h3" | "h4" | "p";
  compact?: boolean;
}) {
  const H = headingLevel;
  const tab = decorative ? -1 : undefined;
  return (
    <article
      className={`glass glass-blur relative overflow-hidden rounded-2xl p-5 text-left text-ivory ${compact ? "w-full" : "w-[min(340px,86vw)]"} ${className}`}
      aria-hidden={decorative || undefined}
    >
      <div data-s="0" className="flex items-center justify-between gap-3">
        <span className="pill">{node.pill}</span>
        <span className="font-mono text-xs text-jade-300">{node.number}</span>
      </div>

      <div data-s="1" className="mt-3 flex items-center gap-2.5">
        {node.flag && !node.quote && <Flag code={node.flag} name={node.title} size={26} />}
        <div className="min-w-0">
          <H className="font-display text-lg font-bold leading-tight text-ivory">{node.title}</H>
          {node.meta && <p className="mt-0.5 text-xs text-sand/75">{node.meta}</p>}
        </div>
      </div>

      <div data-s="2" className="mt-3 space-y-3">
        {node.text &&
          (node.quote ? (
            <blockquote className="relative text-sm leading-relaxed text-sand/90">
              <Quote className="mb-1 h-4 w-4 text-coral" aria-hidden="true" />
              <p>{node.text}</p>
            </blockquote>
          ) : (
            <p className="text-sm leading-relaxed text-sand/85">{node.text}</p>
          ))}
        {node.facts && (
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
            {node.facts.map((f) => (
              <div key={f.label} className={f.label === "Top sectors" ? "col-span-2" : ""}>
                <dt className="font-mono text-[10px] uppercase tracking-wider text-jade-300">{f.label}</dt>
                <dd className="mt-0.5 font-semibold text-ivory">{f.value}</dd>
              </div>
            ))}
          </dl>
        )}
        {node.list && (
          <ul className="space-y-1.5 text-xs text-sand/90">
            {node.list.map((l) => (
              <li key={l} className="flex gap-2">
                <Check className="mt-px h-3.5 w-3.5 shrink-0 text-jade-300" aria-hidden="true" />
                {l}
              </li>
            ))}
          </ul>
        )}
        {node.tags && (
          <div className="flex flex-wrap gap-1.5">
            {node.tags.map((t) => (
              <span key={t} className="rounded-full border border-jade/50 px-2 py-0.5 text-[11px] font-semibold text-jade-300">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      {node.image && (
        <div data-s="3" className={node.image.portrait ? "mt-4 flex items-center gap-3" : "mt-4"}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${node.image.src}&w=${node.image.portrait ? 96 : 640}&h=${node.image.portrait ? 96 : 280}`}
            alt={decorative ? "" : node.image.alt}
            loading="lazy"
            decoding="async"
            width={node.image.portrait ? 48 : 320}
            height={node.image.portrait ? 48 : 140}
            className={
              node.image.portrait
                ? "h-12 w-12 rounded-full object-cover ring-2 ring-coral/70"
                : `${compact ? "h-14 sm:h-24" : "h-20"} w-full rounded-xl object-cover`
            }
          />
          {node.image.portrait && node.flag && (
            <span className="flex items-center gap-2 text-xs text-sand/80">
              <Flag code={node.flag} name={node.meta ?? ""} size={18} /> Sample story
            </span>
          )}
        </div>
      )}

      {node.cta && (
        <div data-s="4" className="mt-4">
          <a
            href={node.cta.href}
            tabIndex={tab}
            onClick={(e) => go(node.cta!.href, e)}
            className="group inline-flex w-full items-center justify-between rounded-full bg-coral px-4 py-2.5 text-sm font-bold text-night-900 transition hover:bg-coral-300"
          >
            {node.cta.label}
            <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </div>
      )}
    </article>
  );
}
