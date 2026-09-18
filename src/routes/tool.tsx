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
  MessageCircle,
  Volume2,
} from "lucide-react";
import logoMark from "@/assets/logo-mark.png";
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

  const guideCopy = [
    "Hoi! Eerst wil ik kort weten waar jij nu staat.",
    "Mooi. Kies op gevoel — er zijn geen foute antwoorden.",
    "Ik zie een richting ontstaan. Vertel me wat je daarin aanspreekt.",
    "Dit zijn studies die aansluiten op wat jij belangrijk vindt.",
  ][step];

  return (
    <div className="ai-stage relative overflow-hidden">
      <div aria-hidden="true" className="ai-grid absolute inset-0" />
      <div className="relative mx-auto min-h-[calc(100svh-4rem)] max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
        <div className="ai-console grid min-h-[calc(100svh-7.5rem)] overflow-hidden rounded-[1.75rem] lg:grid-cols-[minmax(300px,0.78fr)_minmax(560px,1.45fr)]">
          <aside className="ai-guide relative flex min-h-[420px] flex-col overflow-hidden p-6 text-ink-foreground sm:p-8 lg:min-h-0 lg:p-10">
            <div aria-hidden="true" className="ai-orbit ai-orbit-one" />
            <div aria-hidden="true" className="ai-orbit ai-orbit-two" />
            <div className="relative z-10 flex items-center justify-between">
              <p className="eyebrow flex items-center gap-2 text-mint">
                <Sparkles className="size-3.5" /> StudyFit.AI
              </p>
              <span className="flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-3 py-1 text-[0.68rem] font-semibold uppercase text-mint">
                <span className="ai-live-dot size-1.5 rounded-full bg-mint" /> live
              </span>
            </div>

            <div className="relative z-10 my-auto flex flex-col items-center py-7 text-center">
              <div className="ai-mascot-wrap relative">
                <div className="ai-signal ai-signal-one" aria-hidden="true" />
                <div className="ai-signal ai-signal-two" aria-hidden="true" />
                <div className="ai-mascot relative grid size-52 place-items-center rounded-full sm:size-60 lg:size-64">
                  <img src={logoMark} alt="StudyFit AI-gids" className="ai-mascot-image size-[78%] object-contain" />
                  <span className="absolute bottom-4 right-5 grid size-10 place-items-center rounded-full border-4 border-ink bg-coral text-primary-foreground shadow-lift">
                    <Volume2 className="size-4" />
                  </span>
                </div>
              </div>
              <div className="ai-wave mt-7 flex h-6 items-center gap-1" aria-hidden="true">
                {Array.from({ length: 9 }).map((_, i) => <span key={i} />)}
              </div>
              <p className="mt-3 font-display text-xs font-semibold uppercase text-mint">Je AI-gids denkt mee</p>
              <h1 className="mt-4 max-w-md text-3xl font-semibold leading-tight sm:text-4xl">Ontdek welke studie echt bij je past.</h1>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-foreground/70">Geen lijstje en geen test met een uitslag, maar een korte reis gebaseerd op echte Nederlandse studies.</p>
            </div>

            <div className="relative z-10 rounded-2xl border border-ink-foreground/15 bg-ink-foreground/10 p-4 backdrop-blur-md">
              <div className="flex gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-coral text-primary-foreground"><MessageCircle className="size-4" /></span>
                <p className="text-sm leading-relaxed text-ink-foreground/85">{guideCopy}</p>
              </div>
            </div>
          </aside>

          <section className="flex min-w-0 flex-col bg-card/95">
            <header className="border-b border-border px-5 py-5 sm:px-8 lg:px-10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-display text-sm font-semibold">Jouw studieverkenning</p>
                  <p className="mt-1 text-xs text-muted-foreground">Anoniem · ongeveer 8 minuten</p>
                </div>
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: totalSteps }).map((_, i) => (
                    <span key={i} className={`grid size-7 place-items-center rounded-full font-display text-[0.65rem] font-bold ${i < step ? "bg-teal text-primary-foreground" : i === step ? "bg-coral text-primary-foreground" : "border border-border text-muted-foreground"}`}>
                      {i < step ? <Check className="size-3" /> : i + 1}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-gradient-to-r from-teal via-mint to-coral transition-[width] duration-500" style={{ width: `${Math.max(progress, 4)}%` }} />
              </div>
            </header>

            <div className="flex-1 overflow-y-auto p-5 sm:p-8 lg:p-10">
              <div className="mx-auto w-full max-w-3xl">
            <div className="flex items-center gap-1.5">
              </div>
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
