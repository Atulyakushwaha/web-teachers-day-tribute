import { Camera } from "lucide-react";
import Reveal from "./Reveal";

export type GalleryPhoto = {
  src: string;
  alt: string;
  caption: string;
  span: string;
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
} as const;

const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    src: IMG.helpingDesk,
    alt: "A teacher helping a student at their desk",
    caption: "One more explanation, until it clicks",
    span: "md:row-span-2",
  },
  {
    src: IMG.celebration,
    alt: "Students celebrating around their teacher",
    caption: "The day the whole class cheered",
    span: "",
  },
  {
    src: IMG.deskStill,
    alt: "Books, an apple and glasses on a teacher's desk",
    caption: "Where the magic is planned",
    span: "",
  },
  {
    src: IMG.underTree,
    alt: "A teacher teaching students under a tree",
    caption: "Lessons that never needed a room",
    span: "md:col-span-2",
  },
];

const Gallery = () => (
  <section id="gallery" className="relative mx-auto max-w-6xl px-6 py-24">
    <Reveal className="mb-12 text-center">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
        Moments in Focus
      </p>
      <h2 className="font-display text-4xl font-semibold text-cream sm:text-5xl">
        A gallery of gratitude
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
        Small scenes we all remember — the desk you leaned on, the light through
        the window, the day it finally made sense.
      </p>
    </Reveal>

    <div className="grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
      {GALLERY_PHOTOS.map((photo, i) => (
        <Reveal key={photo.caption} delay={i * 120} className={`${photo.span} h-full`}>
          <figure className="group/gallery relative h-full w-full overflow-hidden rounded-3xl border border-border shadow-lg shadow-black/30">
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="gallery-img h-full w-full object-cover"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 transition-opacity duration-500 group-hover/gallery:opacity-100"
              aria-hidden="true"
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex translate-y-1 items-center gap-2 p-5 text-sm font-semibold text-cream opacity-90 transition-all duration-500 group-hover/gallery:translate-y-0 group-hover/gallery:opacity-100">
              <Camera className="h-4 w-4 shrink-0 text-primary" />
              {photo.caption}
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  </section>
);

export default Gallery;
