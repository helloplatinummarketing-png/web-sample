import { AlertCircle } from "lucide-react";
import type { ReactNode } from "react";

export const inputCls = (invalid?: boolean) =>
  `block w-full rounded-xl border bg-surface px-4 py-3 text-base text-fg shadow-sm transition placeholder:text-muted/70 focus:outline-none focus:ring-4 ${
    invalid
      ? "border-red-500 focus:border-red-500 focus:ring-red-500/15"
      : "border-line hover:border-muted/40 focus:border-royal focus:ring-royal/15 dark:focus:border-gold dark:focus:ring-gold/15"
  }`;

export function ErrorText({ id, children }: { id: string; children?: ReactNode }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-red-600 dark:text-red-400">
      <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
      {children}
    </p>
  );
}

/** Label + control + hint + inline error, wired with ids for assistive tech. */
export function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
  className = "",
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-fg">
        {label}
        {required ? (
          <span className="text-red-600 dark:text-red-400" aria-hidden="true">
            {" "}
            *
          </span>
        ) : (
          <span className="font-normal text-muted"> (optional)</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-muted">
          {hint}
        </p>
      )}
      <ErrorText id={`${id}-error`}>{error}</ErrorText>
    </div>
  );
}

/** Accessible attributes for a control rendered inside <Field>. */
export const a11y = (id: string, error?: string, hint?: string, required?: boolean) => ({
  id,
  name: id,
  "aria-required": required || undefined,
  "aria-invalid": error ? true : undefined,
  "aria-describedby": error ? `${id}-error` : hint ? `${id}-hint` : undefined,
});
