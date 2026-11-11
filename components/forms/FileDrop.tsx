"use client";

import Image from "next/image";
import { FileText, UploadCloud, X } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { formatBytes } from "@/lib/format";
import { ErrorText } from "./Field";

export const MAX_BYTES = 5 * 1024 * 1024;
export const ALLOWED = [".pdf", ".docx", ".jpg", ".jpeg"];

export function checkFile(f: File): string | null {
  const name = f.name.toLowerCase();
  if (!ALLOWED.some((ext) => name.endsWith(ext))) return `${f.name}: only PDF, DOCX or JPG files are accepted.`;
  if (f.size > MAX_BYTES) return `${f.name} is ${formatBytes(f.size)}. Maximum is 5MB.`;
  return null;
}

function Preview({ file, onRemove }: { file: File; onRemove: () => void }) {
  const isImage = /\.(jpe?g)$/i.test(file.name);
  const url = useMemo(() => (isImage ? URL.createObjectURL(file) : null), [file, isImage]);
  useEffect(() => () => {
    if (url) URL.revokeObjectURL(url);
  }, [url]);
  const ext = file.name.split(".").pop()?.toUpperCase();

  return (
    <li className="flex items-center gap-3 rounded-xl border border-line bg-surface p-3">
      <span className="relative grid h-14 w-12 shrink-0 place-items-center overflow-hidden rounded-lg bg-surface-2 text-royal dark:text-gold">
        {url ? (
          <Image src={url} alt={`Preview of ${file.name}`} fill sizes="48px" className="object-cover" unoptimized />
        ) : (
          <>
            <FileText className="h-5 w-5" aria-hidden="true" />
            <span className="absolute bottom-1 text-[9px] font-bold">{ext}</span>
          </>
        )}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-fg">{file.name}</p>
        <p className="text-xs text-muted">{formatBytes(file.size)} · ready</p>
      </div>
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${file.name}`}
        className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-muted hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </li>
  );
}

export function FileDrop({
  id,
  label,
  hint,
  required,
  multiple,
  files,
  onChange,
  error,
}: {
  id: string;
  label: string;
  hint: string;
  required?: boolean;
  multiple?: boolean;
  files: File[];
  onChange: (files: File[], error?: string) => void;
  error?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  const labelId = useId();

  const add = (list: FileList | null) => {
    if (!list || list.length === 0) return;
    const incoming = Array.from(list);
    const bad = incoming.map(checkFile).find(Boolean) ?? undefined;
    const good = incoming.filter((f) => !checkFile(f));
    const next = multiple ? [...files, ...good].slice(0, 6) : good.slice(0, 1);
    onChange(next.length ? next : files, bad);
    if (inputRef.current) inputRef.current.value = "";
  };

  const showDrop = multiple || files.length === 0;

  return (
    <div>
      <p id={labelId} className="mb-1.5 text-sm font-semibold text-fg">
        {label}
        {required ? (
          <span className="text-red-600 dark:text-red-400" aria-hidden="true">
            {" "}
            *
          </span>
        ) : (
          <span className="font-normal text-muted"> (optional)</span>
        )}
      </p>
      <input
        ref={inputRef}
        id={`${id}-input`}
        type="file"
        multiple={multiple}
        accept=".pdf,.docx,.jpg,.jpeg,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg"
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
        onChange={(e) => add(e.target.files)}
      />
      {files.length > 0 && (
        <ul className="mb-2 space-y-2">
          {files.map((f, i) => (
            <Preview key={`${f.name}-${f.size}-${i}`} file={f} onRemove={() => onChange(files.filter((_, j) => j !== i))} />
          ))}
        </ul>
      )}
      {showDrop && (
        <button
          id={id}
          type="button"
          aria-labelledby={`${labelId} ${id}-cta`}
          aria-describedby={error ? `${id}-error` : `${id}-hint`}
          aria-invalid={error ? true : undefined}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setOver(true);
          }}
          onDragLeave={() => setOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setOver(false);
            add(e.dataTransfer.files);
          }}
          className={`flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed px-5 py-7 text-center transition ${
            error
              ? "border-red-400 bg-red-50/50 dark:bg-red-500/5"
              : over
                ? "border-royal bg-royal-50 dark:border-gold dark:bg-gold/10"
                : "border-line bg-surface-2/40 hover:border-royal/60 hover:bg-royal-50/50 dark:hover:border-gold/60 dark:hover:bg-gold/5"
          }`}
        >
          <UploadCloud className="h-8 w-8 text-royal dark:text-gold" aria-hidden="true" />
          <span id={`${id}-cta`} className="mt-2 text-sm font-semibold text-fg">
            {files.length > 0 ? "Add another file" : "Tap to upload"} <span className="hidden font-normal text-muted sm:inline">or drag and drop</span>
          </span>
          <span id={`${id}-hint`} className="mt-1 text-xs text-muted">
            {hint}
          </span>
        </button>
      )}
      <ErrorText id={`${id}-error`}>{error}</ErrorText>
    </div>
  );
}
