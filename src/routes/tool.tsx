import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Brain,
  Briefcase,
  CalendarDays,
  Check,
  CircleHelp,
  ClipboardCopy,
  Clock,
  Cpu,
  Gem,
  GitCompare,
  HeartHandshake,
  Layers,
  Leaf,
  Link2,
  MapPin,
  MessageCircle,
  Palette,
  Send,
  ShieldCheck,
  SkipForward,
  Sparkles as SparkIcon,
  ThumbsDown,
  ThumbsUp,
  TrendingUp,
  X,
  Minus,
} from "lucide-react";
import logoMark from "@/assets/logo-mark.png";

export const Route = createFileRoute("/tool")({
  head: () => ({
    meta: [
      { title: "De StudyFit.AI-tool — ontdek welke studie bij je past" },
      {
        name: "description",
        content:
          "Geen test met een uitslag, maar een gesprek met Noor, je AI-gids. Swipe, praat en ontdek welke hbo- en wo-studies bij je passen. Anoniem en zonder account.",
      },
      { property: "og:title", content: "De StudyFit.AI-tool — ontdek welke studie bij je past" },
      {
        property: "og:description",
        content: "Een begeleide verkenning van ± 8 minuten. Geen account, niets wordt opgeslagen.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ToolPage,
});

/* ------------------------------------------------------------------ */
/* Types & data (prototype — echte gegevens komen later uit de database) */
/* ------------------------------------------------------------------ */

type Level = "havo" | "vwo";
type Stance = "geen-idee" | "twijfel";
type Domain = "mens" | "techniek" | "ondernemen" | "creatief" | "natuur";
type Profile = "NT" | "NG" | "EM" | "CM";
type Reaction = "ja" | "twijfel" | "nee";

type Screen =
  | "welcome"
  | "about"
  | "sit1"
  | "sit2"
  | "prefs"
  | "location"
  | "swipe"
  | "chat"
  | "compiling"
  | "results"
  | "detail"
  | "compare"
  | "overview";

const domainMeta: Record<Domain, { label: string; icon: typeof Brain; tint: string }> = {
  mens: { label: "Mensen & gedrag", icon: HeartHandshake, tint: "var(--coral)" },
  techniek: { label: "Techniek & data", icon: Cpu, tint: "var(--teal)" },
  ondernemen: { label: "Ondernemen & organiseren", icon: Briefcase, tint: "var(--sun)" },
  creatief: { label: "Creatief & vormgeven", icon: Palette, tint: "var(--mint)" },
  natuur: { label: "Natuur & gezondheid", icon: Leaf, tint: "var(--deep)" },
};

const swipeCards: { text: string; domain: Domain }[] = [
  { text: "Uitzoeken waarom een app steeds crasht", domain: "techniek" },
  { text: "Iemand kalmeren die overstuur is", domain: "mens" },
  { text: "Een schoolfeest van begin tot eind regelen", domain: "ondernemen" },
  { text: "Een poster ontwerpen die iedereen opvalt", domain: "creatief" },
  { text: "Onderzoeken wat er in een bodemmonster zit", domain: "natuur" },
  { text: "Een groep uitleggen hoe iets werkt", domain: "mens" },
  { text: "Een patroon vinden in een grote dataset", domain: "techniek" },
  { text: "Een eigen merchandise-lijn verkopen", domain: "ondernemen" },
  { text: "Een korte film monteren", domain: "creatief" },
  { text: "Iemand helpen revalideren na een blessure", domain: "natuur" },
  { text: "Een robotje leren een lijn te volgen", domain: "techniek" },
  { text: "Uitzoeken waarom mensen doen wat ze doen", domain: "mens" },
  { text: "Onderhandelen over een betere prijs", domain: "ondernemen" },
  { text: "Een kamer opnieuw inrichten", domain: "creatief" },
  { text: "Bijhouden hoe planten groeien onder verschillend licht", domain: "natuur" },
  { text: "Een website bouwen voor een vereniging", domain: "techniek" },
  { text: "Een ruzie tussen vrienden helpen oplossen", domain: "mens" },
  { text: "Een begroting maken voor een reis", domain: "ondernemen" },
  { text: "Een liedje of beat maken", domain: "creatief" },
  { text: "Uitleggen hoe het hart werkt", domain: "natuur" },
  { text: "Een slim systeem bedenken voor minder afval", domain: "techniek" },
  { text: "Bijles geven aan een jonger kind", domain: "mens" },
  { text: "Een TikTok-account laten groeien", domain: "ondernemen" },
];

type Study = {
  id: string;
  name: string;
  type: "hbo" | "wo";
  years: number;
  domain: Domain;
  gem?: boolean;
  fixus: boolean;
  fits: Profile[];
  extra: Profile[];
  extraVak: string;
  why: string;
  misconception: string;
  week: [number, number, number];
  careers: { title: string; day: string }[];
  outlook: string;
  institutions: { name: string; city: string; prov: string }[];
};

const studies: Study[] = [
  {
    id: "psy", name: "Psychologie", type: "wo", years: 3, domain: "mens", fixus: false,
    fits: ["NG", "NT", "EM", "CM"], extra: [], extraVak: "wiskunde A",
    why: "Je gaf aan dat je wilt snappen waarom mensen doen wat ze doen.",
    misconception: "Veel scholieren denken dat je vooral gesprekken voert. In werkelijkheid zijn statistiek en onderzoek een groot deel van de studie.",
    week: [40, 15, 45],
    careers: [
      { title: "Onderzoeker gedrag", day: "Je ontwerpt experimenten, verzamelt data en schrijft op wat je vond." },
      { title: "Psycholoog in opleiding (na master)", day: "Intakes, behandelplannen en overleg met collega's." },
    ],
    outlook: "Breed inzetbaar; voor de therapeutische route is na de bachelor een vervolgopleiding nodig.",
    institutions: [{ name: "Universiteit Utrecht", city: "Utrecht", prov: "Utrecht" }, { name: "Rijksuniversiteit Groningen", city: "Groningen", prov: "Groningen" }],
  },
  {
    id: "sw", name: "Social Work", type: "hbo", years: 4, domain: "mens", fixus: false,
    fits: ["NG", "NT", "EM", "CM"], extra: [], extraVak: "",
    why: "Iemand kalmeren en een ruzie oplossen trokken je allebei.",
    misconception: "Het is geen 'lief zijn voor mensen'. Je leert grenzen stellen en werken met wetten en regels.",
    week: [30, 45, 25],
    careers: [
      { title: "Jongerenwerker", day: "Op straat en in het buurthuis contact leggen en activiteiten opzetten." },
      { title: "Schoolmaatschappelijk werker", day: "Gesprekken met leerlingen, ouders en mentoren over wat er speelt." },
    ],
    outlook: "Veel vraag in zorg en welzijn, vaak in parttime- en projectfuncties.",
    institutions: [{ name: "Hogeschool Utrecht", city: "Utrecht", prov: "Utrecht" }, { name: "Hogeschool van Amsterdam", city: "Amsterdam", prov: "Noord-Holland" }],
  },
  {
    id: "ti", name: "HBO-ICT", type: "hbo", years: 4, domain: "techniek", fixus: false,
    fits: ["NT", "NG", "EM"], extra: ["CM"], extraVak: "wiskunde A of B",
    why: "Een crashende app uitzoeken gaf je energie in plaats van frustratie.",
    misconception: "Programmeren is geen urenlang typen. Het grootste deel is uitzoeken waarom iets niet werkt.",
    week: [30, 45, 25],
    careers: [
      { title: "Softwareontwikkelaar", day: "Stand-up met je team, bouwen, testen en samen code nakijken." },
      { title: "Security-specialist", day: "Systemen testen op zwakke plekken en adviseren hoe het veiliger kan." },
    ],
    outlook: "Sterke vraag op de arbeidsmarkt in vrijwel alle sectoren.",
    institutions: [{ name: "Fontys Hogescholen", city: "Eindhoven", prov: "Noord-Brabant" }, { name: "Hogeschool Rotterdam", city: "Rotterdam", prov: "Zuid-Holland" }],
  },
  {
    id: "ds", name: "Data Science", type: "wo", years: 3, domain: "techniek", fixus: false,
    fits: ["NT"], extra: ["NG", "EM"], extraVak: "wiskunde B",
    why: "Patronen vinden in data sprong eruit bij je swipes.",
    misconception: "Het lijkt op 'iets met computers', maar de eerste jaren zijn vooral wiskunde en statistiek.",
    week: [45, 20, 35],
    careers: [
      { title: "Data scientist", day: "Data opschonen, modellen bouwen en uitleggen wat de cijfers betekenen." },
      { title: "Data-analist bij de overheid", day: "Beleidsvragen vertalen naar analyses en rapportages." },
    ],
    outlook: "Veel vraag, vooral voor wie ook goed kan uitleggen wat een analyse betekent.",
    institutions: [{ name: "TU Eindhoven", city: "Eindhoven", prov: "Noord-Brabant" }, { name: "Tilburg University", city: "Tilburg", prov: "Noord-Brabant" }],
  },
  {
    id: "bk", name: "Bedrijfskunde", type: "wo", years: 3, domain: "ondernemen", fixus: false,
    fits: ["EM", "NT", "NG"], extra: ["CM"], extraVak: "wiskunde A",
    why: "Je vond het leuk om dingen te organiseren en te plannen.",
    misconception: "Je wordt niet meteen manager. De studie is breed en je kiest pas laat een richting.",
    week: [45, 20, 35],
    careers: [
      { title: "Consultant", day: "Bij klanten meekijken, analyses maken en adviezen presenteren." },
      { title: "Projectmanager", day: "Planningen bewaken, overleggen en knopen doorhakken." },
    ],
    outlook: "Breed inzetbaar, vaak via traineeships.",
    institutions: [{ name: "Erasmus Universiteit", city: "Rotterdam", prov: "Zuid-Holland" }, { name: "Rijksuniversiteit Groningen", city: "Groningen", prov: "Groningen" }],
  },
  {
    id: "ce", name: "Commerciële Economie", type: "hbo", years: 4, domain: "ondernemen", fixus: false,
    fits: ["EM", "CM", "NG", "NT"], extra: [], extraVak: "",
    why: "Verkopen en een account laten groeien spraken je aan.",
    misconception: "Het is meer dan verkopen: marketingdata en onderzoek zijn een groot deel.",
    week: [30, 40, 30],
    careers: [
      { title: "Marketeer", day: "Campagnes bedenken, resultaten meten en bijsturen." },
      { title: "Accountmanager", day: "Klanten bezoeken, offertes maken en relaties onderhouden." },
    ],
    outlook: "Veel banen, vooral in marketing en sales.",
    institutions: [{ name: "Hanzehogeschool", city: "Groningen", prov: "Groningen" }, { name: "Hogeschool Inholland", city: "Haarlem", prov: "Noord-Holland" }],
  },
  {
    id: "cmd", name: "Communication & Multimedia Design", type: "hbo", years: 4, domain: "creatief", fixus: false,
    fits: ["CM", "EM", "NG", "NT"], extra: [], extraVak: "",
    why: "Een poster ontwerpen en een film monteren kregen allebei een 'ja'.",
    misconception: "Het is geen tekenopleiding. Je ontwerpt vooral digitale producten en test ze met gebruikers.",
    week: [25, 55, 20],
    careers: [
      { title: "UX-designer", day: "Gebruikers interviewen, schetsen, prototypen en testen." },
      { title: "Contentcreator", day: "Video en beeld maken voor merken of organisaties." },
    ],
    outlook: "Goede kansen, portfolio is belangrijker dan je diploma.",
    institutions: [{ name: "Hogeschool van Amsterdam", city: "Amsterdam", prov: "Noord-Holland" }, { name: "Hogeschool Rotterdam", city: "Rotterdam", prov: "Zuid-Holland" }],
  },
  {
    id: "bmw", name: "Biomedische Wetenschappen", type: "wo", years: 3, domain: "natuur", fixus: false,
    fits: ["NG", "NT"], extra: [], extraVak: "scheikunde en biologie",
    why: "Je wilt begrijpen hoe het lichaam werkt, tot op celniveau.",
    misconception: "Het is geen Geneeskunde. Je werkt in het lab aan onderzoek, niet met patiënten.",
    week: [40, 30, 30],
    careers: [
      { title: "Labonderzoeker", day: "Experimenten uitvoeren, resultaten analyseren en bespreken." },
      { title: "Klinisch onderzoeker", day: "Medicijnonderzoek begeleiden en data bewaken." },
    ],
    outlook: "Vaak volgt een master; onderzoek en farmacie bieden kansen.",
    institutions: [{ name: "Radboud Universiteit", city: "Nijmegen", prov: "Gelderland" }, { name: "Universiteit Leiden", city: "Leiden", prov: "Zuid-Holland" }],
  },
  {
    id: "vp", name: "Verpleegkunde", type: "hbo", years: 4, domain: "natuur", fixus: false,
    fits: ["NG", "NT"], extra: ["EM", "CM"], extraVak: "biologie",
    why: "Iemand helpen revalideren gaf je een duidelijk 'ja'.",
    misconception: "Het is geen 'handjes aan het bed' alleen: je coördineert zorg en neemt zelf beslissingen.",
    week: [25, 55, 20],
    careers: [
      { title: "Verpleegkundige in het ziekenhuis", day: "Diensten, overdracht, zorg verlenen en overleg met artsen." },
      { title: "Wijkverpleegkundige", day: "Mensen thuis bezoeken en zorg regelen met familie en huisarts." },
    ],
    outlook: "Grote vraag; vrijwel direct werk na je diploma.",
    institutions: [{ name: "Hogeschool Utrecht", city: "Utrecht", prov: "Utrecht" }, { name: "Saxion", city: "Enschede", prov: "Overijssel" }],
  },
  {
    id: "ct", name: "Creative Technology", type: "wo", years: 3, domain: "techniek", gem: true, fixus: false,
    fits: ["NT"], extra: ["NG"], extraVak: "wiskunde B",
    why: "Je combineert maken en techniek — deze studie zit precies daartussen.",
    misconception: "Minder bekend, maar geen 'hobbyopleiding': je bouwt echte prototypes met elektronica en code.",
    week: [30, 50, 20],
    careers: [
      { title: "Interaction designer", day: "Slimme producten bedenken, bouwen en testen met gebruikers." },
      { title: "Creative developer", day: "Interactieve installaties en apps maken." },
    ],
    outlook: "Nieuw vakgebied met groeiende vraag.",
    institutions: [{ name: "Universiteit Twente", city: "Enschede", prov: "Overijssel" }],
  },
  {
    id: "bnb", name: "Bos- en Natuurbeheer", type: "hbo", years: 4, domain: "natuur", gem: true, fixus: false,
    fits: ["NG", "NT", "EM", "CM"], extra: [], extraVak: "",
    why: "Planten onderzoeken en buiten bezig zijn scoorden hoog.",
    misconception: "Je zit niet de hele dag in het bos: plannen, beleid en overleg met gemeenten horen erbij.",
    week: [30, 45, 25],
    careers: [
      { title: "Boswachter", day: "Terreinen beheren, excursies geven en overleggen met partners." },
      { title: "Ecologisch adviseur", day: "Onderzoek doen voor bouwprojecten en adviezen schrijven." },
    ],
    outlook: "Kleinere sector, maar gezocht bij natuurorganisaties en gemeenten.",
    institutions: [{ name: "Hogeschool Van Hall Larenstein", city: "Velp", prov: "Gelderland" }],
  },
  {
    id: "tp", name: "Toegepaste Psychologie", type: "hbo", years: 4, domain: "mens", gem: true, fixus: false,
    fits: ["NG", "NT", "EM", "CM"], extra: [], extraVak: "",
    why: "Je wilt met gedrag werken, maar dan praktisch en met echte opdrachtgevers.",
    misconception: "Het is geen 'Psychologie light': je past kennis direct toe in organisaties.",
    week: [30, 45, 25],
    careers: [
      { title: "HR-adviseur", day: "Gesprekken, trainingen opzetten en teams adviseren." },
      { title: "Gedragsadviseur", day: "Campagnes ontwerpen die gedrag echt veranderen." },
    ],
    outlook: "Breed inzetbaar in organisaties en overheid.",
    institutions: [{ name: "Fontys Hogescholen", city: "Tilburg", prov: "Noord-Brabant" }],
  },
];

const situationQuestions: { id: string; q: string; options: { label: string; domain: Domain }[] }[] = [
  {
    id: "sit1",
    q: "Denk aan een moment dat de tijd voorbijvloog. Waar was je mee bezig?",
    options: [
      { label: "Met vrienden praten over van alles", domain: "mens" },
      { label: "Iets uitzoeken of in elkaar zetten", domain: "techniek" },
      { label: "Iets maken, tekenen of bewerken", domain: "creatief" },
      { label: "Buiten of met sport bezig", domain: "natuur" },
    ],
  },
  {
    id: "sit2",
    q: "Er moet een klassenuitje geregeld worden. Wat pak jij op?",
    options: [
      { label: "Het budget en de planning", domain: "ondernemen" },
      { label: "Zorgen dat iedereen meedoet", domain: "mens" },
      { label: "De uitnodiging en de sfeer", domain: "creatief" },
      { label: "Ik laat het liever aan anderen", domain: "techniek" },
    ],
  },
];

const chatScript: { q: string; options: string[]; domain: Domain[] }[] = [
  { q: "Wat maakte die swipes voor jou leuk?", options: ["Iets oplossen", "Mensen helpen", "Iets maken", "Weet ik niet"], domain: ["techniek", "mens", "creatief", "ondernemen"] },
  { q: "Werk je liever alleen of samen?", options: ["Liefst alleen", "Samen met een team", "Afwisselend", "Maakt niet uit"], domain: ["techniek", "mens", "ondernemen", "natuur"] },
  { q: "Welk schoolvak voelt het minst als moeten?", options: ["Wiskunde of natuurkunde", "Biologie", "Economie", "Tekenen of CKV"], domain: ["techniek", "natuur", "ondernemen", "creatief"] },
  { q: "Wat doe je als iets niet lukt?", options: ["Doorgaan tot het werkt", "Iemand om hulp vragen", "Iets anders proberen", "Even laten rusten"], domain: ["techniek", "mens", "creatief", "natuur"] },
  { q: "Waar wil je over tien jaar trots op zijn?", options: ["Iets dat ik bouwde", "Mensen die ik hielp", "Een eigen bedrijf", "Iets voor de natuur"], domain: ["techniek", "mens", "ondernemen", "natuur"] },
  { q: "Hoe leer je het liefst iets nieuws?", options: ["Door het te doen", "Door te lezen", "Door uitleg van iemand", "Door te kijken"], domain: ["creatief", "techniek", "mens", "natuur"] },
  { q: "Laatste: wat mag een studie absoluut niet zijn?", options: ["Te veel theorie", "Te weinig contact", "Te saai en vast", "Te onzeker"], domain: ["creatief", "mens", "ondernemen", "natuur"] },
];

const reflections: Record<Domain, string> = {
  techniek: "Ik merk dat je energie krijgt van uitzoeken, maar minder van vaste regels.",
  mens: "Ik merk dat je het beste werkt als er mensen om je heen zijn.",
  ondernemen: "Ik merk dat je graag ziet dat iets echt gaat lopen door jouw plan.",
  creatief: "Ik merk dat je iets wilt maken dat je kunt laten zien.",
  natuur: "Ik merk dat je wilt begrijpen hoe levende dingen werken.",
};

const provinces = ["Drenthe", "Flevoland", "Friesland", "Gelderland", "Groningen", "Limburg", "Noord-Brabant", "Noord-Holland", "Overijssel", "Utrecht", "Zeeland", "Zuid-Holland"];

const detailSections = ["Feiten", "Je week", "Misverstand", "Toelating", "Beroep", "Waar", "Bezoek", "Doorvragen"] as const;
type Section = (typeof detailSections)[number];

const sectionExplain: Record<Section, string> = {
  Feiten: "Hier zie je in één oogopslag wat voor studie dit is: niveau, duur en of er een loting of selectie is.",
  "Je week": "Zo ziet een gewone week eruit. Let vooral op de verhouding tussen colleges, praktijk en zelfstudie.",
  Misverstand: "Dit denken veel scholieren over deze studie — en zo zit het echt. Goed om te weten vóór je kiest.",
  Toelating: "Hier lees je welk profiel je nodig hebt, wat er eventueel ontbreekt en hoe je dat kunt bijspijkeren.",
  Beroep: "Wat doen mensen na deze studie? Klap een beroep open om een werkdag te zien.",
  Waar: "Waar kun je deze studie doen? Per instelling zie je stad, grootte en hoe tevreden studenten zijn.",
  Bezoek: "Open dagen en meeloopdagen zijn de beste manier om te voelen of het klopt.",
  Doorvragen: "Nog iets onduidelijk? Stel hier je vraag. Er is geen domme vraag.",
};

const sectionQuestions: Record<Section, string[]> = {
  Feiten: ["Is dit zwaar?", "Wat is numerus fixus?", "Kan ik switchen?"],
  "Je week": ["Hoeveel uur per week?", "Is er aanwezigheidsplicht?", "Hoe gaan toetsen?"],
  Misverstand: ["Wat valt het meest tegen?", "Waarom stoppen mensen?", "Is het echt zo?"],
  Toelating: ["Hoe haal ik een vak in?", "Telt mijn cijfer mee?", "Kan het met havo?"],
  Beroep: ["Wat verdien je ongeveer?", "Kan ik ook in het buitenland?", "Welke master past?"],
  Waar: ["Wat is het verschil?", "Welke is het kleinst?", "Kan ik op kamers?"],
  Bezoek: ["Wat vraag ik op een open dag?", "Kan ik online kijken?", "Moet ik me aanmelden?"],
  Doorvragen: ["Past dit echt bij mij?", "Wat als ik twijfel?", "Wat is het alternatief?"],
};

const screenMeta: Record<Screen, { step: 1 | 2 | 3 | 4; title: string; intro: string; bullets: string[] }> = {
  welcome: { step: 1, title: "Eerst even voorstellen", intro: "Hoi! Ik ben Noor, je AI-gids. In vier stappen zoeken we samen studies die echt bij je passen.", bullets: ["Kies je niveau: havo of vwo.", "Vertel waar je nu staat met je keuze.", "Geen goed of fout — alles mag."] },
  about: { step: 1, title: "Iets over jou", intro: "Zo weet ik welke studies voor jou open staan.", bullets: ["Kies in welk leerjaar je zit.", "Je profiel is optioneel; meerdere mag.", "Weet je het nog niet? Ook prima."] },
  sit1: { step: 1, title: "Een herkenbaar moment", intro: "Ik vraag niet wat je wilt worden, maar wat je nu al leuk vindt.", bullets: ["Kies wat het meest op jou lijkt.", "Denk niet te lang na.", "Er is geen fout antwoord."] },
  sit2: { step: 1, title: "Nog één situatie", intro: "Hoe je iets aanpakt zegt vaak meer dan een lijstje vakken.", bullets: ["Stel je de situatie echt voor.", "Kies wat je als eerste zou doen.", "Daarna gaan we naar je voorkeuren."] },
  prefs: { step: 1, title: "Wat vind jij belangrijk?", intro: "Twee vragen over hoe je later wilt werken en leven.", bullets: ["Kies wat nu het beste voelt.", "Je kunt later nog van gedachten veranderen.", "Dit helpt me studies te wegen."] },
  location: { step: 1, title: "Waar wil je studeren?", intro: "Deze vraag is optioneel. Je mag hem gewoon overslaan.", bullets: ["Dichtbij, maakt niet uit of juist weg.", "Je provincie helpt afstanden te schatten.", "Niets wordt bewaard."] },
  swipe: { step: 2, title: "Swipen op gevoel", intro: "Je ziet korte activiteiten. Zeg per kaart of het je aanspreekt.", bullets: ["Swipe naar rechts: spreekt me aan.", "Swipe naar links: niks voor mij.", "Je kunt ook de knoppen gebruiken of eerder stoppen."] },
  chat: { step: 3, title: "Even doorpraten", intro: "Ik stel een paar korte vragen op basis van wat je net koos.", bullets: ["Tik een antwoord aan of typ zelf.", "Je mag een vraag overslaan.", "Na 7 vragen maak ik je overzicht."] },
  compiling: { step: 4, title: "Ik zet alles op een rij", intro: "Ik combineer je antwoorden en vergelijk ze met de opleidingen.", bullets: ["Je antwoorden worden verwerkt.", "Richtingen worden gewogen.", "Zo meteen zie je je zes studies."] },
  results: { step: 4, title: "Jouw zes studies", intro: "Dit zijn studies die passen bij wat je vertelde. Bekijk ze rustig.", bullets: ["Tik op een studie voor alle details.", "Geef per studie aan wat je ervan vindt.", "Past iets niet? Dan stel ik bij."] },
  detail: { step: 4, title: "Een studie van dichtbij", intro: "Loop de acht onderdelen door, in je eigen tempo.", bullets: ["Gebruik de chips of vorige/volgende.", "Lees eerst mijn uitleg per onderdeel.", "Stel onderaan je eigen vraag."] },
  compare: { step: 4, title: "Twee studies naast elkaar", intro: "Zo zie je waar twee studies voor jou echt verschillen.", bullets: ["Kies twee studies.", "Vergelijk per onderwerp.", "Lees mijn duiding onderaan."] },
  overview: { step: 4, title: "Jouw overzicht", intro: "Neem dit mee naar je gesprek met je decaan of mentor.", bullets: ["Je profiel en bewaarde studies.", "Een tip over je profielkeuze.", "Concrete volgende stappen."] },
};

const stepNames = ["Voorstellen", "Swipen", "Gesprek", "Resultaten"];
const flow: Screen[] = ["welcome", "about", "sit1", "sit2", "prefs", "location", "swipe", "chat", "compiling", "results"];

/* ------------------------------------------------------------------ */
/* Small UI pieces                                                     */
/* ------------------------------------------------------------------ */

function TypedText({ text }: { text: string }) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(text);
      return;
    }
    setShown("");
    let i = 0;
    const t = window.setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) window.clearInterval(t);
    }, 22);
    return () => window.clearInterval(t);
  }, [text]);
  return (
    <span>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{shown}</span>
      {shown.length < text.length && (
        <span aria-hidden="true" className="guide-caret ml-0.5 inline-block h-[1em] w-0.5 translate-y-0.5 rounded-full bg-t-accent" />
      )}
    </span>
  );
}

function Noor({ size = 48, thinking = false }: { size?: number; thinking?: boolean }) {
  return (
    <span className="noor-ring inline-grid shrink-0 place-items-center rounded-full bg-t-soft" data-thinking={thinking} style={{ width: size, height: size }}>
      <img src={logoMark} alt="" className="h-[80%] w-[80%] object-contain" />
    </span>
  );
}

function ChoiceCard({ selected, onClick, children, sub, icon }: { selected: boolean; onClick: () => void; children: ReactNode; sub?: string; icon?: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`group flex min-h-14 w-full items-center gap-3 rounded-2xl border-2 bg-t-surface p-4 text-left transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-t-accent/40 ${selected ? "border-t-accent shadow-md" : "border-t-line hover:border-t-accent/60 hover:-translate-y-0.5"}`}
    >
      {icon && <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-t-soft text-t-accent">{icon}</span>}
      <span className="min-w-0 flex-1">
        <span className="block font-display text-base font-semibold">{children}</span>
        {sub && <span className="mt-0.5 block text-sm text-t-muted">{sub}</span>}
      </span>
      <span className={`grid size-6 shrink-0 place-items-center rounded-full border-2 ${selected ? "border-t-accent bg-t-accent text-t-primary-fg" : "border-t-line"}`}>
        {selected && <Check className="size-3.5" strokeWidth={3} />}
      </span>
    </button>
  );
}

function PrimaryButton({ children, disabled, onClick }: { children: ReactNode; disabled?: boolean; onClick?: () => void }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-t-primary px-6 font-display font-semibold text-t-primary-fg shadow-md transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-t-accent/40 disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none disabled:hover:translate-y-0"
    >
      {children}
    </button>
  );
}

function GhostButton({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-t-line px-5 font-display font-semibold text-t-text transition hover:border-t-accent focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-t-accent/40">
      {children}
    </button>
  );
}

function Chip({ active, onClick, children }: { active?: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" aria-pressed={active} onClick={onClick} className={`min-h-10 rounded-full border-2 px-4 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-t-accent/40 ${active ? "border-t-accent bg-t-accent text-t-primary-fg" : "border-t-line bg-t-surface text-t-text hover:border-t-accent"}`}>
      {children}
    </button>
  );
}

function Heading({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mb-6">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-t-accent">{eyebrow}</p>
      <h2 className="mt-1 font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {sub && <p className="mt-2 max-w-2xl text-t-muted">{sub}</p>}
    </div>
  );
}

function Source() {
  return (
    <p className="mt-6 flex items-start gap-2 border-t border-t-line pt-3 text-xs text-t-muted">
      <BookOpen className="mt-0.5 size-3.5 shrink-0" aria-hidden />
      Bron: officiële opleidingsdatabase. In dit prototype staan voorbeeldgegevens — controleer altijd via Studiekeuze123 en de instelling.
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

function ToolPage() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [history, setHistory] = useState<Screen[]>([]);
  const [level, setLevel] = useState<Level | null>(null);
  const [stance, setStance] = useState<Stance | null>(null);
  const [grade, setGrade] = useState<number | null>(null);
  const [profiles, setProfiles] = useState<(Profile | "?")[]>([]);
  const [situations, setSituations] = useState<Record<string, Domain>>({});
  const [workLife, setWorkLife] = useState<string | null>(null);
  const [security, setSecurity] = useState<string | null>(null);
  const [distance, setDistance] = useState<string | null>(null);
  const [province, setProvince] = useState("");
  const [swipeIndex, setSwipeIndex] = useState(0);
  const [likes, setLikes] = useState<Domain[]>([]);
  const [chatDomains, setChatDomains] = useState<Domain[]>([]);
  const [reactions, setReactions] = useState<Record<string, Reaction>>({});
  const [rejected, setRejected] = useState<string[]>([]);
  const [adjustNote, setAdjustNote] = useState<string | null>(null);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [thinking, setThinking] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const meta = screenMeta[screen];

  function go(next: Screen) {
    setHistory((h) => [...h, screen]);
    setScreen(next);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function back() {
    setHistory((h) => {
      const prev = h[h.length - 1];
      if (prev) setScreen(prev);
      return h.slice(0, -1);
    });
  }

  const domainScores = useMemo(() => {
    const s: Record<Domain, number> = { mens: 0, techniek: 0, ondernemen: 0, creatief: 0, natuur: 0 };
    likes.forEach((d) => (s[d] += 2));
    Object.values(situations).forEach((d) => (s[d] += 1.5));
    chatDomains.forEach((d) => (s[d] += 1));
    return s;
  }, [likes, situations, chatDomains]);

  const topDomains = useMemo(
    () => (Object.entries(domainScores) as [Domain, number][]).sort((a, b) => b[1] - a[1]),
    [domainScores],
  );

  const results = useMemo(() => {
    const max = Math.max(1, topDomains[0]?.[1] ?? 1);
    const pool = studies
      .filter((s) => !rejected.includes(s.id))
      .filter((s) => (level === "havo" ? s.type === "hbo" : true))
      .map((s) => ({ s, pct: Math.round(58 + (domainScores[s.domain] / max) * 36 - (s.gem ? 4 : 0)) }))
      .sort((a, b) => b.pct - a.pct);
    const regular = pool.filter((p) => !p.s.gem).slice(0, 5);
    const gem = pool.find((p) => p.s.gem);
    return gem ? [...regular, gem] : pool.slice(0, 6);
  }, [domainScores, topDomains, rejected, level]);

  function profileStatus(s: Study): { text: string; tone: "fit" | "extra" | "other" | "unknown" } {
    const chosen = profiles.filter((p): p is Profile => p !== "?");
    if (chosen.length === 0) return { text: "Check welk profiel je nodig hebt", tone: "unknown" };
    if (chosen.some((p) => s.fits.includes(p))) return { text: "Past bij jouw profiel", tone: "fit" };
    if (chosen.some((p) => s.extra.includes(p))) return { text: `Kan met één vak erbij (${s.extraVak})`, tone: "extra" };
    return { text: "Vraagt een ander profiel — bijspijkeren kan", tone: "other" };
  }

  const detailStudy = studies.find((s) => s.id === detailId) ?? null;

  const stepProgress = (() => {
    const idx = flow.indexOf(screen);
    if (screen === "swipe") return (6 + swipeIndex / swipeCards.length) / 9;
    if (idx >= 0) return Math.min(1, idx / 9);
    return 1;
  })();

  return (
    <div className="tool-theme min-h-screen font-sans">
      <div ref={topRef} className="mx-auto grid max-w-[1400px] gap-0 min-[1000px]:grid-cols-[330px_minmax(0,1fr)] min-[1000px]:gap-6 min-[1000px]:p-6">
        {/* ---------------- Guide column ---------------- */}
        <aside className="relative overflow-hidden bg-t-guide px-5 py-5 text-t-guide-fg min-[1000px]:sticky min-[1000px]:top-6 min-[1000px]:h-[calc(100vh-3rem)] min-[1000px]:rounded-[2rem] min-[1000px]:px-7 min-[1000px]:py-8" aria-label="Noor, je AI-gids">
          <div className="flex items-center gap-2">
            <img src={logoMark} alt="" className="size-8" />
            <span className="font-display text-lg font-bold">StudyFit.AI</span>
          </div>
          <div className="mt-4 flex items-center gap-4 min-[1000px]:mt-16 min-[1000px]:flex-col min-[1000px]:text-center">
            <span className="noor-ring grid size-20 shrink-0 place-items-center rounded-full bg-t-guide-fg/10 min-[1000px]:size-48" data-thinking={thinking || screen === "compiling"}>
              <img src={logoMark} alt="Noor, het robotje van StudyFit.AI" className="h-[78%] w-[78%] object-contain" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-t-guide-muted">Noor · jouw AI-gids</p>
              <p className="mt-1 font-display text-xl font-bold leading-tight min-[1000px]:mt-4 min-[1000px]:text-3xl">
                Vind een studie die <em className="not-italic underline decoration-sun decoration-4 underline-offset-4">écht</em> bij je past
              </p>
            </div>
          </div>
          <p className="mt-4 hidden items-center gap-2 text-sm text-t-guide-muted min-[1000px]:absolute min-[1000px]:bottom-8 min-[1000px]:left-7 min-[1000px]:right-7 min-[1000px]:flex">
            <ShieldCheck className="size-4 shrink-0" aria-hidden /> Geen account. Niets wordt opgeslagen.
          </p>
        </aside>

        {/* ---------------- Work column ---------------- */}
        <main className="flex min-h-[calc(100vh-3rem)] min-w-0 flex-col bg-t-surface min-[1000px]:rounded-[2rem] min-[1000px]:border min-[1000px]:border-t-line">
          <header className="flex flex-col gap-3 border-b border-t-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div className="min-w-0">
              <h1 className="font-display text-lg font-bold">Jouw studieverkenning</h1>
              <p className="flex items-center gap-1.5 text-sm text-t-muted"><Clock className="size-3.5" aria-hidden /> Anoniem · ± 8 min tot je resultaten</p>
            </div>
            <ol className="flex items-center gap-1.5" aria-label="Stappen">
              {stepNames.map((n, i) => {
                const s = i + 1;
                const state = s < meta.step ? "done" : s === meta.step ? "now" : "todo";
                return (
                  <li key={n} className="flex items-center gap-1.5" aria-current={state === "now" ? "step" : undefined}>
                    <span className={`grid size-8 place-items-center rounded-full border-2 text-sm font-bold ${state === "now" ? "border-t-accent bg-t-accent text-t-primary-fg" : state === "done" ? "border-t-accent text-t-accent" : "border-t-line text-t-muted"}`}>
                      {state === "done" ? <Check className="size-4" aria-label="klaar" /> : s}
                    </span>
                    <span className={`hidden text-sm font-semibold lg:inline ${state === "todo" ? "text-t-muted" : ""}`}>{n}</span>
                    {i < 3 && <span className="h-0.5 w-3 rounded bg-t-line lg:w-5" aria-hidden />}
                  </li>
                );
              })}
            </ol>
          </header>

          <div className="flex-1 px-5 py-6 sm:px-8">
            {/* Explainer card */}
            <section key={screen} className="tool-enter mb-8 rounded-3xl border-2 border-t-accent/40 bg-t-soft p-5 sm:p-6" aria-live="polite">
              <div className="flex gap-4">
                <Noor size={56} thinking={thinking || screen === "compiling"} />
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-t-accent">Noor legt uit · stap {meta.step} van 4</p>
                  <h3 className="mt-1 font-display text-xl font-bold sm:text-2xl">{meta.title}</h3>
                  <p className="mt-2 min-h-[3em] text-base sm:text-lg"><TypedText text={meta.intro} /></p>
                  <ul className="mt-3 grid gap-1.5 text-sm text-t-muted sm:grid-cols-3 sm:gap-3">
                    {meta.bullets.map((b) => (
                      <li key={b} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-t-accent" aria-hidden />{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <div key={`c-${screen}-${detailId}`} className="tool-enter">
              {screen === "welcome" && (
                <WelcomeScreen level={level} setLevel={setLevel} stance={stance} setStance={setStance} onNext={() => go("about")} />
              )}
              {screen === "about" && (
                <AboutScreen grade={grade} setGrade={setGrade} profiles={profiles} setProfiles={setProfiles} onBack={back} onNext={() => go("sit1")} />
              )}
              {(screen === "sit1" || screen === "sit2") && (
                <SituationScreen
                  key={screen}
                  question={situationQuestions[screen === "sit1" ? 0 : 1]}
                  index={screen === "sit1" ? 1 : 2}
                  value={situations[screen]}
                  onPick={(d) => setSituations((p) => ({ ...p, [screen]: d }))}
                  onBack={back}
                  onNext={() => go(screen === "sit1" ? "sit2" : "prefs")}
                />
              )}
              {screen === "prefs" && (
                <PrefsScreen workLife={workLife} setWorkLife={setWorkLife} security={security} setSecurity={setSecurity} onBack={back} onNext={() => go("location")} />
              )}
              {screen === "location" && (
                <LocationScreen distance={distance} setDistance={setDistance} province={province} setProvince={setProvince} onBack={back} onNext={() => go("swipe")} />
              )}
              {screen === "swipe" && (
                <SwipeScreen
                  index={swipeIndex}
                  onDecide={(keep) => {
                    if (keep) setLikes((l) => [...l, swipeCards[swipeIndex].domain]);
                    if (swipeIndex + 1 >= swipeCards.length) go("chat");
                    else setSwipeIndex((i) => i + 1);
                  }}
                  onStop={() => go("chat")}
                />
              )}
              {screen === "chat" && (
                <ChatScreen
                  topDomain={topDomains[0]?.[0] ?? "mens"}
                  setThinking={setThinking}
                  onAnswer={(d) => d && setChatDomains((c) => [...c, d])}
                  onDone={() => go("compiling")}
                />
              )}
              {screen === "compiling" && <CompilingScreen onDone={() => { setHistory([]); setScreen("results"); }} />}
              {screen === "results" && (
                <ResultsScreen
                  results={results}
                  topDomains={topDomains.slice(0, 2).map(([d]) => d)}
                  reactions={reactions}
                  adjustNote={adjustNote}
                  profileStatus={profileStatus}
                  onReact={(id, r) => setReactions((p) => ({ ...p, [id]: r }))}
                  onReject={(s, reason) => {
                    setRejected((r) => [...r, s.id]);
                    setAdjustNote(`Ik heb ${s.name} weggehaald${reason ? ` (${reason.toLowerCase()})` : ""} en je matches bijgesteld.`);
                  }}
                  onOpen={(id) => { setDetailId(id); go("detail"); }}
                  onCompare={() => go("compare")}
                  onOverview={() => go("overview")}
                />
              )}
              {screen === "detail" && detailStudy && (
                <DetailScreen study={detailStudy} status={profileStatus(detailStudy)} level={level} onBack={back} />
              )}
              {screen === "compare" && <CompareScreen results={results.map((r) => r.s)} onBack={back} profileStatus={profileStatus} />}
              {screen === "overview" && (
                <OverviewScreen
                  level={level}
                  grade={grade}
                  profiles={profiles}
                  topDomains={topDomains.slice(0, 2).map(([d]) => d)}
                  saved={results.filter((r) => reactions[r.s.id] === "ja").map((r) => r.s)}
                  fallback={results.slice(0, 3).map((r) => r.s)}
                  workLife={workLife}
                  security={security}
                  onBack={back}
                />
              )}
            </div>
          </div>

          {/* Bottom progress */}
          <footer className="sticky bottom-0 border-t border-t-line bg-t-surface/95 px-5 py-3 backdrop-blur sm:px-8 min-[1000px]:rounded-b-[2rem]">
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="font-semibold">Stap {meta.step} van 4 · {stepNames[meta.step - 1]}</span>
              <span className="flex items-center gap-1.5 text-t-muted"><ShieldCheck className="size-4" aria-hidden /> Niets wordt opgeslagen</span>
            </div>
            <div className="mt-2 grid grid-cols-4 gap-1.5" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(stepProgress * 100)} aria-label="Voortgang">
              {[0, 1, 2, 3].map((i) => {
                const segStart = [0, 6 / 9, 7 / 9, 8 / 9][i];
                const segEnd = [6 / 9, 7 / 9, 8 / 9, 1][i];
                const fill = Math.max(0, Math.min(1, (stepProgress - segStart) / (segEnd - segStart)));
                return (
                  <span key={i} className="h-3 overflow-hidden rounded-full bg-t-soft ring-1 ring-t-line">
                    <span className="block h-full rounded-full bg-t-accent transition-all duration-500" style={{ width: `${(screen === "results" || meta.step > i + 1 ? 1 : fill) * 100}%` }} />
                  </span>
                );
              })}
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Screens                                                             */
/* ------------------------------------------------------------------ */

function NavRow({ onBack, children }: { onBack?: () => void; children: ReactNode }) {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
      {onBack ? <GhostButton onClick={onBack}><ArrowLeft className="size-4" aria-hidden /> Terug</GhostButton> : <span />}
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

function WelcomeScreen({ level, setLevel, stance, setStance, onNext }: { level: Level | null; setLevel: (l: Level) => void; stance: Stance | null; setStance: (s: Stance) => void; onNext: () => void }) {
  const facts = [
    { icon: Layers, label: "150 studies", sub: "hbo en wo" },
    { icon: Clock, label: "± 8 min", sub: "geen huiswerk" },
    { icon: ShieldCheck, label: "Anoniem", sub: "niets opgeslagen" },
  ];
  return (
    <div>
      <Heading eyebrow="Stap 1 · Welkom" title="Waar begin je?" />
      <div className="grid grid-cols-3 gap-3">
        {facts.map((f) => (
          <div key={f.label} className="rounded-2xl border border-t-line bg-t-bg p-3 sm:p-4">
            <f.icon className="size-5 text-t-accent" aria-hidden />
            <p className="mt-2 font-display font-bold">{f.label}</p>
            <p className="text-sm text-t-muted">{f.sub}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <fieldset>
          <legend className="mb-3 font-display text-lg font-bold">Welk niveau zit je?</legend>
          <div className="grid grid-cols-2 gap-3">
            <ChoiceCard selected={level === "havo"} onClick={() => setLevel("havo")} sub="hbo-studies">HAVO</ChoiceCard>
            <ChoiceCard selected={level === "vwo"} onClick={() => setLevel("vwo")} sub="hbo en wo">VWO</ChoiceCard>
          </div>
        </fieldset>
        <fieldset>
          <legend className="mb-3 font-display text-lg font-bold">Waar sta je nu?</legend>
          <div className="grid gap-3">
            <ChoiceCard selected={stance === "geen-idee"} onClick={() => setStance("geen-idee")} sub="Verken breed">Ik heb nog geen idee</ChoiceCard>
            <ChoiceCard selected={stance === "twijfel"} onClick={() => setStance("twijfel")} sub="Vergelijk gericht">Ik twijfel al tussen een paar</ChoiceCard>
          </div>
        </fieldset>
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <PrimaryButton disabled={!level || !stance} onClick={onNext}>Start de verkenning <ArrowRight className="size-4" aria-hidden /></PrimaryButton>
        <p className="flex items-center gap-1.5 text-sm text-t-muted"><ShieldCheck className="size-4" aria-hidden /> Geen account, niets wordt opgeslagen.</p>
      </div>
    </div>
  );
}

function AboutScreen({ grade, setGrade, profiles, setProfiles, onBack, onNext }: { grade: number | null; setGrade: (g: number) => void; profiles: (Profile | "?")[]; setProfiles: (p: (Profile | "?")[]) => void; onBack: () => void; onNext: () => void }) {
  const opts: { id: Profile | "?"; label: string; sub: string }[] = [
    { id: "NT", label: "NT", sub: "Natuur & Techniek" },
    { id: "NG", label: "NG", sub: "Natuur & Gezondheid" },
    { id: "EM", label: "EM", sub: "Economie & Maatschappij" },
    { id: "CM", label: "CM", sub: "Cultuur & Maatschappij" },
    { id: "?", label: "Weet ik nog niet", sub: "Ook prima" },
  ];
  function toggle(id: Profile | "?") {
    if (id === "?") return setProfiles(profiles.includes("?") ? [] : ["?"]);
    const clean = profiles.filter((p) => p !== "?");
    setProfiles(clean.includes(id) ? clean.filter((p) => p !== id) : [...clean, id]);
  }
  return (
    <div>
      <Heading eyebrow="Stap 1 · Over jou" title="In welk jaar zit je?" />
      <div className="grid grid-cols-4 gap-3">
        {[3, 4, 5, 6].map((g) => (
          <ChoiceCard key={g} selected={grade === g} onClick={() => setGrade(g)}>Jaar {g}</ChoiceCard>
        ))}
      </div>
      <fieldset className="mt-8">
        <legend className="font-display text-lg font-bold">Welk profiel heb je? <span className="text-sm font-normal text-t-muted">(optioneel, meerdere mag)</span></legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {opts.map((o) => (
            <ChoiceCard key={o.id} selected={profiles.includes(o.id)} onClick={() => toggle(o.id)} sub={o.sub}>{o.label}</ChoiceCard>
          ))}
        </div>
      </fieldset>
      <NavRow onBack={onBack}><PrimaryButton disabled={!grade} onClick={onNext}>Verder <ArrowRight className="size-4" aria-hidden /></PrimaryButton></NavRow>
    </div>
  );
}

function SituationScreen({ question, index, value, onPick, onBack, onNext }: { question: (typeof situationQuestions)[number]; index: number; value?: Domain; onPick: (d: Domain) => void; onBack: () => void; onNext: () => void }) {
  return (
    <div>
      <Heading eyebrow={`Stap 1 · Situatie ${index} van 2`} title={question.q} />
      <div className="grid gap-3 sm:grid-cols-2">
        {question.options.map((o) => {
          const Icon = domainMeta[o.domain].icon;
          return (
            <ChoiceCard key={o.label} selected={value === o.domain} onClick={() => onPick(o.domain)} icon={<Icon className="size-5" aria-hidden />}>
              {o.label}
            </ChoiceCard>
          );
        })}
      </div>
      <NavRow onBack={onBack}><PrimaryButton disabled={!value} onClick={onNext}>Verder <ArrowRight className="size-4" aria-hidden /></PrimaryButton></NavRow>
    </div>
  );
}

function PrefsScreen({ workLife, setWorkLife, security, setSecurity, onBack, onNext }: { workLife: string | null; setWorkLife: (s: string) => void; security: string | null; setSecurity: (s: string) => void; onBack: () => void; onNext: () => void }) {
  return (
    <div>
      <Heading eyebrow="Stap 1 · Voorkeuren" title="Hoe wil je later werken?" />
      <fieldset>
        <legend className="mb-3 max-w-2xl font-display text-lg font-bold">Wil je iets waarbij je na werktijd echt vrij bent, of vind je het niet erg als je vak nooit helemaal loslaat?</legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {["Na werktijd echt vrij", "Een beetje mag", "Mijn vak mag mijn leven zijn"].map((o) => (
            <ChoiceCard key={o} selected={workLife === o} onClick={() => setWorkLife(o)}>{o}</ChoiceCard>
          ))}
        </div>
      </fieldset>
      <fieldset className="mt-8">
        <legend className="mb-3 max-w-2xl font-display text-lg font-bold">Wat weegt zwaarder: zekerheid op een baan, of iets doen waar je hart ligt?</legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {["Zekerheid eerst", "Allebei even belangrijk", "Passie eerst"].map((o) => (
            <ChoiceCard key={o} selected={security === o} onClick={() => setSecurity(o)}>{o}</ChoiceCard>
          ))}
        </div>
      </fieldset>
      <NavRow onBack={onBack}><PrimaryButton disabled={!workLife || !security} onClick={onNext}>Verder <ArrowRight className="size-4" aria-hidden /></PrimaryButton></NavRow>
    </div>
  );
}

function LocationScreen({ distance, setDistance, province, setProvince, onBack, onNext }: { distance: string | null; setDistance: (s: string) => void; province: string; setProvince: (s: string) => void; onBack: () => void; onNext: () => void }) {
  const needsProvince = distance === "Dicht bij huis" || distance === "Juist weg";
  return (
    <div>
      <Heading eyebrow="Stap 1 · Locatie (optioneel)" title="Waar wil je studeren?" />
      <div className="grid gap-3 sm:grid-cols-3">
        {["Dicht bij huis", "Maakt niet uit", "Juist weg"].map((o) => (
          <ChoiceCard key={o} selected={distance === o} onClick={() => setDistance(o)} icon={<MapPin className="size-5" aria-hidden />}>{o}</ChoiceCard>
        ))}
      </div>
      {needsProvince && (
        <div className="mt-6 max-w-sm">
          <label htmlFor="prov" className="font-display text-lg font-bold">Uit welke provincie kom je?</label>
          <select id="prov" value={province} onChange={(e) => setProvince(e.target.value)} className="mt-2 min-h-12 w-full rounded-2xl border-2 border-t-line bg-t-surface px-4 text-t-text focus-visible:border-t-accent focus-visible:outline-none">
            <option value="">Kies je provincie</option>
            {provinces.map((p) => <option key={p}>{p}</option>)}
          </select>
        </div>
      )}
      <div className="mt-6 flex max-w-2xl gap-3 rounded-2xl bg-t-bg p-4 text-sm text-t-muted">
        <CircleHelp className="mt-0.5 size-4 shrink-0 text-t-accent" aria-hidden />
        <p><strong className="text-t-text">Waarom vraag ik dit?</strong> Zo kan ik instellingen dichtbij of juist verder weg eerst laten zien. Je antwoord wordt niet bewaard.</p>
      </div>
      <NavRow onBack={onBack}>
        <GhostButton onClick={onNext}><SkipForward className="size-4" aria-hidden /> Overslaan</GhostButton>
        <PrimaryButton disabled={!distance} onClick={onNext}>Naar swipen <ArrowRight className="size-4" aria-hidden /></PrimaryButton>
      </NavRow>
    </div>
  );
}

function SwipeScreen({ index, onDecide, onStop }: { index: number; onDecide: (keep: boolean) => void; onStop: () => void }) {
  const [dx, setDx] = useState(0);
  const [drag, setDrag] = useState(false);
  const start = useRef(0);
  const card = swipeCards[index];
  const next = swipeCards[index + 1];
  const m = domainMeta[card.domain];
  const Icon = m.icon;

  function finish(keep: boolean) {
    setDx(keep ? 600 : -600);
    window.setTimeout(() => { setDx(0); onDecide(keep); }, 180);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") finish(true);
      if (e.key === "ArrowLeft") finish(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const hint = dx > 40 ? "ja" : dx < -40 ? "nee" : null;

  return (
    <div className="mx-auto max-w-md">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-display text-lg font-bold tabular-nums" aria-live="polite">{String(index + 1).padStart(2, "0")} / {swipeCards.length}</p>
        <button type="button" onClick={onStop} className="min-h-10 rounded-full px-3 text-sm font-semibold text-t-accent underline underline-offset-4">Stoppen en verder</button>
      </div>
      <div className="relative h-[380px]">
        {next && (
          <div className="absolute inset-x-4 top-4 bottom-0 rounded-[2rem] border-2 border-t-line bg-t-bg" aria-hidden />
        )}
        <div
          role="group"
          aria-label={`Kaart: ${card.text}`}
          className="swipe-card absolute inset-0 flex cursor-grab select-none flex-col overflow-hidden rounded-[2rem] border-2 border-t-line bg-t-surface shadow-xl active:cursor-grabbing"
          style={{ transform: `translateX(${dx}px) rotate(${dx / 22}deg)`, transition: drag ? "none" : "transform .2s ease-out" }}
          onPointerDown={(e) => { setDrag(true); start.current = e.clientX; (e.target as HTMLElement).setPointerCapture?.(e.pointerId); }}
          onPointerMove={(e) => drag && setDx(e.clientX - start.current)}
          onPointerUp={() => { setDrag(false); if (dx > 110) finish(true); else if (dx < -110) finish(false); else setDx(0); }}
        >
          <div className="grid h-44 place-items-center" style={{ background: `color-mix(in oklab, ${m.tint} 28%, var(--t-surface))` }}>
            <span className="grid size-24 place-items-center rounded-3xl bg-t-surface shadow-md"><Icon className="size-12 text-t-text" aria-hidden /></span>
          </div>
          <div className="flex flex-1 flex-col justify-between p-6">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-t-muted">{m.label}</p>
            <p className="font-display text-2xl font-bold leading-snug">{card.text}</p>
          </div>
          {hint && (
            <span className={`absolute top-5 rounded-full border-2 border-t-text bg-t-surface px-4 py-1.5 font-display font-bold ${hint === "ja" ? "left-5" : "right-5"}`}>
              {hint === "ja" ? "Spreekt me aan" : "Niks voor mij"}
            </span>
          )}
        </div>
      </div>
      <div className="mt-6 flex items-center justify-center gap-10">
        {[{ keep: false, label: "Niks voor mij", icon: ArrowLeft }, { keep: true, label: "Spreekt me aan", icon: ArrowRight }].map((b) => (
          <div key={b.label} className="flex flex-col items-center gap-2">
            <button type="button" onClick={() => finish(b.keep)} aria-label={b.label} className="grid size-16 place-items-center rounded-full border-2 border-t-text bg-t-surface text-t-text transition hover:bg-t-soft focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-t-accent/40">
              <b.icon className="size-6" aria-hidden />
            </button>
            <span className="text-sm font-semibold">{b.label}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-sm text-t-muted">Tip: je kunt ook de pijltjestoetsen gebruiken.</p>
    </div>
  );
}

type ChatMsg = { from: "noor" | "me"; text: string; reflect?: boolean };

function ChatScreen({ topDomain, setThinking, onAnswer, onDone }: { topDomain: Domain; setThinking: (b: boolean) => void; onAnswer: (d?: Domain) => void; onDone: () => void }) {
  const [turn, setTurn] = useState(0);
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [typing, setTyping] = useState(true);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTyping(true);
    setThinking(true);
    const t = window.setTimeout(() => {
      setTyping(false);
      setThinking(false);
      setMsgs((m) => {
        const add: ChatMsg[] = [];
        if (turn === 3 || turn === 6) add.push({ from: "noor", text: reflections[topDomain], reflect: true });
        add.push({ from: "noor", text: chatScript[turn].q });
        return [...m, ...add];
      });
    }, 900);
    return () => window.clearTimeout(t);
  }, [turn, topDomain, setThinking]);

  useEffect(() => { endRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" }); }, [msgs, typing]);
  useEffect(() => () => setThinking(false), [setThinking]);

  function answer(text: string, d?: Domain) {
    setMsgs((m) => [...m, { from: "me", text }]);
    onAnswer(d);
    setInput("");
    if (turn + 1 >= chatScript.length) window.setTimeout(onDone, 500);
    else setTurn((t) => t + 1);
  }

  const current = chatScript[turn];
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-3 flex items-center justify-between text-sm">
        <span className="font-semibold">Vraag {turn + 1} van {chatScript.length}</span>
        <button type="button" onClick={() => answer("(overgeslagen)")} disabled={typing} className="inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 font-semibold text-t-accent underline underline-offset-4 disabled:opacity-45">
          <SkipForward className="size-4" aria-hidden /> Vraag overslaan
        </button>
      </div>
      <div className="max-h-[440px] space-y-4 overflow-y-auto rounded-3xl border border-t-line bg-t-bg p-4 sm:p-6" aria-live="polite">
        {msgs.map((m, i) =>
          m.from === "noor" ? (
            <div key={i} className="flex gap-3">
              <Noor size={36} />
              <p className={`max-w-[85%] pt-1.5 font-display text-lg ${m.reflect ? "rounded-2xl border-l-4 border-t-accent bg-t-soft px-4 py-2 text-base italic" : "font-semibold"}`}>{m.text}</p>
            </div>
          ) : (
            <div key={i} className="flex justify-end">
              <p className="max-w-[80%] rounded-2xl rounded-br-md bg-t-primary px-4 py-2.5 text-t-primary-fg">{m.text}</p>
            </div>
          ),
        )}
        {typing && (
          <div className="flex items-center gap-3">
            <Noor size={36} thinking />
            <span className="flex gap-1 rounded-full bg-t-soft px-4 py-3" aria-label="Noor is aan het typen">
              {[0, 1, 2].map((i) => <span key={i} className="typing-dot size-2 rounded-full bg-t-accent" style={{ animationDelay: `${i * 0.15}s` }} />)}
            </span>
          </div>
        )}
        <div ref={endRef} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {current.options.map((o, i) => (
          <button key={o} type="button" disabled={typing} onClick={() => answer(o, current.domain[i])} className="min-h-12 rounded-2xl border-2 border-t-line bg-t-surface px-3 text-sm font-semibold transition hover:border-t-accent focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-t-accent/40 disabled:opacity-45">
            {o}
          </button>
        ))}
      </div>
      <form className="mt-3 flex gap-2" onSubmit={(e) => { e.preventDefault(); if (input.trim() && !typing) answer(input.trim()); }}>
        <label htmlFor="chat-in" className="sr-only">Typ zelf een antwoord</label>
        <input id="chat-in" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Of typ zelf iets…" className="min-h-12 flex-1 rounded-full border-2 border-t-line bg-t-surface px-5 text-t-text placeholder:text-t-muted focus-visible:border-t-accent focus-visible:outline-none" />
        <button type="submit" aria-label="Verstuur" disabled={!input.trim() || typing} className="grid size-12 shrink-0 place-items-center rounded-full bg-t-primary text-t-primary-fg disabled:opacity-45"><Send className="size-5" aria-hidden /></button>
      </form>
    </div>
  );
}

function CompilingScreen({ onDone }: { onDone: () => void }) {
  const steps = ["Je antwoorden verwerkt", "Richtingen gewogen", "Opleidingen vergeleken", "Je overzicht opstellen"];
  const [done, setDone] = useState(0);
  useEffect(() => {
    if (done >= steps.length) { const t = window.setTimeout(onDone, 600); return () => window.clearTimeout(t); }
    const t = window.setTimeout(() => setDone((d) => d + 1), 750);
    return () => window.clearTimeout(t);
  }, [done, onDone, steps.length]);
  return (
    <div className="mx-auto flex max-w-md flex-col items-center py-6 text-center">
      <Noor size={120} thinking />
      <h2 className="mt-8 font-display text-3xl font-bold">Noor stelt je overzicht op</h2>
      <ul className="mt-6 w-full space-y-3 text-left">
        {steps.map((s, i) => (
          <li key={s} className={`flex items-center gap-3 rounded-2xl border-2 p-4 ${i < done ? "border-t-accent bg-t-soft" : "border-t-line"}`}>
            <span className={`grid size-7 shrink-0 place-items-center rounded-full ${i < done ? "bg-t-accent text-t-primary-fg" : "border-2 border-t-line"}`}>
              {i < done ? <Check className="size-4" strokeWidth={3} aria-hidden /> : null}
            </span>
            <span className={`font-semibold ${i < done ? "" : "text-t-muted"}`}>{s}</span>
            <span className="sr-only">{i < done ? "klaar" : "bezig"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StatusLine({ status }: { status: { text: string; tone: string } }) {
  const Icon = status.tone === "fit" ? Check : status.tone === "extra" ? TrendingUp : status.tone === "other" ? GitCompare : CircleHelp;
  return (
    <p className="flex items-center gap-1.5 text-sm font-semibold"><Icon className="size-4 shrink-0 text-t-accent" aria-hidden />{status.text}</p>
  );
}

function ResultsScreen({ results, topDomains, reactions, adjustNote, profileStatus, onReact, onReject, onOpen, onCompare, onOverview }: {
  results: { s: Study; pct: number }[];
  topDomains: Domain[];
  reactions: Record<string, Reaction>;
  adjustNote: string | null;
  profileStatus: (s: Study) => { text: string; tone: string };
  onReact: (id: string, r: Reaction) => void;
  onReject: (s: Study, reason: string) => void;
  onOpen: (id: string) => void;
  onCompare: () => void;
  onOverview: () => void;
}) {
  const [asking, setAsking] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const reasons = ["Te veel theorie", "Lijkt me saai", "Te lang", "Past niet bij mijn profiel"];
  return (
    <div>
      <Heading eyebrow="Stap 4 · Resultaten" title="Deze zes passen bij jou" />
      <div className="mb-6 flex gap-4 rounded-3xl bg-t-bg p-5">
        <Noor size={44} />
        <p className="text-base">
          Je kreeg de meeste energie van <strong>{domainMeta[topDomains[0]].label.toLowerCase()}</strong>
          {topDomains[1] && <> en <strong>{domainMeta[topDomains[1]].label.toLowerCase()}</strong></>}. Daarom staan deze studies bovenaan. Eén ervan is een minder bekende parel die ook goed past.
        </p>
      </div>
      {adjustNote && (
        <p className="mb-5 flex items-center gap-2 rounded-2xl border-2 border-t-accent px-4 py-3 text-sm font-semibold" role="status"><RotateNote /> {adjustNote}</p>
      )}
      <ol className="grid gap-4 lg:grid-cols-2">
        {results.map(({ s, pct }, i) => {
          const r = reactions[s.id];
          return (
            <li key={s.id} className={`relative flex flex-col rounded-3xl border-2 bg-t-surface p-5 ${s.gem ? "border-t-gem" : "border-t-line"}`}>
              {s.gem && (
                <span className="absolute -top-3 left-5 inline-flex items-center gap-1.5 rounded-full bg-t-gem-bg px-3 py-1 text-xs font-bold text-t-gem ring-1 ring-t-gem"><Gem className="size-3.5" aria-hidden /> Verborgen parel</span>
              )}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-t-muted">#{i + 1}</p>
                  <h3 className="font-display text-2xl font-bold leading-tight">{s.name}</h3>
                  <p className="mt-1 text-sm text-t-muted">{s.type.toUpperCase()} · {s.years} jaar · {domainMeta[s.domain].label}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-display text-3xl font-bold tabular-nums">{pct}%</p>
                  <p className="text-xs text-t-muted">match</p>
                </div>
              </div>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-t-soft ring-1 ring-t-line" aria-hidden><div className="h-full rounded-full bg-t-accent" style={{ width: `${pct}%` }} /></div>
              <p className="mt-4 flex gap-2 text-base"><MessageCircle className="mt-1 size-4 shrink-0 text-t-accent" aria-hidden /><span>{s.why}</span></p>
              <div className="mt-3"><StatusLine status={profileStatus(s)} /></div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-t-line pt-4">
                <div className="flex gap-1.5" role="group" aria-label={`Wat vind je van ${s.name}?`}>
                  {([["ja", "Spreekt me aan", ThumbsUp], ["twijfel", "Twijfel", Minus], ["nee", "Niks voor mij", ThumbsDown]] as const).map(([k, label, Ic]) => (
                    <button key={k} type="button" aria-pressed={r === k} onClick={() => { onReact(s.id, k); setAsking(k === "nee" ? s.id : null); }} className={`inline-flex min-h-10 items-center gap-1.5 rounded-full border-2 px-3 text-xs font-bold transition ${r === k ? "border-t-text bg-t-text text-t-surface" : "border-t-line hover:border-t-text"}`}>
                      <Ic className="size-3.5" aria-hidden />{label}
                    </button>
                  ))}
                </div>
                <button type="button" onClick={() => onOpen(s.id)} className="inline-flex min-h-10 items-center gap-1.5 font-display font-bold text-t-accent">Bekijk studie <ArrowRight className="size-4" aria-hidden /></button>
              </div>

              {asking === s.id && (
                <div className="mt-4 rounded-2xl bg-t-soft p-4">
                  <p className="flex items-center gap-2 font-semibold"><Noor size={28} /> Helder! Wat past er niet?</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {reasons.map((x) => <Chip key={x} active={reason === x} onClick={() => setReason(x)}>{x}</Chip>)}
                  </div>
                  <label htmlFor={`r-${s.id}`} className="sr-only">Andere reden</label>
                  <input id={`r-${s.id}`} placeholder="Of vertel het zelf…" onChange={(e) => setReason(e.target.value)} className="mt-3 min-h-11 w-full rounded-full border-2 border-t-line bg-t-surface px-4 placeholder:text-t-muted focus-visible:border-t-accent focus-visible:outline-none" />
                  <div className="mt-3 flex gap-2">
                    <PrimaryButton onClick={() => { onReject(s, reason); setAsking(null); setReason(""); }}>Pas mijn matches aan</PrimaryButton>
                    <GhostButton onClick={() => setAsking(null)}>Laat staan</GhostButton>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ol>
      <div className="mt-8 flex flex-wrap gap-3">
        <GhostButton onClick={onCompare}><GitCompare className="size-4" aria-hidden /> Vergelijk twee studies</GhostButton>
        <PrimaryButton onClick={onOverview}>Maak mijn overzicht <ArrowRight className="size-4" aria-hidden /></PrimaryButton>
      </div>
    </div>
  );
}

function RotateNote() {
  return <SparkIcon className="size-4 shrink-0 text-t-accent" aria-hidden />;
}

function DetailScreen({ study, status, level, onBack }: { study: Study; status: { text: string; tone: string }; level: Level | null; onBack: () => void }) {
  const [sec, setSec] = useState<Section>("Feiten");
  const [open, setOpen] = useState<number | null>(0);
  const [asked, setAsked] = useState<string[]>([]);
  const [q, setQ] = useState("");
  const idx = detailSections.indexOf(sec);

  function ask(text: string) {
    setAsked((a) => [...a, text]);
    setQ("");
  }

  return (
    <div>
      <button type="button" onClick={onBack} className="mb-4 inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-t-accent"><ArrowLeft className="size-4" aria-hidden /> Terug naar je studies</button>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-t-muted">{study.type.toUpperCase()} · {study.years} jaar · {domainMeta[study.domain].label}</p>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">{study.name}</h2>
        </div>
        <StatusLine status={status} />
      </div>
      <nav className="-mx-1 mb-6 flex gap-2 overflow-x-auto px-1 pb-2" aria-label="Onderdelen van deze studie">
        {detailSections.map((s, i) => (
          <Chip key={s} active={s === sec} onClick={() => { setSec(s); setAsked([]); }}>{i + 1}. {s}</Chip>
        ))}
      </nav>

      <div className="grid gap-5 md:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="h-fit rounded-3xl bg-t-soft p-5">
          <div className="flex items-center gap-2"><Noor size={32} /><p className="font-display font-bold">Wat zie je hier?</p></div>
          <p className="mt-3 text-sm leading-relaxed">{sectionExplain[sec]}</p>
        </aside>

        <section className="min-w-0 rounded-3xl border border-t-line p-5 sm:p-6">
          <h3 className="mb-4 font-display text-xl font-bold">{sec}</h3>
          {sec === "Feiten" && (
            <dl className="grid gap-3 sm:grid-cols-2">
              {[["Soort", `${study.type === "hbo" ? "Hbo-bachelor" : "Wo-bachelor"}`], ["Duur", `${study.years} jaar`], ["Numerus fixus", study.fixus ? "Ja" : "Nee"], ["Toegankelijk met", study.type === "wo" ? "vwo (havo via hbo-propedeuse)" : "havo en vwo"]].map(([k, v]) => (
                <div key={k} className="rounded-2xl bg-t-bg p-4"><dt className="text-sm text-t-muted">{k}</dt><dd className="font-display text-lg font-bold">{v}</dd></div>
              ))}
            </dl>
          )}
          {sec === "Je week" && (
            <div>
              <div className="flex h-10 overflow-hidden rounded-full ring-1 ring-t-line" aria-hidden>
                {study.week.map((w, i) => (
                  <span key={i} className="grid place-items-center text-xs font-bold" style={{ width: `${w}%`, background: ["var(--t-accent)", "var(--sun)", "var(--t-soft)"][i], color: i === 0 ? "var(--t-primary-fg)" : "#0b3a4f" }}>{w}%</span>
                ))}
              </div>
              <ul className="mt-4 grid gap-2 sm:grid-cols-3">
                {["Colleges", "Praktijk & projecten", "Zelfstudie"].map((l, i) => (
                  <li key={l} className="flex items-center gap-2 text-sm">
                    <span className="size-4 rounded ring-1 ring-t-line" style={{ background: ["var(--t-accent)", "var(--sun)", "var(--t-soft)"][i] }} aria-hidden />
                    <span><strong>{l}</strong> · {study.week[i]}%</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {sec === "Misverstand" && (
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border-2 border-dashed border-t-line p-4"><p className="text-xs font-bold uppercase tracking-wider text-t-muted">Wat veel scholieren denken</p><p className="mt-2 font-display text-lg">"Het is vooral {study.domain === "techniek" ? "achter een scherm zitten" : study.domain === "mens" ? "gesprekken voeren" : "doen wat je al leuk vindt"}."</p></div>
              <div className="rounded-2xl bg-t-soft p-4"><p className="text-xs font-bold uppercase tracking-wider text-t-accent">Hoe het echt zit</p><p className="mt-2">{study.misconception}</p></div>
            </div>
          )}
          {sec === "Toelating" && (
            <div className="space-y-3">
              <div className="rounded-2xl bg-t-bg p-4"><p className="text-sm text-t-muted">Past direct bij</p><p className="font-display text-lg font-bold">{study.fits.join(", ")}</p></div>
              {study.extra.length > 0 && <div className="rounded-2xl bg-t-bg p-4"><p className="text-sm text-t-muted">Met {study.extraVak} erbij ook</p><p className="font-display text-lg font-bold">{study.extra.join(", ")}</p></div>}
              <div className="rounded-2xl border-2 border-t-accent/50 p-4"><p className="font-semibold">Bijspijkeren?</p><p className="mt-1 text-sm">Mis je een vak, dan kun je dat vaak inhalen met een deficiëntietoets of zomercursus. {level === "havo" && study.type === "wo" ? "Met havo kom je via een hbo-propedeuse binnen." : ""}</p></div>
            </div>
          )}
          {sec === "Beroep" && (
            <div className="space-y-3">
              {study.careers.map((c, i) => (
                <div key={c.title} className="rounded-2xl border border-t-line">
                  <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)} className="flex min-h-12 w-full items-center justify-between gap-3 px-4 text-left font-display font-bold">
                    {c.title}<ArrowRight className={`size-4 transition ${open === i ? "rotate-90" : ""}`} aria-hidden />
                  </button>
                  {open === i && <p className="px-4 pb-4 text-sm"><strong>Een werkdag:</strong> {c.day}</p>}
                </div>
              ))}
              <p className="flex gap-2 rounded-2xl bg-t-soft p-4 text-sm"><TrendingUp className="mt-0.5 size-4 shrink-0 text-t-accent" aria-hidden /><span><strong>Arbeidsmarkt:</strong> {study.outlook}</span></p>
            </div>
          )}
          {sec === "Waar" && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead><tr className="border-b border-t-line text-t-muted"><th className="py-2 font-semibold">Instelling</th><th className="font-semibold">Plaats</th><th className="font-semibold">Eerstejaars</th><th className="font-semibold">Tevredenheid</th><th className="font-semibold">Fixus</th></tr></thead>
                <tbody>
                  {study.institutions.map((inst, i) => (
                    <tr key={inst.name} className="border-b border-t-line/60">
                      <td className="py-3 font-semibold">{inst.name}</td>
                      <td>{inst.city}<span className="block text-xs text-t-muted">{inst.prov}</span></td>
                      <td className="tabular-nums">± {220 + i * 140}</td>
                      <td className="tabular-nums">{(3.9 - i * 0.1).toFixed(1)} / 5</td>
                      <td>{study.fixus ? "Ja" : "Nee"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {sec === "Bezoek" && (
            <ul className="space-y-3">
              {study.institutions.flatMap((inst, i) => [
                { kind: "Open dag", date: `${8 + i * 7} november`, inst },
                { kind: "Meeloopdag", date: `${15 + i * 5} januari`, inst },
              ]).map((v) => (
                <li key={v.kind + v.inst.name} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-t-line p-4">
                  <div className="flex items-center gap-3"><CalendarDays className="size-5 text-t-accent" aria-hidden /><div><p className="font-display font-bold">{v.kind} · {v.date}</p><p className="text-sm text-t-muted">{v.inst.name}, {v.inst.city}</p></div></div>
                  <a href="https://www.studiekeuze123.nl" target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-1.5 rounded-full border-2 border-t-line px-4 text-sm font-semibold hover:border-t-accent">Aanmelden <Link2 className="size-4" aria-hidden /></a>
                </li>
              ))}
            </ul>
          )}
          {sec === "Doorvragen" && (
            <p className="text-t-muted">Stel hieronder alles wat je nog wilt weten over {study.name}. Noor beantwoordt het met gegevens uit de database.</p>
          )}

          {asked.length > 0 && (
            <div className="mt-5 space-y-2">
              {asked.map((a, i) => (
                <div key={i} className="space-y-2">
                  <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-t-primary px-4 py-2 text-sm text-t-primary-fg">{a}</p>
                  <p className="flex w-fit max-w-[85%] gap-2 rounded-2xl bg-t-soft px-4 py-2 text-sm"><Brain className="mt-0.5 size-4 shrink-0 text-t-accent" aria-hidden />Hier verschijnt Noors antwoord zodra de gids gekoppeld is.</p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 rounded-2xl bg-t-bg p-4">
            <p className="mb-2 text-sm font-semibold">Vraag door over {sec.toLowerCase()}</p>
            <div className="flex flex-wrap gap-2">{sectionQuestions[sec].map((x) => <Chip key={x} onClick={() => ask(x)}>{x}</Chip>)}</div>
            <form className="mt-3 flex gap-2" onSubmit={(e) => { e.preventDefault(); if (q.trim()) ask(q.trim()); }}>
              <label htmlFor="dq" className="sr-only">Stel je eigen vraag</label>
              <input id="dq" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Of typ je eigen vraag…" className="min-h-11 flex-1 rounded-full border-2 border-t-line bg-t-surface px-4 placeholder:text-t-muted focus-visible:border-t-accent focus-visible:outline-none" />
              <button type="submit" aria-label="Verstuur vraag" className="grid size-11 shrink-0 place-items-center rounded-full bg-t-primary text-t-primary-fg"><Send className="size-4" aria-hidden /></button>
            </form>
          </div>
          <Source />
        </section>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <GhostButton onClick={() => idx > 0 && setSec(detailSections[idx - 1])}><ArrowLeft className="size-4" aria-hidden /> Vorige</GhostButton>
        <span className="text-sm font-semibold tabular-nums">{idx + 1} / {detailSections.length}</span>
        {idx < detailSections.length - 1 ? (
          <PrimaryButton onClick={() => setSec(detailSections[idx + 1])}>Volgende <ArrowRight className="size-4" aria-hidden /></PrimaryButton>
        ) : (
          <PrimaryButton onClick={onBack}>Terug naar je studies</PrimaryButton>
        )}
      </div>
    </div>
  );
}

function CompareScreen({ results, onBack, profileStatus }: { results: Study[]; onBack: () => void; profileStatus: (s: Study) => { text: string; tone: string } }) {
  const [a, setA] = useState(results[0]?.id);
  const [b, setB] = useState(results[1]?.id);
  const A = results.find((s) => s.id === a) ?? results[0];
  const B = results.find((s) => s.id === b) ?? results[1];
  if (!A || !B) return null;
  const rows: [string, (s: Study) => ReactNode][] = [
    ["Niveau & duur", (s) => `${s.type.toUpperCase()} · ${s.years} jaar`],
    ["Interessegebied", (s) => domainMeta[s.domain].label],
    ["Je week", (s) => `${s.week[0]}% college · ${s.week[1]}% praktijk · ${s.week[2]}% zelfstudie`],
    ["Toelating", (s) => profileStatus(s).text],
    ["Numerus fixus", (s) => (s.fixus ? "Ja" : "Nee")],
    ["Beroep", (s) => s.careers.map((c) => c.title).join(", ")],
  ];
  const morePractice = A.week[1] === B.week[1] ? null : A.week[1] > B.week[1] ? A : B;
  return (
    <div>
      <button type="button" onClick={onBack} className="mb-4 inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-t-accent"><ArrowLeft className="size-4" aria-hidden /> Terug naar je studies</button>
      <Heading eyebrow="Stap 4 · Vergelijken" title="Twee studies naast elkaar" />
      <div className="grid gap-3 sm:grid-cols-2">
        {[["Studie A", a, setA], ["Studie B", b, setB]].map(([label, val, set]) => (
          <div key={label as string}>
            <label htmlFor={label as string} className="text-sm font-semibold">{label as string}</label>
            <select id={label as string} value={val as string} onChange={(e) => (set as (v: string) => void)(e.target.value)} className="mt-1 min-h-12 w-full rounded-2xl border-2 border-t-line bg-t-surface px-4 font-display font-bold text-t-text focus-visible:border-t-accent focus-visible:outline-none">
              {results.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
        ))}
      </div>
      <div className="mt-6 overflow-hidden rounded-3xl border border-t-line">
        {rows.map(([label, fn], i) => (
          <div key={label} className={`grid gap-2 p-4 sm:grid-cols-[160px_1fr_1fr] sm:gap-4 ${i % 2 ? "bg-t-bg" : ""}`}>
            <p className="text-sm font-bold text-t-muted">{label}</p>
            <p><span className="sr-only">{A.name}: </span>{fn(A)}</p>
            <p><span className="sr-only">{B.name}: </span>{fn(B)}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex gap-4 rounded-3xl bg-t-soft p-5">
        <Noor size={44} />
        <p>
          <strong>Waar ze voor jou uit elkaar lopen:</strong> {A.name} draait om {domainMeta[A.domain].label.toLowerCase()}, {B.name} om {domainMeta[B.domain].label.toLowerCase()}.
          {morePractice && <> {morePractice.name} heeft meer praktijk — handig als je liever doet dan leest.</>} Kijk bij allebei naar de open dag om het verschil te voelen.
        </p>
      </div>
      <Source />
    </div>
  );
}

function OverviewScreen({ level, grade, profiles, topDomains, saved, fallback, workLife, security, onBack }: { level: Level | null; grade: number | null; profiles: (Profile | "?")[]; topDomains: Domain[]; saved: Study[]; fallback: Study[]; workLife: string | null; security: string | null; onBack: () => void }) {
  const [copied, setCopied] = useState<string | null>(null);
  const list = saved.length ? saved : fallback;
  const counts: Record<Profile, number> = { NT: 0, NG: 0, EM: 0, CM: 0 };
  list.forEach((s) => s.fits.forEach((p) => (counts[p] += 1)));
  const bestProfile = (Object.entries(counts) as [Profile, number][]).sort((x, y) => y[1] - x[1])[0][0];
  const text = [
    "Mijn StudyFit.AI-overzicht",
    `Niveau: ${level?.toUpperCase() ?? "-"} · leerjaar ${grade ?? "-"} · profiel ${profiles.length ? profiles.join(", ") : "-"}`,
    `Energie van: ${topDomains.map((d) => domainMeta[d].label).join(" en ")}`,
    `Studies: ${list.map((s) => s.name).join(", ")}`,
    `Tip: ${bestProfile} houdt de meeste van deze opties open.`,
  ].join("\n");
  async function copy(what: "text" | "link") {
    try {
      await navigator.clipboard.writeText(what === "text" ? text : window.location.href);
      setCopied(what === "text" ? "Overzicht gekopieerd" : "Link gekopieerd");
    } catch {
      setCopied("Kopiëren lukte niet");
    }
  }
  return (
    <div>
      <button type="button" onClick={onBack} className="mb-4 inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-t-accent"><ArrowLeft className="size-4" aria-hidden /> Terug naar je studies</button>
      <Heading eyebrow="Stap 4 · Overzicht" title="Neem dit mee naar je decaan" />
      <div className="grid gap-4 lg:grid-cols-3">
        <section className="rounded-3xl border border-t-line p-5">
          <h3 className="font-display text-lg font-bold">Jouw profiel</h3>
          <dl className="mt-3 space-y-2 text-sm">
            {[["Niveau", level?.toUpperCase() ?? "—"], ["Leerjaar", grade ? `Jaar ${grade}` : "—"], ["Profiel", profiles.length ? profiles.map((p) => (p === "?" ? "nog onbekend" : p)).join(", ") : "—"], ["Energie van", topDomains.map((d) => domainMeta[d].label).join(", ")], ["Werk & privé", workLife ?? "—"], ["Zekerheid", security ?? "—"]].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3 border-b border-t-line/60 pb-2"><dt className="text-t-muted">{k}</dt><dd className="text-right font-semibold">{v}</dd></div>
            ))}
          </dl>
        </section>
        <section className="rounded-3xl border border-t-line p-5">
          <h3 className="font-display text-lg font-bold">{saved.length ? "Studies die je bewaarde" : "Je top 3"}</h3>
          <ul className="mt-3 space-y-2">
            {list.map((s) => <li key={s.id} className="rounded-2xl bg-t-bg p-3"><p className="font-display font-bold">{s.name}</p><p className="text-xs text-t-muted">{s.type.toUpperCase()} · {s.years} jaar</p></li>)}
          </ul>
          <div className="mt-4 rounded-2xl border-2 border-t-accent/50 p-3 text-sm"><strong>Profieltip:</strong> met <strong>{bestProfile}</strong> houd je de meeste van deze opties open.</div>
        </section>
        <section className="rounded-3xl bg-t-soft p-5">
          <h3 className="font-display text-lg font-bold">Volgende stappen</h3>
          <ol className="mt-3 space-y-3">
            {[[CalendarDays, "Plan een open dag of meeloopdag"], [ShieldCheck, "Check de toelatingseisen via Studiekeuze123"], [MessageCircle, "Bespreek dit overzicht met je decaan of mentor"]].map(([Ic, t], i) => {
              const I = Ic as typeof Check;
              return <li key={i} className="flex gap-3"><span className="grid size-8 shrink-0 place-items-center rounded-full bg-t-surface text-t-accent"><I className="size-4" aria-hidden /></span><span className="pt-1 text-sm font-semibold">{t as string}</span></li>;
            })}
          </ol>
        </section>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <PrimaryButton onClick={() => copy("text")}><ClipboardCopy className="size-4" aria-hidden /> Kopieer overzicht</PrimaryButton>
        <GhostButton onClick={() => copy("link")}><Link2 className="size-4" aria-hidden /> Deel via link</GhostButton>
        {copied && <p role="status" className="flex items-center gap-1.5 text-sm font-semibold"><Check className="size-4 text-t-accent" aria-hidden />{copied}</p>}
      </div>
      <p className="mt-4 flex items-center gap-1.5 text-sm text-t-muted"><X className="size-4" aria-hidden /> Sluit je dit venster, dan is alles weg — er wordt niets opgeslagen.</p>
    </div>
  );
}
