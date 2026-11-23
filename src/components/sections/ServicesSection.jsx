import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

import {
  Smartphone,
  Megaphone,
  Palette,
  AudioLines,
  Heart,
  Clapperboard,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Play,
  Crosshair,
  Layers3,
} from "lucide-react";

import { FaYoutube } from "react-icons/fa";

const SERVICES = [
  {
    id: "01",
    title: "Reels & Shorts",
    category: "SHORT FORM",
    Icon: Smartphone,
    heading: "STOP THE SCROLL.",
    sub: "MAKE EVERY SECOND COUNT.",
    desc: "Fast-paced edits, hooks, captions and engaging transitions.",
    format: "9:16 VERTICAL",
    time: "24–48 HOURS",
    color: "#2563eb",
    visual: "vertical",
  },
  {
    id: "02",
    title: "YouTube Videos",
    category: "LONG FORM",
    Icon: FaYoutube,
    heading: "STAY IN THE STORY.",
    sub: "LONG FORM. ZERO BORING.",
    desc: "Story-driven edits with smooth pacing, b-roll and sound.",
    format: "16:9 LANDSCAPE",
    time: "2–4 DAYS",
    color: "#dc2626",
    visual: "landscape",
  },
  {
    id: "03",
    title: "Brand Films",
    category: "BRAND STORY",
    Icon: Clapperboard,
    heading: "BUILT TO BE REMEMBERED.",
    sub: "YOUR BRAND. YOUR STORY.",
    desc: "Cinematic brand videos that communicate your identity.",
    format: "16:9 / 4K",
    time: "3–7 DAYS",
    color: "#7c3aed",
    visual: "brand",
  },
  {
    id: "04",
    title: "Commercial & Ads",
    category: "ADVERTISING",
    Icon: Megaphone,
    heading: "MAKE THEM LOOK.",
    sub: "MAKE THEM CLICK.",
    desc: "Creative product videos built to capture attention and convert.",
    format: "MULTI FORMAT",
    time: "2–3 DAYS",
    color: "#ea580c",
    visual: "commercial",
  },
  {
    id: "05",
    title: "Podcast & Interviews",
    category: "CONVERSATION",
    Icon: AudioLines,
    heading: "GOOD CONVERSATIONS.",
    sub: "BETTER CONTENT.",
    desc: "Clean multi-camera edits, audio and podcast highlights.",
    format: "16:9 / 9:16",
    time: "2–4 DAYS",
    color: "#0891b2",
    visual: "podcast",
  },
  {
    id: "06",
    title: "Wedding & Events",
    category: "MEMORY FILMS",
    Icon: Heart,
    heading: "MOMENTS THAT STAY.",
    sub: "MEMORIES IN MOTION.",
    desc: "Beautifully edited films filled with emotion and memories.",
    format: "16:9 / 4K",
    time: "5–7 DAYS",
    color: "#be185d",
    visual: "wedding",
  },
  {
    id: "07",
    title: "Motion & Color",
    category: "VISUAL FINISH",
    Icon: Palette,
    heading: "DETAIL MAKES THE DIFFERENCE.",
    sub: "MOTION. COLOR. FEELING.",
    desc: "Color grading, motion graphics and final visual polish.",
    format: "ALL FORMATS",
    time: "1–3 DAYS",
    color: "#4f46e5",
    visual: "motion",
  },
];

const ServicesSection = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const service = SERVICES[active];
  const Icon = service.Icon;

  // Automatic service rotation
  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % SERVICES.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [paused]);

  const next = () => setActive((prev) => (prev + 1) % SERVICES.length);

  const prev = () =>
    setActive((prev) => (prev - 1 + SERVICES.length) % SERVICES.length);

  const selectService = (index) => setActive(index);

  const getLink = (title) =>
    `https://wa.me/919253174295?text=${encodeURIComponent(
      `Hello Nosh Infotech, I want to discuss ${title}.`,
    )}`;

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#f5f5f1] py-16 text-[#111318] sm:py-24"
    >
      {/* Background */}
      <div className="pointer-events-none absolute -right-40 top-0 h-[450px] w-[450px] rounded-full bg-blue-200/40 blur-[130px]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[350px] w-[350px] rounded-full bg-violet-200/30 blur-[120px]" />

      <div className="relative mx-auto max-w-[1450px] px-4 sm:px-6 lg:px-12 xl:px-16">
  
        {/* Heading */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-4 font-mono text-[10px] tracking-[0.18em] text-blue-600">
              WHAT WE DO
            </p>

            <h2 className="text-[44px] font-[Outfit] font-semibold leading-[0.9] tracking-[-0.07em] sm:text-7xl lg:text-[90px]">
              Made to
              <span className="text-black/25"> move.</span>
              <br />
              <span className="text-blue-600">Made to matter.</span>
            </h2>
          </motion.div>

          <p className="max-w-[300px] pb-1 text-sm leading-6 text-black/50">
            Every video has a purpose. We make every frame count.
          </p>
        </div>

        {/* Main layout */}
        <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-[300px_1fr] xl:grid-cols-[340px_1fr]">
          {/* Service selector */}
          <div className="flex flex-col">
            <div className="mb-3 flex items-center justify-between border-b border-black/10 pb-3">
              <span className="font-mono text-[9px] tracking-[0.15em] text-black/40">
                SELECT A SERVICE
              </span>
              <span className="font-mono text-[9px] text-black/30">
                AUTO / 4 SEC
              </span>
            </div>

            <div className="divide-y divide-black/[0.07]">
              {SERVICES.map((item, index) => {
                const ItemIcon = item.Icon;
                const isActive = active === index;

                return (
                  <button
                    key={item.id}
                    onClick={() => selectService(index)}
                    className={`group relative flex w-full items-center gap-3 py-3.5 text-left transition-all duration-300 ${
                      isActive ? "pl-3" : "pl-0"
                    }`}
                  >
                    {/* Active line */}
                    <motion.span
                      animate={{
                        width: isActive ? 3 : 0,
                        opacity: isActive ? 1 : 0,
                      }}
                      className="absolute left-0 top-0 h-full bg-blue-600"
                    />

                    {/* Icon */}
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center transition-all ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "bg-black/[0.04] text-black/40 group-hover:bg-black/[0.08] group-hover:text-black"
                      }`}
                    >
                      <ItemIcon size={16} />
                    </span>

                    {/* Text */}
                    <span className="min-w-0 flex-1">
                      <span
                        className={`block text-sm font-semibold tracking-tight transition-colors ${
                          isActive
                            ? "text-black"
                            : "text-black/45 group-hover:text-black/80"
                        }`}
                      >
                        {item.title}
                      </span>

                      <span
                        className={`mt-0.5 block font-mono text-[8px] tracking-[0.12em] ${
                          isActive ? "text-blue-600" : "text-black/30"
                        }`}
                      >
                        {item.category}
                      </span>
                    </span>

                    <ArrowUpRight
                      size={15}
                      className={`shrink-0 transition-all ${
                        isActive
                          ? "text-blue-600 opacity-100"
                          : "translate-x-1 text-black/20 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <a
              href={getLink("a custom video editing service")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 border-t border-black/10 pt-4 text-[11px] font-semibold text-blue-600 hover:text-blue-800"
            >
              Need something different? Let's talk
              <ArrowUpRight size={13} />
            </a>
          </div>

          {/* Showcase */}
          <div
            className="relative flex min-h-[400px] flex-col overflow-hidden bg-[#e9eaf0] sm:min-h-[480px] lg:min-h-[520px]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Canvas header */}
            <div className="relative z-10 flex items-center justify-between border-b border-black/10 px-4 py-3 sm:px-6">
              <span className="font-mono text-[9px] tracking-[0.14em] text-black/40">
                PREVIEW / {service.id}
              </span>

              <div className="flex items-center gap-2">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    paused ? "bg-amber-500" : "animate-pulse bg-emerald-500"
                  }`}
                />
                <span className="font-mono text-[8px] tracking-widest text-black/40">
                  {paused ? "PAUSED" : "AUTOPLAY"}
                </span>
              </div>
            </div>

            {/* Preview stage */}
            <div className="relative flex flex-1 items-center justify-center overflow-hidden px-5 py-8 sm:px-8">
              {/* Ambient light */}
              <div className="absolute inset-0 bg-[#e9eaf0]" />
              <div className="absolute -left-20 top-0 h-56 w-56 rounded-full bg-blue-300/30 blur-[100px]" />
              <div className="absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-violet-300/30 blur-[100px]" />

              {/* Background grid */}
              <div
                className="absolute inset-0 opacity-[0.16]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(0,0,0,0.12) 1px, transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.12) 1px,transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              {/* Artwork */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 15, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.97 }}
                  transition={{ duration: 0.35 }}
                  className={`relative z-10 overflow-hidden bg-[#11151c] shadow-[0_25px_70px_-25px_rgba(0,0,0,0.4)] ${
                    service.visual === "vertical"
                      ? "aspect-[9/14] w-[180px] sm:w-[210px]"
                      : "aspect-video w-full max-w-[490px]"
                  }`}
                >
                  {/* Dark base */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1b2030] via-[#11151c] to-[#090b10]" />

                  {/* Grid */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)",
                      backgroundSize: "30px 30px",
                    }}
                  />

                  {/* Color glow */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.5, 0.25] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute -right-16 -top-16 h-60 w-60 rounded-full blur-[75px]"
                    style={{ backgroundColor: service.color }}
                  />

                  {/* Dynamic visual */}
                  <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-7">
                    {/* Top */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[8px] tracking-[0.2em] text-white/40">
                        NOSH / CREATIVE
                      </span>
                      <span className="border border-white/15 px-2 py-1 font-mono text-[8px] text-white/50">
                        {service.id}
                      </span>
                    </div>

                    {/* Center composition */}
                    <div className="relative">
                      {/* Animated shape */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 24,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className={`absolute border border-dashed border-white/15 ${
                          service.visual === "vertical"
                            ? "-right-3 -top-8 h-28 w-28 rounded-full"
                            : "-right-4 -top-12 h-40 w-40 rounded-full sm:h-48 sm:w-48"
                        }`}
                      />

                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{
                          duration: 35,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className={`absolute border border-white/10 ${
                          service.visual === "vertical"
                            ? "-right-1 -top-5 h-20 w-20"
                            : "right-0 -top-8 h-28 w-28"
                        }`}
                      />

                      <div
                        className="mb-3 h-1 w-9"
                        style={{ backgroundColor: service.color }}
                      />

                      <h3
                        className={`font-black leading-[0.88] tracking-[-0.08em] text-white ${
                          service.visual === "vertical"
                            ? "text-[29px]"
                            : "text-[34px] sm:text-[48px]"
                        }`}
                      >
                        {service.heading.split(" ").slice(0, 2).join(" ")}
                        <br />
                        <span style={{ color: service.color }}>
                          {service.heading.split(" ").slice(2).join(" ")}
                        </span>
                      </h3>

                      <p className="mt-3 font-mono text-[8px] tracking-[0.13em] text-white/40">
                        {service.sub}
                      </p>
                    </div>

                    {/* Bottom graphic */}
                    <div className="flex items-end justify-between">
                      <div className="flex h-7 items-end gap-1">
                        {[12, 20, 15, 28, 17, 24, 11, 30, 16, 22].map(
                          (height, i) => (
                            <motion.span
                              key={i}
                              animate={{ height: [height, height * 0.5, height] }}
                              transition={{
                                duration: 1.1,
                                repeat: Infinity,
                                delay: i * 0.07,
                              }}
                              className="w-1 rounded-sm"
                              style={{ backgroundColor: service.color }}
                            />
                          ),
                        )}
                      </div>

                      <span className="font-mono text-[8px] tracking-widest text-white/35">
                        FRAME / 001
                      </span>
                    </div>
                  </div>

                  {/* Play button */}
                  {service.visual !== "vertical" && (
                    <div className="absolute bottom-1/2 right-5 translate-y-1/2 sm:right-7">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/[0.04] backdrop-blur-sm sm:h-12 sm:w-12"
                      >
                        <Play size={15} fill="white" className="ml-0.5 text-white" />
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Output badge */}
              <motion.div
                key={service.id + "-badge"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-3 right-3 z-20 border border-white bg-[#f5f5f1] px-3 py-2 shadow-lg sm:bottom-5 sm:right-5"
              >
                <span className="font-mono text-[8px] text-black/40">OUTPUT</span>
                <p className="mt-0.5 text-[10px] font-semibold text-black">
                  {service.format}
                </p>
              </motion.div>
            </div>

            {/* Bottom controls */}
            <div className="relative z-10 border-t border-black/10 bg-[#e9eaf0] px-4 py-3 sm:px-6">
              {/* Autoplay progress */}
              <div className="mb-3 h-[2px] w-full overflow-hidden bg-black/10">
                {!paused && (
                  <motion.div
                    key={active}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 4, ease: "linear" }}
                    className="h-full origin-left bg-blue-600"
                  />
                )}
                {paused && (
                  <div
                    className="h-full bg-blue-600"
                    style={{ width: `${((active + 1) / SERVICES.length) * 100}%` }}
                  />
                )}
              </div>

              <div className="flex items-center justify-between">
                {/* Counter */}
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-semibold text-black/60">
                    {service.id}
                  </span>
                  <span className="text-black/20">/</span>
                  <span className="font-mono text-[10px] text-black/30">
                    07
                  </span>
                  <span className="ml-1.5 font-mono text-[8px] tracking-wwider text-black/30">
                    {paused ? "PAUSED" : "AUTO PLAY"}
                  </span>
                </div>

                {/* Navigation */}
                <div className="flex gap-1.5">
                  <button
                    onClick={prev}
                    aria-label="Previous service"
                    className="flex h-8 w-8 items-center justify-center border border-black/10 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    <ArrowLeft size={14} />
                  </button>

                  <button
                    onClick={next}
                    aria-label="Next service"
                    className="flex h-8 w-8 items-center justify-center border border-black/10 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        
        </div>    
      </div>
    </section>
  );
};

export default ServicesSection;