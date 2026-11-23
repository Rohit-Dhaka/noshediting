
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Check,
  ArrowUpRight,
  Crosshair,
  Smartphone,
  Film,
  Megaphone,
  Sparkles,
  MoveUpRight,
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
      desc: "A clean, engaging edit to get your content moving.",
      features: [
        "Up to 30 sec",
        "Basic cuts & transitions",
        "Captions",
        "1 revision",
        "24h delivery",
      ],
    },
    {
      name: "Pro",
      price: "999",
      desc: "Built to grab attention and keep viewers watching.",
      features: [
        "Up to 60 sec",
        "Hook & trending style",
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
      desc: "A high-end visual experience with cinematic details.",
      features: [
        "Up to 90 sec",
        "Motion graphics",
        "Advanced color grade",
        "Custom sound design",
        "Unlimited revisions",
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
        "Up to 5 min",
        "Cuts & jump cuts",
        "Basic color correction",
        "Background music",
        "2 revisions",
      ],
    },
    {
      name: "Pro",
      price: "3,999",
      desc: "Story-driven editing designed to improve watch time.",
      features: [
        "Up to 12 min",
        "B-roll & transitions",
        "Color grading",
        "Sound design",
        "Thumbnail-ready cut",
        "3 revisions",
      ],
      popular: true,
    },
    {
      name: "Premium",
      price: "7,999",
      desc: "A cinematic experience for serious content creators.",
      features: [
        "Up to 25 min",
        "Motion graphics & titles",
        "Advanced grading",
        "Full audio mix",
        "Unlimited revisions",
        "Priority delivery",
      ],
    },
  ],
  ads: [
    {
      name: "Starter",
      price: "1,499",
      desc: "Simple product videos built around your offer.",
      features: [
        "Up to 30 sec",
        "Hook & offer text",
        "1 aspect ratio",
        "Music & SFX",
        "2 revisions",
      ],
    },
    {
      name: "Pro",
      price: "2,999",
      desc: "Creative ad edits built to drive more action.",
      features: [
        "Up to 45 sec",
        "UGC style edit",
        "9:16 + 1:1 exports",
        "Color grading",
        "A/B hook variant",
        "3 revisions",
      ],
      popular: true,
    },
    {
      name: "Premium",
      price: "5,999",
      desc: "A complete brand promo designed to stand out.",
      features: [
        "Up to 60 sec",
        "Motion graphics",
        "All aspect ratios",
        "Custom sound design",
        "3 hook variants",
        "Unlimited revisions",
      ],
    },
  ],
};

const PricingSection = () => {
  const [tab, setTab] = useState("reels");
  const active = TABS.find((t) => t.id === tab);

  const getLink = (plan) =>
    `https://wa.me/919253174295?text=${encodeURIComponent(
      `Hello Nosh Infotech, I want the ${plan} plan for ${active.label} editing.`,
    )}`;

  const customLink = `https://wa.me/919253174295?text=${encodeURIComponent(
    "Hello Nosh Infotech, I need a custom quote for a video editing project.",
  )}`;

  return (
    <section
      id="pricing"
      className="relative isolate overflow-hidden bg-[#090b10] py-20 text-white sm:py-28"
    >
   

      
      
    

   

      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-16">

       

        {/* Heading area */}
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/[0.07] px-3 py-1.5">
              <Sparkles size={12} className="text-blue-400" />
              <span className="font-mono text-[9px] tracking-[0.2em] text-blue-300">
                EDIT WITH INTENTION
              </span>
            </div>

            <h2 className="text-[48px] font-[Outfit] font-semibold leading-[0.9] tracking-[-0.08em] sm:text-[80px] xl:text-[108px]">
              Good visuals.
              <br />
              <span className="text-white/30">Better </span>
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
                impact.
              </span>
            </h2>

            <p className="mt-6 max-w-[420px] text-sm leading-7 text-white/45 sm:text-base">
              Flexible editing packages for creators and brands that want
              to turn ordinary footage into extraordinary content.
            </p>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex w-fit flex-wrap gap-1.5 rounded-xl border border-white/10 bg-white/[0.035] p-1.5 backdrop-blur-xl"
          >
            {TABS.map(({ id, label, Icon }) => {
              const selected = tab === id;

              return (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={`relative flex items-center gap-2 rounded-lg px-4 py-3 text-xs font-medium transition-colors sm:px-5 ${
                    selected
                      ? "text-white"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="darkPricingTab"
                      className="absolute inset-0 rounded-lg border border-blue-400/30 bg-blue-500/15 shadow-[0_0_25px_rgba(59,130,246,0.08)]"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon size={15} className={selected ? "text-blue-400" : ""} />
                    {label}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Plan cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="mt-16 grid gap-5 lg:grid-cols-3 lg:gap-6"
          >
            {PLANS[tab].map((p, i) => (
              <motion.div
                key={`${tab}-${p.name}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border p-6 sm:p-8 ${
                  p.popular
                    ? "border-blue-500/40 bg-[#101725] shadow-[0_0_60px_-20px_rgba(37,99,235,0.25)]"
                    : "border-white/[0.08] bg-[#0e1118] hover:border-white/20"
                }`}
              >
                {/* Popular card glow */}
                {p.popular && (
                  <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/[0.10] blur-[80px]" />
                )}
                                            
                {/* Plan name */}
                <div className="relative z-10 mt-7">
                  <h3 className="text-3xl font-semibold tracking-[-0.06em] sm:text-4xl">
                    {p.name}
                  </h3>
                  <p className="mt-3 min-h-[48px] max-w-[280px] text-sm leading-6 text-white/40">
                    {p.desc}
                  </p>
                </div>

                {/* Price block */}
                <div className="relative z-10 mt-8 border-y border-white/[0.08] py-7">
                  <div className="flex items-start gap-1">
                    <span className="mt-2 text-lg font-medium text-white/65">
                      ₹
                    </span>
                    <span className="text-[64px] font-semibold leading-[0.88] tracking-[-0.085em] sm:text-[76px]">
                      {p.price}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="h-1 w-6 rounded-full bg-blue-500" />
                    <span className="font-mono text-[9px] tracking-[0.15em] text-white/30">
                      PER {active.unit}
                    </span>
                  </div>
                </div>

                {/* Features header */}
                <div className="relative z-10 mt-7 flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/50">
                    Included features
                  </span>
                  <span className="font-mono text-[9px] text-white/25">
                    {String(p.features.length).padStart(2, "0")} ITEMS
                  </span>
                </div>

                {/* Feature list */}
                <ul className="relative z-10 mt-5 flex-1 space-y-4">
                  {p.features.map((f, index) => (
                    <motion.li
                      key={f}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + index * 0.04 }}
                      className="flex items-center gap-3 text-sm text-white/70"
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md ${
                          p.popular
                            ? "bg-blue-500/15 text-blue-400"
                            : "bg-white/[0.05] text-blue-400"
                        }`}
                      >
                        <Check size={12} strokeWidth={2.5} />
                      </span>
                      {f}
                    </motion.li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={getLink(p.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative z-10 mt-9 flex items-center justify-between rounded-xl px-5 py-4 text-sm font-semibold transition-all duration-300 ${
                    p.popular
                      ? "bg-blue-600 text-white shadow-[0_8px_30px_-10px_rgba(37,99,235,0.6)] hover:bg-blue-500"
                      : "border border-white/10 bg-white/[0.04] text-white hover:border-blue-500/40 hover:bg-blue-500/10"
                  }`}
                >
                  <span>{p.popular ? "Choose recommended" : "Select package"}</span>
                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </a>

           
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

   
      </div>
    </section>
  );
};

export default PricingSection;
