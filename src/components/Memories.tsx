import Reveal from "./Reveal";

export type MemoryCard = {
  src: string;
  alt: string;
  memory: string;
  tilt: string;
};

const IMG = {
  helpingDesk:
    "https://r2-pub.rork.com/projects/qt9t3r4f6k1tv8d64ege3/assets/1eb4c973-0c7a-4329-a016-ccf8d531b5ee.png",
  celebration:
    "https://r2-pub.rork.com/projects/qt9t3r4f6k1tv8d64ege3/assets/1b07f709-6fdb-4f41-9bd1-dc9722e34bbf.png",
  deskStill:
    "https://r2-pub.rork.com/projects/qt9t3r4f6k1tv8d64ege3/assets/fa29e6cf-a074-4320-8aef-57989a4bed5b.png",
  underTree:
    "https://r2-pub.rork.com/projects/qt9t3r4f6k1tv8d64ege3/assets/82e1b600-ccb8-4e0c-b714-b86f81d1de42.png",
  chalkboard:
    "https://r2-pub.rork.com/projects/qt9t3r4f6k1tv8d64ege3/assets/c45d2be6-4a32-4e6f-848a-09a6485e102b.png",
} as const;

const ROW_ONE: MemoryCard[] = [
  {
    src: IMG.celebration,
    alt: "Students celebrating with their teacher",
    memory: "First day jitters → lifelong friends",
    tilt: "-2deg",
  },
  {
    src: IMG.underTree,
    alt: "A lesson under a tree",
    memory: "That class we took outside",
    tilt: "1.5deg",
  },
  {
    src: IMG.helpingDesk,
    alt: "A teacher helping at a desk",
    memory: "The 40th explanation, same smile",
    tilt: "-1deg",
  },
  {
    src: IMG.deskStill,
    alt: "A teacher's desk still life",
    memory: "Red pens & midnight marking",
    tilt: "2deg",
  },
];

const ROW_TWO: MemoryCard[] = [
  {
    src: IMG.chalkboard,
    alt: "A chalkboard full of notes",
    memory: "Chalk dust on every sleeve",
    tilt: "1.8deg",
  },
  {
    src: IMG.helpingDesk,
    alt: "Guidance at the desk",
    memory: "\"Come back after class\"",
    tilt: "-2deg",
  },
  {
    src: IMG.celebration,
    alt: "A classroom celebration",
    memory: "Our best results ever",
    tilt: "1deg",
  },
  {
    src: IMG.underTree,
    alt: "An outdoor lesson",
    memory: "Questions with no bell to stop them",
    tilt: "-1.5deg",
  },
];

type RowProps = {
  cards: MemoryCard[];
  direction: "marquee-left" | "marquee-right";
  duration: string;
};

const MemoryRow = ({ cards, direction, duration }: RowProps) => (
  <div className="marquee-mask overflow-hidden py-4">
    <div
      className="marquee-track gap-6 pr-6"
      style={
        {
          "--marquee-anim": direction,
          "--marquee-dur": duration,
        } as React.CSSProperties
      }
    >
      {[...cards, ...cards].map((card, i) => (
        <figure
          key={`${card.memory}-${i}`}
          className="polaroid w-64 shrink-0 rounded-xl border border-border bg-card p-3 pb-4 shadow-xl shadow-black/40"
          style={{ rotate: card.tilt }}
          aria-hidden={i >= cards.length ? "true" : undefined}
        >
          <div className="h-40 overflow-hidden rounded-lg">
            <img
              src={card.src}
              alt={i >= cards.length ? "" : card.alt}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <figcaption className="font-display mt-3 text-center text-base italic text-cream/90">
            {card.memory}
          </figcaption>
        </figure>
      ))}
    </div>
  </div>
);

const Memories = () => (
  <section id="memories" className="relative overflow-hidden py-24">
    <div
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
    >
      <div className="absolute left-1/4 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-primary/10 blur-[110px]" />
      <div className="absolute right-1/4 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#7FD1C1]/10 blur-[110px]" />
    </div>

    <Reveal className="mb-10 px-6 text-center">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
        The Memory Roll
      </p>
      <h2 className="font-display text-4xl font-semibold text-cream sm:text-5xl">
        Every year, the same stories
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
        A slow drift through the moments every classroom shares. Hover to pause
        and reminisce.
      </p>
    </Reveal>

    <div className="relative space-y-2">
      <MemoryRow cards={ROW_ONE} direction="marquee-left" duration="52s" />
      <MemoryRow cards={ROW_TWO} direction="marquee-right" duration="58s" />
    </div>
  </section>
);

export default Memories;
