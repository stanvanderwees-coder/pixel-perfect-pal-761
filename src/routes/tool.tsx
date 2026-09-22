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
  Volume2,
  LockKeyhole,
  BrainCircuit,
  Waves,
} from "lucide-react";
import logoMark from "@/assets/logo-mark.png";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";


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

  const guideStep = [
    {
      title: "Eerst even voorstellen",
      intro:
        "Hoi! Ik ben Noor, je AI-gids. In vier korte stappen help ik je studies vinden die echt bij je passen.",
      lines: [
        "Kies hier je niveau.",
        "Vertel waar je nu in je studiekeuze staat.",
        "Geen goed of fout — alles mag.",
      ],
    },
    {
      title: "Swipen op wat je leuk vindt",
      intro: "Je krijgt acht korte activiteiten. Kies op gevoel.",
      lines: [
        "Dit trekt me → het klinkt als iets voor jou.",
        "Niks voor mij → het spreekt je (nog) niet aan.",
        "Zo bouwen we samen een beeld van wat jou energie geeft.",
      ],
    },
    {
      title: "Een klein stapje verder",
      intro:
        "Je swipes geven een eerste richting. Nu benieuwd ik wat je daar zelf in herkent.",
      lines: [
        "Typ in je eigen woorden wat je aanspreekt.",
        "Eén of twee zinnen is genoeg.",
        "Dit helpt om je uitleg straks beter te laten aansluiten.",
      ],
    },
    {
      title: "Dit zijn studies voor jou",
      intro:
        "Op basis van je keuzes laat ik studies zien die bij jouw antwoorden passen.",
      lines: [
        "Bij elke studie zie je waarom het past.",
        "En ook hoe de studie écht is.",
        "Bespreek je lijst daarna met je decaan of mentor.",
      ],
    },
  ][step] ?? {
    title: "Ik denk met je mee.",
    intro: "Kies een stap om verder te gaan.",
    lines: [],
  };

  const currentCard = cards[index];

  return (
    <main className="study-studio min-h-[calc(100svh-4rem)] p-3 sm:p-5 lg:p-7">
      <div className="studio-panel mx-auto grid min-h-[calc(100svh-6rem)] max-w-[1540px] overflow-hidden rounded-[1.5rem] lg:grid-cols-[minmax(290px,0.68fr)_minmax(0,1.65fr)]">
        <aside className="relative order-2 flex min-h-[330px] flex-col overflow-hidden bg-ink p-5 text-ink-foreground sm:min-h-[390px] sm:p-8 lg:order-none lg:min-h-0 lg:p-9">
          <div aria-hidden="true" className="guide-aura absolute -left-24 top-24 size-80 rounded-full bg-teal/20 blur-3xl" />
          <div aria-hidden="true" className="absolute -bottom-32 -right-28 size-80 rounded-full bg-coral/15 blur-3xl" />
          <div className="relative z-10 flex items-center justify-between gap-3">
            <Link to="/" className="flex items-center gap-2.5 font-display text-sm font-semibold">
              <img src={logoMark} alt="" className="size-9 object-contain" />
              <span>StudyFit.AI</span>
            </Link>
            <span className="flex items-center gap-2 rounded-full border border-mint/25 bg-mint/10 px-3 py-1 text-[0.65rem] font-bold uppercase text-mint">
              <span className="ai-live-dot size-1.5 rounded-full bg-mint" /> Noor is er
            </span>
          </div>

          <div className="relative z-10 flex flex-1 flex-col justify-center py-3 sm:py-6 lg:py-9">
            <div className="relative mx-auto w-full max-w-[150px] sm:max-w-[230px] lg:max-w-[260px]">
              <div className="guide-aura absolute inset-8 rounded-full border border-teal/40" />
              <div className="guide-aura absolute inset-2 rounded-full border border-mint/15" />
              <div className="relative mx-auto grid aspect-square w-[76%] place-items-center rounded-full bg-gradient-to-br from-mint/25 via-teal/15 to-coral/20 shadow-[0_0_80px_-24px_var(--color-teal)]">
                <img src={logoMark} alt="Noor, je StudyFit AI-gids" className="ai-mascot-image size-[82%] object-contain" />
                <span className="absolute bottom-1 right-2 grid size-9 place-items-center rounded-full border-4 border-ink bg-coral text-primary-foreground">
                  <Volume2 className="size-4" />
                </span>
              </div>
            </div>
            <div className="guide-equalizer mt-3 flex h-5 items-center justify-center gap-1 sm:mt-5" aria-hidden="true">
              {[10, 18, 13, 21, 16, 11, 18].map((height, i) => <span key={`${height}-${i}`} className="w-1 rounded-full bg-mint" style={{ height }} />)}
            </div>
            <p className="mt-2 text-center font-display text-[0.65rem] font-semibold uppercase text-mint sm:mt-3 sm:text-xs">Noor · jouw AI-gids</p>
            <h1 className="mt-2 text-center font-display text-2xl font-semibold leading-tight sm:mt-4 sm:text-4xl">
              Vind een studie die <span className="text-mint">echt</span> bij je past.
            </h1>
          </div>

        </aside>

        <section className="flex min-w-0 flex-col bg-card/95">
          <header className="border-b border-border px-5 py-4 sm:px-8 lg:px-10">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="font-display text-sm font-semibold">Jouw studieverkenning</p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground"><LockKeyhole className="size-3" /> Anoniem · ongeveer 8 minuten</p>
              </div>
              <div className="hidden items-center sm:flex">
                {["Start", "Voelen", "Verdiepen", "Match"].map((label, i) => (
                  <div key={label} className="flex items-center">
                    <span className={`studio-step flex items-center gap-1.5 text-xs font-semibold ${i <= step ? "text-foreground" : "text-muted-foreground/55"}`}>
                      <span className={`grid size-7 place-items-center rounded-full ${i < step ? "bg-teal text-primary-foreground" : i === step ? "bg-coral text-primary-foreground shadow-lift" : "border border-border bg-card"}`}>
                        {i < step ? <Check className="size-3" /> : i + 1}
                      </span>
                      <span className="hidden xl:inline">{label}</span>
                    </span>
                    {i < totalSteps - 1 && <span className={`mx-2 h-px w-5 xl:w-9 ${i < step ? "bg-teal" : "bg-border"}`} />}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-secondary">
              <div className="h-full rounded-full bg-gradient-to-r from-teal via-mint to-coral transition-[width] duration-500" style={{ width: `${Math.max(progress, 5)}%` }} />
            </div>
          </header>

          <div className="border-b border-border bg-card/50 px-5 py-3 sm:px-8 sm:py-4 lg:px-10">
            <div className="mx-auto flex max-w-4xl items-start gap-3 rounded-2xl border border-teal/20 bg-mint/10 p-3 sm:gap-4 sm:p-4">
              <div className="relative shrink-0">
                <span className="ai-live-dot absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-mint" />
                <img
                  src={logoMark}
                  alt=""
                  className="size-10 rounded-full bg-ink p-1.5 object-contain sm:size-12"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex h-5 items-center rounded-full bg-teal/10 px-2 font-display text-[0.65rem] font-semibold uppercase text-teal">
                    Noor legt uit
                  </span>
                  <span className="font-display text-[0.65rem] font-semibold uppercase text-muted-foreground">
                    Stap {step + 1} van {totalSteps}
                  </span>
                </div>
                <h3 className="mt-1 font-display text-sm font-semibold sm:text-base">
                  {guideStep.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {guideStep.intro}
                </p>
                <ul className="mt-2 hidden list-disc space-y-0.5 pl-4 text-xs text-muted-foreground sm:block">
                  {guideStep.lines.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
            <div className="mx-auto w-full max-w-4xl">
              {step === 0 && (
                <div key="s0" className="tool-card-in">
                  <div className="grid gap-7 xl:grid-cols-[1fr_230px] xl:items-start">
                    <div>
                      <span className="inline-flex items-center gap-2 font-display text-xs font-semibold uppercase text-teal"><Compass className="size-4" /> Stap 1 · even voorstellen</span>
                      <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Waar begin je?</h2>
                      <p className="mt-2 text-sm text-muted-foreground">Twee korte keuzes. Daarna gaan we op gevoel verkennen.</p>
                    </div>
                    <div className="studio-soft grid grid-cols-3 gap-2 rounded-2xl p-3 xl:grid-cols-1">
                      {facts.map(({ icon: Icon, label, sub }) => <div key={label} className="flex items-center gap-2 rounded-xl bg-card/70 p-2.5"><Icon className="size-4 shrink-0 text-teal" /><span><strong className="block font-display text-xs">{label}</strong><small className="block text-[0.65rem] text-muted-foreground">{sub}</small></span></div>)}
                    </div>
                  </div>

                  <div className="mt-8 grid max-w-2xl gap-7">
                    <fieldset>
                      <legend className="font-display text-sm font-semibold">Welk niveau zit je?</legend>
                      <div className="mt-3 grid grid-cols-2 gap-3">
                        {(["havo", "vwo"] as const).map((l) => (
                          <Button key={l} type="button" variant="outline" onClick={() => setLevel(l)} aria-pressed={level === l} className={`studio-choice h-16 justify-start rounded-xl px-4 text-left font-display text-base uppercase ${level === l ? "border-coral bg-coral/10 ring-2 ring-coral/15" : "bg-card"}`}>
                            <School className={level === l ? "text-coral" : "text-teal"} /> {l}
                            <span className={`ml-auto grid size-5 place-items-center rounded-full border ${level === l ? "border-coral bg-coral text-primary-foreground" : "border-border text-transparent"}`}><Check className="size-3" /></span>
                          </Button>
                        ))}
                      </div>
                    </fieldset>

                    <fieldset>
                      <legend className="font-display text-sm font-semibold">Waar sta je nu?</legend>
                      <div className="mt-3 space-y-3">
                        {([{ id: "geen-idee" as Stance, title: "Ik heb nog geen idee", body: "Verken breed wat bij je past." }, { id: "twijfel" as Stance, title: "Ik twijfel al tussen een paar", body: "Vergelijk gericht en verdiep." }] as const).map((o) => (
                          <Button key={o.id} type="button" variant="outline" onClick={() => setStance(o.id)} aria-pressed={stance === o.id} className={`studio-choice h-auto w-full justify-start whitespace-normal rounded-xl px-4 py-3 text-left ${stance === o.id ? "border-teal bg-teal/10 ring-2 ring-teal/10" : "bg-card"}`}>
                            <BrainCircuit className={`shrink-0 ${stance === o.id ? "text-teal" : "text-muted-foreground"}`} />
                            <span><strong className="block font-display text-sm">{o.title}</strong><small className="mt-0.5 block text-xs font-normal text-muted-foreground">{o.body}</small></span>
                          </Button>
                        ))}
                      </div>
                    </fieldset>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-border pt-6">
                    <Button type="button" disabled={!level || !stance} onClick={() => setStep(1)} className="h-11 rounded-full bg-coral px-6 text-primary-foreground shadow-lift hover:bg-coral/90">Beginnen <ArrowRight /></Button>
                    <p className="max-w-sm text-xs leading-relaxed text-muted-foreground"><strong className="text-foreground">Geen account, niets wordt opgeslagen.</strong> Sluit je dit, dan is alles weg.</p>
                  </div>
                </div>
              )}

              {step === 1 && currentCard && (
                <div key={`card-${index}`} className="tool-card-in">
                  <div className="flex items-end justify-between gap-5">
                    <div><span className="inline-flex items-center gap-2 font-display text-xs font-semibold uppercase text-teal"><Waves className="size-4" /> Stap 2 · op gevoel</span><h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Wat spreekt je aan?</h2><p className="mt-2 text-sm text-muted-foreground">Activiteiten, geen studienamen. Er is geen fout antwoord.</p></div>
                    <p className="shrink-0 font-display text-sm font-semibold"><span className="text-coral">{index + 1}</span> / {cards.length}</p>
                  </div>
                  <div className="relative mx-auto mt-8 max-w-2xl pb-4">
                    <div aria-hidden="true" className="absolute inset-x-8 inset-y-0 translate-y-4 rounded-3xl border border-border bg-secondary/50" />
                    <div aria-hidden="true" className="absolute inset-x-4 inset-y-0 translate-y-2 rounded-3xl border border-border bg-secondary" />
                    <article className="relative min-h-72 overflow-hidden rounded-3xl bg-ink p-7 text-ink-foreground shadow-panel sm:p-10">
                      <div aria-hidden="true" className="absolute -right-16 -top-20 size-64 rounded-full bg-coral/20 blur-3xl" />
                      <div aria-hidden="true" className="absolute -bottom-24 -left-16 size-64 rounded-full bg-teal/20 blur-3xl" />
                      <div className="relative flex min-h-52 flex-col justify-between">
                        <span className="w-fit rounded-full border border-sun/35 bg-sun/15 px-3 py-1 font-display text-xs font-semibold text-sun">Activiteit {index + 1}</span>
                        <p className="my-7 font-display text-2xl font-semibold leading-snug sm:text-3xl">{currentCard.text}</p>
                        <p className="text-xs font-semibold uppercase text-mint">{currentCard.hint}</p>
                      </div>
                    </article>
                  </div>
                  <div className="mx-auto mt-6 grid max-w-2xl grid-cols-2 gap-3">
                    <Button type="button" variant="outline" onClick={() => swipe(false)} className="studio-choice h-14 rounded-xl text-sm"><X /> Niks voor mij</Button>
                    <Button type="button" onClick={() => swipe(true)} className="studio-choice h-14 rounded-xl bg-coral text-primary-foreground shadow-lift hover:bg-coral/90"><Check /> Dit trekt me</Button>
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <Button type="button" variant="ghost" onClick={() => (index === 0 ? setStep(0) : setIndex((i) => i - 1))} className="text-muted-foreground"><ArrowLeft /> Terug</Button>
                    <div className="flex gap-1.5" aria-label={`Kaart ${index + 1} van ${cards.length}`}>{cards.map((c, i) => <span key={c.text} className={`h-1.5 rounded-full ${i === index ? "w-7 bg-coral" : i < index ? "w-2 bg-teal" : "w-2 bg-border"}`} />)}</div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="tool-card-in mx-auto max-w-2xl">
                  <span className="inline-flex items-center gap-2 font-display text-xs font-semibold uppercase text-teal"><PenLine className="size-4" /> Stap 3 · even doorvragen</span>
                  <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Wat zit hierachter?</h2>
                  <Message from="assistant" className="mt-7 max-w-full">
                    <MessageContent className="studio-soft w-full rounded-2xl p-5 text-base leading-relaxed">
                      <MessageResponse>{ranking[0] ? `Je koos vooral richting ${(domainLabels[ranking[0][0]] ?? "").toLowerCase()}. Wat trok je daarin?` : "Je liet bijna alles liggen. Wat maakte dat niets klikte?"}</MessageResponse>
                    </MessageContent>
                  </Message>
                  <PromptInput onSubmit={({ text }) => { setNote(text); setStep(3); }} className="mt-5 overflow-hidden rounded-2xl border-border bg-card shadow-panel">
                    <PromptInputTextarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Typ in je eigen woorden — één of twee zinnen is genoeg." className="min-h-32 px-4 text-sm" />
                    <PromptInputFooter className="justify-between px-3 pb-3">
                      <span className="text-xs text-muted-foreground">Noor gebruikt dit alleen voor je uitleg.</span>
                      <PromptInputSubmit disabled={!note.trim()} className="bg-coral text-primary-foreground hover:bg-coral/90" />
                    </PromptInputFooter>
                  </PromptInput>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <Button type="button" variant="ghost" onClick={() => setStep(1)} className="text-muted-foreground"><ArrowLeft /> Terug</Button>
                    <Button type="button" variant="outline" onClick={() => setStep(3)} className="rounded-full">Overslaan</Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="tool-card-in">
                  <div className="flex flex-wrap items-start justify-between gap-5">
                    <div><span className="inline-flex items-center gap-2 font-display text-xs font-semibold uppercase text-teal"><GraduationCap className="size-4" /> Stap 4 · jouw richting</span><h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Dit past bij je</h2><p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">Op basis van je swipes{level ? ` en je ${level}-niveau` : ""} — met uitleg waarom, en hoe de studie er écht uitziet.</p></div>
                    {ranking[0] && <div className="studio-soft rounded-2xl px-4 py-3"><small className="text-muted-foreground">Sterkste richting</small><strong className="mt-0.5 block font-display text-sm text-teal">{domainLabels[ranking[0][0]]}</strong></div>}
                  </div>
                  {ranking.length > 0 && <div className="studio-soft mt-7 grid gap-5 rounded-2xl p-5 sm:grid-cols-3">{ranking.slice(0, 3).map(([d, n]) => <div key={d}><div className="flex justify-between gap-2 font-display text-xs font-semibold"><span>{domainLabels[d]}</span><span>{n}x</span></div><span className="mt-2.5 block h-3 overflow-hidden rounded-full bg-card"><span className="block h-full rounded-full bg-gradient-to-r from-teal to-coral" style={{ width: `${Math.round((n / (ranking[0]?.[1] ?? 1)) * 100)}%` }} /></span></div>)}</div>}
                  <div className="mt-7 grid gap-4 xl:grid-cols-2">
                    {matches.map((s, i) => <Reveal key={s.name} delay={i * 70} hover="lift" className="studio-panel relative overflow-hidden rounded-2xl p-5"><span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-coral to-sun" /><div className="flex items-start justify-between gap-4"><div className="flex items-center gap-3"><span className="grid size-8 shrink-0 place-items-center rounded-full bg-coral font-display text-xs font-bold text-primary-foreground">{i + 1}</span><h3 className="font-display text-lg font-semibold">{s.name}</h3></div><span className="rounded-full bg-secondary px-2.5 py-1 text-[0.65rem] font-semibold uppercase">{s.type}</span></div><div className="mt-4 grid gap-3"><p className="rounded-xl bg-secondary/70 p-3 text-sm leading-relaxed text-muted-foreground"><strong className="mb-1 flex items-center gap-1.5 font-display text-xs uppercase text-foreground"><Lightbulb className="size-3.5 text-coral" /> Waarom</strong>{s.why}</p><p className="rounded-xl bg-secondary/70 p-3 text-sm leading-relaxed text-muted-foreground"><strong className="mb-1 flex items-center gap-1.5 font-display text-xs uppercase text-foreground"><Eye className="size-3.5 text-teal" /> Echt zo</strong>{s.reality}</p></div></Reveal>)}
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3 border-t border-border pt-6"><Button type="button" variant="outline" onClick={reset} className="rounded-full"><RotateCcw /> Opnieuw doen</Button><Button asChild className="rounded-full bg-ink text-ink-foreground hover:bg-ink/90"><Link to="/voor-leerlingen"><GraduationCap /> Meer over de aanpak</Link></Button></div>
                </div>
              )}
            </div>
          </div>
          <footer className="flex items-center justify-center gap-2 border-t border-border px-5 py-3 text-center text-[0.7rem] text-muted-foreground"><ShieldCheck className="size-3.5 shrink-0 text-teal" /> Deze verkenning geeft richting, geen definitief advies. Bespreek je uitkomst met je decaan of mentor.</footer>
        </section>
      </div>
    </main>
  );
}
