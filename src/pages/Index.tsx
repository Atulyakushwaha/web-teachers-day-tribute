import { BookOpen, Lightbulb, Quote } from "lucide-react";
import Hero from "@/components/Hero";
import Confetti from "@/components/Confetti";
import Reveal from "@/components/Reveal";
import Gallery from "@/components/Gallery";
import Memories from "@/components/Memories";
import GratitudeWall from "@/components/GratitudeWall";

const QUOTES = [
  {
    icon: Lightbulb,
    text: "The mediocre teacher tells. The good teacher explains. The superior teacher demonstrates. The great teacher inspires.",
    author: "William Arthur Ward",
  },
  {
    icon: BookOpen,
    text: "A teacher affects eternity; they can never tell where their influence stops.",
    author: "Henry Adams",
  },
  {
    icon: Quote,
    text: "If you are planning for a year, sow rice. If you are planning for a decade, plant trees. If you are planning for a lifetime, educate people.",
    author: "Chinese proverb",
  },
];

const WHY = [
  {
    title: "Patience, personified",
    text: "They answer the same question the fortieth time with the same warmth as the first.",
  },
  {
    title: "See what we can't",
    text: "They spot the potential hiding behind a shy hand half-raised in the back row.",
  },
  {
    title: "Gift that compounds",
    text: "Knowledge passed on multiplies — every student carries it into a thousand lives they'll never meet.",
  },
];

const WisdomSection = () => (
  <section id="wisdom" className="relative py-24">
    <div
      className="pointer-events-none absolute inset-x-0 top-0 h-px"
      aria-hidden="true"
      style={{
        background:
          "linear-gradient(90deg, transparent, hsl(39 88% 56% / 0.5), transparent)",
      }}
    />
    <div className="mx-auto max-w-6xl px-6">
      <Reveal className="mb-14 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Words of Wisdom
        </p>
        <h2 className="font-display text-4xl font-semibold text-cream sm:text-5xl">
          Why teachers matter
        </h2>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-3">
        {WHY.map((item, i) => (
          <Reveal key={item.title} delay={i * 150}>
            <div className="group h-full rounded-3xl border border-border bg-card/70 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5">
              <span className="font-display text-5xl font-semibold text-primary/25 transition-colors group-hover:text-primary/50">
                0{i + 1}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-cream">
                {item.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{item.text}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-20 grid gap-6 lg:grid-cols-3">
        {QUOTES.map((q, i) => (
          <Reveal key={q.author} delay={i * 150}>
            <blockquote className="relative h-full rounded-3xl border border-primary/15 bg-gradient-to-b from-secondary/60 to-card p-7 transition-transform duration-300 hover:-translate-y-1">
              <q.icon className="mb-4 h-6 w-6 text-primary" />
              <p className="font-display text-lg italic leading-relaxed text-cream/90">
                "{q.text}"
              </p>
              <footer className="mt-5 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                — {q.author}
              </footer>
            </blockquote>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="relative overflow-hidden py-16">
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-primary/10 to-transparent"
      aria-hidden="true"
    />
    <Reveal className="relative mx-auto max-w-3xl px-6 text-center">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm font-semibold text-primary">
        <BookOpen className="h-4 w-4" />
        September 5th
      </div>
      <h2 className="font-display text-4xl font-semibold leading-tight text-cream sm:text-5xl">
        To every teacher, <span className="shimmer-text">past and present</span>
      </h2>
      <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
        The lessons you gave were never just on the syllabus. Thank you for your
        time, your patience, and your belief in us.
      </p>
      <p className="mt-12 text-sm text-muted-foreground/70">
        Made with gratitude · Happy Teachers' Day
      </p>
    </Reveal>
  </footer>
);

const Index = () => (
  <main className="relative min-h-screen bg-background text-foreground">
    <Confetti />
    <Hero />
    <WisdomSection />
    <Gallery />
    <Memories />
    <GratitudeWall />
    <Footer />
  </main>
);

export default Index;
