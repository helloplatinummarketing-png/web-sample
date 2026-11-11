import { ButtonLink, Container } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <main id="main">
      <Container className="grid min-h-[80vh] place-items-center text-center">
        <div>
          <p className="font-mono text-sm text-coral-300">404 · Off the map</p>
          <h1 className="mt-3 text-4xl font-bold text-ivory sm:text-6xl">This route doesn&apos;t exist.</h1>
          <p className="mt-4 text-sand/80">Let&apos;s get you back to Nairobi.</p>
          <div className="mt-8 flex justify-center gap-3">
            <ButtonLink href="/">Back home</ButtonLink>
            <ButtonLink href="/jobs" variant="ghost">
              Find jobs abroad
            </ButtonLink>
          </div>
        </div>
      </Container>
    </main>
  );
}
