/** Mock application tracker for the demo: derives a status deterministically from the reference number. */
export const trackingSteps = [
  { title: "Application received", body: "We've received your application and documents." },
  { title: "Under review", body: "An advisor is reviewing your documents and eligibility." },
  { title: "Matched with employer", body: "Your profile has been shortlisted by a verified employer." },
  { title: "Visa processing", body: "Contract signed. Your visa file has been submitted." },
  { title: "Ready to travel", body: "Visa approved! Pre-departure orientation and flight booking." },
];

export const REF_RE = /^[A-Z]{2,4}-\d{4}-\d{5}$/;

export function mockStatus(ref: string) {
  const digits = ref.replace(/\D/g, "");
  const sum = digits.split("").reduce((a, d) => a + Number(d), 0);
  const current = sum % trackingSteps.length;
  // Dates: walk back from today, ~9 days per completed step
  const today = new Date();
  const dates = trackingSteps.map((_, i) => {
    if (i > current) return null;
    const d = new Date(today);
    d.setDate(d.getDate() - (current - i) * 9);
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  });
  return { current, dates };
}
