import { motion } from "motion/react";
import {
  ArrowUpRight,
  Check,
  Zap,
  Scissors,
  Plus,
} from "lucide-react";

const plans = [
  {
    name: "Simple Editing",
    price: "₹1,199",
    duration: "Up to 40 sec",
    desc: "Clean, engaging editing for creators and businesses who want professional short-form content.",
    features: [
      "1 Video edit up to 40 sec",
      "Vertical video (9:16)",
      "Clean cuts & transitions",
      "Background music",
      "Basic color correction",
      "Sound synchronization",
      "2 Revisions",
    ],
  },
  {
    name: "Motion Graphics",
    price: "₹1,999",
    duration: "Up to 45 sec",
    featured: true,
    desc: "Dynamic editing with motion graphics, animations and creative effects to make your content stand out.",
    features: [
      "1 Video edit up to 45 sec",
      "Advanced transitions",
      "Motion graphics & animation",
      "Animated text & captions",
      "Professional color grading",
      "Sound effects & music",
      "3 Revisions",
    ],
  },
  {
    name: "Long Video",
    price: "₹2,999",
    duration: "3–4 minutes",
    desc: "Story-driven video editing with smooth pacing, cinematic visuals and polished professional finishing.",
    features: [
      "1 Video edit (3–4 minutes)",
      "Professional storytelling",
      "Smooth cuts & transitions",
      "Color grading",
      "Background music & sound design",
      "Text & title animations",
      "3 Revisions",
    ],
  },
];

const PricingSection = () => {
  return (
    <section
      id="pricing"
      className="relative isolate overflow-hidden bg-[#050505]  text-white py-14 lg:py-20"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-10 lg:px-16">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <h2 className="font-['Outfit'] text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[58px]">
            Videos Edited.
            <span className="block text-blue-500">
              <span className="font-serif italic">S</span>tories Delivered.
            </span>
          </h2>
        </motion.div>

        {/* Pricing Cards */}
        <div className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-3 lg:items-center lg:gap-5">
          {plans.map((plan, index) => {
            const f = plan.featured;

            const card = (
              <div
                className={`flex flex-col rounded-3xl p-6 sm:p-7 ${
                  f
                    ? "border border-white/10 bg-[#0d0d12]"
                    : "border border-white/10 bg-white/[0.04] backdrop-blur-sm"
                }`}
              >
                <h3 className="font-['Outfit'] text-lg font-semibold text-white">
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="mt-4 flex items-end gap-1.5">
                  <span className="font-['Outfit'] text-5xl font-semibold tracking-tight sm:text-6xl">
                    {plan.price}
                  </span>
                  <span className="mb-2 text-sm text-white/50">
                    / video
                  </span>
                </div>

                {/* Duration */}
                <div className="mt-2 flex items-center gap-2 text-sm text-blue-400">
                  <Scissors size={14} />
                  <span>{plan.duration}</span>
                </div>

                {/* Description */}
                <p className="mt-4 min-h-[60px] text-sm leading-6 text-white/50">
                  {plan.desc}
                </p>

                {/* WhatsApp CTA */}
                <a
                  href={`https://wa.me/919253174295?text=${encodeURIComponent(
                    `Hello, I'm interested in the ${plan.name} video editing package (${plan.price}, ${plan.duration}). I'd like to discuss the details and get started.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold transition-all duration-300 ${
                    f
                      ? "bg-blue-600 text-white shadow-[0_10px_30px_-10px_rgba(37,99,235,0.9)] hover:bg-blue-500"
                      : "bg-blue-500/15 text-blue-300 hover:bg-blue-600 hover:text-white"
                  }`}
                >
                  Book {plan.name}
                  <ArrowUpRight size={16} />
                </a>

                {/* Features */}
                <ul className="mt-8 space-y-3.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <span
                        className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border ${
                          f
                            ? "border-blue-400 bg-blue-500/20 text-blue-300"
                            : "border-white/25 text-white/60"
                        }`}
                      >
                        <Check size={11} strokeWidth={3} />
                      </span>

                      <span className="text-sm text-white/75">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {f ? (
                  <div className="rounded-[30px] border border-blue-500/30 bg-blue-500/15 p-1.5 pt-0 shadow-[0_30px_80px_-30px_rgba(37,99,235,0.6)]">
                    <div className="flex h-11 items-center justify-center gap-2 text-sm font-semibold text-blue-300">
                      <Zap size={15} fill="currentColor" />
                      Most Recommended
                    </div>
                    {card}
                  </div>
                ) : (
                  card
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Combo Banner */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mt-14 flex flex-col justify-between gap-7 overflow-hidden rounded-3xl bg-blue-600 p-6 sm:p-8 lg:flex-row lg:items-center"
        >
          <div className="pointer-events-none absolute -right-12 -top-20 h-56 w-56 rounded-full border border-white/15" />
          <div className="pointer-events-none absolute -right-4 -top-12 h-40 w-40 rounded-full border border-white/15" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex shrink-0 items-center gap-2">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-black">
                <Scissors size={24} />
              </span>

              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white">
                <Plus size={15} />
              </span>

              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white">
                <Scissors size={24} />
              </span>
            </div>

            <div>
              <h3 className="font-['Outfit'] text-xl font-semibold sm:text-2xl">
                Need multiple videos{" "}
                <span className="font-serif italic">or</span> a custom package?
              </h3>

              <p className="mt-2 max-w-xl text-sm leading-6 text-white/80">
                Get custom pricing for bulk Reels, long videos, monthly editing
                and complete content packages tailored to your needs.
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/919253174295?text=${encodeURIComponent(
              "Hello, I would like to get a custom video editing quote for my project."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
          >
            Get Custom Quote
            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;