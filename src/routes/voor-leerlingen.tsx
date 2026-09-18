import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, GraduationCap } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/voor-leerlingen")({
  head: () => ({
    meta: [
      { title: "Voor leerlingen — ontdek welke studie bij je past" },
      {
        name: "description",
        content:
          "Een gesprek van acht minuten voor havo- en vwo-leerlingen: herkenbare situaties, doorvragen en studies met uitleg. Gratis, zonder account.",
      },
      { property: "og:title", content: "Voor leerlingen — ontdek welke studie bij je past" },
      {
        property: "og:description",
        content:
          "Geen test met een uitslag, maar een gesprek dat doorvraagt op waaróm iets je aanspreekt.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
    q: "Kan ik op de informatie vertrouwen?",
    a: "Gebruik het als startpunt. De gegevens komen uit onze eigen, samengestelde dataset. Toelatingseisen, numerus fixus en baankansen zijn indicatief en verschillen per opleiding en per jaar — check ze altijd zelf op Studiekeuze123.",
  },
  {
    q: "Waarom een gesprek en geen vragenlijst?",
    a: "Omdat nadenken over jezelf het best werkt als het over echte situaties gaat, niet over abstracte vragen over wie je bent. Daarom praten we over situaties die je herkent.",
  },
  {
    q: "Hoe lang duurt het?",
    a: "Ongeveer acht minuten, verdeeld over vier korte stappen.",
  },
  {
    q: "Ik gebruik ChatGPT al, wat voegt dit toe?",
    a: "Bijna de helft van de bovenbouwscholieren gebruikt AI al bij de studiekeuze (Qompas, januari 2026). Handig, maar Qompas ziet zelf dat die informatie te wensen overlaat. Deze tool vraagt door en legt uit waarom een richting bij je past.",
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
          to="/tool"
          className="group inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3.5 font-display text-sm font-semibold text-white shadow-md shadow-coral/20 transition-transform hover:scale-105 active:scale-95"
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
              <Reveal
                as="li"
                key={o}
                delay={i * 90}
                className="hairline flex gap-4 pt-6 first:border-none first:pt-0"
              >
                <Check className="mt-0.5 size-5 shrink-0 text-coral" />
                <span className="leading-relaxed text-muted-foreground">{o}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-border band-sand">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="eyebrow text-coral">Je bent niet de enige die twijfelt</p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                Ongeveer 32% van de eerstejaars stopt of switcht in het eerste jaar.
              </h2>
            </div>
            <div className="space-y-6">
              <p className="leading-relaxed text-muted-foreground">
                Dat zijn zo&apos;n 42.500 studenten per jaar. Wat ze zelf als reden noemen:
                &ldquo;de verwachting kwam niet uit&rdquo; (51%) en &ldquo;ik heb de verkeerde
                studiekeuze gemaakt&rdquo; (50%). Deze tool is gemaakt om je te helpen bij een
                betere, beter geïnformeerde keuze — geen garantie, wel een eerlijker beeld van waar
                je aan begint.
              </p>
              <p className="text-xs leading-relaxed text-muted-foreground/80">
                Bron: Monitor beleidsmaatregelen hoger onderwijs (ResearchNed), via onderwijskennis.nl.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24">
        <p className="eyebrow text-teal">Vragen</p>
        <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Dit vragen leerlingen ons</h2>
        <div className="mt-12 grid gap-x-12 gap-y-8 md:grid-cols-2">
          {vragen.map((v, i) => (
            <Reveal
              key={v.q}
              delay={i * 80}
              hover="lift"
              className="rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <h3 className="text-base font-semibold">{v.q}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{v.a}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="band-ink">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-5 py-16 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">Acht minuten, en je weet meer.</h2>
            <p className="mt-3 text-sm text-ink-foreground/70">
              Geen account, geen huiswerk. Gewoon een gesprek.
            </p>
          </div>
          <Link
            to="/tool"
            className="group inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3.5 font-display text-sm font-semibold text-white shadow-md shadow-coral/20 transition-transform hover:scale-105 active:scale-95"
          >
            Start de tool <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
    </>
  );
}
