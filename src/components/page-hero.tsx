import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children?: ReactNode;
}) {
  return (
    <section className="band-ink">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24">
        <p className="eyebrow text-mint">{eyebrow}</p>
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.08] sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-foreground/75 sm:text-lg">
          {intro}
        </p>
        {children ? <div className="mt-9">{children}</div> : null}
      </div>
    </section>
  );
}
