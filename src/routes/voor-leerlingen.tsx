import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/voor-leerlingen")({
  head: () => ({
    meta: [
      { title: "Voor leerlingen — ontdek welke studie bij je past" },
      {
        name: "description",
        content:
          "Een gesprek van acht minuten voor havo- en vwo-leerlingen: swipe op activiteiten, praat met je gids en krijg studies met uitleg. Gratis, zonder account.",
      },
      { property: "og:title", content: "Voor leerlingen — ontdek welke studie bij je past" },
      {
        property: "og:description",
        content:
          "Geen test met een uitslag, maar een gesprek dat doorvraagt op waaróm iets je aanspreekt.",
      },
    ],
  }),
  component: VoorLeerlingen,
});

const opbrengst = [
  "Een lijst richtingen die bij jouw antwoorden past, met uitleg waarom.",
  "Hoe die studies er in het echt uitzien: vakken, tempo, wat je er later mee doet.",
  "De twijfels die je zelf hebt benoemd, op papier.",
  "Een overzicht dat je meeneemt naar het gesprek met je decaan.",
];

const vragen = [
  {
    q: "Moet ik iets invullen of een account maken?",
    a: "Nee. Je begint direct en er wordt niets van je gesprek bewaard.",
  },
  {
    q: "Krijg ik één uitslag te zien?",
    a: "Nee. Je krijgt meerdere richtingen met uitleg, zodat je zelf kunt afwegen.",
  },
  {
    q: "Hoe weet ik dat de informatie klopt?",
    a: "Alle feiten komen uit onze eigen dataset van 150 Nederlandse hbo- en wo-studies.",
  },
  {
    q: "Hoe lang duurt het?",
    a: "Ongeveer acht minuten, verdeeld over vier korte stappen.",
  },
];

function VoorLeerlingen() {
  return (
    <>
      <PageHero
        eyebrow="Voor leerlingen"
        title="Je hoeft nog niet te weten wat je wilt worden."
        intro="Je hoeft alleen te weten wat je aanspreekt. Daar begint het gesprek, en daar bouwen we een beeld mee op van studies die bij je passen."
      >
        <Link
          to="/"
          className="group inline-flex items-center gap-2 rounded-sm bg-mint px-6 py-3.5 font-display text-sm font-semibold text-ink transition-colors hover:bg-ink-foreground"
        >
          Start de tool
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </PageHero>

      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <p className="eyebrow text-teal">Wat het je oplevert</p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Je gaat naar buiten met woorden voor je eigen keuze.
            </h2>
          </div>
          <ul className="space-y-6">
            {opbrengst.map((o, i) => (
              <Reveal as="li" key={o} delay={i * 90} className="hairline flex gap-4 pt-6 first:border-none first:pt-0">
                <Check className="mt-0.5 size-4 shrink-0 text-teal" />
                <span className="text-sm leading-relaxed text-muted-foreground">{o}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-border band-sand">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24">
          <p className="eyebrow text-teal">Vragen</p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Dit vragen leerlingen ons</h2>
          <div className="mt-12 grid gap-x-16 gap-y-10 md:grid-cols-2">
            {vragen.map((v, i) => (
              <Reveal key={v.q} delay={i * 80} hover="lift" className="bg-card border border-border rounded-sm p-5">
                <h3 className="text-base font-semibold">{v.q}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{v.a}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-5 py-16 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <h2 className="text-2xl font-semibold sm:text-3xl">Acht minuten, en je weet meer.</h2>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-sm bg-ink px-6 py-3.5 font-display text-sm font-semibold text-ink-foreground transition-colors hover:bg-deep"
        >
          Start de tool <ArrowRight className="size-4" />
        </Link>
      </section>
    </>
  );
}
