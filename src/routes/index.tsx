import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, GraduationCap, School } from "lucide-react";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Studiekeuze — studiekeuzegesprek voor havo & vwo" },
      {
        name: "description",
        content:
          "Bijna een op de drie eerstejaars stopt of switcht. Studiekeuze helpt havo- en vwo-leerlingen hun richting vooraf uitzoeken in een gesprek, niet in een test.",
      },
      { property: "og:title", content: "Studiekeuze — studiekeuzegesprek voor havo & vwo" },
      {
        property: "og:description",
        content:
          "Een geleide verkenning van acht minuten: korte vragen, swipen op activiteiten, een gesprek met je gids en studies met uitleg.",
      },
    ],
  }),
  component: Home,
});

const steps = [
  {
    icon: ClipboardList,
    title: "Een paar korte vragen",
    body: "Leerjaar, profiel en twee situaties. Klaar in een minuut.",
  },
  {
    icon: Sparkles,
    title: "Swipen op wat je aanspreekt",
    body: "Concrete activiteiten, geen studienamen. Puur op gevoel.",
  },
  {
    icon: MessageCircle,
    title: "Een gesprek met je gids",
    body: "Die vraagt door op het waaróm, en bouwt voort op je swipes.",
  },
  {
    icon: Search,
    title: "Studies met uitleg",
    body: "Wat past, waarom, en hoe die studie er écht uitziet.",
  },
];

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="band-ink relative overflow-hidden text-center">
        <div className="relative z-10 mx-auto max-w-4xl px-5 py-24 lg:px-8 lg:py-32">
          <p className="eyebrow text-coral">Voor havo &amp; vwo</p>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            Bijna een op de drie eerstejaars <span className="text-coral">stopt of switcht.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-foreground/80 sm:text-xl">
            Meestal niet omdat ze het niet kunnen, maar omdat de studie iets anders bleek dan
            gedacht. Wij helpen leerlingen dat vooraf uitzoeken — in een gesprek, niet in een test.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/tool"
              className="group inline-flex items-center gap-2 rounded-2xl bg-coral px-8 py-4 font-display text-lg font-semibold text-white shadow-lg shadow-coral/20 transition-transform hover:scale-105 active:scale-95"
            >
              Start de tool
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/voor-leerlingen"
              className="inline-flex items-center gap-2 rounded-2xl border-2 border-mint bg-transparent px-8 py-4 font-display text-lg font-semibold text-mint transition-colors hover:bg-mint hover:text-ink"
            >
              Bekijk hoe het werkt
            </Link>
          </div>
          <p className="mt-6 text-xs text-ink-foreground/60">
            Gratis voor leerlingen · geen account · niets opgeslagen
          </p>
        </div>
      </section>

      {/* Twee ingangen */}
      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <Reveal
            hover="lift"
            className="group relative overflow-hidden rounded-3xl bg-card p-10 shadow-xl transition-all"
          >
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-teal/10 transition-transform group-hover:scale-150" />
            <div className="relative">
              <span className="eyebrow inline-block rounded-full bg-teal/15 px-3 py-1 text-teal">
                Voor leerlingen
              </span>
              <GraduationCap className="mt-6 size-7 text-teal" />
              <h2 className="mt-4 text-3xl font-semibold">Ik ben scholier</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Ontdek in een kort gesprek welke richtingen bij je passen, en hoe die studies er in
                het echt uitzien. Je houdt er een overzicht aan over dat je meeneemt naar je decaan.
              </p>
              <Link
                to="/voor-leerlingen"
                className="mt-8 inline-flex items-center gap-2 font-display font-semibold text-coral hover:underline"
              >
                Wat het je oplevert <ArrowRight className="size-4" />
              </Link>
            </div>
          </Reveal>

          <Reveal
            hover="lift"
            delay={120}
            className="group relative overflow-hidden rounded-3xl bg-card p-10 shadow-xl transition-all"
          >
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-coral/10 transition-transform group-hover:scale-150" />
            <div className="relative">
              <span className="eyebrow inline-block rounded-full bg-coral/15 px-3 py-1 text-coral">
                Voor scholen
              </span>
              <School className="mt-6 size-7 text-coral" />
              <h2 className="mt-4 text-3xl font-semibold">Ik ben decaan of school</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Zet dit in als voorbereiding op het LOB-gesprek. De leerling komt binnen met
                richtingen, twijfels en vragen op tafel — u begint niet meer bij nul.
              </p>
              <Link
                to="/voor-scholen"
                className="mt-8 inline-flex items-center gap-2 font-display font-semibold text-teal hover:underline"
              >
                Voor scholen <ArrowRight className="size-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Hoe het werkt */}
      <section id="hoe-het-werkt" className="band-sand py-24">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="mb-16 text-center">
            <p className="eyebrow text-teal">Hoe het werkt</p>
            <h2 className="mt-4 text-4xl font-semibold">Vier stappen, samen zo&apos;n acht minuten.</h2>
          </div>
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 100} className="relative">
                <div
                  className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold text-white shadow-lg ${
                    i % 2 === 0 ? "bg-coral" : "bg-mint"
                  }`}
                >
                  {i + 1}
                </div>
                <h3 className="mb-2 text-xl font-semibold leading-snug">{s.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                {i < steps.length - 1 && (
                  <div className="absolute left-16 top-8 hidden h-[2px] w-full border-t-2 border-dashed border-teal/30 lg:block" />
                )}
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Geen test, geen ChatGPT */}
      <section className="band-ink">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
          <h2 className="max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
            Waarom dit geen test is — en geen ChatGPT
          </h2>
          <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <p className="eyebrow text-coral">Niet een test</p>
              <p className="mt-5 leading-relaxed text-ink-foreground/75">
                Een test geeft een uitslag en laat je daarmee alleen. Hier ontstaat het beeld in een
                gesprek: de gids vraagt door op waaróm iets je aanspreekt, spiegelt terug wat hij
                hoort, en laat je zelf betekenis geven. Dat sluit aan op de loopbaancompetenties van
                Kuijpers, waarin reflectie in dialoog centraal staat.
              </p>
            </div>
            <div>
              <p className="eyebrow text-coral">Niet ChatGPT</p>
              <p className="mt-5 leading-relaxed text-ink-foreground/75">
                Een algemene chatbot verzint moeiteloos een opleiding, een toelatingseis of een
                salaris. Onze gids mag dat niet: elk feit komt uit onze eigen dataset van 150
                Nederlandse hbo- en wo-studies, en wat daar niet in staat, zegt hij niet. Bovendien
                is de gids gebouwd voor minderjarigen, met vaste grenzen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cijfers */}
      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <dl className="grid grid-cols-2 gap-y-10">
            {[
              ["32%", "valt in het eerste jaar uit of switcht"],
              ["~42.500", "studenten per jaar"],
              ["51%", "noemt: de verwachting kwam niet uit"],
              ["50%", "noemt: ik heb de verkeerde studiekeuze gemaakt"],
            ].map(([n, l], i) => (
              <Reveal as="div" key={l} delay={i * 90}>
                <dt className="font-display text-4xl font-semibold text-coral">{n}</dt>
                <dd className="mt-2 max-w-[14rem] text-sm text-muted-foreground">{l}</dd>
              </Reveal>
            ))}
          </dl>
          <div className="hairline pt-6 lg:border-none lg:pt-0">
            <p className="eyebrow text-teal">Bij de cijfers</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Ongeveer 32% van de eerstejaars valt in het eerste jaar uit of switcht van opleiding —
              dat zijn zo&apos;n 42.500 studenten per jaar. De twee meest genoemde redenen die
              studenten zelf noemen: &ldquo;de verwachting kwam niet uit&rdquo; (51%) en
              &ldquo;ik heb de verkeerde studiekeuze gemaakt&rdquo; (50%).
            </p>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground/80">
              Bron: Monitor beleidsmaatregelen hoger onderwijs (ResearchNed), via onderwijskennis.nl.
            </p>
            <Link
              to="/onderbouwing"
              className="mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold text-teal hover:text-coral"
            >
              Lees de onderbouwing <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Slot-CTA */}
      <section className="border-y border-border band-sand">
        <Reveal className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-5 py-16 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">Gewoon even proberen?</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Je hoeft niets in te vullen om te beginnen, en er wordt niets bewaard.
            </p>
          </div>
          <Link
            to="/tool"
            className="group inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3.5 font-display text-sm font-semibold text-white shadow-md shadow-coral/20 transition-transform hover:scale-105 active:scale-95"
          >
            Start de tool
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
