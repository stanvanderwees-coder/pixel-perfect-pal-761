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
    <div className="tool-shell relative overflow-hidden">
      {/* Ambient futuristic backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="grid-lines absolute inset-0" />
        <div
          className="aurora-blob left-[-10%] top-[-8%] size-[34rem]"
          style={{ background: "oklch(0.6 0.078 213 / 0.55)" }}
        />
        <div
          className="aurora-blob right-[-12%] top-[20%] size-[28rem]"
          style={{ background: "oklch(0.76 0.075 180 / 0.4)", animationDelay: "-6s" }}
        />
        <div
          className="aurora-blob bottom-[-14%] left-[30%] size-[30rem]"
          style={{ background: "oklch(0.38 0.078 243 / 0.6)", animationDelay: "-12s" }}
        />
      </div>

      {/* Hero */}
      <section className="relative">
        <div className="mx-auto max-w-5xl px-5 pb-12 pt-16 lg:px-8 lg:pt-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="eyebrow inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-3 py-1.5 text-mint">
                <Sparkles className="size-3.5" /> Studiekeuze · havo &amp; vwo
              </p>
              <h1 className="mt-6 text-4xl font-semibold leading-[1.04] sm:text-5xl lg:text-6xl">
                Ontdek welke studie <span className="neon-text">echt bij je past.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-foreground/75 sm:text-lg">
                Geen lijstje en geen test met een uitslag, maar een korte reis die je helpt kiezen —
                gebaseerd op echte Nederlandse studies.
              </p>

              <dl className="mt-9 grid max-w-lg grid-cols-3 gap-3">
                {facts.map((f) => (
                  <div key={f.label} className="glass-panel rounded-xl px-3.5 py-3">
                    <f.icon className="size-4 text-mint" />
                    <dt className="mt-2 font-display text-sm font-semibold">{f.label}</dt>
                    <dd className="text-xs text-ink-foreground/60">{f.sub}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative">
              <div className="glass-panel scan-sweep relative overflow-hidden rounded-[1.75rem] p-2">
                <img
                  src={toolOrb}
                  alt=""
                  aria-hidden="true"
                  width={1600}
                  height={912}
                  className="h-56 w-full rounded-[1.4rem] object-cover sm:h-72 lg:h-80"
                />
              </div>
              <div className="pulse-ring absolute -bottom-4 left-6 rounded-full border border-mint/40 bg-ink/70 px-4 py-2 font-display text-xs font-semibold text-mint backdrop-blur">
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
          <div className="glass-panel flex items-center gap-4 rounded-full px-4 py-3">
            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  className={`grid size-6 place-items-center rounded-full font-display text-[0.65rem] font-bold transition-all duration-300 ${
                    i < step
                      ? "bg-mint text-ink"
                      : i === step
                        ? "pulse-ring bg-teal text-ink-foreground"
                        : "border border-ink-foreground/25 text-ink-foreground/50"
                  }`}
                >
                  {i < step ? <Check className="size-3" /> : i + 1}
                </span>
              ))}
            </div>
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-ink-foreground/15">
              <div
                className="h-full rounded-full bg-gradient-to-r from-teal via-mint to-mint shadow-[0_0_16px_oklch(0.76_0.075_180_/_0.8)] transition-[width] duration-500 ease-out"
                style={{ width: `${Math.max(progress, 4)}%` }}
              />
            </div>
            <span className="font-display text-xs font-semibold tracking-wide text-ink-foreground/70">
              Stap {step + 1}/{totalSteps}
            </span>
          </div>

          <div className="glass-panel mt-6 rounded-3xl p-6 sm:p-9">
            {step === 0 && (
              <div key="s0" className="tool-card-in">
                <span className="inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-3 py-1 font-display text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-mint">
                  <Compass className="size-3.5" /> Stap 1
                </span>
                <h2 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">
                  Waar begin je?
                </h2>
                <p className="mt-2 text-sm text-ink-foreground/65">
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
                      className={`group flex items-center gap-3 rounded-2xl border px-5 py-4 text-left font-display text-base font-semibold uppercase tracking-[0.08em] transition-all duration-200 ${
                        level === l
                          ? "border-mint bg-mint/15 text-mint shadow-[0_0_30px_-8px_oklch(0.76_0.075_180_/_0.7)]"
                          : "border-ink-foreground/15 bg-ink-foreground/[0.04] text-ink-foreground hover:-translate-y-0.5 hover:border-mint/50 hover:bg-ink-foreground/[0.08]"
                      }`}
                    >
                      <School className={`size-5 ${level === l ? "text-mint" : "text-teal"}`} />
                      {l}
                      <span
                        className={`ml-auto grid size-5 place-items-center rounded-full border transition-colors ${
                          level === l
                            ? "border-mint bg-mint text-ink"
                            : "border-ink-foreground/25 text-transparent"
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
                      className={`relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-200 ${
                        stance === o.id
                          ? "border-mint/70 bg-mint/10 shadow-[0_0_30px_-10px_oklch(0.76_0.075_180_/_0.7)]"
                          : "border-ink-foreground/15 bg-ink-foreground/[0.04] hover:-translate-y-0.5 hover:border-mint/40 hover:bg-ink-foreground/[0.08]"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`absolute inset-y-0 left-0 w-1 transition-colors ${
                          stance === o.id ? "bg-mint" : "bg-transparent"
                        }`}
                      />
                      <span className="font-display text-sm font-semibold">{o.title}</span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-ink-foreground/65">
                        {o.body}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="mt-9 flex flex-wrap items-center gap-4 border-t border-ink-foreground/12 pt-7">
                  <button
                    type="button"
                    disabled={!level || !stance}
                    onClick={() => setStep(1)}
                    className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal to-mint px-6 py-3 font-display text-sm font-semibold text-ink shadow-[0_0_34px_-10px_oklch(0.76_0.075_180_/_0.9)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                  >
                    Beginnen
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                  <p className="max-w-xs text-xs leading-relaxed text-ink-foreground/60">
                    <strong className="font-semibold text-ink-foreground">
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
                    <span className="inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-3 py-1 font-display text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-mint">
                      <Sparkles className="size-3.5" /> Stap 2
                    </span>
                    <h2 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">
                      Wat spreekt je aan?
                    </h2>
                  </div>
                  <span className="font-display text-xs font-semibold text-ink-foreground/60">
                    {index + 1} / {cards.length}
                  </span>
                </div>
                <p className="mt-2 text-sm text-ink-foreground/65">
                  Activiteiten, geen studienamen. Ga op gevoel.
                </p>

                {/* Card deck */}
                <div className="relative mt-8">
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-6 -top-4 h-full rounded-[1.75rem] border border-ink-foreground/10 bg-ink-foreground/[0.04]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-3 -top-2 h-full rounded-[1.75rem] border border-ink-foreground/15 bg-ink-foreground/[0.07]"
                  />
                  <div
                    key={index}
                    className="tool-card-in scan-sweep relative overflow-hidden rounded-[1.75rem] border border-mint/25 bg-gradient-to-br from-deep via-ink to-ink p-7 text-ink-foreground shadow-[0_0_60px_-24px_oklch(0.76_0.075_180_/_0.85)] sm:p-10"
                  >
                    <img
                      src={toolOrb}
                      alt=""
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 size-full object-cover opacity-25"
                    />
                    <div className="relative">
                      <span className="inline-flex items-center gap-2 rounded-full bg-ink/60 px-3 py-1 font-display text-[0.7rem] font-semibold text-mint ring-1 ring-mint/30">
                        <Sparkles className="size-3.5" /> {index + 1} / {cards.length}
                      </span>
                      <p className="mt-5 font-display text-xl font-semibold leading-snug sm:text-2xl">
                        {cards[index]?.text}
                      </p>
                      <p className="mt-4 text-xs uppercase tracking-[0.16em] text-mint/80">
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
                      className={`h-1 rounded-full transition-all duration-300 ${
                        i === index
                          ? "w-6 bg-mint shadow-[0_0_12px_oklch(0.76_0.075_180_/_0.9)]"
                          : i < index
                            ? "w-2 bg-mint/50"
                            : "w-2 bg-ink-foreground/20"
                      }`}
                    />
                  ))}
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={() => swipe(false)}
                    className="group inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-ink-foreground/20 bg-ink-foreground/[0.05] px-5 py-4 font-display text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:border-ink-foreground/40 hover:bg-ink-foreground/[0.1]"
                  >
                    <X className="size-4 transition-transform group-hover:-rotate-12" /> Niks voor
                    mij
                  </button>
                  <button
                    type="button"
                    onClick={() => swipe(true)}
                    className="group inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-teal to-mint px-5 py-4 font-display text-sm font-semibold text-ink shadow-[0_0_34px_-12px_oklch(0.76_0.075_180_/_0.9)] transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <Check className="size-4 transition-transform group-hover:scale-110" /> Dit
                    trekt me
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => (index === 0 ? setStep(0) : setIndex((i) => i - 1))}
                  className="mt-6 inline-flex items-center gap-1.5 text-xs text-ink-foreground/60 transition-colors hover:text-mint"
                >
                  <ArrowLeft className="size-3.5" /> Terug
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="tool-card-in">
                <span className="inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-3 py-1 font-display text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-mint">
                  <PenLine className="size-3.5" /> Stap 3
                </span>
                <h2 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">
                  Even doorvragen
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-foreground/70">
                  {ranking[0]
                    ? `Je koos vooral richting ${(domainLabels[ranking[0]![0]] ?? "").toLowerCase()}. Wat trok je daarin?`
                    : "Je liet bijna alles liggen. Wat maakte dat niets klikte?"}
                </p>
                <div className="mt-6 rounded-2xl border border-mint/20 bg-ink/40 p-2">
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={5}
                    placeholder="Typ in je eigen woorden — één of twee zinnen is genoeg."
                    className="w-full resize-none rounded-xl border border-ink-foreground/15 bg-ink/60 p-4 text-sm leading-relaxed text-ink-foreground placeholder:text-ink-foreground/40 outline-none transition-colors focus:border-mint focus:ring-4 focus:ring-mint/15"
                  />
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal to-mint px-6 py-3 font-display text-sm font-semibold text-ink shadow-[0_0_34px_-10px_oklch(0.76_0.075_180_/_0.9)] transition-transform hover:-translate-y-0.5"
                  >
                    Naar mijn studies
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="rounded-full border border-ink-foreground/20 px-5 py-3 font-display text-sm font-semibold transition-colors hover:border-mint/50 hover:text-mint"
                  >
                    Overslaan
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="tool-card-in">
                <span className="inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-3 py-1 font-display text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-mint">
                  <GraduationCap className="size-3.5" /> Stap 4
                </span>
                <h2 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">
                  Dit past bij je
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-foreground/70">
                  Op basis van je swipes{level ? ` en je ${level}-niveau` : ""} — met uitleg waarom,
                  en hoe de studie er écht uitziet.
                </p>

                {ranking.length > 0 && (
                  <div className="mt-7 space-y-2.5 rounded-2xl border border-ink-foreground/12 bg-ink/40 p-5">
                    {ranking.slice(0, 3).map(([d, n]) => (
                      <div key={d} className="flex items-center gap-3">
                        <span className="w-44 shrink-0 font-display text-xs font-semibold">
                          {domainLabels[d]}
                        </span>
                        <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-foreground/15">
                          <span
                            className="block h-full rounded-full bg-gradient-to-r from-teal to-mint shadow-[0_0_14px_oklch(0.76_0.075_180_/_0.8)]"
                            style={{
                              width: `${Math.round((n / (ranking[0]?.[1] ?? 1)) * 100)}%`,
                            }}
                          />
                        </span>
                        <span className="w-8 shrink-0 text-right font-display text-xs font-semibold text-ink-foreground/60">
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
                      className="group relative overflow-hidden rounded-2xl border border-ink-foreground/12 bg-ink-foreground/[0.05] p-5 backdrop-blur-sm transition-colors hover:border-mint/40 sm:p-6"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-teal to-mint"
                      />
                      <div className="flex items-start justify-between gap-4 pl-2">
                        <div className="flex items-center gap-3">
                          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-teal to-mint font-display text-xs font-bold text-ink">
                            {i + 1}
                          </span>
                          <h3 className="font-display text-lg font-semibold">{s.name}</h3>
                        </div>
                        <span className="shrink-0 rounded-full border border-mint/30 bg-mint/10 px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-mint">
                          {s.type}
                        </span>
                      </div>
                      <div className="mt-4 grid gap-3 pl-2 sm:grid-cols-2">
                        <p className="rounded-xl border border-ink-foreground/10 bg-ink/40 p-3.5 text-sm leading-relaxed text-ink-foreground/75">
                          <strong className="mb-1 flex items-center gap-1.5 font-display text-xs font-semibold uppercase tracking-[0.12em] text-ink-foreground">
                            <Lightbulb className="size-3.5 text-mint" /> Waarom
                          </strong>
                          {s.why}
                        </p>
                        <p className="rounded-xl border border-ink-foreground/10 bg-ink/40 p-3.5 text-sm leading-relaxed text-ink-foreground/75">
                          <strong className="mb-1 flex items-center gap-1.5 font-display text-xs font-semibold uppercase tracking-[0.12em] text-ink-foreground">
                            <Eye className="size-3.5 text-mint" /> Echt zo
                          </strong>
                          {s.reality}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3 border-t border-ink-foreground/12 pt-7">
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex items-center gap-2 rounded-full border border-ink-foreground/20 px-5 py-3 font-display text-sm font-semibold transition-colors hover:border-mint/50 hover:text-mint"
                  >
                    <RotateCcw className="size-4" /> Opnieuw doen
                  </button>
                  <Link
                    to="/voor-leerlingen"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal to-mint px-5 py-3 font-display text-sm font-semibold text-ink shadow-[0_0_34px_-12px_oklch(0.76_0.075_180_/_0.9)] transition-transform hover:-translate-y-0.5"
                  >
                    <GraduationCap className="size-4" /> Meer over de aanpak
                  </Link>
                </div>
              </div>
            )}
          </div>

          <p className="mt-6 text-center text-xs text-ink-foreground/55">
            Deze verkenning geeft richting, geen definitief advies. Bespreek je uitkomst met je
            decaan of mentor.
          </p>
        </div>
      </section>
    </div>
  );
}
