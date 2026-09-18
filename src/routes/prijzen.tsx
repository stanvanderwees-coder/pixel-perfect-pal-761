import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/prijzen")({
  head: () => ({
    meta: [
      { title: "Prijzen — gratis voor leerlingen, licentie voor scholen" },
      {
        name: "description",
        content:
          "Studiekeuze is gratis voor leerlingen. Scholen nemen een licentie per leerjaar of per school, inclusief begeleiding bij de inzet in het LOB-programma.",
      },
      { property: "og:title", content: "Prijzen — Studiekeuze" },
      {
        property: "og:description",
        content: "Gratis voor leerlingen, heldere licentie voor scholen. Geen opstartkosten.",
      },
    ],
  }),
  component: Prijzen,
});

const plans = [
  {
    name: "Leerling",
    price: "Gratis",
    note: "Altijd, zonder account",
    features: [
      "Volledige verkenning van acht minuten",
      "Studies met uitleg en beroepsbeeld",
      "Overzicht om mee te nemen naar de decaan",
      "Geen opslag van je gesprek",
    ],
    cta: { label: "Start de tool", to: "/tool" as const },
    highlight: false,
  },
  {
    name: "School — per leerjaar",
    price: "€ 450",
    note: "per schooljaar, per leerjaar",
    features: [
      "Onbeperkt gebruik binnen het leerjaar",
      "Introductie voor de decanensectie",
      "Werkvorm voor het LOB-gesprek",
      "Ondersteuning per e-mail",
    ],
    cta: { label: "Neem contact op", to: "/contact" as const },
    highlight: true,
  },
  {
    name: "School — volledig",
    price: "Op maat",
    note: "hele bovenbouw of scholengroep",
    features: [
      "Alle leerjaren havo en vwo",
      "Afspraken over inzet en planning",
      "Vast contactpersoon",
      "Jaarlijkse evaluatie met de sectie",
    ],
    cta: { label: "Vraag een voorstel", to: "/contact" as const },
    highlight: false,
  },
];

function Prijzen() {
  return (
    <>
      <PageHero
        eyebrow="Prijzen"
        title="Gratis voor leerlingen. Helder voor scholen."
        intro="Leerlingen betalen nooit. Scholen nemen een licentie waarmee ze de tool structureel in het LOB-programma kunnen inzetten."
      />

      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal
              key={p.name}
              delay={i * 110}
              hover="lift"
              className={`flex flex-col rounded-3xl p-8 shadow-lg ${
                p.highlight
                  ? "border-2 border-coral bg-coral text-primary-foreground"
                  : "border border-border bg-card"
              }`}
            >
              <p className={`eyebrow ${p.highlight ? "text-white/80" : "text-teal"}`}>{p.name}</p>
              <p className="mt-6 font-display text-4xl font-semibold">{p.price}</p>
              <p
                className={`mt-2 text-xs ${
                  p.highlight ? "text-white/70" : "text-muted-foreground"
                }`}
              >
                {p.note}
              </p>
              <ul className="mt-8 flex-1 space-y-3.5">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm leading-relaxed">
                    <Check
                      className={`mt-0.5 size-4 shrink-0 ${
                        p.highlight ? "text-white" : "text-coral"
                      }`}
                    />
                    <span className={p.highlight ? "text-white/90" : "text-muted-foreground"}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                to={p.cta.to}
                className={`mt-10 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-display text-sm font-semibold transition-transform hover:scale-105 active:scale-95 ${
                  p.highlight
                    ? "bg-white text-coral shadow-md"
                    : "bg-coral text-white shadow-md shadow-coral/20"
                }`}
              >
                {p.cta.label} <ArrowRight className="size-4" />
              </Link>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-xs text-muted-foreground">
          Prijzen zijn exclusief btw. Geen opstartkosten en geen minimale looptijd langer dan een
          schooljaar.
        </p>
      </section>
    </>
  );
}
