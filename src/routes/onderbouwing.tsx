import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/onderbouwing")({
  head: () => ({
    meta: [
      { title: "Onderbouwing — waarop Studiekeuze is gebaseerd" },
      {
        name: "description",
        content:
          "De cijfers over uitval en switchen, de LOB-loopbaancompetenties van Kuijpers en de eigen studiedataset achter Studiekeuze — met bronvermelding.",
      },
      { property: "og:title", content: "Onderbouwing — waarop Studiekeuze is gebaseerd" },
      {
        property: "og:description",
        content:
          "Reflectie in dialoog in plaats van een vragenlijst, met cijfers en bronnen erbij.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Onderbouwing,
});

const probleem = [
  {
    kop: "Ongeveer 32% valt uit of switcht",
    body: "Ongeveer 32% van de eerstejaars valt in het eerste jaar uit of switcht van opleiding — zo'n 42.500 studenten per jaar.",
    bron: "Bron: Monitor beleidsmaatregelen hoger onderwijs (ResearchNed), via onderwijskennis.nl.",
  },
  {
    kop: "De redenen die studenten zelf noemen",
    body: "De twee meest genoemde redenen: \"de verwachting kwam niet uit\" (51%) en \"ik heb de verkeerde studiekeuze gemaakt\" (50%).",
    bron: "Bron: Monitor beleidsmaatregelen hoger onderwijs (ResearchNed), via onderwijskennis.nl.",
  },
  {
    kop: "AI is al onderdeel van de studiekeuze",
    body: "Bijna 90% van de Nederlandse middelbare scholieren gebruikt generatieve AI voor school; ruim 35% (bijna) dagelijks. Van de scholieren die AI gebruiken kiest ruim 85% voor ChatGPT. Bijna de helft zet AI in bij de studiekeuze zelf.",
    bron: "Bronnen: Scholieren.com (2025); Qompas-peiling onder bovenbouwscholieren (januari 2026). Qompas concludeert zelf dat AI vlot informatie geeft bij studiekeuzevragen, maar dat die informatie te wensen overlaat.",
  },
];

const methode = [
  {
    kop: "LOB-loopbaancompetenties (Marinka Kuijpers)",
    body: "De tool is gebouwd op de vijf loopbaancompetenties: motievenreflectie, kwaliteitenreflectie, werkexploratie, werkstijl en loopbaansturing. De gespreksopbouw volgt die lijn.",
  },
  {
    kop: "Een gesprek, geen vragenlijst",
    body: "Onderzoek (Meijers, Kuijpers, Winters) laat zien dat een arbeidsidentiteit en loopbaancompetenties niet uit een boek te leren zijn: het vereist begeleiding in dialoog, gericht op reflectie en betekenisgeving van opgedane ervaringen. Daarom voert de tool een gesprek in plaats van een vragenlijst af te nemen.",
  },
  {
    kop: "Reflectie in concrete situaties",
    body: "Tom Luken plaatst daar een kritische nuance bij: reflectie werkt bij jongeren alleen als die verankerd is in concrete situaties, niet in abstracte zelfanalyse. Daarom werkt de tool met herkenbare situaties.",
  },
];

const kosten = [
  {
    kop: "€11.060 tot €13.825 per verloren studiejaar",
    body: "Een verloren studiejaar kost in Nederland tussen de €11.060 en €13.825 per student, waarvan een groot deel door de overheid wordt betaald.",
    bron: "Bron: Vox, Radboud Universiteit.",
  },
  {
    kop: "Plus het levensonderhoud van de student",
    body: "Voor de student zelf komt daar het levensonderhoud bij: een uitwonende student geeft ongeveer €13.800 per jaar uit, plus €2.601 collegegeld (studiejaar 2025-2026).",
    bron: "Bron: Vox, Radboud Universiteit.",
  },
  {
    kop: "Niet alleen financieel",
    body: "Onderzoekers wijzen op de persoonlijke impact: voor veel afhakers is uitval een flinke domper die kan leiden tot psychosociale klachten. Amerikaans onderzoek laat bovendien zien dat wie een verkeerde studiekeuze maakte, later minder vaak een vaste baan kreeg en minder verdiende.",
    bron: "Bron: Vox, Radboud Universiteit.",
  },
];

function Onderbouwing() {
  return (
    <>
      <PageHero
        eyebrow="Onderbouwing"
        title="Waarom een gesprek, en niet een vragenlijst."
        intro="Een vragenlijst geeft een uitslag en laat de leerling daarmee alleen. Reflectie in dialoog levert taal op waarmee een leerling zelf verder kan — en dat is precies wat het LOB-gesprek nodig heeft. Hieronder de cijfers, de methode en de grenzen, met bronnen erbij."
      />

      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24">
        <p className="eyebrow text-teal">Het probleem</p>
        <div className="mt-12 space-y-10">
          {probleem.map((b, i) => (
            <Reveal
              as="article"
              key={b.kop}
              delay={i * 90}
              className="hairline grid gap-4 pt-8 first:border-none first:pt-0 md:grid-cols-[1fr_1.6fr] md:gap-12"
            >
              <h2 className="text-lg font-semibold leading-snug">{b.kop}</h2>
              <div>
                <p className="text-sm leading-relaxed text-muted-foreground">{b.body}</p>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground/80">{b.bron}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-border band-sand">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24">
          <p className="eyebrow text-teal">De methode</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold sm:text-4xl">
            Loopbaancompetenties, in dialoog en in concrete situaties.
          </h2>
          <div className="mt-12 grid gap-x-16 gap-y-10 md:grid-cols-3">
            {methode.map((m, i) => (
              <Reveal
                key={m.kop}
                delay={i * 90}
                hover="lift"
                className="rounded-sm border border-border bg-card p-5"
              >
                <h3 className="font-display text-base font-semibold">{m.kop}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24">
        <p className="eyebrow text-teal">Wat uitval kost</p>
        <div className="mt-12 space-y-10">
          {kosten.map((k, i) => (
            <Reveal
              as="article"
              key={k.kop}
              delay={i * 90}
              className="hairline grid gap-4 pt-8 first:border-none first:pt-0 md:grid-cols-[1fr_1.6fr] md:gap-12"
            >
              <h2 className="text-lg font-semibold leading-snug">{k.kop}</h2>
              <div>
                <p className="text-sm leading-relaxed text-muted-foreground">{k.body}</p>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground/80">{k.bron}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="band-ink">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24">
          <h2 className="max-w-2xl text-3xl font-semibold sm:text-4xl">Grenzen van de gids</h2>
          <div className="mt-12 grid gap-12 md:grid-cols-3 md:gap-10">
            {[
              [
                "Eigen, samengestelde dataset",
                "De studie-informatie komt uit een eigen, samengestelde dataset. Die is niet volledig geverifieerd tegen officiële bronnen. Toelatingseisen, numerus fixus en baankansen zijn indicatief en verschillen per opleiding en per jaar — controleer ze zelf via Studiekeuze123.",
              ],
              [
                "Geen beloftes over resultaat",
                "De tool voorkomt geen uitval en belooft geen resultaten of slagingspercentages. Hij is ontworpen om bij te dragen aan een betere, beter geïnformeerde keuze.",
              ],
              [
                "Gebouwd voor minderjarigen",
                "Vaste gespreksgrenzen, geen advies over persoonlijke of medische onderwerpen. Gesprekken worden niet bewaard en niet gebruikt om modellen te trainen.",
              ],
            ].map(([t, b], i) => (
              <Reveal key={t} delay={i * 90} className="border-t border-ink-foreground/25 pt-6">
                <h3 className="font-display text-base font-semibold">{t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-foreground/70">{b}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
