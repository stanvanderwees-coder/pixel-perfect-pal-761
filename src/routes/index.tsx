import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ClipboardList,
  Sparkles,
  MessageCircle,
  Search,
  GraduationCap,
  School,
} from "lucide-react";
import heroStudent from "@/assets/hero-student.jpg";
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
      <section className="band-ink">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:px-8 lg:py-28">
          <div>
            <p className="eyebrow text-mint">Voor havo &amp; vwo</p>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
              Bijna een op de drie eerstejaars <span className="text-mint">stopt of switcht.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-foreground/75 sm:text-lg">
              Meestal niet omdat ze het niet kunnen, maar omdat de studie iets anders bleek dan
              gedacht. Wij helpen leerlingen dat vooraf uitzoeken — in een gesprek, niet in een
              test.
            </p>
            <div className="mt-9">
              <Link
                to="/voor-leerlingen"
                className="group inline-flex items-center gap-2 rounded-sm bg-mint px-6 py-3.5 font-display text-sm font-semibold text-ink transition-colors hover:bg-ink-foreground"
              >
                Start de tool
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <p className="mt-5 text-xs text-ink-foreground/55">
              Gratis voor leerlingen · geen account · niets opgeslagen
            </p>
          </div>

          <div className="relative">
            <img
              src={heroStudent}
              alt="Havoleerling denkt na over haar studiekeuze achter een laptop"
              width={1280}
              height={1600}
              className="aspect-[4/5] w-full rounded-sm object-cover shadow-panel"
            />
            <div className="absolute -bottom-6 left-6 right-6 rounded-sm border border-ink-foreground/15 bg-ink/90 p-5 backdrop-blur-sm">
              <p className="font-display text-3xl font-semibold text-mint">8 min</p>
              <p className="mt-1 text-xs text-ink-foreground/70">
                Vier stappen tot een overzicht dat je meeneemt naar je decaan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Twee ingangen */}
      <section className="band-sand">
        <div className="mx-auto grid max-w-6xl gap-px overflow-hidden border-y border-border bg-border md:grid-cols-2">
          <Reveal hover="lift" className="bg-card px-6 py-12 sm:px-10">
            <GraduationCap className="size-6 text-teal" />
            <h2 className="mt-6 text-2xl font-semibold">Ik ben scholier</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Ontdek in een kort gesprek welke richtingen bij je passen, en hoe die studies er in
              het echt uitzien. Je houdt er een overzicht aan over dat je meeneemt naar je decaan.
            </p>
            <Link
              to="/voor-leerlingen"
              className="mt-8 inline-flex items-center gap-2 font-display text-sm font-semibold text-deep hover:text-teal"
            >
              Wat het je oplevert <ArrowRight className="size-4" />
            </Link>
          </Reveal>
          <Reveal hover="lift" delay={120} className="bg-card px-6 py-12 sm:px-10">
            <School className="size-6 text-teal" />
            <h2 className="mt-6 text-2xl font-semibold">Ik ben decaan of school</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Zet dit in als voorbereiding op het LOB-gesprek. De leerling komt binnen met
              richtingen, twijfels en vragen op tafel — u begint niet meer bij nul.
            </p>
            <Link
              to="/voor-scholen"
              className="mt-8 inline-flex items-center gap-2 font-display text-sm font-semibold text-deep hover:text-teal"
            >
              Voor scholen <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Hoe het werkt */}
      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <p className="eyebrow text-teal">Hoe het werkt</p>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold sm:text-4xl">
          Vier stappen, samen zo&apos;n acht minuten.
        </h2>
        <ol className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="border-t-2 border-ink pt-6">
              <div className="flex items-center justify-between">
                <s.icon className="size-5 text-teal" />
                <span className="font-display text-sm text-muted-foreground">0{i + 1}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold leading-snug">{s.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Geen test, geen ChatGPT */}
      <section className="band-ink">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
          <h2 className="max-w-2xl text-3xl font-semibold sm:text-4xl">
            Waarom dit geen test is — en geen ChatGPT
          </h2>
          <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <p className="eyebrow text-mint">Niet een test</p>
              <p className="mt-5 leading-relaxed text-ink-foreground/75">
                Een test geeft een uitslag en laat je daarmee alleen. Hier ontstaat het beeld in een
                gesprek: de gids vraagt door op waaróm iets je aanspreekt, spiegelt terug wat hij
                hoort, en laat je zelf betekenis geven. Dat sluit aan op de loopbaancompetenties van
                Kuijpers, waarin reflectie in dialoog centraal staat.
              </p>
            </div>
            <div>
              <p className="eyebrow text-mint">Niet ChatGPT</p>
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
              ["25–30%", "eerstejaars stopt of switcht"],
              ["~30%", "uitval in het eerste hbo-jaar"],
              ["48%", "noemt verkeerde studiekeuze"],
              ["49%", "verwachtingen kwamen niet uit"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="font-display text-4xl font-semibold text-deep">{n}</dt>
                <dd className="mt-2 max-w-[14rem] text-sm text-muted-foreground">{l}</dd>
              </div>
            ))}
          </dl>
          <div className="hairline pt-6 lg:border-none lg:pt-0">
            <p className="eyebrow text-teal">Bij de cijfers</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Volgens het IBO &lsquo;Talent op de juiste plek&rsquo; (2024) schommelt het uitval- en
              switchpercentage onder eerstejaars de laatste jaren tussen 25 en ruim 30 procent; in
              het hbo stopt gemiddeld zo&apos;n 30 procent in het eerste jaar. Van de studenten die
              switchten in 2022/2023 noemde 48 procent een verkeerde studiekeuze als reden en 49
              procent dat de verwachtingen niet uitkwamen (Inspectie van het Onderwijs, De Staat van
              het Onderwijs).
            </p>
            <Link
              to="/onderbouwing"
              className="mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold text-deep hover:text-teal"
            >
              Lees de onderbouwing <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Slot-CTA */}
      <section className="border-y border-border band-sand">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-5 py-16 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">Gewoon even proberen?</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Je hoeft niets in te vullen om te beginnen, en er wordt niets bewaard.
            </p>
          </div>
          <Link
            to="/voor-leerlingen"
            className="group inline-flex items-center gap-2 rounded-sm bg-ink px-6 py-3.5 font-display text-sm font-semibold text-ink-foreground transition-colors hover:bg-deep"
          >
            Start de tool
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
    </>
  );
}
