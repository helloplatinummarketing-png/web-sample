import Link from "next/link";
import { Compass } from "lucide-react";
import { Container, btn } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center py-28 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-2xl bg-navy text-gold">
        <Compass className="h-8 w-8" aria-hidden="true" />
      </span>
      <h1 className="mt-6 text-4xl font-bold text-fg">This route doesn&apos;t exist</h1>
      <p className="mt-3 max-w-md text-muted">The page you&apos;re looking for may have moved. Let&apos;s get you back on course.</p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className={btn("gold")}>
          Back to home
        </Link>
        <Link href="/jobs" className={btn("outline")}>
          Browse jobs
        </Link>
      </div>
    </Container>
  );
}
