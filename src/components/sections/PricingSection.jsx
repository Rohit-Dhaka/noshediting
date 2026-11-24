import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Check,
  ArrowUpRight,
  Smartphone,
  Film,
  Megaphone,
  Sparkles,
} from "lucide-react";

const TABS = [
  { id: "reels", label: "Reels", Icon: Smartphone, unit: "VIDEO" },
  { id: "youtube", label: "YouTube", Icon: Film, unit: "VIDEO" },
  { id: "ads", label: "Ads", Icon: Megaphone, unit: "AD" },
];

const PLANS = {
  reels: [
    {
      name: "Starter",
      price: "499",
      desc: "Perfect for starting your content journey.",
      features: [
        "Up to 30 sec video",
        "Clean cuts & transitions",
        "Captions",
        "Basic sound design",
        "1 revision",
        "24h delivery",
      ],
    },
    {
      name: "Professional",
      price: "999",
      desc: "Made to grab attention and keep people watching.",
      features: [
        "Up to 60 sec video",
        "Hook-focused editing",
        "Animated captions",
        "Color grading",
        "Sound effects",
        "3 revisions",
      ],
      popular: true,
    },
    {
      name: "Premium",
      price: "1,999",
      desc: "High-end visuals with cinematic details.",
      features: [
        "Up to 90 sec video",
        "Advanced editing",
        "Motion graphics",
        "Cinematic color grading",
        "Custom sound design",
        "Priority delivery",
      ],
    },
  ],

  youtube: [
    {
      name: "Starter",
      price: "1,999",
      desc: "A clean edit that keeps your story flowing.",
      features: [
        "Up to 5 min video",
        "Cuts & jump cuts",
        "Basic color correction",
        "Background music",
        "Sound cleanup",
        "2 revisions",
      ],
    },
    {
      name: "Professional",
      price: "3,999",
      desc: "Story-driven edits for better viewer retention.",
      features: [
        "Up to 12 min video",
        "B-roll integration",
        "Smooth transitions",
        "Color grading",
        "Sound design",
        "3 revisions",
      ],
      popular: true,
    },
    {
      name: "Premium",
      price: "7,999",
      desc: "A cinematic experience for serious creators.",
      features: [
        "Up to 25 min video",
        "Advanced storytelling",
        "Motion graphics",
        "Advanced color grade",
        "Full audio mix",
        "Priority delivery",
      ],
    },
  ],

  ads: [
    {
      name: "Starter",
      price: "1,499",
      desc: "Simple videos built around your offer.",
      features: [
        "Up to 30 sec video",
        "Hook & offer text",
        "Product-focused editing",
        "Music & SFX",
        "1 format",
        "2 revisions",
      ],
    },
    {
      name: "Professional",
      price: "2,999",
      desc: "Creative ads designed to drive action.",
      features: [
        "Up to 45 sec video",
        "UGC-style editing",
        "9:16 & 1:1 formats",
        "Color grading",
        "A/B hook variation",
        "3 revisions",
      ],
      popular: true,
    },
    {
      name: "Premium",
      price: "5,999",
      desc: "A complete promo built for your brand.",
      features: [
        "Up to 60 sec video",
        "Premium visual editing",
        "Motion graphics",
        "All aspect ratios",
        "3 hook variations",
        "Priority delivery",
      ],
    },
  ],
};

const PricingSection = () => {
  const [tab, setTab] = useState("reels");

  const activeTab = TABS.find((t) => t.id === tab);

  const getLink = (plan) =>
    `https://wa.me/919253174295?text=${encodeURIComponent(
      `Hello Nosh Infotech, I want the ${plan} package for ${activeTab.label} editing.`,
    )}`;

  const customLink = `https://wa.me/919253174295?text=${encodeURIComponent(
    "Hello Nosh Infotech, I need a custom quote for a video editing project.",
  )}`;

  return (
    <section
      id="price"
      className="relative isolate overflow-hidden bg-black py-20 text-white sm:py-16"
    >
      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-16">
        {/* Header */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl font-[Outfit] text-5xl font-semibold leading-[0.95] tracking-[-0.07em] sm:text-7xl lg:text-[100px]"
          >
            Plans. Pricing. Quality.
            {/* <br />
            <span className="bg-gradient-to-r from-blue-300 via-blue-500 to-cyan-300 bg-clip-text text-transparent">
              next visual.
            </span> */}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 max-w-lg text-sm leading-7 text-white/70 sm:text-base"
          >
            Transparent packages. Thoughtful editing. Everything your content
            needs to stand out.
          </motion.p>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-6 flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur-xl"
          >
            {TABS.map(({ id, label, Icon }) => {
              const selected = tab === id;

              return (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={`relative flex items-center gap-2 rounded-full px-4 py-2.5 text-xs transition-colors sm:px-6 ${
                    selected ? "text-white" : "text-white/70 hover:text-white"
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="pricing-pill"
                      className="absolute inset-0 rounded-full border border-blue-400/20 bg-blue-500/15"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}

                  <span className="relative z-10 flex items-center gap-2">
                    <Icon
                      size={14}
                      className={selected ? "text-blue-400" : ""}
                    />
                    {label}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Pricing cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="mt-8 grid items-stretch gap-5 lg:grid-cols-3 lg:gap-6"
          >
            {PLANS[tab].map((plan, index) => (
              <motion.div
                key={`${tab}-${plan.name}`}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.12, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className={`group relative flex flex-col overflow-hidden rounded-[28px] border backdrop-blur-2xl ${
                  plan.popular
                    ? "border-blue-300/30 bg-[#101721]/90 shadow-[0_0_70px_-20px_rgba(59,130,246,0.3)]"
                    : "border-white/[0.12] bg-white/[0.035] hover:border-white/20"
                }`}
              >
                {/* Card glow */}
                {plan.popular && (
                  <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/15 blur-[100px]" />
                )}

                {/* Recommended label */}
                <div className="relative z-10 min-h-[38px] px-7 pt-5 sm:px-8">
                  {plan.popular && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/25 bg-blue-500/10 px-3 py-1 text-[9px] font-medium tracking-[0.14em] text-blue-300">
                      <Sparkles size={11} />
                      MOST POPULAR
                    </span>
                  )}
                </div>

                {/* Plan details */}
                <div className="relative z-10 px-7 pb-5 sm:px-8">
                  <h3 className="text-sm text-white/55">{plan.name}</h3>

                  <div className="mt-1 flex items-end gap-1">
                    <span className="mb-2 text-xl text-white/60">₹</span>

                    <span className="text-[52px] font-medium leading-none tracking-[-0.075em] sm:text-[60px]">
                      {plan.price}
                    </span>
                  </div>

                  <p className="mt-2 font-mono text-[9px] tracking-[0.15em] text-white/70">
                    / PER {activeTab.unit}
                  </p>

                  <p className="mt-5 min-h-[42px] max-w-[270px] text-xs leading-5 text-white/70">
                    {plan.desc}
                  </p>
                </div>

                {/* Divider */}
                <div className="relative z-10 mx-7 border-t border-white/[0.10] sm:mx-8" />

                {/* Features */}
                <div className="relative z-10 px-7 py-6 sm:px-8">
                  <p className="mb-5 font-mono text-[9px] tracking-[0.18em] text-white/70">
                    WHAT'S INCLUDED
                  </p>

                  <ul className="space-y-4">
                    {plan.features.map((feature, i) => (
                      <motion.li
                        key={feature}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.04 }}
                        className="flex items-center gap-3 text-xs text-white/70"
                      >
                        <span
                          className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full ${
                            plan.popular
                              ? "bg-blue-500/15 text-blue-400"
                              : "bg-white/[0.07] text-white/65"
                          }`}
                        >
                          <Check size={12} strokeWidth={2.5} />
                        </span>

                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Button */}
                <div className="relative z-10 mt-auto px-7 pb-7 pt-3 sm:px-8 sm:pb-8">
                  <a
                    href={getLink(plan.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group/btn flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-xs font-medium transition-all duration-300 ${
                      plan.popular
                        ? "bg-white text-black hover:bg-blue-100"
                        : "bg-white/[0.07] text-white hover:bg-white hover:text-black"
                    }`}
                  >
                    Choose Plan
                    <ArrowUpRight
                      size={15}
                      className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                    />
                  </a>
                </div>

                {/* Bottom edge glow */}
                {plan.popular && (
                  <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-400/70 to-transparent" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Custom quote */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 text-center sm:flex-row"
        >
          <p className="text-sm text-white/70">
            Need something beyond these packages?
          </p>

          <a
            href={customLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
          >
            Let's create a custom plan
            <ArrowUpRight size={15} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
