
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";

import {
  Smartphone,
  Sparkles,
  Camera,
  Layers3,
  ArrowUpRight,
  Check,
  Clock,
  MonitorPlay,
  ArrowDown,
  ArrowUp,
  Play,
} from "lucide-react";

const BLUE = "#2563eb";

/* ================= VIDEO URLS ================= */

const SERVICE_VIDEOS = [
  {
    id: "01",
    title: "UGC VIDEOS",
    category: "CREATOR CONTENT",
    src: "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795240805/fiza5.mp4",
  },
  {
    id: "02",
    title: "AI VIDEOS",
    category: "AI PRODUCTION",
    src: "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795505481/Smart_Business_SKYDOT.mp4",
  },
  {
    id: "03",
    title: "VIDEO SHOOT",
    category: "PRODUCTION & FILMING",
    src: "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795505508/skin_cure_kit-2.mp4",
  },
  {
    id: "04",
    title: "MOTION GRAPHICS",
    category: "MOTION & DESIGN",
    src: "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795505516/Video_18_-_Pamar-2.mp4",
  },
];


const SERVICES = [
  {
    id: "01",
    title: "UGC Videos",
    category: "CREATOR CONTENT",
    Icon: Smartphone,
    heading: "Content that feels real.",
    sub: "Real stories. Real connection.",
    desc: "Creator-style videos that feel authentic, build trust, and make your audience connect with your brand naturally.",
    points: [
      "Authentic creator-style content",
      "Product demos & testimonials",
      "Hooks built for social media",
    ],
    format: "9:16 Vertical",
    time: "2–3 days",
    tags: ["Authentic", "Creator-led", "Social-first"],
  },
  {
    id: "02",
    title: "AI Videos",
    category: "AI PRODUCTION",
    Icon: Sparkles,
    heading: "Imagine beyond reality.",
    sub: "Ideas without boundaries.",
    desc: "We combine AI-powered visuals, imaginative concepts, and creative editing to produce videos that feel ahead of their time.",
    points: [
      "AI-generated cinematic visuals",
      "Creative concept development",
      "AI animation & storytelling",
    ],
    format: "AI / 4K Visuals",
    time: "2–5 days",
    tags: ["AI powered", "Next-gen", "Creative"],
  },
  {
    id: "03",
    title: "Video Shoot",
    category: "PRODUCTION & FILMING",
    Icon: Camera,
    heading: "Capture the moment.",
    sub: "Shoot with purpose.",
    desc: "From product shoots to brand films, we bring your vision to life with intentional framing, cinematic lighting, and professional production.",
    points: [
      "Professional camera production",
      "Product & brand shoot",
      "Cinematic lighting & framing",
    ],
    format: "4K / Multi format",
    time: "Scheduled shoot",
    tags: ["Production", "Cinematic", "On-location"],
  },
  {
    id: "04",
    title: "Motion Graphics",
    category: "MOTION & DESIGN",
    Icon: Layers3,
    heading: "Make ideas move.",
    sub: "Motion with meaning.",
    desc: "We transform static ideas into dynamic visuals with animated typography, graphic elements, and engaging motion design.",
    points: [
      "2D animation & kinetic type",
      "Logo & brand animations",
      "Visual effects & transitions",
    ],
    format: "2D / 3D Motion",
    time: "2–5 days",
    tags: ["Animation", "Typography", "Visual FX"],
  },
];



const getLink = (title) =>
  `https://wa.me/919253174295?text=${encodeURIComponent(
    `Hello Nosh Infotech, I want to discuss ${title}.`,
  )}`;

/* ================= TEXT ANIMATIONS ================= */

const textVariants = {
  enter: (direction) => ({
    opacity: 0,
    y: direction > 0 ? 35 : -35,
    filter: "blur(8px)",
  }),
  center: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
  exit: (direction) => ({
    opacity: 0,
    y: direction > 0 ? -35 : 35,
    filter: "blur(8px)",
  }),
};

/* ================= SINGLE VIDEO VISUAL ================= */

const ServiceVisual = ({ service, activeIndex }) => {
  const Icon = service.Icon;
  const video = SERVICE_VIDEOS[activeIndex];

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#06101f]">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-20 top-1/3 z-10 h-72 w-72 rounded-full bg-blue-500/20 blur-[110px]" />

      {/* Single Active Video */}
      <AnimatePresence mode="wait">
        <motion.div
          key={video.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <video
            key={video.src}
            src={video.src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Cinematic Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#020712]/50 via-transparent to-[#020712]/90" />
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/50 via-transparent to-blue-500/10" />

          {/* Scan Light */}
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "400%" }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute left-0 right-0 z-10 h-px bg-gradient-to-r from-transparent via-blue-300/50 to-transparent"
          />

          {/* Top Label */}
          <div className="absolute left-3 right-3 top-3 z-20 flex items-center justify-between sm:left-5 sm:right-5 sm:top-5">
            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-2.5 py-1.5 backdrop-blur-xl sm:px-4 sm:py-2">
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="h-1.5 w-1.5 rounded-full bg-blue-400"
              />

              <span className="font-mono text-[10px] tracking-[0.15em] text-white/85 sm:text-[9px] sm:tracking-[0.2em]">
                {video.category}
              </span>
            </div>

            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-xl sm:h-10 sm:w-10">
              <Icon size={15} />
            </div>
          </div>

          {/* Right Vertical Text */}
          <div className="absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 rotate-90 sm:right-5 sm:block">
            <span className="font-mono text-[8px] tracking-[0.25em] text-white/50">
              NOSH CREATIVE STUDIO — 2026
            </span>
          </div>

          {/* Center Play Decoration */}
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/20 text-white backdrop-blur-md transition-transform duration-500 sm:h-16 sm:w-16">
              <Play
                size={16}
                fill="currentColor"
                className="ml-1 sm:h-5 sm:w-5"
              />
            </div>
          </div>

          
          <div className="absolute bottom-0 left-0 right-0 z-20 p-3 sm:p-5 lg:p-7">
            <h3 className="max-w-[95%] font-[Outfit] text-[clamp(1.25rem,4vw,3rem)] font-semibold leading-[0.98] tracking-[-0.06em] text-white sm:max-w-[85%] sm:text-3xl lg:text-4xl">
              {service.title}
            </h3>

            <p className="mt-1.5 text-[9px] tracking-wide text-white/65 sm:mt-2 sm:text-sm">
              {service.sub}
            </p>

            <div className="mt-1 flex items-center justify-between pt-2 sm:pt-1">
              <span className="font-mono text-[10px] tracking-[0.15em] text-white/50 sm:text-[9px]">
                VIDEO STORYTELLING
              </span>

              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md sm:h-9 sm:w-9">
                <ArrowUpRight size={13} />
              </div>
            </div>
          </div>

          {/* Reel Frame Corners */}
          <div className="pointer-events-none absolute inset-2.5 z-20 sm:inset-4">
            <span className="absolute left-0 top-0 h-4 w-4 border-l border-t border-white/35 sm:h-6 sm:w-6" />
            <span className="absolute right-0 top-0 h-4 w-4 border-r border-t border-white/35 sm:h-6 sm:w-6" />
            <span className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-white/35 sm:h-6 sm:w-6" />
            <span className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-white/35 sm:h-6 sm:w-6" />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

/* ================= SERVICE CONTENT ================= */

const ServiceContent = ({ service, direction }) => {
  return (
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
      className="w-full"
    >
      {/* Eyebrow */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        <span className="h-[3px] w-6 rounded-full bg-blue-600 sm:w-9" />

        <span className="font-mono text-[8px] font-bold tracking-[0.17em] text-blue-600 sm:text-[10px] sm:tracking-[0.22em]">
          {service.category}
        </span>
      </div>

      {/* Title */}
      <h2 className="mt-2.5 max-w-[650px] font-[Outfit] text-[clamp(1.85rem,7vw,3.5rem)] font-semibold leading-[0.98] tracking-[-0.06em] sm:mt-4 sm:text-5xl lg:text-[clamp(3.4rem,5.5vw,5.4rem)]">
        {service.heading}
      </h2>

      {/* Subtitle */}
      <p className="mt-1.5 font-serif text-[12px] italic text-blue-600 sm:mt-3 sm:text-xl">
        {service.sub}
      </p>

      {/* Description */}
      <p className="mt-2 max-w-md text-[10px] leading-[1.6] text-black/65 sm:mt-4 sm:text-sm sm:leading-7">
        {service.desc}
      </p>

      {/* Features */}
    {/* Features */}
<ul className="mt-4 hidden space-y-2 sm:block">
  {service.points.map((point, index) => (
    <motion.li
      key={point}
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 + index * 0.08 }}
      className="flex items-center gap-3 text-xs font-medium text-black/70 lg:text-sm"
    >
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
        <Check size={11} strokeWidth={3} />
      </span>

      {point}
    </motion.li>
  ))}
</ul>

      {/* Meta & CTA */}
      <div className="mt-3 flex flex-wrap items-center gap-1.5 sm:mt-6 sm:gap-2.5">
        <span className="inline-flex items-center gap-1 rounded-full border border-blue-100 bg-white/80 px-2 py-1.5 text-[8px] font-semibold sm:gap-2 sm:px-3.5 sm:py-2 sm:text-[11px]">
          <MonitorPlay size={11} className="text-blue-600 sm:h-3.5 sm:w-3.5" />
          {service.format}
        </span>

        <span className="inline-flex items-center gap-1 rounded-full border border-blue-100 bg-white/80 px-2 py-1.5 text-[8px] font-semibold sm:gap-2 sm:px-3.5 sm:py-2 sm:text-[11px]">
          <Clock size={11} className="text-blue-600 sm:h-3.5 sm:w-3.5" />
          {service.time}
        </span>

        <a
          href={getLink(service.title)}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center gap-1.5 rounded-full bg-blue-600 px-3 py-2 text-[8px] font-bold uppercase tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 sm:gap-2 sm:px-5 sm:py-2.5 sm:text-[11px]"
        >
          Get this service
          <ArrowUpRight
            size={12}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </div>

      {/* Mobile Tags */}
      <div className="mt-2.5 flex flex-wrap gap-1.5 sm:hidden">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-blue-50 px-2 py-1 text-[8px] font-medium text-blue-700"
          >
            {tag}
          </span>
        ))}
      </div>

      
      <div className="mt-3  max-sm:hidden flex items-center gap-2 sm:mt-5 lg:hidden">
        <span className="font-mono text-[8px] tracking-[0.12em] text-black/40">
          EXPLORE SERVICES
        </span>

        <span className="h-px w-6 bg-blue-200" />

        <span className="font-mono text-[8px] text-blue-600">
          {service.id} / 04
        </span>
      </div>
    </motion.div>
  );
};

/* ================= MAIN SECTION ================= */

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

    const safeIndex = Math.min(
      SERVICES.length - 1,
      Math.max(0, index),
    );

    setDirection(safeIndex > active ? 1 : -1);

    const sectionTop =
      sectionRef.current.getBoundingClientRect().top + window.scrollY;

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

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-[#f5f7fb] text-[#111318]"
      style={{ height: `${SERVICES.length * 100}svh` }}
    >
      {/* Sticky Canvas */}
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Top Progress Line */}
        <motion.div
          style={{ scaleX: scrollYProgress }}
          className="absolute left-0 top-0 z-50 h-[3px] w-full origin-left bg-blue-600"
        />

        {/* Ambient Background */}
        <AnimatePresence mode="sync">
          <motion.div
            key={service.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(circle at 78% 20%, ${BLUE}13, transparent 42%)`,
            }}
          />
        </AnimatePresence>

        {/* Blue Ambient Glows */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full bg-blue-200/30 blur-[100px] sm:h-[500px] sm:w-[500px]" />

        <div className="pointer-events-none absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-blue-300/20 blur-[100px] sm:h-[450px] sm:w-[450px]" />

        
    <div className="relative z-10 mx-auto flex h-full w-full max-w-[1500px] flex-col px-3 pb-2 pt-12 sm:px-6 sm:pb-5 sm:pt-16 md:px-8 md:pt-20 lg:px-12 lg:pb-7 lg:pt-24 xl:px-16">

  <div className="mt-1 grid min-h-0 flex-1 grid-cols-1 items-center sm:gap-3 sm:mt-4 sm:gap-5 lg:mt-0 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 xl:gap-16">

    {/* LEFT CONTENT */}
    <div className="order-2 min-h-0 w-full lg:order-1">
      <AnimatePresence mode="wait" custom={direction}>
        <ServiceContent
          key={service.id}
          service={service}
          direction={direction}
        />
      </AnimatePresence>
    </div>

    {/* RIGHT VIDEO */}
    <div className="relative order-1 flex w-full min-w-0 items-center justify-center lg:order-2">

      {/* Reel Wrapper */}
      <div className="relative w-full min-w-0 sm:mx-auto sm:w-fit">

        {/* Ghost Number */}
        <AnimatePresence mode="wait">
          <motion.span
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="pointer-events-none absolute -bottom-5 -right-2 z-0 select-none font-[Outfit] text-[clamp(5rem,24vw,12rem)] font-black leading-none tracking-[-0.1em] sm:-bottom-12 sm:-right-10 sm:text-[clamp(6rem,15vw,12rem)] lg:-bottom-16 lg:-right-16 lg:text-[240px]"
            style={{
              color: "transparent",
              WebkitTextStroke: `1.5px ${BLUE}35`,
            }}
          >
            {service.id}
          </motion.span>
        </AnimatePresence>

        {/* FULL WIDTH RESPONSIVE REEL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="
            relative z-10
            mx-auto
            w-full
            aspect-[9/16]
            max-h-[48svh]
            overflow-hidden
            shrink-0
            rounded-[18px]
            border border-blue-100
            bg-[#06101f]
            shadow-[0_20px_60px_-25px_rgba(37,99,235,0.35)]
            sm:w-auto
            sm:h-[min(55svh,500px)]
            sm:aspect-[9/16]
            sm:max-h-none
            sm:rounded-[24px]
            lg:h-[min(76svh,700px)]
            lg:rounded-[30px]
          "
        >
          {/* CLICKABLE VIDEO */}
          <button
            type="button"
            onClick={() => {
              const videoElement =
                document.querySelector("#active-service-video");

              if (videoElement) {
                if (videoElement.paused) {
                  videoElement.play();
                } else {
                  videoElement.pause();
                }
              }
            }}
            aria-label="Play or pause service video"
            className="absolute inset-0 block h-full w-full cursor-pointer"
          >
            <ServiceVisual
              service={service}
              activeIndex={active}
            />
          </button>
        </motion.div>

        {/* CHAPTER SELECTOR - DESKTOP */}
        <div className="absolute -right-10 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-2 lg:flex xl:-right-[54px]">
          {SERVICES.map((item, index) => (
            <button
              key={item.id}
              onClick={() => goTo(index)}
              aria-label={`Go to ${item.title}`}
              aria-current={active === index ? "step" : undefined}
              className="flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300"
              style={{
                borderColor:
                  active === index
                    ? BLUE
                    : "rgba(37,99,235,0.12)",
                backgroundColor:
                  active === index ? BLUE : "#ffffff",
                transform:
                  active === index ? "scale(1.12)" : "scale(1)",
                boxShadow:
                  active === index
                    ? "0 5px 18px rgba(37,99,235,0.25)"
                    : "none",
              }}
            >
              <span
                className="font-mono text-[8px] font-bold"
                style={{
                  color:
                    active === index
                      ? "#ffffff"
                      : "rgba(0,0,0,0.4)",
                }}
              >
                {item.id}
              </span>
            </button>
          ))}
        </div>

      </div>
    </div>
  </div>

  {/* BOTTOM BAR */}
  <div className="mt-3 flex w-full shrink-0 items-center justify-between gap-2 sm:mt-4 lg:mt-0">

    {/* CHAPTER INDICATORS */}
    <div className="flex items-center gap-1.5 sm:gap-2">
      {SERVICES.map((item, index) => (
        <button
          key={item.id}
          onClick={() => goTo(index)}
          aria-label={`Go to ${item.title}`}
          aria-current={active === index ? "step" : undefined}
          className="group flex min-w-6 flex-col items-center gap-1 sm:min-w-8 sm:gap-1.5"
        >
          <span
            className={`font-mono text-[10px] transition-colors sm:text-[9px] ${
              active === index
                ? "font-bold text-blue-600"
                : "text-black/35 group-hover:text-black/70"
            }`}
          >
            {item.id}
          </span>

          <span
            className="relative h-[3px] overflow-hidden rounded-full transition-all duration-300"
            style={{
              width: active === index ? 26 : 12,
              backgroundColor: "rgba(37,99,235,0.15)",
            }}
          >
            {active === index && (
              <motion.span
                layoutId="servicesActiveBar"
                className="absolute inset-0 rounded-full bg-blue-600"
              />
            )}
          </span>
        </button>
      ))}
    </div>

    {/* DESKTOP CONTROLS */}
    <div className="hidden items-center gap-3 sm:flex">
      <AnimatePresence mode="wait">
        <motion.span
          key={service.id}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="font-mono text-[8px] tracking-[0.15em] text-black/45 sm:text-[9px]"
        >
          {active === SERVICES.length - 1
            ? "END OF SERVICES"
            : "SCROLL TO EXPLORE"}
        </motion.span>
      </AnimatePresence>

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

    {/* MOBILE CONTROLS */}
    <div className="flex gap-1 sm:hidden">
      <button
        onClick={prevStep}
        disabled={active === 0}
        aria-label="Previous service"
        className="flex h-7 w-7 items-center justify-center rounded-full border border-blue-100 bg-white text-blue-600 disabled:opacity-30"
      >
        <ArrowUp size={12} />
      </button>

      <button
        onClick={nextStep}
        disabled={active === SERVICES.length - 1}
        aria-label="Next service"
        className="flex h-7 w-7 items-center justify-center rounded-full border border-blue-100 bg-white text-blue-600 disabled:opacity-30"
      >
        <ArrowDown size={12} />
      </button>
    </div>
  </div>
</div>

      </div>
    </section>
  );
};

export default ServicesSection;





// import { useRef, useState } from "react";
// import {
//   AnimatePresence,
//   motion,
//   useMotionValueEvent,
//   useScroll,
// } from "motion/react";

// import {
//   Smartphone,
//   Megaphone,
//   Clapperboard,
//   ArrowUpRight,
//   Check,
//   Clock,
//   MonitorPlay,
//   ArrowDown,
//   ArrowUp,
// } from "lucide-react";

// import { FaYoutube } from "react-icons/fa";

// const BLUE = "#2563eb";

// const SERVICES = [
//   {
//     id: "01",
//     title: "Reels & Shorts",
//     category: "SHORT FORM",
//     Icon: Smartphone,
//     heading: "Stop the scroll.",
//     sub: "Make every second count.",
//     desc: "Fast-paced edits, strong hooks, captions and transitions that keep people watching till the last frame.",
//     points: [
//       "Hook-first editing",
//       "Auto captions & subtitles",
//       "Trending sound sync",
//     ],
//     format: "9:16 Vertical",
//     time: "24–48 hours",
//     image: "",
//   },
//   {
//     id: "02",
//     title: "YouTube Videos",
//     category: "LONG FORM",
//     Icon: FaYoutube,
//     heading: "Stay in the story.",
//     sub: "Long form. Zero boring.",
//     desc: "Story-driven edits with smooth pacing, b-roll, sound design and thumbnails-ready moments.",
//     points: [
//       "Retention-focused pacing",
//       "B-roll & sound design",
//       "Intro and outro packages",
//     ],
//     format: "16:9 Landscape",
//     time: "2–4 days",
//     image: "",
//   },
//   {
//     id: "03",
//     title: "Brand Films",
//     category: "BRAND STORY",
//     Icon: Clapperboard,
//     heading: "Built to be remembered.",
//     sub: "Your brand. Your story.",
//     desc: "Cinematic brand videos that communicate your identity, values and the people behind the work.",
//     points: [
//       "Script & story structure",
//       "Cinematic color look",
//       "Music and voice-over mix",
//     ],
//     format: "16:9 / 4K",
//     time: "3–7 days",
//     image: "",
//   },
//   {
//     id: "04",
//     title: "Commercial & Ads",
//     category: "ADVERTISING",
//     Icon: Megaphone,
//     heading: "Make them look. Make them click.",
//     sub: "Built to convert.",
//     desc: "Creative product videos and UGC style ads designed to capture attention and drive action.",
//     points: [
//       "UGC style ad edits",
//       "Multiple aspect ratios",
//       "A/B hook variations",
//     ],
//     format: "Multi format",
//     time: "2–3 days",
//     image: "",
//   },
// ];

// const getLink = (title) =>
//   `https://wa.me/919253174295?text=${encodeURIComponent(
//     `Hello Nosh Infotech, I want to discuss ${title}.`
//   )}`;

// const slideVariants = {
//   enter: (direction) => ({
//     opacity: 0,
//     x: direction > 0 ? 80 : -80,
//     y: 16,
//     scale: 0.97,
//     filter: "blur(6px)",
//   }),

//   center: {
//     opacity: 1,
//     x: 0,
//     y: 0,
//     scale: 1,
//     filter: "blur(0px)",
//   },

//   exit: (direction) => ({
//     opacity: 0,
//     x: direction > 0 ? -80 : 80,
//     y: -16,
//     scale: 0.97,
//     filter: "blur(6px)",
//   }),
// };

// const textVariants = {
//   enter: (direction) => ({
//     opacity: 0,
//     y: direction > 0 ? 25 : -25,
//     filter: "blur(5px)",
//   }),

//   center: {
//     opacity: 1,
//     y: 0,
//     filter: "blur(0px)",
//   },

//   exit: (direction) => ({
//     opacity: 0,
//     y: direction > 0 ? -25 : 25,
//     filter: "blur(5px)",
//   }),
// };

// const ServicesSection = () => {
//   const sectionRef = useRef(null);

//   const [active, setActive] = useState(0);
//   const [direction, setDirection] = useState(1);

//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start start", "end end"],
//   });

//   useMotionValueEvent(scrollYProgress, "change", (value) => {
//     const index = Math.min(
//       SERVICES.length - 1,
//       Math.max(0, Math.floor(value * SERVICES.length))
//     );

//     setActive((previous) => {
//       if (previous !== index) {
//         setDirection(index > previous ? 1 : -1);
//         return index;
//       }

//       return previous;
//     });
//   });

//   const goTo = (index) => {
//     if (!sectionRef.current) return;

//     const safeIndex = Math.min(
//       SERVICES.length - 1,
//       Math.max(0, index)
//     );

//     setDirection(safeIndex > active ? 1 : -1);

//     const sectionTop =
//       sectionRef.current.getBoundingClientRect().top +
//       window.scrollY;

//     const stepHeight =
//       sectionRef.current.offsetHeight / SERVICES.length;

//     window.scrollTo({
//       top: sectionTop + safeIndex * stepHeight + 2,
//       behavior: "smooth",
//     });
//   };

//   const nextStep = () => {
//     if (active < SERVICES.length - 1) {
//       goTo(active + 1);
//     }
//   };

//   const prevStep = () => {
//     if (active > 0) {
//       goTo(active - 1);
//     }
//   };

//   const service = SERVICES[active];
//   const ServiceIcon = service.Icon;

//   return (
//     <section
//       id="services"
//       ref={sectionRef}
//       className="relative bg-[#f5f5f1] text-[#111318]"
//       style={{ height: `${SERVICES.length * 100}svh` }}
//     >
//       <div className="sticky top-0 h-svh overflow-hidden">

//         {/* PROGRESS LINE */}
//         <motion.div
//           style={{ scaleX: scrollYProgress }}
//           className="absolute left-0 top-0 z-50 h-[3px] w-full origin-left bg-blue-600"
//         />

//         {/* BLUE BACKGROUND GLOW */}
//         <AnimatePresence mode="sync">
//           <motion.div
//             key={service.id}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.4 }}
//             className="pointer-events-none absolute inset-0"
//             style={{
//               background: `radial-gradient(circle at 80% 20%, ${BLUE}16, transparent 42%)`,
//             }}
//           />
//         </AnimatePresence>

//         {/* AMBIENT LIGHTS */}
//         <div className="pointer-events-none absolute -right-40 -top-40 h-[350px] w-[350px] rounded-full bg-blue-200/30 blur-[100px] sm:h-[500px] sm:w-[500px] sm:blur-[130px]" />

//         <div className="pointer-events-none absolute -bottom-40 -left-40 h-[350px] w-[350px] rounded-full bg-blue-300/20 blur-[100px] sm:h-[450px] sm:w-[450px] sm:blur-[120px]" />

//         {/* MAIN CONTENT */}
//         <div className="relative z-10 mx-auto flex h-full w-full max-w-[1400px] flex-col px-4 pb-3 pt-14 sm:px-6 sm:pb-5 sm:pt-20 lg:px-12 lg:pb-7 lg:pt-24">

//           {/* MAIN BODY */}
//           <div className="mt-2 grid min-h-0 flex-1 grid-cols-1 items-center gap-3 sm:mt-4 sm:gap-5 lg:mt-0 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 xl:gap-16">

//             {/* LEFT CONTENT */}
//             <div className="order-2 min-h-0 lg:order-1">
//               <AnimatePresence mode="wait" custom={direction}>
//                 <motion.div
//                   key={service.id}
//                   custom={direction}
//                   variants={textVariants}
//                   initial="enter"
//                   animate="center"
//                   exit="exit"
//                   transition={{
//                     duration: 0.4,
//                     ease: [0.22, 1, 0.36, 1],
//                   }}
//                 >
//                   {/* CATEGORY */}
//                   <div className="flex items-center gap-3">
//                     <span className="h-[3px] w-7 rounded-full bg-blue-600 sm:w-9" />

//                     <span className="font-mono text-[9px] font-bold tracking-[0.18em] text-blue-600 sm:text-[10px] sm:tracking-[0.2em]">
//                       {service.category}
//                     </span>
//                   </div>

//                   {/* HEADING */}
//                   <h2 className="mt-3 max-w-[650px] font-[Outfit] text-[clamp(2rem,7vw,3rem)] font-semibold leading-[0.98] tracking-[-0.055em] sm:mt-4 sm:text-5xl lg:text-[clamp(3.5rem,5.5vw,5rem)]">
//                     {service.heading}
//                   </h2>

//                   {/* SUBTITLE */}
//                   <p className="mt-2 font-serif text-sm italic text-blue-600 sm:mt-3 sm:text-xl">
//                     {service.sub}
//                   </p>

//                   {/* DESCRIPTION */}
//                   <p className="mt-2.5 max-w-md text-[12px] leading-[1.65] text-black/65 sm:mt-4 sm:text-sm sm:leading-7">
//                     {service.desc}
//                   </p>

//                   {/* FEATURES */}
//                   <ul className="mt-5 hidden space-y-2 sm:block">
//                     {service.points.map((point, index) => (
//                       <motion.li
//                         key={point}
//                         initial={{ opacity: 0, x: 15 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{
//                           delay: 0.1 + index * 0.07,
//                           duration: 0.3,
//                         }}
//                         className="flex items-center gap-3 text-sm font-medium text-black/70"
//                       >
//                         <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
//                           <Check size={11} strokeWidth={3} />
//                         </span>
//                         {point}
//                       </motion.li>
//                     ))}
//                   </ul>

//                   {/* TAGS + CTA */}
//                   <div className="mt-3 flex flex-wrap items-center gap-2 sm:mt-6 sm:gap-2.5">
//                     <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-white/80 px-2.5 py-2 text-[10px] font-semibold sm:gap-2 sm:px-3.5 sm:text-[11px]">
//                       <MonitorPlay size={12} className="text-blue-600" />
//                       {service.format}
//                     </span>

//                     <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-white/80 px-2.5 py-2 text-[10px] font-semibold sm:gap-2 sm:px-3.5 sm:text-[11px]">
//                       <Clock size={12} className="text-blue-600" />
//                       {service.time}
//                     </span>

//                     <a
//                       href={getLink(service.title)}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-4 py-2.5 text-[10px] font-bold uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5 hover:bg-blue-700 sm:px-5 sm:text-[11px] sm:tracking-wider"
//                     >
//                       Get this service
//                       <ArrowUpRight size={13} />
//                     </a>
//                   </div>
//                 </motion.div>
//               </AnimatePresence>

//               {/* MOBILE STEP NAVIGATION */}
//               <div className="mt-3 flex items-center gap-3 sm:mt-5 lg:hidden">
//                 <button
//                   onClick={prevStep}
//                   disabled={active === 0}
//                   className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-100 bg-white text-blue-600 transition hover:bg-blue-50 disabled:opacity-30 sm:h-9 sm:w-9"
//                   aria-label="Previous service"
//                 >
//                   <ArrowUp size={14} />
//                 </button>

//                 <button
//                   onClick={nextStep}
//                   disabled={active === SERVICES.length - 1}
//                   className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-100 bg-white text-blue-600 transition hover:bg-blue-50 disabled:opacity-30 sm:h-9 sm:w-9"
//                   aria-label="Next service"
//                 >
//                   <ArrowDown size={14} />
//                 </button>

//                 <span className="hidden font-mono text-[9px] tracking-[0.15em] text-black/50 sm:block">
//                   SWIPE / SCROLL TO EXPLORE
//                 </span>
//               </div>
//             </div>

//             {/* RIGHT VISUAL CARD */}
//             <div className="relative order-1 mx-auto h-[clamp(170px,27svh,270px)] w-full max-w-[290px] sm:h-[38svh] sm:max-h-[380px] sm:max-w-[380px] lg:order-2 lg:h-[62svh] lg:max-h-none lg:max-w-[480px] xl:max-w-[520px]">

//               {/* BACKGROUND CHAPTER NUMBER */}
//               <AnimatePresence mode="wait">
//                 <motion.span
//                   key={service.id}
//                   initial={{
//                     opacity: 0,
//                     x: direction > 0 ? 50 : -50,
//                   }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{
//                     opacity: 0,
//                     x: direction > 0 ? -50 : 50,
//                   }}
//                   transition={{ duration: 0.4 }}
//                   className="pointer-events-none absolute -bottom-7 -right-2 select-none font-[Outfit] text-[clamp(6rem,28vw,10rem)] font-black leading-none tracking-[-0.09em] sm:-bottom-12 sm:-right-3 sm:text-[240px] lg:-bottom-16 lg:-right-8 lg:text-[350px]"
//                   style={{
//                     color: "transparent",
//                     WebkitTextStroke: `1.5px ${BLUE}35`,
//                   }}
//                 >
//                   {service.id}
//                 </motion.span>
//               </AnimatePresence>

//               {/* ACTIVE CARD */}
//               <AnimatePresence mode="wait" custom={direction}>
//                 <motion.div
//                   key={service.id}
//                   custom={direction}
//                   variants={slideVariants}
//                   initial="enter"
//                   animate="center"
//                   exit="exit"
//                   transition={{
//                     duration: 0.5,
//                     ease: [0.22, 1, 0.36, 1],
//                   }}
//                   className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-[0_25px_70px_-30px_rgba(37,99,235,0.22)] sm:rounded-[24px]"
//                 >
//                   {/* IMAGE AREA */}
//                   <div
//                     className="relative flex-1 overflow-hidden"
//                     style={{
//                       background: `linear-gradient(145deg, ${BLUE}22, ${BLUE}0a 60%, #ffffff)`,
//                     }}
//                   >
//                     {/* WATERMARK ICON */}
//                     <ServiceIcon
//                       className="absolute -right-5 -top-5 opacity-[0.12] sm:-right-6 sm:-top-6"
//                       size={150}
//                       style={{ color: BLUE }}
//                     />

//                     {/* IMAGE */}
//                     {service.image && (
//                       <motion.img
//                         key={service.image}
//                         src={service.image}
//                         alt={service.title}
//                         loading="lazy"
//                         decoding="async"
//                         className="absolute inset-0 h-full w-full object-cover"
//                         initial={{ scale: 1.08 }}
//                         animate={{ scale: 1 }}
//                         transition={{ duration: 0.7, ease: "easeOut" }}
//                       />
//                     )}

//                     {/* OVERLAY */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/10 to-transparent" />

//                     {/* TOP CATEGORY */}
//                     <span className="absolute left-3 top-3 rounded-full bg-blue-600 px-2.5 py-1.5 font-mono text-[8px] font-semibold tracking-[0.13em] text-white sm:left-4 sm:top-4 sm:px-3 sm:text-[9px] sm:tracking-[0.15em]">
//                       {service.category}
//                     </span>

//                     {/* ICON */}
//                     <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-blue-600 shadow-md sm:right-4 sm:top-4 sm:h-10 sm:w-10">
//                       <ServiceIcon size={15} />
//                     </span>

//                     {/* CARD TITLE */}
//                     <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
//                       <p className="font-mono text-[8px] tracking-[0.15em] text-black/70 sm:text-[9px] sm:tracking-[0.18em]">
//                         NOSH INFOTECH / CREATIVE STUDIO
//                       </p>

//                       <h3 className="mt-1 font-[Outfit] text-xl font-bold tracking-tight text-black sm:text-2xl lg:text-3xl">
//                         {service.title}
//                       </h3>
//                     </div>
//                   </div>

//                   {/* CARD FOOTER */}
//                   <div className="flex items-center justify-between gap-2 border-t border-blue-50 bg-white px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3.5">
//                     <div className="flex items-center gap-2">
//                       <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />

//                       <span className="font-mono text-[8px] tracking-[0.1em] text-black/70 sm:text-[9px] sm:tracking-[0.13em]">
//                         SERVICE CHAPTER
//                       </span>
//                     </div>

//                     <span className="font-[Outfit] text-xl font-black tracking-tighter text-blue-600 sm:text-2xl">
//                       {service.id}
//                     </span>
//                   </div>
//                 </motion.div>
//               </AnimatePresence>

//               {/* DESKTOP SIDE INDEX */}
//               <div className="absolute -right-3 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-1.5 lg:flex">
//                 {SERVICES.map((item, index) => (
//                   <button
//                     key={item.id}
//                     onClick={() => goTo(index)}
//                     aria-label={`Go to ${item.title}`}
//                     aria-current={active === index ? "step" : undefined}
//                     className="group relative flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-300"
//                     style={{
//                       borderColor:
//                         active === index ? BLUE : "rgba(0,0,0,0.08)",
//                       backgroundColor:
//                         active === index ? BLUE : "rgba(255,255,255,0.7)",
//                       transform:
//                         active === index ? "scale(1.12)" : "scale(1)",
//                     }}
//                   >
//                     <span
//                       className="font-mono text-[8px] font-bold"
//                       style={{
//                         color:
//                           active === index ? "#fff" : "rgba(0,0,0,0.45)",
//                       }}
//                     >
//                       {item.id}
//                     </span>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* BOTTOM NAVIGATION */}
//           <div className="mt-3 flex w-full items-center justify-between gap-3 sm:mt-4 lg:mt-0">

//             {/* SERVICE STEPS */}
//             <div className="flex items-center gap-1.5 sm:gap-2">
//               {SERVICES.map((item, index) => (
//                 <button
//                   key={item.id}
//                   onClick={() => goTo(index)}
//                   aria-label={`Go to ${item.title}`}
//                   aria-current={active === index ? "step" : undefined}
//                   className="group flex min-w-7 flex-col items-center gap-1.5 sm:min-w-8"
//                 >
//                   <span
//                     className={`font-mono text-[8px] transition-colors sm:text-[9px] ${
//                       active === index
//                         ? "font-bold text-blue-600"
//                         : "text-black/40 group-hover:text-black/70"
//                     }`}
//                   >
//                     {item.id}
//                   </span>

//                   <span
//                     className="relative h-[3px] overflow-hidden rounded-full transition-all duration-300"
//                     style={{
//                       width: active === index ? 30 : 14,
//                       backgroundColor: "rgba(37,99,235,0.15)",
//                     }}
//                   >
//                     {active === index && (
//                       <motion.span
//                         layoutId="serviceActiveBar"
//                         className="absolute inset-0 rounded-full bg-blue-600"
//                       />
//                     )}
//                   </span>
//                 </button>
//               ))}
//             </div>

//             {/* DESKTOP SCROLL INDICATOR */}
//             <div className="hidden items-center gap-3 sm:flex">
//               <AnimatePresence mode="wait">
//                 <motion.span
//                   key={service.id}
//                   initial={{ opacity: 0, y: 6 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -6 }}
//                   className="font-mono text-[9px] tracking-[0.15em] text-black/50"
//                 >
//                   {active === SERVICES.length - 1
//                     ? "LAST CHAPTER"
//                     : "NEXT CHAPTER"}
//                 </motion.span>
//               </AnimatePresence>

//               {/* SCROLL ARROWS */}
//               <div className="flex gap-1.5">
//                 <button
//                   onClick={prevStep}
//                   disabled={active === 0}
//                   aria-label="Previous service"
//                   className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-100 bg-white/70 text-blue-600 transition hover:bg-blue-50 disabled:opacity-30"
//                 >
//                   <ArrowUp size={13} />
//                 </button>

//                 <button
//                   onClick={nextStep}
//                   disabled={active === SERVICES.length - 1}
//                   aria-label="Next service"
//                   className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-100 bg-white/70 text-blue-600 transition hover:bg-blue-50 disabled:opacity-30"
//                 >
//                   <ArrowDown size={13} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };
// export default ServicesSection;
