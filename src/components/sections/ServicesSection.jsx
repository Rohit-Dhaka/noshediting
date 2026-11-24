import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";

import {
  Smartphone,
  Megaphone,
  Palette,
  AudioLines,
  Heart,
  Clapperboard,
  ArrowUpRight,
  Check,
  Clock,
  MonitorPlay,
  ArrowDown,
  ArrowUp,
} from "lucide-react";

import { FaYoutube } from "react-icons/fa";

const SERVICES = [
  {
    id: "01",
    title: "Reels & Shorts",
    category: "SHORT FORM",
    Icon: Smartphone,
    heading: "Stop the scroll.",
    sub: "Make every second count.",
    desc: "Fast-paced edits, strong hooks, captions and transitions that keep people watching till the last frame.",
    points: ["Hook-first editing", "Auto captions & subtitles", "Trending sound sync"],
    format: "9:16 Vertical",
    time: "24–48 hours",
    color: "#2563eb",
    image: "",
  },
  {
    id: "02",
    title: "YouTube Videos",
    category: "LONG FORM",
    Icon: FaYoutube,
    heading: "Stay in the story.",
    sub: "Long form. Zero boring.",
    desc: "Story-driven edits with smooth pacing, b-roll, sound design and thumbnails-ready moments.",
    points: ["Retention-focused pacing", "B-roll & sound design", "Intro and outro packages"],
    format: "16:9 Landscape",
    time: "2–4 days",
    color: "#dc2626",
    image: "",
  },
  {
    id: "03",
    title: "Brand Films",
    category: "BRAND STORY",
    Icon: Clapperboard,
    heading: "Built to be remembered.",
    sub: "Your brand. Your story.",
    desc: "Cinematic brand videos that communicate your identity, values and the people behind the work.",
    points: ["Script & story structure", "Cinematic color look", "Music and voice-over mix"],
    format: "16:9 / 4K",
    time: "3–7 days",
    color: "#7c3aed",
    image: "",
  },
  {
    id: "04",
    title: "Commercial & Ads",
    category: "ADVERTISING",
    Icon: Megaphone,
    heading: "Make them look. Make them click.",
    sub: "Built to convert.",
    desc: "Creative product videos and UGC style ads designed to capture attention and drive action.",
    points: ["UGC style ad edits", "Multiple aspect ratios", "A/B hook variations"],
    format: "Multi format",
    time: "2–3 days",
    color: "#ea580c",
    image: "",
  }
];

const getLink = (title) =>
  `https://wa.me/919253174295?text=${encodeURIComponent(
    `Hello Nosh Infotech, I want to discuss ${title}.`,
  )}`;

const slideVariants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 100 : -100,
    y: 20,
    scale: 0.96,
    filter: "blur(8px)",
  }),
  center: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -100 : 100,
    y: -20,
    scale: 0.96,
    filter: "blur(8px)",
  }),
};

const textVariants = {
  enter: (direction) => ({
    opacity: 0,
    y: direction > 0 ? 45 : -45,
    filter: "blur(8px)",
  }),
  center: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
  exit: (direction) => ({
    opacity: 0,
    y: direction > 0 ? -45 : 45,
    filter: "blur(8px)",
  }),
};

const ServicesSection = () => {
  const sectionRef = useRef(null);

  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const index = Math.min(
      SERVICES.length - 1,
      Math.max(0, Math.floor(value * SERVICES.length)),
    );

    setActive((previous) => {
      if (previous !== index) {
        setDirection(index > previous ? 1 : -1);
        return index;
      }

      return previous;
    });
  });

  const goTo = (index) => {
    if (!sectionRef.current) return;

    setDirection(index > active ? 1 : -1);

    const top =
      sectionRef.current.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: top + index * window.innerHeight + 4,
      behavior: "smooth",
    });
  };

  const nextStep = () => {
    if (active < SERVICES.length - 1) {
      goTo(active + 1);
    }
  };

  const prevStep = () => {
    if (active > 0) {
      goTo(active - 1);
    }
  };

  const service = SERVICES[active];
  const ServiceIcon = service.Icon;

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-[#f5f5f1] text-[#111318]"
      style={{ height: `${SERVICES.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ================= PROGRESS LINE ================= */}
        <motion.div
          style={{ scaleX: scrollYProgress }}
          className="absolute left-0 top-0 z-50 h-[3px] w-full origin-left bg-black"
        />

        {/* ================= DYNAMIC BACKGROUND ================= */}
        <AnimatePresence mode="sync">
          <motion.div
            key={service.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(circle at 80% 20%, ${service.color}16, transparent 40%)`,
            }}
          />
        </AnimatePresence>

        {/* Ambient lights */}
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-200/30 blur-[130px]" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-violet-200/25 blur-[120px]" />

      

        {/* ================= MAIN CONTENT ================= */}
        <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col px-4 pb-5 pt-20 sm:px-6 sm:pt-24 lg:px-12 lg:pb-8 lg:pt-28">


          {/* ================= BODY ================= */}
          <div className="mt-4 grid min-h-0 flex-1 items-center gap-5 lg:mt-0 lg:grid-cols-[1fr_1.05fr] lg:gap-16">

            {/* ================= LEFT: CONTENT ================= */}
            <div className="order-2 min-h-0 lg:order-1">

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={service.id}
                  custom={direction}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {/* Category */}
                  <div className="flex items-center gap-3">
                    <span
                      className="h-[3px] w-9 rounded-full"
                      style={{ backgroundColor: service.color }}
                    />

                    <span
                      className="font-mono text-[10px] font-bold tracking-[0.2em]"
                      style={{ color: service.color }}
                    >
                      {service.category}
                    </span>
                  </div>

                  {/* Heading */}
                  <h2 className="mt-4 max-w-[650px] font-[Outfit] text-[36px] font-semibold leading-[0.95] tracking-[-0.055em] sm:text-5xl lg:text-[76px]">
                    {service.heading}
                  </h2>

                  {/* Subtitle */}
                  <p
                    className="mt-3 font-serif text-base italic sm:text-xl"
                    style={{ color: service.color }}
                  >
                    {service.sub}
                  </p>

                  {/* Description */}
                  <p className="mt-4 max-w-md text-[13px] leading-6 text-black/55 sm:text-sm sm:leading-7">
                    {service.desc}
                  </p>

                  {/* Features */}
                  <ul className="mt-5 hidden space-y-2.5 sm:block">
                    {service.points.map((point, index) => (
                      <motion.li
                        key={point}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.12 + index * 0.08,
                          duration: 0.35,
                        }}
                        className="flex items-center gap-3 text-sm font-medium text-black/70"
                      >
                        <span
                          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white"
                          style={{ backgroundColor: service.color }}
                        >
                          <Check size={11} strokeWidth={3} />
                        </span>

                        {point}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Tags + CTA */}
                  <div className="mt-5 flex flex-wrap items-center gap-2.5 sm:mt-7">
                    <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3.5 py-2 text-[11px] font-semibold">
                      <MonitorPlay size={13} style={{ color: service.color }} />
                      {service.format}
                    </span>

                    <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3.5 py-2 text-[11px] font-semibold">
                      <Clock size={13} style={{ color: service.color }} />
                      {service.time}
                    </span>

                    <a
                      href={getLink(service.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-white transition-transform hover:-translate-y-0.5"
                      style={{ backgroundColor: service.color }}
                    >
                      Get this service
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* ================= MOBILE STEP NAVIGATION ================= */}
              <div className="mt-6 flex items-center gap-3 lg:hidden">
                <button
                  onClick={prevStep}
                  disabled={active === 0}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white disabled:opacity-30"
                  aria-label="Previous service"
                >
                  <ArrowUp size={15} />
                </button>

                <button
                  onClick={nextStep}
                  disabled={active === SERVICES.length - 1}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white disabled:opacity-30"
                  aria-label="Next service"
                >
                  <ArrowDown size={15} />
                </button>

                <span className="font-mono text-[9px] tracking-[0.15em] text-black/35">
                  SWIPE / SCROLL TO EXPLORE
                </span>
              </div>
            </div>

            {/* ================= RIGHT: ACTIVE VISUAL CARD ================= */}
            <div className="relative order-1 mx-auto h-[35svh] w-full max-w-[340px] sm:h-[40svh] sm:max-w-[420px] lg:order-2 lg:h-[64svh] lg:max-w-[490px]">

              {/* Large background chapter number */}
              <AnimatePresence mode="wait">
                <motion.span
                  key={service.id}
                  initial={{
                    opacity: 0,
                    x: direction > 0 ? 70 : -70,
                  }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{
                    opacity: 0,
                    x: direction > 0 ? -70 : 70,
                  }}
                  transition={{ duration: 0.45 }}
                  className="pointer-events-none absolute -bottom-12 -right-3 select-none font-[Outfit] text-[160px] font-black leading-none tracking-[-0.09em] sm:text-[240px] lg:-bottom-16 lg:-right-8 lg:text-[350px]"
                  style={{
                    color: "transparent",
                    WebkitTextStroke: `1.5px ${service.color}35`,
                  }}
                >
                  {service.id}
                </motion.span>
              </AnimatePresence>

              {/* Active card transition */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={service.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_35px_90px_-35px_rgba(0,0,0,0.3)]"
                >
                  {/* Image */}
                  <div
                    className="relative flex-1 overflow-hidden"
                    style={{
                      background: `linear-gradient(145deg, ${service.color}22, ${service.color}0a 60%, #ffffff)`,
                    }}
                  >
                    {/* Watermark icon */}
                    <ServiceIcon
                      className="absolute -right-6 -top-6 opacity-[0.12]"
                      size={190}
                      style={{ color: service.color }}
                    />

                    <motion.img
                      key={service.image}
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover"
                      initial={{ scale: 1.12 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/75 via-white/5 to-transparent" />

                    {/* Top category */}
                    <span
                      className="absolute left-4 top-4 rounded-full px-3 py-1.5 font-mono text-[9px] font-semibold tracking-[0.15em] text-white"
                      style={{ backgroundColor: service.color }}
                    >
                      {service.category}
                    </span>

                    {/* Icon */}
                    <span
                      className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md"
                      style={{ color: service.color }}
                    >
                      <ServiceIcon size={17} />
                    </span>

                    {/* Image bottom title */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="font-mono text-[9px] tracking-[0.18em] text-black/70">
                        NOSH INFOTECH / CREATIVE STUDIO
                      </p>

                      <h3 className="mt-1 font-[Outfit] text-2xl font-bold tracking-tight text-black sm:text-3xl">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card footer */}
                  <div className="flex items-center justify-between gap-3 border-t border-black/[0.06] bg-white px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: service.color }}
                      />

                      <span className="font-mono text-[9px] tracking-[0.13em] text-black/70">
                        SERVICE CHAPTER
                      </span>
                    </div>

                    <span
                      className="font-[Outfit] text-2xl font-black tracking-tighter"
                      style={{ color: service.color }}
                    >
                      {service.id}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Card side index */}
              <div className="absolute -right-3 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-1.5 lg:flex">
                {SERVICES.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => goTo(index)}
                    aria-label={`Go to ${item.title}`}
                    className="group relative flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-300"
                    style={{
                      borderColor:
                        active === index ? item.color : "rgba(0,0,0,0.08)",
                      backgroundColor:
                        active === index ? item.color : "rgba(255,255,255,0.7)",
                      transform: active === index ? "scale(1.15)" : "scale(1)",
                    }}
                  >
                    <span
                      className="font-mono text-[8px] font-bold"
                      style={{
                        color: active === index ? "#fff" : "rgba(0,0,0,0.4)",
                      }}
                    >
                      {item.id}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ================= BOTTOM NAVIGATION ================= */}
          <div className="mt-4 flex items-center justify-between gap-4 lg:mt-0">

            {/* Steps */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {SERVICES.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => goTo(index)}
                  aria-label={`Go to ${item.title}`}
                  className="group flex flex-col items-center gap-1.5"
                >
                  <span
                    className={`font-mono text-[9px] transition-colors ${
                      active === index
                        ? "font-bold text-black"
                        : "text-black/30 group-hover:text-black/60"
                    }`}
                  >
                    {item.id}
                  </span>

                  <span
                    className="relative h-[3px] overflow-hidden rounded-full transition-all duration-300"
                    style={{
                      width: active === index ? 38 : 17,
                      backgroundColor: "rgba(0,0,0,0.1)",
                    }}
                  >
                    {active === index && (
                      <motion.span
                        layoutId="serviceActiveBar"
                        className="absolute inset-0 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>

            {/* Scroll indicator */}
            <div className="hidden items-center gap-3 sm:flex">
              <AnimatePresence mode="wait">
                <motion.span
                  key={service.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="font-mono text-[9px] tracking-[0.15em] text-black/35"
                >
                  {active === SERVICES.length - 1
                    ? "LAST CHAPTER"
                    : "NEXT CHAPTER"}
                </motion.span>
              </AnimatePresence>

              {/* Scroll arrows */}
              <div className="flex gap-1.5">
                <button
                  onClick={prevStep}
                  disabled={active === 0}
                  aria-label="Previous service"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-white/70 transition hover:bg-white disabled:opacity-30"
                >
                  <ArrowUp size={13} />
                </button>

                <button
                  onClick={nextStep}
                  disabled={active === SERVICES.length - 1}
                  aria-label="Next service"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-white/70 transition hover:bg-white disabled:opacity-30"
                >
                  <ArrowDown size={13} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;