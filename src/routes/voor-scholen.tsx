import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/voor-scholen")({
  head: () => ({
    meta: [
      { title: "Voor scholen en decanen — LOB-gesprekken beter voorbereid" },
      {
        name: "description",
        content:
          "Laat leerlingen het LOB-gesprek voorbereiden met een geleide verkenning. De leerling komt binnen met richtingen, twijfels en vragen op tafel.",
      },
      { property: "og:title", content: "Voor scholen en decanen — LOB beter voorbereid" },
      {
        property: "og:description",
        content:
          "Inzetbaar per klas of per leerjaar, aansluitend op de loopbaancompetenties van Kuijpers.",
      },
    ],
  }),
  component: VoorScholen,
});

const inzet = [
  {
    title: "Voorbereiding op het LOB-gesprek",
    body: "De leerling doet de verkenning zelfstandig en neemt het overzicht mee. U begint niet bij nul, maar bij het waarom achter een richting.",
  },
  {
    title: "Klassikaal in te zetten",
    body: "Acht minuten per leerling, zonder accounts of installatie. Een link is genoeg, ook op schoolapparaten.",
  },
  {
    title: "Aantoonbaar onderbouwd",
    body: "De gespreksopbouw volgt de loopbaancompetenties van Kuijpers; alle studie-informatie komt uit één gecontroleerde dataset.",
  },
  {
    title: "Veilig voor minderjarigen",
    body: "Vaste grenzen in het gesprek, geen opslag van antwoorden en geen profielen die later terug te leiden zijn.",
  },
];

function VoorScholen() {
  return (
    <>
      <PageHero
        eyebrow="Voor decanen en scholen"
        title="De leerling komt binnen met richtingen op tafel."
        intro="Studiekeuze vervangt uw gesprek niet — het maakt de eerste tien minuten ervan overbodig. De leerling heeft al nagedacht, en u kunt doorvragen."
      >
        <Link
          to="/contact"
          className="group inline-flex items-center gap-2 rounded-sm bg-mint px-6 py-3.5 font-display text-sm font-semibold text-ink transition-colors hover:bg-ink-foreground"
        >
          Neem contact op
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </PageHero>

      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24">
        <p className="eyebrow text-teal">Hoe scholen het inzetten</p>
        <div className="mt-12 grid gap-x-16 gap-y-12 md:grid-cols-2">
          {inzet.map((i) => (
            <div key={i.title} className="border-t-2 border-ink pt-6">
              <h2 className="text-lg font-semibold">{i.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{i.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="band-ink">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              <p className="eyebrow text-mint">Wat u terugkrijgt</p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                Een overzicht in de taal van de leerling.
              </h2>
            </div>
            <div className="space-y-6 text-ink-foreground/75">
              <p className="leading-relaxed">
                Het overzicht bevat de richtingen die uit het gesprek kwamen, met per richting de
                onderbouwing en wat de studie in de praktijk vraagt. Daarnaast staan de twijfels en
                vragen die de leerling zelf benoemde.
              </p>
              <p className="leading-relaxed">
                De leerling beslist zelf of en met wie hij het deelt. Wij bewaren het niet, dus er
                ontstaat geen dossier naast uw eigen LOB-administratie.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border band-sand">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-5 py-16 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">Meekijken met uw sectie?</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              We lopen de tool graag met u door en denken mee over de plek in uw LOB-programma.
            </p>
          </div>
          <Link
            to="/prijzen"
            className="inline-flex items-center gap-2 rounded-sm bg-ink px-6 py-3.5 font-display text-sm font-semibold text-ink-foreground transition-colors hover:bg-deep"
          >
            Bekijk prijzen <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
