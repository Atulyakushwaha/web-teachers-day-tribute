import { useCallback, useMemo, useRef } from "react";
import { GraduationCap, Heart, Sparkles } from "lucide-react";

const HERO_IMG = import.meta.env.BASE_URL + "hero.png;

const HEADLINE = ["To", "the", "ones", "who", "teach", "us", "everything."];

type Particle = {
  left: string;
  size: number;
  color: string;
  dur: string;
  delay: string;
  drift: string;
  opacity: number;
};

const PARTICLE_COLORS = ["#F0B429", "#F6EFE3", "#7FD1C1", "#FFD97A"];

const Hero = () => {
  const photoRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        left: `${(i * 3.9 + (i % 7) * 4.3) % 100}%`,
        size: 3 + ((i * 7) % 6),
        color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
        dur: `${11 + ((i * 13) % 10)}s`,
        delay: `${-((i * 17) % 14)}s`,
        drift: `${((i % 5) - 2) * 22}px`,
        opacity: 0.25 + ((i * 11) % 40) / 100,
      })),
    []
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const { innerWidth, innerHeight } = window;
      const dx = (e.clientX / innerWidth - 0.5) * 2;
      const dy = (e.clientY / innerHeight - 0.5) * 2;
      if (photoRef.current) {
        photoRef.current.style.transform = `perspective(900px) rotateY(${dx * 6}deg) rotateX(${-dy * 5}deg)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${dx * -18}px, ${dy * -14}px)`;
      }
    },
    []
  );

  const resetTilt = useCallback(() => {
    if (photoRef.current) photoRef.current.style.transform = "perspective(900px)";
  }, []);

  return (
    <header
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* atmosphere */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-32 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px] animate-glow-pulse" />
        <div className="absolute bottom-0 -left-24 h-96 w-96 rounded-full bg-accent/10 blur-[100px]" />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-[#7FD1C1]/10 blur-[100px]" />
        {/* soft grid texture */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(#F6EFE3 1px, transparent 1px), linear-gradient(90deg, #F6EFE3 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
        {particles.map((p, i) => (
          <span
            key={i}
            className="particle"
            style={
              {
                left: p.left,
                width: p.size,
                height: p.size,
                background: p.color,
                "--p-dur": p.dur,
                "--p-delay": p.delay,
                "--p-x": p.drift,
                "--p-opacity": p.opacity,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pb-24 pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        {/* copy */}
        <div>
          <div
            className="rise-in mb-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm font-semibold tracking-wide text-primary"
            style={{ animationDelay: "100ms" }}
          >
            <Sparkles className="h-4 w-4" />
            Happy Teachers' Day
          </div>

          <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-cream sm:text-6xl lg:text-7xl">
            <span className="word-reveal">
              {HEADLINE.map((word, i) => (
                <span
                  key={i}
                  className={word === "everything." ? "shimmer-text chalk-underline" : ""}
                  style={{ animationDelay: `${350 + i * 120}ms` }}
                >
                  {word}
                  {i < HEADLINE.length - 1 ? "\u00A0" : ""}
                </span>
              ))}
            </span>
          </h1>

          <p
            className="rise-in mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground"
            style={{ animationDelay: "1.2s" }}
          >
            Behind every doctor, engineer, artist and dreamer stands a teacher who
            believed first. Today we celebrate the quiet heroes who light the way.
          </p>

          <div
            className="rise-in mt-9 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "1.4s" }}
          >
            <a
              href="#gratitude"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground shadow-[0_8px_30px_-6px] shadow-primary/50 transition-transform duration-300 hover:scale-[1.04] active:scale-95"
            >
              <Heart className="h-4 w-4 transition-transform duration-300 group-hover:scale-125" />
              Leave a thank-you note
            </a>
            <a
              href="#wisdom"
              className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 font-semibold text-cream transition-colors duration-300 hover:border-primary/50 hover:text-primary"
            >
              <GraduationCap className="h-4 w-4" />
              Words of wisdom
            </a>
          </div>
        </div>

        {/* photo */}
        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div
            ref={glowRef}
            className="absolute -inset-6 rounded-t-full rounded-b-[2.5rem] bg-primary/25 blur-3xl animate-glow-pulse"
            aria-hidden="true"
          />
          <div
            ref={photoRef}
            className="relative rounded-t-full rounded-b-[2rem] border border-primary/30 p-2.5 shadow-2xl shadow-black/60 transition-transform duration-300 ease-out"
            style={{ transform: "perspective(900px)" }}
          >
            <div className="animate-float-y overflow-hidden rounded-t-full rounded-b-[1.6rem]">
              <img
                src={HERO_IMG}
                alt="A teacher in a warm, sunlit classroom"
                className="aspect-[3/4] w-full object-cover"
                loading="eager"
              />
            </div>
            {/* floating badge */}
            <div
              className="absolute -right-5 top-1/4 flex animate-bob items-center gap-2 rounded-2xl border border-primary/30 bg-card/90 px-4 py-2.5 shadow-xl shadow-black/40 backdrop-blur"
              style={{ "--tilt": "3deg" } as React.CSSProperties}
            >
              <Heart className="h-4 w-4 fill-primary text-primary" />
              <span className="text-sm font-semibold text-cream">Thank you!</span>
            </div>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <a
        href="#wisdom"
        aria-label="Scroll to explore"
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"
      >
        <span className="text-xs uppercase tracking-[0.25em]">Scroll</span>
        <span className="flex h-9 w-6 items-start justify-center rounded-full border border-current p-1.5">
          <span
            className="h-2 w-1 rounded-full bg-current"
            style={{ animation: "bounce-dot 1.6s ease-in-out infinite" }}
          />
        </span>
      </a>
    </header>
  );
};

export default Hero;
