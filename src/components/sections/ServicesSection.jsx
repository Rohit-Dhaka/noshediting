
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
  Clapperboard,
  ArrowUpRight,
  Check,
  Clock,
  MonitorPlay,
  ArrowDown,
  ArrowUp,
} from "lucide-react";

import { FaYoutube } from "react-icons/fa";

const BLUE = "#2563eb";

const SERVICES = [
  {
    id: "01",
    title: "Reels & Shorts",
    category: "SHORT FORM",
    Icon: Smartphone,
    heading: "Stop the scroll.",
    sub: "Make every second count.",
    desc: "Fast-paced edits, strong hooks, captions and transitions that keep people watching till the last frame.",
    points: [
      "Hook-first editing",
      "Auto captions & subtitles",
      "Trending sound sync",
    ],
    format: "9:16 Vertical",
    time: "24–48 hours",
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
    points: [
      "Retention-focused pacing",
      "B-roll & sound design",
      "Intro and outro packages",
    ],
    format: "16:9 Landscape",
    time: "2–4 days",
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
    points: [
      "Script & story structure",
      "Cinematic color look",
      "Music and voice-over mix",
    ],
    format: "16:9 / 4K",
    time: "3–7 days",
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
    points: [
      "UGC style ad edits",
      "Multiple aspect ratios",
      "A/B hook variations",
    ],
    format: "Multi format",
    time: "2–3 days",
    image: "",
  },
];

const getLink = (title) =>
  `https://wa.me/919253174295?text=${encodeURIComponent(
    `Hello Nosh Infotech, I want to discuss ${title}.`
  )}`;

const slideVariants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 80 : -80,
    y: 16,
    scale: 0.97,
    filter: "blur(6px)",
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
    x: direction > 0 ? -80 : 80,
    y: -16,
    scale: 0.97,
    filter: "blur(6px)",
  }),
};

const textVariants = {
  enter: (direction) => ({
    opacity: 0,
    y: direction > 0 ? 25 : -25,
    filter: "blur(5px)",
  }),

  center: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },

  exit: (direction) => ({
    opacity: 0,
    y: direction > 0 ? -25 : 25,
    filter: "blur(5px)",
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
      Math.max(0, Math.floor(value * SERVICES.length))
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

    const safeIndex = Math.min(
      SERVICES.length - 1,
      Math.max(0, index)
    );

    setDirection(safeIndex > active ? 1 : -1);

    const sectionTop =
      sectionRef.current.getBoundingClientRect().top +
      window.scrollY;

    const stepHeight =
      sectionRef.current.offsetHeight / SERVICES.length;

    window.scrollTo({
      top: sectionTop + safeIndex * stepHeight + 2,
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
      style={{ height: `${SERVICES.length * 100}svh` }}
    >
      <div className="sticky top-0 h-svh overflow-hidden">

        {/* PROGRESS LINE */}
        <motion.div
          style={{ scaleX: scrollYProgress }}
          className="absolute left-0 top-0 z-50 h-[3px] w-full origin-left bg-blue-600"
        />

        {/* BLUE BACKGROUND GLOW */}
        <AnimatePresence mode="sync">
          <motion.div
            key={service.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(circle at 80% 20%, ${BLUE}16, transparent 42%)`,
            }}
          />
        </AnimatePresence>

        {/* AMBIENT LIGHTS */}
        <div className="pointer-events-none absolute -right-40 -top-40 h-[350px] w-[350px] rounded-full bg-blue-200/30 blur-[100px] sm:h-[500px] sm:w-[500px] sm:blur-[130px]" />

        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[350px] w-[350px] rounded-full bg-blue-300/20 blur-[100px] sm:h-[450px] sm:w-[450px] sm:blur-[120px]" />

        {/* MAIN CONTENT */}
        <div className="relative z-10 mx-auto flex h-full w-full max-w-[1400px] flex-col px-4 pb-3 pt-14 sm:px-6 sm:pb-5 sm:pt-20 lg:px-12 lg:pb-7 lg:pt-24">

          {/* MAIN BODY */}
          <div className="mt-2 grid min-h-0 flex-1 grid-cols-1 items-center gap-3 sm:mt-4 sm:gap-5 lg:mt-0 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 xl:gap-16">

            {/* LEFT CONTENT */}
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
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {/* CATEGORY */}
                  <div className="flex items-center gap-3">
                    <span className="h-[3px] w-7 rounded-full bg-blue-600 sm:w-9" />

                    <span className="font-mono text-[9px] font-bold tracking-[0.18em] text-blue-600 sm:text-[10px] sm:tracking-[0.2em]">
                      {service.category}
                    </span>
                  </div>

                  {/* HEADING */}
                  <h2 className="mt-3 max-w-[650px] font-[Outfit] text-[clamp(2rem,7vw,3rem)] font-semibold leading-[0.98] tracking-[-0.055em] sm:mt-4 sm:text-5xl lg:text-[clamp(3.5rem,5.5vw,5rem)]">
                    {service.heading}
                  </h2>

                  {/* SUBTITLE */}
                  <p className="mt-2 font-serif text-sm italic text-blue-600 sm:mt-3 sm:text-xl">
                    {service.sub}
                  </p>

                  {/* DESCRIPTION */}
                  <p className="mt-2.5 max-w-md text-[12px] leading-[1.65] text-black/65 sm:mt-4 sm:text-sm sm:leading-7">
                    {service.desc}
                  </p>

                  {/* FEATURES */}
                  <ul className="mt-5 hidden space-y-2 sm:block">
                    {service.points.map((point, index) => (
                      <motion.li
                        key={point}
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.1 + index * 0.07,
                          duration: 0.3,
                        }}
                        className="flex items-center gap-3 text-sm font-medium text-black/70"
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                          <Check size={11} strokeWidth={3} />
                        </span>
                        {point}
                      </motion.li>
                    ))}
                  </ul>

                  {/* TAGS + CTA */}
                  <div className="mt-3 flex flex-wrap items-center gap-2 sm:mt-6 sm:gap-2.5">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-white/80 px-2.5 py-2 text-[10px] font-semibold sm:gap-2 sm:px-3.5 sm:text-[11px]">
                      <MonitorPlay size={12} className="text-blue-600" />
                      {service.format}
                    </span>

                    <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-white/80 px-2.5 py-2 text-[10px] font-semibold sm:gap-2 sm:px-3.5 sm:text-[11px]">
                      <Clock size={12} className="text-blue-600" />
                      {service.time}
                    </span>

                    <a
                      href={getLink(service.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-4 py-2.5 text-[10px] font-bold uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5 hover:bg-blue-700 sm:px-5 sm:text-[11px] sm:tracking-wider"
                    >
                      Get this service
                      <ArrowUpRight size={13} />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* MOBILE STEP NAVIGATION */}
              <div className="mt-3 flex items-center gap-3 sm:mt-5 lg:hidden">
                <button
                  onClick={prevStep}
                  disabled={active === 0}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-100 bg-white text-blue-600 transition hover:bg-blue-50 disabled:opacity-30 sm:h-9 sm:w-9"
                  aria-label="Previous service"
                >
                  <ArrowUp size={14} />
                </button>

                <button
                  onClick={nextStep}
                  disabled={active === SERVICES.length - 1}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-100 bg-white text-blue-600 transition hover:bg-blue-50 disabled:opacity-30 sm:h-9 sm:w-9"
                  aria-label="Next service"
                >
                  <ArrowDown size={14} />
                </button>

                <span className="hidden font-mono text-[9px] tracking-[0.15em] text-black/50 sm:block">
                  SWIPE / SCROLL TO EXPLORE
                </span>
              </div>
            </div>

            {/* RIGHT VISUAL CARD */}
            <div className="relative order-1 mx-auto h-[clamp(170px,27svh,270px)] w-full max-w-[290px] sm:h-[38svh] sm:max-h-[380px] sm:max-w-[380px] lg:order-2 lg:h-[62svh] lg:max-h-none lg:max-w-[480px] xl:max-w-[520px]">

              {/* BACKGROUND CHAPTER NUMBER */}
              <AnimatePresence mode="wait">
                <motion.span
                  key={service.id}
                  initial={{
                    opacity: 0,
                    x: direction > 0 ? 50 : -50,
                  }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{
                    opacity: 0,
                    x: direction > 0 ? -50 : 50,
                  }}
                  transition={{ duration: 0.4 }}
                  className="pointer-events-none absolute -bottom-7 -right-2 select-none font-[Outfit] text-[clamp(6rem,28vw,10rem)] font-black leading-none tracking-[-0.09em] sm:-bottom-12 sm:-right-3 sm:text-[240px] lg:-bottom-16 lg:-right-8 lg:text-[350px]"
                  style={{
                    color: "transparent",
                    WebkitTextStroke: `1.5px ${BLUE}35`,
                  }}
                >
                  {service.id}
                </motion.span>
              </AnimatePresence>

              {/* ACTIVE CARD */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={service.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-[0_25px_70px_-30px_rgba(37,99,235,0.22)] sm:rounded-[24px]"
                >
                  {/* IMAGE AREA */}
                  <div
                    className="relative flex-1 overflow-hidden"
                    style={{
                      background: `linear-gradient(145deg, ${BLUE}22, ${BLUE}0a 60%, #ffffff)`,
                    }}
                  >
                    {/* WATERMARK ICON */}
                    <ServiceIcon
                      className="absolute -right-5 -top-5 opacity-[0.12] sm:-right-6 sm:-top-6"
                      size={150}
                      style={{ color: BLUE }}
                    />

                    {/* IMAGE */}
                    {service.image && (
                      <motion.img
                        key={service.image}
                        src={service.image}
                        alt={service.title}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover"
                        initial={{ scale: 1.08 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                      />
                    )}

                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/10 to-transparent" />

                    {/* TOP CATEGORY */}
                    <span className="absolute left-3 top-3 rounded-full bg-blue-600 px-2.5 py-1.5 font-mono text-[8px] font-semibold tracking-[0.13em] text-white sm:left-4 sm:top-4 sm:px-3 sm:text-[9px] sm:tracking-[0.15em]">
                      {service.category}
                    </span>

                    {/* ICON */}
                    <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-blue-600 shadow-md sm:right-4 sm:top-4 sm:h-10 sm:w-10">
                      <ServiceIcon size={15} />
                    </span>

                    {/* CARD TITLE */}
                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                      <p className="font-mono text-[8px] tracking-[0.15em] text-black/70 sm:text-[9px] sm:tracking-[0.18em]">
                        NOSH INFOTECH / CREATIVE STUDIO
                      </p>

                      <h3 className="mt-1 font-[Outfit] text-xl font-bold tracking-tight text-black sm:text-2xl lg:text-3xl">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* CARD FOOTER */}
                  <div className="flex items-center justify-between gap-2 border-t border-blue-50 bg-white px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />

                      <span className="font-mono text-[8px] tracking-[0.1em] text-black/70 sm:text-[9px] sm:tracking-[0.13em]">
                        SERVICE CHAPTER
                      </span>
                    </div>

                    <span className="font-[Outfit] text-xl font-black tracking-tighter text-blue-600 sm:text-2xl">
                      {service.id}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* DESKTOP SIDE INDEX */}
              <div className="absolute -right-3 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-1.5 lg:flex">
                {SERVICES.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => goTo(index)}
                    aria-label={`Go to ${item.title}`}
                    aria-current={active === index ? "step" : undefined}
                    className="group relative flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-300"
                    style={{
                      borderColor:
                        active === index ? BLUE : "rgba(0,0,0,0.08)",
                      backgroundColor:
                        active === index ? BLUE : "rgba(255,255,255,0.7)",
                      transform:
                        active === index ? "scale(1.12)" : "scale(1)",
                    }}
                  >
                    <span
                      className="font-mono text-[8px] font-bold"
                      style={{
                        color:
                          active === index ? "#fff" : "rgba(0,0,0,0.45)",
                      }}
                    >
                      {item.id}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* BOTTOM NAVIGATION */}
          <div className="mt-3 flex w-full items-center justify-between gap-3 sm:mt-4 lg:mt-0">

            {/* SERVICE STEPS */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {SERVICES.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => goTo(index)}
                  aria-label={`Go to ${item.title}`}
                  aria-current={active === index ? "step" : undefined}
                  className="group flex min-w-7 flex-col items-center gap-1.5 sm:min-w-8"
                >
                  <span
                    className={`font-mono text-[8px] transition-colors sm:text-[9px] ${
                      active === index
                        ? "font-bold text-blue-600"
                        : "text-black/40 group-hover:text-black/70"
                    }`}
                  >
                    {item.id}
                  </span>

                  <span
                    className="relative h-[3px] overflow-hidden rounded-full transition-all duration-300"
                    style={{
                      width: active === index ? 30 : 14,
                      backgroundColor: "rgba(37,99,235,0.15)",
                    }}
                  >
                    {active === index && (
                      <motion.span
                        layoutId="serviceActiveBar"
                        className="absolute inset-0 rounded-full bg-blue-600"
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>

            {/* DESKTOP SCROLL INDICATOR */}
            <div className="hidden items-center gap-3 sm:flex">
              <AnimatePresence mode="wait">
                <motion.span
                  key={service.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="font-mono text-[9px] tracking-[0.15em] text-black/50"
                >
                  {active === SERVICES.length - 1
                    ? "LAST CHAPTER"
                    : "NEXT CHAPTER"}
                </motion.span>
              </AnimatePresence>

              {/* SCROLL ARROWS */}
              <div className="flex gap-1.5">
                <button
                  onClick={prevStep}
                  disabled={active === 0}
                  aria-label="Previous service"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-100 bg-white/70 text-blue-600 transition hover:bg-blue-50 disabled:opacity-30"
                >
                  <ArrowUp size={13} />
                </button>

                <button
                  onClick={nextStep}
                  disabled={active === SERVICES.length - 1}
                  aria-label="Next service"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-100 bg-white/70 text-blue-600 transition hover:bg-blue-50 disabled:opacity-30"
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
