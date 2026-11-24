import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Play, Pause, ArrowUpRight, Crosshair } from "lucide-react";

const VIDEOS = [
  "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795241083/bhavyasharma1.mov",
  "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795241026/fiza2.mp4",
  "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795241041/saloni2.mp4",
];

const STATS = [
  { value: "150+", label: "VIDEOS EDITED" },
  { value: "50+", label: "CLIENTS" },
  { value: "48h", label: "TURNAROUND" },
];

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
};

/* Cloudinary helpers: smaller file + first-frame poster */
const optimize = (url, width = 500) =>
  url?.includes("/upload/")
    ? url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`)
    : url;

const makePoster = (url, width = 500) =>
  url?.includes("/upload/")
    ? url
        .replace("/upload/", `/upload/so_0,f_auto,q_auto,w_${width}/`)
        .replace(/\.(mp4|mov|webm)$/i, ".jpg")
    : undefined;

/* Highlight keywords */
const Highlight = ({ children }) => (
  <span className="relative inline-block font-semibold text-blue-600">
    {children}
    <motion.span
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="absolute bottom-0 left-0 h-[1px] w-full origin-left bg-blue-600"
    />
  </span>
);

/* Reel video component (lazy loaded) */
const ReelVideo = ({ src, number, label, className = "" }) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false); // stays true after first view

  // Detect when this reel is on screen
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setShouldLoad(true);
      },
      { rootMargin: "200px", threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Play when visible, pause when off screen
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    if (inView) video.play().catch(() => {});
    else video.pause();
  }, [inView, shouldLoad]);

  const toggleVideo = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
      } catch {
        setPlaying(false);
      }
    } else {
      video.pause();
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={`group relative overflow-hidden bg-[#deded9] ${className}`}
    >
      <video
        ref={videoRef}
        src={shouldLoad ? optimize(src) : undefined}
        poster={makePoster(src)}
        muted
        loop
        playsInline
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />

      {/* Top number */}
      <div className="absolute left-2.5 top-2.5 z-10">
        <span className="font-mono text-[9px] tracking-widest text-white [text-shadow:0_1px_5px_rgba(0,0,0,0.6)]">
          {number}
        </span>
      </div>

      {/* Play control */}
      <button
        onClick={toggleVideo}
        aria-label={playing ? "Pause video" : "Play video"}
        className="absolute right-2.5 top-2.5 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-black transition-transform hover:scale-110"
      >
        {playing ? (
          <Pause size={11} />
        ) : (
          <Play size={11} className="ml-0.5" />
        )}
      </button>

      {/* Bottom label */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-2.5 sm:p-3">
        <div className="mb-1 h-px w-6 bg-blue-400" />
        <p className="font-mono text-[8px] leading-4 tracking-[0.12em] text-white [text-shadow:0_1px_5px_rgba(0,0,0,0.7)] sm:text-[9px]">
          {label}
        </p>
      </div>
    </motion.div>
  );
};

const AboutSection = () => {
  return (
    <section
      id="about"
      className="overflow-hidden bg-[#f5f5f2] text-[#171717]"
    >
      <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 sm:py-14 lg:px-14 xl:px-20">

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">

          {/* LEFT SIDE CONTENT */}
          <div className="lg:col-span-5">
            {/* Eyebrow */}
            <motion.div
              {...reveal}
              className="mb-5 flex items-center gap-2"
            >
              <Crosshair size={13} className="text-blue-600" />
              <span className="font-mono text-[9px] tracking-[0.2em] text-black/45">
                CREATIVE STUDIO / 2026
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              {...reveal}
              className="text-[clamp(3.2rem,6.4vw,6.2rem)] font-medium leading-[0.88] tracking-[-0.075em]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              We make
              <br />
              videos feel
              <br />
              <span className="font-normal italic text-blue-600">
                different.
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              {...reveal}
              className="mt-5 max-w-[460px] text-sm leading-7 text-black/55 sm:text-[15px]"
            >
              <Highlight>Nosh Infotech</Highlight> is a creative studio
              turning raw footage into meaningful visuals. Through
              <Highlight> creative editing</Highlight>,{" "}
              <Highlight>visual storytelling</Highlight>, motion and
              <Highlight> color grading</Highlight>, we create content
              that captures attention and makes every second count.
            </motion.p>

            {/* Keywords */}
            <motion.div
              {...reveal}
              className="mt-4 flex flex-wrap gap-2"
            >
              {[
                "VIDEO EDITING",
                "REELS",
                "MOTION",
                "COLOR",
                "STORYTELLING",
              ].map((word) => (
                <span
                  key={word}
                  className="border border-black/10 px-2 py-1 font-mono text-[8px] tracking-[0.12em] text-black/45 transition-colors hover:border-blue-600 hover:text-blue-600"
                >
                  {word}
                </span>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              {...reveal}
              className="mt-6 grid grid-cols-3 border-t border-black/15 pt-4"
            >
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className={
                    i !== 0
                      ? "border-l border-black/15 pl-3 sm:pl-5"
                      : ""
                  }
                >
                  <h3 className="text-2xl font-medium tracking-[-0.06em] sm:text-4xl">
                    {stat.value}
                  </h3>
                  <p className="mt-1.5 font-mono text-[8px] tracking-[0.1em] text-black/40 sm:text-[9px]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT SIDE — PORTRAIT REEL WALL */}
          <motion.div
            {...reveal}
            className="lg:col-span-7"
          >
            {/* Three vertical reel videos */}
            <div className="grid grid-cols-3 items-start gap-2 sm:gap-3">

              {/* Reel 01 */}
              <ReelVideo
                src={VIDEOS[0]}
                number="01"
                label="CINEMATIC"
                className="aspect-[9/16]"
              />

              {/* Reel 02 - shifted down */}
              <ReelVideo
                src={VIDEOS[1]}
                number="02"
                label="CREATIVE"
                className="mt-7 aspect-[9/16] sm:mt-12"
              />

              {/* Reel 03 */}
              <ReelVideo
                src={VIDEOS[2]}
                number="03"
                label="STORYTELLING"
                className="aspect-[9/16]"
              />
            </div>

            {/* Reel wall footer */}
            <div className="mt-3 flex items-center justify-between border-t border-black/15 pt-2.5">
              <div>
                <p
                  className="mt-1 text-base font-medium tracking-tight sm:text-xl"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Every frame has a purpose.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;