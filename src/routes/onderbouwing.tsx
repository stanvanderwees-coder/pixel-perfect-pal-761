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
          "De cijfers over uitval en switchen, de loopbaancompetenties van Kuijpers en de dataset van 150 Nederlandse hbo- en wo-studies achter Studiekeuze.",
      },
      { property: "og:title", content: "Onderbouwing — waarop Studiekeuze is gebaseerd" },
      {
        property: "og:description",
        content:
          "Reflectie in dialoog in plaats van een testuitslag, met feiten uit één gecontroleerde dataset.",
      },
    ],
  }),
  component: Onderbouwing,
});

const bronnen = [
  {
    label: "IBO 'Talent op de juiste plek' (2024)",
    body: "Het uitval- en switchpercentage onder eerstejaars schommelt de laatste jaren tussen 25 en ruim 30 procent; in het hbo stopt gemiddeld zo'n 30 procent in het eerste jaar.",
  },
  {
    label: "Inspectie van het Onderwijs — De Staat van het Onderwijs",
    body: "Van de studenten die switchten in 2022/2023 noemde 48 procent een verkeerde studiekeuze als reden en 49 procent dat de verwachtingen niet uitkwamen.",
  },
  {
    label: "Loopbaancompetenties (Kuijpers)",
    body: "Loopbaanontwikkeling komt tot stand in dialoog: reflectie op kwaliteiten en motieven, verkenning van werk, sturen en netwerken. Onze gespreksopbouw volgt die lijn.",
  },
  {
    label: "Eigen studiedataset",
    body: "150 Nederlandse hbo- en wo-studies met vakken, toelatingseisen en beroepsbeelden. Wat er niet in staat, zegt de gids niet.",
  },
];

function Onderbouwing() {
  return (
    <>
      <PageHero
        eyebrow="Onderbouwing"
        title="Waarom een gesprek, en niet een uitslag."
        intro="Een test geeft een label en laat de leerling daarmee alleen. Reflectie in dialoog levert taal op waarmee een leerling zelf verder kan — en dat is precies wat het LOB-gesprek nodig heeft."
      />

      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24">
        <p className="eyebrow text-teal">Bronnen en uitgangspunten</p>
        <div className="mt-12 space-y-10">
          {bronnen.map((b) => (
            <article
              key={b.label}
              className="hairline grid gap-4 pt-8 first:border-none first:pt-0 md:grid-cols-[1fr_1.6fr] md:gap-12"
            >
              <h2 className="text-lg font-semibold leading-snug">{b.label}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{b.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="band-ink">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24">
          <h2 className="max-w-2xl text-3xl font-semibold sm:text-4xl">Grenzen van de gids</h2>
          <div className="mt-12 grid gap-12 md:grid-cols-3 md:gap-10">
            {[
              [
                "Geen feiten buiten de dataset",
                "Salarissen, toelatingseisen en studieduur komen uitsluitend uit onze eigen dataset.",
              ],
              [
                "Gebouwd voor minderjarigen",
                "Vaste gespreksgrenzen, geen advies over persoonlijke of medische onderwerpen.",
              ],
              [
                "Geen opslag",
                "Gesprekken worden niet bewaard en niet gebruikt om modellen te trainen.",
              ],
            ].map(([t, b]) => (
              <div key={t} className="border-t border-ink-foreground/25 pt-6">
                <h3 className="font-display text-base font-semibold">{t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-foreground/70">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
