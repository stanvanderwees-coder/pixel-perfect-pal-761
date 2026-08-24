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
          "Laat leerlingen het LOB-gesprek voorbereiden met een geleide verkenning op basis van de loopbaancompetenties van Kuijpers. Past binnen uw bestaande LOB-verplichting.",
      },
      { property: "og:title", content: "Voor scholen en decanen — LOB beter voorbereid" },
      {
        property: "og:description",
        content:
          "Vervangt de decaan niet, maar bereidt het gesprek voor — met bronvermelding en eerlijke grenzen.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VoorScholen,
});

const inzet = [
  {
    title: "Voorbereiding op het LOB-gesprek",
    body: "De leerling doet de verkenning zelfstandig en neemt het overzicht mee. De tool vervangt u niet: hij bereidt het gesprek voor, zodat u begint bij het waarom achter een richting.",
  },
  {
    title: "Past binnen uw LOB-programma en budget",
    body: "Inzetbaar per klas of per leerjaar binnen de bestaande LOB-verplichting. Acht minuten per leerling, zonder accounts of installatie — een link is genoeg, ook op schoolapparaten.",
  },
  {
    title: "Onderbouwd met de loopbaancompetenties",
    body: "De gespreksopbouw volgt de LOB-loopbaancompetenties van Marinka Kuijpers: motievenreflectie, kwaliteitenreflectie, werkexploratie, werkstijl en loopbaansturing.",
  },
  {
    title: "Reflectie in concrete situaties",
    body: "Onderzoek (Meijers, Kuijpers, Winters) laat zien dat loopbaancompetenties begeleiding in dialoog vragen. Tom Luken voegt daaraan toe dat reflectie bij jongeren alleen werkt in concrete situaties, niet in abstracte zelfanalyse. Daarom werkt de tool met herkenbare situaties.",
  },
];

const cijfers = [
  {
    kop: "32%",
    body: "van de eerstejaars valt in het eerste jaar uit of switcht van opleiding — zo'n 42.500 studenten per jaar.",
    bron: "Bron: Monitor beleidsmaatregelen hoger onderwijs (ResearchNed), via onderwijskennis.nl.",
  },
  {
    kop: "51% en 50%",
    body: "noemen respectievelijk \"de verwachting kwam niet uit\" en \"ik heb de verkeerde studiekeuze gemaakt\" als reden.",
    bron: "Bron: Monitor beleidsmaatregelen hoger onderwijs (ResearchNed), via onderwijskennis.nl.",
  },
  {
    kop: "Bijna 90%",
    body: "van de Nederlandse middelbare scholieren gebruikt generatieve AI voor school; ruim 35% (bijna) dagelijks. Ruim 85% van hen kiest ChatGPT, en bijna de helft zet AI in bij de studiekeuze zelf.",
    bron: "Bronnen: Scholieren.com (2025); Qompas-peiling onder bovenbouwscholieren (januari 2026). Qompas concludeert zelf dat AI vlot informatie geeft bij studiekeuzevragen, maar dat die informatie te wensen overlaat.",
  },
];

function VoorScholen() {
  return (
    <>
      <PageHero
        eyebrow="Voor decanen en scholen"
        title="De leerling komt binnen met richtingen op tafel."
        intro="Studiekeuze vervangt uw gesprek niet — het bereidt het voor. De leerling heeft al nagedacht en u kunt doorvragen. De tool is ontworpen om bij te dragen aan een betere, beter geïnformeerde keuze."
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
        <p className="eyebrow text-teal">Waar het over gaat</p>
        <div className="mt-12 grid gap-x-16 gap-y-10 md:grid-cols-3">
          {cijfers.map((c, i) => (
            <Reveal
              key={c.kop}
              delay={i * 90}
              hover="lift"
              className="rounded-sm border border-border bg-card p-5"
            >
              <p className="font-display text-3xl font-semibold text-deep">{c.kop}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground/80">{c.bron}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-border band-sand">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24">
          <p className="eyebrow text-teal">Hoe scholen het inzetten</p>
          <div className="mt-12 grid gap-x-16 gap-y-12 md:grid-cols-2">
            {inzet.map((i, idx) => (
              <Reveal
                key={i.title}
                delay={idx * 90}
                hover="lift"
                className="-mx-5 rounded-sm border-t-2 border-ink bg-card px-5 py-5 pt-6"
              >
                <h2 className="text-lg font-semibold">{i.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{i.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <p className="eyebrow text-teal">Wat uitval kost</p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Een verloren studiejaar kost €11.060 tot €13.825 per student.
            </h2>
          </div>
          <div className="space-y-6">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Van dat bedrag wordt een groot deel door de overheid betaald. Voor de student zelf komt
              daar het levensonderhoud bij: een uitwonende student geeft ongeveer €13.800 per jaar
              uit, plus €2.601 collegegeld (studiejaar 2025-2026).
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              De gevolgen zijn niet alleen financieel. Onderzoekers wijzen op de persoonlijke impact:
              voor veel afhakers is uitval een flinke domper die kan leiden tot psychosociale
              klachten. Amerikaans onderzoek laat bovendien zien dat wie een verkeerde studiekeuze
              maakte, later minder vaak een vaste baan kreeg en minder verdiende.
            </p>
            <p className="text-xs leading-relaxed text-muted-foreground/80">
              Bron: Vox, Radboud Universiteit.
            </p>
          </div>
        </div>
      </section>

      <section className="band-ink">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              <p className="eyebrow text-mint">Regelgeving en zorgvuldigheid</p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                AI in het onderwijs is hoog risico. Wij bouwen die eisen vanaf de basis in.
              </h2>
            </div>
            <div className="space-y-6 text-ink-foreground/75">
              <p className="leading-relaxed">
                De EU AI Act merkt AI in het onderwijs aan als hoog risico, met eisen aan onder meer
                datakwaliteit, transparantie, menselijk toezicht en documentatie. Het merendeel van
                die verplichtingen ligt bij de aanbieder van het systeem — bij ons dus, niet bij uw
                school. Wij bouwen die eisen vanaf de basis in.
              </p>
              <p className="leading-relaxed">
                Eerlijk over de data: de studie-informatie komt uit een eigen, samengestelde dataset
                en is niet volledig geverifieerd tegen officiële bronnen. Toelatingseisen, numerus
                fixus en baankansen zijn indicatief en verschillen per opleiding en per jaar;
                leerlingen wordt gevraagd ze zelf te controleren via Studiekeuze123.
              </p>
              <p className="leading-relaxed">
                Het overzicht dat de leerling meeneemt bevat de richtingen uit het gesprek met de
                onderbouwing, plus de twijfels en vragen die de leerling zelf benoemde. De leerling
                beslist zelf of en met wie hij het deelt. Wij bewaren het niet, dus er ontstaat geen
                dossier naast uw eigen LOB-administratie.
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
