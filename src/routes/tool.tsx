import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  X,
  Sparkles,
  ShieldCheck,
  Clock,
  Layers,
  RotateCcw,
  GraduationCap,
  Compass,
  Lightbulb,
  Eye,
  PenLine,
  School,
} from "lucide-react";
import toolPaths from "@/assets/tool-paths.jpg";
import { Reveal } from "@/components/reveal";


export const Route = createFileRoute("/tool")({
  head: () => ({
    meta: [
      { title: "De studiekeuzetool — ontdek welke studie bij je past" },
      {
        name: "description",
        content:
          "Geen test met een uitslag, maar een korte geleide verkenning van acht minuten. Swipe op activiteiten en zie welke hbo- en wo-studies echt bij je passen.",
      },
      { property: "og:title", content: "De studiekeuzetool — ontdek welke studie bij je past" },
      {
        property: "og:description",
        content:
          "Kies je niveau, swipe op activiteiten en krijg studies met uitleg. Gratis, anoniem en zonder account.",
      },
    ],
  }),
  component: ToolPage,
});

type Level = "havo" | "vwo";
type Stance = "geen-idee" | "twijfel";

type Domain = "mens" | "techniek" | "ondernemen" | "creatief" | "natuur";

const domainLabels: Record<Domain, string> = {
  mens: "Mensen & gedrag",
  techniek: "Techniek & data",
  ondernemen: "Ondernemen & organiseren",
  creatief: "Creatief & vormgeven",
  natuur: "Natuur & gezondheid",
};

const cards: { text: string; hint: string; domain: Domain }[] = [
  {
    text: "Een gesprek voeren met iemand die het even niet meer weet",
    hint: "luisteren, doorvragen",
    domain: "mens",
  },
  {
    text: "Uitzoeken waarom een stuk code niet doet wat het moet doen",
    hint: "logica, geduld",
    domain: "techniek",
  },
  {
    text: "Een plan maken om een klein evenement echt vol te krijgen",
    hint: "organiseren, overtuigen",
    domain: "ondernemen",
  },
  {
    text: "Een idee omzetten in beeld, geluid of ontwerp",
    hint: "vormgeven, maken",
    domain: "creatief",
  },
  {
    text: "Meten wat er in een proef gebeurt en er conclusies uit trekken",
    hint: "onderzoeken, precisie",
    domain: "natuur",
  },
  {
    text: "Een groep uitleg geven zodat iedereen het snapt",
    hint: "overbrengen, structuur",
    domain: "mens",
  },
  {
    text: "Een grote dataset opschonen tot er een patroon zichtbaar wordt",
    hint: "analyseren, ordenen",
    domain: "techniek",
  },
  {
    text: "Iemand helpen die pijn heeft of in de knoop zit met zijn gezondheid",
    hint: "zorgen, handelen",
    domain: "natuur",
  },
];

const studies: {
  name: string;
  level: Level[];
  domain: Domain;
  type: "hbo" | "wo";
  why: string;
  reality: string;
}[] = [
  {
    name: "Psychologie",
    level: ["vwo"],
    domain: "mens",
    type: "wo",
    why: "Je wordt getrokken door gedrag en het waarom achter keuzes.",
    reality: "Veel statistiek en onderzoeksmethoden — minder therapie dan je denkt.",
  },
  {
    name: "Social Work",
    level: ["havo", "vwo"],
    domain: "mens",
    type: "hbo",
    why: "Je wilt met mensen werken die vastlopen, niet met theorie erover.",
    reality: "Vanaf jaar één stage; je leert grenzen stellen net zo goed als helpen.",
  },
  {
    name: "Technische Informatica",
    level: ["havo", "vwo"],
    domain: "techniek",
    type: "hbo",
    why: "Je vindt het bevredigend om iets kloppend te krijgen.",
    reality: "Programmeren is 20% typen en 80% uitzoeken waarom het niet werkt.",
  },
  {
    name: "Data Science",
    level: ["vwo"],
    domain: "techniek",
    type: "wo",
    why: "Patronen zoeken in ruwe informatie spreekt je aan.",
    reality: "Zwaar op wiskunde en lineaire algebra in de eerste twee jaar.",
  },
  {
    name: "Bedrijfskunde",
    level: ["havo", "vwo"],
    domain: "ondernemen",
    type: "wo",
    why: "Je denkt in plannen, mensen en hoe iets loopt.",
    reality: "Breed en abstract; je kiest laat pas een echte richting.",
  },
  {
    name: "Commerciële Economie",
    level: ["havo", "vwo"],
    domain: "ondernemen",
    type: "hbo",
    why: "Je wilt iets verkopen of neerzetten en het effect zien.",
    reality: "Veel groepsprojecten met echte opdrachtgevers en deadlines.",
  },
  {
    name: "Communication & Multimedia Design",
    level: ["havo", "vwo"],
    domain: "creatief",
    type: "hbo",
    why: "Je denkt in beeld en wilt maken wat je bedenkt.",
    reality: "Feedbackrondes op je werk zijn hard en wekelijks — dat hoort erbij.",
  },
  {
    name: "Biomedische Wetenschappen",
    level: ["vwo"],
    domain: "natuur",
    type: "wo",
    why: "Je wilt begrijpen hoe het lichaam werkt, tot op celniveau.",
    reality: "Onderzoek en lab, geen patiëntenzorg — dat is Geneeskunde.",
  },
  {
    name: "Verpleegkunde",
    level: ["havo", "vwo"],
    domain: "natuur",
    type: "hbo",
    why: "Je wilt direct iets doen voor iemand die het nodig heeft.",
    reality: "Onregelmatige diensten en veel praktijk vanaf het eerste jaar.",
  },
];

const facts = [
  { icon: Layers, label: "150 studies", sub: "hbo en wo" },
  { icon: Clock, label: "± 8 min", sub: "geen huiswerk" },
  { icon: ShieldCheck, label: "Anoniem", sub: "niets opgeslagen" },
];

function ToolPage() {
  const [step, setStep] = useState(0);
  const [level, setLevel] = useState<Level | null>(null);
  const [stance, setStance] = useState<Stance | null>(null);
  const [index, setIndex] = useState(0);
  const [liked, setLiked] = useState<Domain[]>([]);
  const [note, setNote] = useState("");

  const totalSteps = 4;
  const progress = step === 1 ? (index / cards.length) * 100 : (step / (totalSteps - 1)) * 100;

  const ranking = useMemo(() => {
    const counts = new Map<Domain, number>();
    for (const d of liked) counts.set(d, (counts.get(d) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [liked]);

  const matches = useMemo(() => {
    const top = ranking.slice(0, 2).map(([d]) => d);
    const pool = studies.filter((s) => (level ? s.level.includes(level) : true));
    const ordered = [
      ...pool.filter((s) => top.includes(s.domain)),
      ...pool.filter((s) => !top.includes(s.domain)),
    ];
    return ordered.slice(0, 4);
  }, [ranking, level]);

  function swipe(keep: boolean) {
    const d = cards[index]?.domain;
    if (keep && d) setLiked((v) => [...v, d]);
    if (index + 1 >= cards.length) setStep(2);
    else setIndex((i) => i + 1);
  }

  function reset() {
    setStep(0);
    setLevel(null);
    setStance(null);
    setIndex(0);
    setLiked([]);
    setNote("");
  }

  return (
    <>
      {/* Tool header band */}
      <section className="band-ink relative overflow-hidden">
        <img
          src={toolPaths}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 size-full object-cover opacity-35"
        />
        <div className="relative mx-auto max-w-4xl px-5 pb-14 pt-16 lg:px-8 lg:pb-16 lg:pt-20">
          <p className="eyebrow text-mint">Studiekeuze · havo &amp; vwo</p>
          <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-[1.06] sm:text-5xl">
            Ontdek welke studie <span className="text-mint">echt bij je past.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-foreground/75 sm:text-lg">
            Geen lijstje en geen test met een uitslag, maar een korte reis die je helpt kiezen —
            gebaseerd op echte Nederlandse studies.
          </p>

          <dl className="mt-9 grid max-w-lg grid-cols-3 gap-3">
            {facts.map((f) => (
              <div
                key={f.label}
                className="rounded-sm border border-ink-foreground/15 bg-ink-foreground/[0.06] px-3.5 py-3 backdrop-blur-sm"
              >
                <f.icon className="size-4 text-mint" />
                <dt className="mt-2 font-display text-sm font-semibold">{f.label}</dt>
                <dd className="text-xs text-ink-foreground/60">{f.sub}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Flow */}
      <section className="band-sand hairline">
        <div className="mx-auto max-w-3xl px-5 py-14 lg:px-8 lg:py-20">
          {/* Progress */}
          <div className="flex items-center gap-4">
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full bg-teal transition-[width] duration-500 ease-out"
                style={{ width: `${Math.max(progress, 4)}%` }}
              />
            </div>
            <span className="font-display text-xs font-semibold tracking-wide text-muted-foreground">
              Stap {step + 1}/{totalSteps}
            </span>
          </div>

          <div className="mt-8 rounded-lg border border-border bg-card p-6 shadow-[var(--shadow-lift)] sm:p-9">
            {step === 0 && (
              <div key="s0" data-reveal="" className="is-visible">
                <h2 className="font-display text-2xl font-semibold">Waar begin je?</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Twee vragen, dan gaan we swipen.
                </p>

                <p className="mt-8 font-display text-sm font-semibold">Welk niveau zit je?</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {(["havo", "vwo"] as const).map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setLevel(l)}
                      aria-pressed={level === l}
                      className={`rounded-sm border px-5 py-2.5 font-display text-sm font-semibold transition-colors ${
                        level === l
                          ? "border-teal bg-teal text-primary-foreground"
                          : "border-border bg-background hover:border-teal/60"
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>

                <p className="mt-8 font-display text-sm font-semibold">Waar sta je nu?</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {(
                    [
                      {
                        id: "geen-idee" as Stance,
                        title: "Ik heb nog geen idee",
                        body: "Verken breed wat bij je past.",
                      },
                      {
                        id: "twijfel" as Stance,
                        title: "Ik twijfel al tussen een paar",
                        body: "Vergelijk gericht en verdiep.",
                      },
                    ] as const
                  ).map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => setStance(o.id)}
                      aria-pressed={stance === o.id}
                      className={`rounded-sm border p-4 text-left transition-colors ${
                        stance === o.id
                          ? "border-teal bg-teal/10"
                          : "border-border bg-background hover:border-teal/60"
                      }`}
                    >
                      <span className="font-display text-sm font-semibold">{o.title}</span>
                      <span className="mt-1 block text-sm text-muted-foreground">{o.body}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    disabled={!level || !stance}
                    onClick={() => setStep(1)}
                    className="group inline-flex items-center gap-2 rounded-sm bg-ink px-6 py-3 font-display text-sm font-semibold text-ink-foreground transition-colors hover:bg-deep disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Beginnen
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                  <p className="text-xs text-muted-foreground">
                    <strong className="font-semibold text-foreground">
                      Geen account, niets wordt opgeslagen.
                    </strong>{" "}
                    Sluit je dit, dan is alles weg.
                  </p>
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-display text-2xl font-semibold">Wat spreekt je aan?</h2>
                  <span className="font-display text-xs font-semibold text-muted-foreground">
                    {index + 1} / {cards.length}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Activiteiten, geen studienamen. Ga op gevoel.
                </p>

                <div
                  key={index}
                  data-reveal=""
                  className="is-visible mt-7 rounded-md border border-border bg-gradient-to-br from-sand to-card p-7 sm:p-9"
                >
                  <Sparkles className="size-5 text-teal" />
                  <p className="mt-4 font-display text-xl font-semibold leading-snug sm:text-2xl">
                    {cards[index]?.text}
                  </p>
                  <p className="mt-3 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {cards[index]?.hint}
                  </p>
                </div>

                <div className="mt-7 flex gap-3">
                  <button
                    type="button"
                    onClick={() => swipe(false)}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-sm border border-border bg-background px-5 py-3 font-display text-sm font-semibold transition-colors hover:border-foreground/40"
                  >
                    <X className="size-4" /> Niks voor mij
                  </button>
                  <button
                    type="button"
                    onClick={() => swipe(true)}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-sm bg-teal px-5 py-3 font-display text-sm font-semibold text-primary-foreground transition-colors hover:bg-deep"
                  >
                    <Check className="size-4" /> Dit trekt me
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => (index === 0 ? setStep(0) : setIndex((i) => i - 1))}
                  className="mt-6 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ArrowLeft className="size-3.5" /> Terug
                </button>
              </div>
            )}

            {step === 2 && (
              <div data-reveal="" className="is-visible">
                <h2 className="font-display text-2xl font-semibold">Even doorvragen</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {ranking[0]
                    ? `Je koos vooral richting ${(domainLabels[ranking[0]![0]] ?? "").toLowerCase()}. Wat trok je daarin?`
                    : "Je liet bijna alles liggen. Wat maakte dat niets klikte?"}
                </p>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={5}
                  placeholder="Typ in je eigen woorden — één of twee zinnen is genoeg."
                  className="mt-6 w-full rounded-sm border border-input bg-background p-4 text-sm outline-none transition-colors focus:border-teal"
                />
                <div className="mt-7 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="group inline-flex items-center gap-2 rounded-sm bg-ink px-6 py-3 font-display text-sm font-semibold text-ink-foreground transition-colors hover:bg-deep"
                  >
                    Naar mijn studies
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="rounded-sm border border-border px-5 py-3 font-display text-sm font-semibold transition-colors hover:border-foreground/40"
                  >
                    Overslaan
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="font-display text-2xl font-semibold">Dit past bij je</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Op basis van je swipes{level ? ` en je ${level}-niveau` : ""} — met uitleg waarom,
                  en hoe de studie er écht uitziet.
                </p>

                {ranking.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {ranking.slice(0, 3).map(([d, n]) => (
                      <span
                        key={d}
                        className="rounded-full border border-teal/40 bg-teal/10 px-3 py-1 text-xs font-semibold text-deep"
                      >
                        {domainLabels[d]} · {n}x
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-7 space-y-3">
                  {matches.map((s, i) => (
                    <Reveal
                      key={s.name}
                      delay={i * 70}
                      hover="lift"
                      className="rounded-md border border-border bg-background p-5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-display text-lg font-semibold">{s.name}</h3>
                        <span className="shrink-0 rounded-sm bg-secondary px-2 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-secondary-foreground">
                          {s.type}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        <strong className="font-semibold text-foreground">Waarom: </strong>
                        {s.why}
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        <strong className="font-semibold text-foreground">Echt zo: </strong>
                        {s.reality}
                      </p>
                    </Reveal>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex items-center gap-2 rounded-sm border border-border px-5 py-3 font-display text-sm font-semibold transition-colors hover:border-foreground/40"
                  >
                    <RotateCcw className="size-4" /> Opnieuw doen
                  </button>
                  <Link
                    to="/voor-leerlingen"
                    className="inline-flex items-center gap-2 rounded-sm bg-ink px-5 py-3 font-display text-sm font-semibold text-ink-foreground transition-colors hover:bg-deep"
                  >
                    <GraduationCap className="size-4" /> Meer over de aanpak
                  </Link>
                </div>
              </div>
            )}
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Deze verkenning geeft richting, geen definitief advies. Bespreek je uitkomst met je
            decaan of mentor.
          </p>
        </div>
      </section>
    </>
  );
}
