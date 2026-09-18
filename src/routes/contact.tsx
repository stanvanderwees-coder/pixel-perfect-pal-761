import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Studiekeuze voor decanen en scholen" },
      {
        name: "description",
        content:
          "Vragen over inzet in uw LOB-programma, een licentie of de onderbouwing? Stuur ons een bericht en we reageren binnen twee werkdagen.",
      },
      { property: "og:title", content: "Contact — Studiekeuze" },
      {
        property: "og:description",
        content: "Neem contact op over inzet, licenties of de onderbouwing van Studiekeuze.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Even sparren over de inzet op uw school?"
        intro="Laat een bericht achter met uw vraag. We reageren doorgaans binnen twee werkdagen en denken graag mee over de plek in uw LOB-programma."
      />

      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              toast.success("Bedankt — uw bericht is verzonden.");
            }}
            className="space-y-6"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block">
                <span className="eyebrow text-coral">Naam</span>
                <input
                  required
                  name="naam"
                  className="mt-2 w-full rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-coral focus:ring-4 focus:ring-coral/10"
                />
              </label>
              <label className="block">
                <span className="eyebrow text-coral">School</span>
                <input
                  name="school"
                  className="mt-2 w-full rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-coral focus:ring-4 focus:ring-coral/10"
                />
              </label>
            </div>
            <label className="block">
              <span className="eyebrow text-coral">E-mailadres</span>
              <input
                required
                type="email"
                name="email"
                className="mt-2 w-full rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-coral focus:ring-4 focus:ring-coral/10"
              />
            </label>
            <label className="block">
              <span className="eyebrow text-coral">Uw vraag</span>
              <textarea
                required
                name="bericht"
                rows={6}
                className="mt-2 w-full resize-none rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-coral focus:ring-4 focus:ring-coral/10"
              />
            </label>
            <button
              type="submit"
              className="group inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3.5 font-display text-sm font-semibold text-white shadow-md shadow-coral/20 transition-transform hover:scale-105 active:scale-95"
            >
              {sent ? "Verzonden" : "Verstuur bericht"} <ArrowRight className="size-4" />
            </button>
          </form>

          <aside className="hairline space-y-8 pt-10 lg:border-none lg:pt-0">
            <div>
              <p className="eyebrow text-teal">Direct mailen</p>
              <a
                href="mailto:hallo@studiekeuze.nl"
                className="mt-3 inline-flex items-center gap-2 font-display text-base font-semibold text-teal hover:text-coral"
              >
                <Mail className="size-4" /> hallo@studiekeuze.nl
              </a>
            </div>
            <div>
              <p className="eyebrow text-teal">Voor leerlingen</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Je hebt ons niet nodig om te beginnen: de tool is gratis en vraagt geen account. Zit
                je vast in het gesprek, mail dan gerust.
              </p>
            </div>
            <div>
              <p className="eyebrow text-teal">Privacy</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                We bewaren geen gesprekken van leerlingen. Contactgegevens gebruiken we alleen om uw
                vraag te beantwoorden.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
