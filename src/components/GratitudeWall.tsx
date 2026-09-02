import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, PenLine, Send } from "lucide-react";
import Reveal from "./Reveal";

type Note = {
  id: string;
  name: string;
  message: string;
  likes: number;
  liked: boolean;
};

const STORAGE_KEY = "teachers-day-notes";

const SEED_NOTES: Note[] = [
  {
    id: "seed-1",
    name: "Chandrakant Upadhyay",
    message:
      "Thank you for reading our drafts even on weekends. We still don't know how you found the time",
    likes: 2,
    liked: false,
  },
  {
    id: "seed-2",
    name: "Ashok Kanaujia",
    message:
      "You never once made a silly question feel silly. That mattered more than you know.",
    likes: 5,
    liked: false,
  },
  {
    id: "seed-3",
    name: "Swati Yadav",
    message:
      "Every setback came with a plan for the next step before we'd even finished being upset about it.",
    likes: 3,
    liked: false,
  },
   {
    id: "seed-4",
    name: "Md Alijah Hassan",
    message:
      "You taught us to defend our work, not just present it. Still the most useful thing we know.",
    likes: 2,
    liked: false,
  },
   {
    id: "seed-5",
    name: "Tanishka Jaiswal",
    message:
      "Happy Teachers' Day. We got here because you stayed patient longer than we did.",
    likes: 0,
    liked: false,
  },
   {
    id: "seed-6",
    name: "Kashish Sonker",
    message:
      "Happy Teachers' Day, Sir! Thank you for always supporting me, patiently hearing me out, and being a constant source of motivation. Your stories, advice, and career guidance have always helped me grow a little more. I am truly grateful to have you as my mentor.",
    likes: 0,
    liked: false,
  },
  {
    id: "seed-7",
    name: "Varu Jaiswal",
    message:
      "Your feedback was always honest, and always exactly what we needed to hear.",
    likes: 0,
    liked: false,
  },{
    id: "seed-8",
    name: "Surbhi Chauhanr",
    message:
      "Happy Teacher's Day, Sir! 🌸 I feel truly fortunate to have you as my guide. Thank you for always being so supportive, patient, humble, and understanding. Your guidance genuinely means a lot to me. 🙏🏻",
    likes: 0,
    liked: false,
  },{
    id: "seed-9",
    name: "Sudhanshu Pandey",
    message:
      "A very Happy Teachers' Day to you, dear Vineet Sir! 🌷 Sir, I owe a lot to you for giving me this wonderful opportunity to pursue my research under your guidance. Your trust and encouragement mean a great deal to me, and I feel truly fortunate to have you as my mentor. On this special day, I would like to seek your blessings and continued guidance as I embark on this journey. I sincerely hope that I can live up to your expectations and make you proud. Wishing you a very Happy Teachers' Day, Sir! 🙏🌸.",
    likes: 1,
    liked: false,
  },{
    id: "seed-10",
    name: "Atulya Kushwaha",
    message:
      "Happy Teachers Day, Sir! I would like to express my heartfelt gratitude for your kindness, inspiration, and dedication to your students, including myself. I wish you happiness, good health, and great success in every aspect of your life.",
    likes: 0,
    liked: false,
  },{
    id: "seed-11",
    name: "Niyati Upadhyay",
    message:
      "Happy Teacher's Day, Sir! I may disagree with you quite often, but there's no one whose words and guidance I respect more. No matter how many teachers I come across, you'll always be in a league of your own. Truly lucky to have you as my mentor.",
    likes: 0,
    liked: false,
  },
];

const NOTE_TILTS = ["-1.5deg", "1deg", "-0.8deg", "1.6deg"];

const GratitudeWall = () => {
  const [notes, setNotes] = useState<Note[]>(SEED_NOTES);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Note[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setNotes([...parsed, ...SEED_NOTES]);
        }
      }
    } catch {
      // corrupted storage — fall back to seeds
    }
  }, []);

  const saveNotes = useCallback((next: Note[]) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(next.filter((n) => !n.id.startsWith("seed-")))
      );
    } catch {
      // storage unavailable — notes stay in memory only
    }
  }, []);

  const addNote = useCallback(() => {
    if (!message.trim()) {
      setError("Write a few words first ✏️");
      return;
    }
    setError("");
    const note: Note = {
      id: `note-${Date.now()}`,
      name: name.trim() || "Anonymous",
      message: message.trim(),
      likes: 0,
      liked: false,
    };
    setNotes((prev) => {
      const next = [note, ...prev];
      saveNotes(next);
      return next;
    });
    setName("");
    setMessage("");
  }, [message, name, saveNotes]);

  const toggleLike = useCallback(
    (id: string) => {
      setNotes((prev) => {
        const next = prev.map((n) =>
          n.id === id ? { ...n, liked: !n.liked, likes: n.likes + (n.liked ? -1 : 1) } : n
        );
        saveNotes(next);
        return next;
      });
    },
    [saveNotes]
  );

  const noteCount = useMemo(() => notes.length, [notes]);

  return (
    <section id="gratitude" className="relative mx-auto max-w-6xl px-6 py-24">
      <Reveal className="mb-12 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          The Gratitude Wall
        </p>
        <h2 className="font-display text-4xl font-semibold text-cream sm:text-5xl">
          Say it while you can
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          {noteCount} thank-you note{noteCount === 1 ? "" : "s"} and counting. Add yours —
          the words we mean are only worth something when we share them.
        </p>
      </Reveal>

      {/* composer */}
      <Reveal delay={120} className="mb-14">
        <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-card p-6 shadow-xl shadow-black/30">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-primary">
            <PenLine className="h-4 w-4" />
            Write your note
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={220}
            rows={3}
            placeholder="Dear teacher…"
            className="w-full resize-none rounded-2xl border border-input bg-background/60 p-4 text-cream placeholder:text-muted-foreground/60 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={40}
              placeholder="Your name (optional)"
              className="flex-1 rounded-full border border-input bg-background/60 px-5 py-2.5 text-cream placeholder:text-muted-foreground/60 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <button
              onClick={addNote}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 font-semibold text-primary-foreground transition-transform duration-200 hover:scale-[1.03] active:scale-95"
            >
              <Send className="h-4 w-4" />
              Pin it to the wall
            </button>
          </div>
          {error && <p className="mt-3 text-sm text-accent">{error}</p>}
        </div>
      </Reveal>

      {/* notes grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence initial={false}>
          {notes.map((note, i) => (
            <motion.figure
              key={note.id}
              layout
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-3xl border border-border bg-card p-6 shadow-lg shadow-black/20 transition-transform duration-300 hover:-translate-y-1"
              style={{ rotate: NOTE_TILTS[i % NOTE_TILTS.length] }}
            >
              <div className="absolute right-5 top-5 h-3 w-3 rounded-full bg-primary/70 opacity-0 transition-opacity group-hover:opacity-100" />
              <blockquote className="font-display text-lg leading-relaxed text-cream">
                "{note.message}"
              </blockquote>
              <figcaption className="mt-5 flex items-center justify-between">
                <span className="text-sm font-semibold text-muted-foreground">
                  — {note.name}
                </span>
                <button
                  onClick={() => toggleLike(note.id)}
                  aria-label="Like this note"
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-sm text-muted-foreground transition-colors hover:text-accent"
                >
                  <Heart
                    className={`h-4 w-4 ${note.liked ? "fill-accent text-accent" : ""}`}
                    style={note.liked ? { animation: "heart-pop 0.4s ease" } : undefined}
                  />
                  {note.likes}
                </button>
              </figcaption>
            </motion.figure>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GratitudeWall;
