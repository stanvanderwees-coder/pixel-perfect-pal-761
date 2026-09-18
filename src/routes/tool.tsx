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
import toolOrb from "@/assets/tool-ai-orb.jpg";
import { Reveal } from "@/components/reveal";


export const Route = createFileRoute("/tool")({
  head: () => ({
    meta: [
      { title: "De StudyFit.AI-tool — ontdek welke studie bij je past" },
      {
        name: "description",
        content:
          "Geen test met een uitslag, maar een korte geleide verkenning van acht minuten. Swipe op activiteiten en zie welke hbo- en wo-studies echt bij je passen.",
      },
      { property: "og:title", content: "De StudyFit.AI-tool — ontdek welke studie bij je past" },
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
    <div className="reef-shell relative overflow-hidden">
      {/* Playful backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="reef-blob left-[-8%] top-[-6%] size-[26rem]"
          style={{ background: "var(--color-mint)" }}
        />
        <div
          className="reef-blob right-[-10%] top-[14%] size-[22rem]"
          style={{ background: "var(--color-sun)", animationDelay: "-5s" }}
        />
        <div
          className="reef-blob bottom-[-12%] left-[28%] size-[24rem]"
          style={{ background: "var(--color-coral)", animationDelay: "-10s" }}
        />
      </div>

      {/* Hero */}
      <section className="relative">
        <div className="mx-auto max-w-5xl px-5 pb-12 pt-16 lg:px-8 lg:pt-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="eyebrow inline-flex items-center gap-2 rounded-full bg-coral px-3.5 py-1.5 text-white">
                <Sparkles className="size-3.5" /> StudyFit.AI · havo &amp; vwo
              </p>
              <h1 className="mt-6 text-4xl font-semibold leading-[1.04] sm:text-5xl lg:text-6xl">
                Ontdek welke studie{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">echt bij je past.</span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-1 z-0 h-3 rounded-full bg-sun sm:h-4"
                  />
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Geen lijstje en geen test met een uitslag, maar een korte reis die je helpt kiezen —
                gebaseerd op echte Nederlandse studies.
              </p>

              <dl className="mt-9 grid max-w-lg grid-cols-3 gap-3">
                {facts.map((f) => (
                  <div key={f.label} className="pop-card rounded-2xl px-3.5 py-3">
                    <f.icon className="size-4 text-teal" />
                    <dt className="mt-2 font-display text-sm font-semibold">{f.label}</dt>
                    <dd className="text-xs text-muted-foreground">{f.sub}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative">
              <div className="pop-card relative overflow-hidden rounded-[2rem] p-2">
                <img
                  src={toolOrb}
                  alt=""
                  aria-hidden="true"
                  width={1600}
                  height={912}
                  className="h-56 w-full rounded-[1.6rem] object-cover sm:h-72 lg:h-80"
                />
              </div>
              <div className="absolute -bottom-4 left-6 rounded-full bg-ink px-4 py-2 font-display text-xs font-semibold text-ink-foreground shadow-lift">
                AI-gids · live
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flow */}
      <section className="relative">
        <div className="mx-auto max-w-3xl px-5 pb-20 pt-6 lg:px-8 lg:pb-28">
          {/* Progress */}
          <div className="pop-card flex items-center gap-4 rounded-full px-4 py-3">
            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  className={`grid size-6 place-items-center rounded-full font-display text-[0.65rem] font-bold transition-all duration-300 ${
                    i < step
                      ? "bg-teal text-white"
                      : i === step
                        ? "bg-coral text-white"
                        : "border border-border text-muted-foreground"
                  }`}
                >
                  {i < step ? <Check className="size-3" /> : i + 1}
                </span>
              ))}
            </div>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-gradient-to-r from-teal via-mint to-coral transition-[width] duration-500 ease-out"
                style={{ width: `${Math.max(progress, 4)}%` }}
              />
            </div>
            <span className="font-display text-xs font-semibold tracking-wide text-muted-foreground">
              Stap {step + 1}/{totalSteps}
            </span>
          </div>

          <div className="pop-card mt-6 rounded-[2rem] p-6 sm:p-9">
            {step === 0 && (
              <div key="s0" className="tool-card-in">
                <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 font-display text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-foreground">
                  <Compass className="size-3.5 text-teal" /> Stap 1
                </span>
                <h2 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">
                  Waar begin je?
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Twee vragen, dan gaan we swipen.
                </p>

                <p className="mt-8 font-display text-sm font-semibold">Welk niveau zit je?</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {(["havo", "vwo"] as const).map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setLevel(l)}
                      aria-pressed={level === l}
                      className={`pop-tile group flex items-center gap-3 rounded-2xl px-5 py-4 text-left font-display text-base font-semibold uppercase tracking-[0.08em] ${
                        level === l ? "pop-tile-active" : "hover:-translate-y-0.5 hover:border-coral/50"
                      }`}
                    >
                      <School className={`size-5 ${level === l ? "text-coral" : "text-teal"}`} />
                      {l}
                      <span
                        className={`ml-auto grid size-5 place-items-center rounded-full border transition-colors ${
                          level === l
                            ? "border-coral bg-coral text-white"
                            : "border-border text-transparent"
                        }`}
                      >
                        <Check className="size-3" />
                      </span>
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
                      className={`pop-tile relative overflow-hidden rounded-2xl p-5 text-left ${
                        stance === o.id
                          ? "pop-tile-active"
                          : "hover:-translate-y-0.5 hover:border-coral/50"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`absolute inset-y-0 left-0 w-1.5 transition-colors ${
                          stance === o.id ? "bg-coral" : "bg-transparent"
                        }`}
                      />
                      <span className="font-display text-sm font-semibold">{o.title}</span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-muted-foreground">
                        {o.body}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="mt-9 flex flex-wrap items-center gap-4 border-t border-border pt-7">
                  <button
                    type="button"
                    disabled={!level || !stance}
                    onClick={() => setStep(1)}
                    className="group inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3 font-display text-sm font-semibold text-white shadow-lift transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                  >
                    Beginnen
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                  <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
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
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 font-display text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-foreground">
                      <Sparkles className="size-3.5 text-coral" /> Stap 2
                    </span>
                    <h2 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">
                      Wat spreekt je aan?
                    </h2>
                  </div>
                  <span className="font-display text-xs font-semibold text-muted-foreground">
                    {index + 1} / {cards.length}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Activiteiten, geen studienamen. Ga op gevoel.
                </p>

                {/* Card deck */}
                <div className="relative mt-8">
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-6 -top-4 h-full rounded-[1.9rem] border-2 border-border bg-secondary/50"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-3 -top-2 h-full rounded-[1.9rem] border-2 border-border bg-secondary"
                  />
                  <div
                    key={index}
                    className="tool-card-in relative overflow-hidden rounded-[1.9rem] bg-ink p-7 text-ink-foreground shadow-panel sm:p-10"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute -right-10 -top-10 size-40 rounded-full bg-coral/40 blur-2xl"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-12 -left-8 size-40 rounded-full bg-mint/30 blur-2xl"
                    />
                    <div className="relative">
                      <span className="inline-flex items-center gap-2 rounded-full bg-sun px-3 py-1 font-display text-[0.7rem] font-semibold text-ink">
                        <Sparkles className="size-3.5" /> {index + 1} / {cards.length}
                      </span>
                      <p className="mt-5 font-display text-xl font-semibold leading-snug sm:text-2xl">
                        {cards[index]?.text}
                      </p>
                      <p className="mt-4 text-xs uppercase tracking-[0.16em] text-mint">
                        {cards[index]?.hint}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Deck position dots */}
                <div className="mt-5 flex justify-center gap-1.5" aria-hidden="true">
                  {cards.map((c, i) => (
                    <span
                      key={c.text}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === index
                          ? "w-7 bg-coral"
                          : i < index
                            ? "w-2 bg-teal"
                            : "w-2 bg-border"
                      }`}
                    />
                  ))}
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={() => swipe(false)}
                    className="pop-tile group inline-flex flex-1 items-center justify-center gap-2 rounded-2xl px-5 py-4 font-display text-sm font-semibold hover:-translate-y-0.5 hover:border-ink/30"
                  >
                    <X className="size-4 transition-transform group-hover:-rotate-12" /> Niks voor
                    mij
                  </button>
                  <button
                    type="button"
                    onClick={() => swipe(true)}
                    className="group inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-coral px-5 py-4 font-display text-sm font-semibold text-white shadow-lift transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <Check className="size-4 transition-transform group-hover:scale-110" /> Dit
                    trekt me
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => (index === 0 ? setStep(0) : setIndex((i) => i - 1))}
                  className="mt-6 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-coral"
                >
                  <ArrowLeft className="size-3.5" /> Terug
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="tool-card-in">
                <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 font-display text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-foreground">
                  <PenLine className="size-3.5 text-teal" /> Stap 3
                </span>
                <h2 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">
                  Even doorvragen
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {ranking[0]
                    ? `Je koos vooral richting ${(domainLabels[ranking[0]![0]] ?? "").toLowerCase()}. Wat trok je daarin?`
                    : "Je liet bijna alles liggen. Wat maakte dat niets klikte?"}
                </p>
                <div className="mt-6 rounded-2xl bg-secondary p-2">
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={5}
                    placeholder="Typ in je eigen woorden — één of twee zinnen is genoeg."
                    className="w-full resize-none rounded-xl border border-border bg-card p-4 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-coral focus:ring-4 focus:ring-coral/15"
                  />
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="group inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3 font-display text-sm font-semibold text-white shadow-lift transition-transform hover:-translate-y-0.5"
                  >
                    Naar mijn studies
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="rounded-full border-2 border-border px-5 py-3 font-display text-sm font-semibold transition-colors hover:border-coral hover:text-coral"
                  >
                    Overslaan
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="tool-card-in">
                <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 font-display text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-foreground">
                  <GraduationCap className="size-3.5 text-coral" /> Stap 4
                </span>
                <h2 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">
                  Dit past bij je
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  Op basis van je swipes{level ? ` en je ${level}-niveau` : ""} — met uitleg waarom,
                  en hoe de studie er écht uitziet.
                </p>

                {ranking.length > 0 && (
                  <div className="mt-7 space-y-2.5 rounded-2xl bg-secondary p-5">
                    {ranking.slice(0, 3).map(([d, n]) => (
                      <div key={d} className="flex items-center gap-3">
                        <span className="w-44 shrink-0 font-display text-xs font-semibold">
                          {domainLabels[d]}
                        </span>
                        <span className="h-2 flex-1 overflow-hidden rounded-full bg-card">
                          <span
                            className="block h-full rounded-full bg-gradient-to-r from-teal to-coral"
                            style={{
                              width: `${Math.round((n / (ranking[0]?.[1] ?? 1)) * 100)}%`,
                            }}
                          />
                        </span>
                        <span className="w-8 shrink-0 text-right font-display text-xs font-semibold text-muted-foreground">
                          {n}x
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-7 space-y-3">
                  {matches.map((s, i) => (
                    <Reveal
                      key={s.name}
                      delay={i * 70}
                      hover="lift"
                      className="pop-card group relative overflow-hidden rounded-2xl p-5 sm:p-6"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-coral to-sun"
                      />
                      <div className="flex items-start justify-between gap-4 pl-2">
                        <div className="flex items-center gap-3">
                          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-coral font-display text-xs font-bold text-white">
                            {i + 1}
                          </span>
                          <h3 className="font-display text-lg font-semibold">{s.name}</h3>
                        </div>
                        <span className="shrink-0 rounded-full bg-secondary px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-foreground">
                          {s.type}
                        </span>
                      </div>
                      <div className="mt-4 grid gap-3 pl-2 sm:grid-cols-2">
                        <p className="rounded-xl bg-secondary p-3.5 text-sm leading-relaxed text-muted-foreground">
                          <strong className="mb-1 flex items-center gap-1.5 font-display text-xs font-semibold uppercase tracking-[0.12em] text-foreground">
                            <Lightbulb className="size-3.5 text-coral" /> Waarom
                          </strong>
                          {s.why}
                        </p>
                        <p className="rounded-xl bg-secondary p-3.5 text-sm leading-relaxed text-muted-foreground">
                          <strong className="mb-1 flex items-center gap-1.5 font-display text-xs font-semibold uppercase tracking-[0.12em] text-foreground">
                            <Eye className="size-3.5 text-teal" /> Echt zo
                          </strong>
                          {s.reality}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3 border-t border-border pt-7">
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex items-center gap-2 rounded-full border-2 border-border px-5 py-3 font-display text-sm font-semibold transition-colors hover:border-coral hover:text-coral"
                  >
                    <RotateCcw className="size-4" /> Opnieuw doen
                  </button>
                  <Link
                    to="/voor-leerlingen"
                    className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 font-display text-sm font-semibold text-ink-foreground transition-transform hover:-translate-y-0.5"
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
    </div>
  );
}
