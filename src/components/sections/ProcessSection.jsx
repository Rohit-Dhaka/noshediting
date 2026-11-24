import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageCircle,
  Upload,
  Scissors,
  RefreshCcw,
  Rocket,
  ArrowUpRight,
  Check,
} from "lucide-react";

const STEPS = [
  {
    title: "Brief & Plan",
    Icon: MessageCircle,
    time: "DAY 01",
    label: "PROJECT DISCOVERY",
    desc: "Every great edit starts with a clear direction. We learn about your goals, audience, content style and the vision behind your project.",
    points: ["Goal & audience", "Creative references", "Editing direction"],
  },
  {
    title: "Share Footage",
    Icon: Upload,
    time: "DAY 02",
    label: "ASSET COLLECTION",
    desc: "Share your raw clips and brand assets with us. We organize your footage, understand the story and prepare everything for editing.",
    points: ["Raw video footage", "Logos & brand assets", "Music & references"],
  },
  {
    title: "Edit & Grade",
    Icon: Scissors,
    time: "DAY 03",
    label: "CREATIVE PRODUCTION",
    desc: "We turn your raw clips into a polished experience with purposeful cuts, smooth pacing, cinematic colors and sound that brings every frame to life.",
    points: ["Precision editing", "Color grading", "Sound & motion"],
  },
  {
    title: "Review & Revise",
    Icon: RefreshCcw,
    time: "DAY 04",
    label: "CLIENT COLLABORATION",
    desc: "Your feedback shapes the final result. Review the first cut, share your thoughts and we'll fine-tune the details until it feels right.",
    points: ["Review first draft", "Feedback & revisions", "Final approval"],
  },
  {
    title: "Final Delivery",
    Icon: Rocket,
    time: "DAY 05",
    label: "READY TO PUBLISH",
    desc: "Your finished video is exported, optimized and delivered in the formats you need. It's time to share your story with the world.",
    points: [
      "HD / 4K exports",
      "Platform-ready formats",
      "Final video delivery",
    ],
  },
];

const ProcessSection = () => {
  const [active, setActive] = useState(2);
  const [paused, setPaused] = useState(false);

  const current = STEPS[active];
  const { Icon } = current;

  // Auto play
  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % STEPS.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [paused]);

  const whatsappLink = `https://wa.me/919253174295?text=${encodeURIComponent(
    "Hello Nosh Infotech, I want to start a video editing project.",
  )}`;

  return (
    <section
      id="process"
      className="relative isolate overflow-hidden bg-white py-12 text-[#171717] sm:py-16"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-40 top-20 h-[400px] w-[400px] rounded-full bg-blue-50 blur-[120px]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[350px] w-[350px] rounded-full bg-[#f4f6ff] blur-[120px]" />

      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >        
          <h2 className="text-[36px] font-[Outfit] font-semibold leading-[0.95] tracking-[-0.075em] sm:text-[60px] xl:text-[76px]">
            Creative process.                        
          </h2>

          <p className="mt-4 max-w-[440px] text-sm leading-6 text-[#666666] sm:text-base sm:leading-7">
            From your first idea to the final export, here's how we turn raw
            footage into something worth watching.
          </p>
        </motion.div>

        {/* Interactive timeline */}
        <div
          className="mt-10 sm:mt-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Number navigation */}
          <div className="relative">
            <div className="absolute left-0 right-0 top-[45%] h-px bg-[#e9e9e9]" />

            <div className="relative flex items-center justify-between gap-1 sm:gap-4">
              {STEPS.map((step, i) => {
                const selected = active === i;

                return (
                  <button
                    key={step.title}
                    onClick={() => setActive(i)}
                    aria-label={`View step ${i + 1}: ${step.title}`}
                    className="group relative flex flex-1 flex-col items-center outline-none"
                  >
                    {/* Number */}
                    <motion.span
                      animate={{
                        color: selected ? "#171717" : "#d5d5d5",
                        scale: selected ? 1 : 0.92,
                      }}
                      transition={{ duration: 0.4 }}
                      className="relative z-10 select-none font-[Outfit] text-[64px] font-medium leading-none tracking-[-0.09em] sm:text-[105px] lg:text-[145px]"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </motion.span>

                    {/* Active underline */}
                    <motion.div
                      animate={{
                        opacity: selected ? 1 : 0,
                        scaleX: selected ? 1 : 0.3,
                      }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10 mt-2 h-[3px] w-8 origin-center rounded-full bg-blue-600 sm:w-14"
                    />

                    {/* Label */}
                    <span
                      className={`mt-2 hidden font-mono text-[9px] tracking-[0.14em] transition-colors sm:block ${
                        selected ? "text-blue-600" : "text-[#c0c0c0]"
                      }`}
                    >
                      STEP {String(i + 1).padStart(2, "0")}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Details card */}
          <div className="relative mt-6 overflow-hidden rounded-xl border border-[#e9e9e5] bg-[#fafaf8] p-4 sm:p-6 lg:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-center"
              >
                {/* Main content */}
                <div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
                      <Icon size={17} strokeWidth={1.7} />
                    </span>

                    <div>
                      <p className="font-mono text-[9px] tracking-[0.17em] text-blue-600">
                        {current.label}
                      </p>

                      <p className="mt-0.5 text-[10px] text-[#666666]">
                        {current.time}
                      </p>
                    </div>
                  </div>

                  <h3 className="mt-5 text-3xl font-semibold tracking-[-0.07em] sm:text-5xl lg:text-6xl">
                    {current.title}
                  </h3>

                  <p className="mt-3 max-w-[510px] text-sm leading-6 text-[#666666] sm:text-[15px] sm:leading-7">
                    {current.desc}
                  </p>
                </div>

                {/* Points */}
                <div className="relative lg:border-l lg:border-[#e5e5e0] lg:pl-8">
                  <p className="mb-5 font-mono text-[9px] tracking-[0.18em] text-[#666666]">
                    WHAT HAPPENS IN THIS STEP
                  </p>

                  <div className="space-y-3">
                    {current.points.map((point, i) => (
                      <motion.div
                        key={point}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                          <Check size={11} strokeWidth={2.5} />
                        </span>

                        <span className="text-sm font-medium text-[#333]">
                          {point}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Next step */}
                  <div className="mt-6 flex items-center gap-2 border-t border-[#e5e5e0] pt-4">
                    <span className="font-mono text-[9px] tracking-[0.14em] text-[#666666]">
                      NEXT
                    </span>

                    <span className="text-xs font-medium text-[#555]">
                      {STEPS[(active + 1) % STEPS.length].title}
                    </span>

                    <ArrowUpRight size={13} className="text-blue-600" />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Autoplay progress */}
            {!paused && (
              <motion.div
                key={`progress-${active}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 4, ease: "linear" }}
                className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-blue-600"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProcessSection;