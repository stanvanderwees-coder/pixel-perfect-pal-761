import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/voor-scholen")({
  head: () => ({
    meta: [
      { title: "Voor scholen en decanen — LOB-gesprekken beter voorbereid" },
      {
        name: "description",
        content:
          "Laat leerlingen het LOB-gesprek voorbereiden met een geleide verkenning. De leerling komt binnen met richtingen, twijfels en vragen op tafel.",
      },
      { property: "og:title", content: "Voor scholen en decanen — LOB beter voorbereid" },
      {
        property: "og:description",
        content:
          "Inzetbaar per klas of per leerjaar, aansluitend op de loopbaancompetenties van Kuijpers.",
      },
    ],
  }),
  component: VoorScholen;
});

function VoorScholen() {
  return null;
}
