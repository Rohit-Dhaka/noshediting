
import { motion } from "motion/react";
import {
  MessageCircle,
  Upload,
  Scissors,
  RefreshCcw,
  Rocket,
  ArrowUpRight,
  Crosshair,
  Check,
} from "lucide-react";

const STEPS = [
  {
    title: "Brief & Plan",
    Icon: MessageCircle,
    time: "DAY 0",
    desc: "Share your vision, reference videos and target platform. We understand your goals and create a clear editing direction before starting.",
    points: ["Goal & audience", "Reference videos", "Style & music"],
  },
  {
    title: "Share Footage",
    Icon: Upload,
    time: "DAY 0–1",
    desc: "Send your raw footage, logo and brand assets through Google Drive or WhatsApp. We organize everything to keep the workflow smooth.",
    points: ["Drive / WhatsApp", "Logo & brand assets", "Scripts & captions"],
  },
  {
    title: "Edit & Grade",
    Icon: Scissors,
    time: "DAY 1–3",
    desc: "Our editors bring your footage to life with precise cuts, smooth transitions, professional color grading and engaging motion graphics.",
    points: ["Cuts & pacing", "Color grading", "Sound & motion"],
  },
  {
    title: "Review & Revise",
    Icon: RefreshCcw,
    time: "DAY 3–4",
    desc: "Review the first draft and share your feedback. We refine the details and make revisions to bring your vision to life.",
    points: ["Frame-wise feedback", "Quick revisions", "Final approval"],
  },
  {
    title: "Final Delivery",
    Icon: Rocket,
    time: "DAY 4–5",
    desc: "Get your final video, professionally exported and optimized for your chosen platforms. Ready to publish and make an impact.",
    points: ["4K / HD export", "9:16, 1:1, 16:9", "Source files on request"],
  },
];

const pad = (n) => String(n).padStart(2, "0");

const ProcessSection = () => {
  const whatsappLink = `https://wa.me/919253174295?text=${encodeURIComponent(
    "Hello Nosh Infotech, I want to start a video editing project.",
  )}`;

  return (
    <section
      id="process"
      className="relative isolate overflow-x-clip bg-[#f8f8f5] py-20 text-[#171717] sm:py-28"
    >
     

      {/* Decorative circles */}
      <div className="pointer-events-none absolute left-[-100px] top-[35%] h-[250px] w-[250px] rounded-full border border-[#e8e8e2]" />
      <div className="pointer-events-none absolute right-[-80px] bottom-[10%] h-[200px] w-[200px] rounded-full border border-[#e8e8e2]" />

      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl"
        >      

          <h2 className="text-[44px] font-[Outfit] font-semibold leading-[0.98] tracking-[-0.075em] sm:text-[72px] xl:text-[96px]">
            From raw clips
            <br />
            to{" "}
            <span className="relative inline-block text-blue-600">
              final cut
              <motion.span
                animate={{ rotate: [0, 90, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -right-7 top-0 text-[#171717]"
              >
                <ArrowUpRight size={22} strokeWidth={1.5} />
              </motion.span>
            </span>
            <span className="text-[#b7b7b0]"> in 5 steps.</span>
          </h2>

          <p className="mt-6 max-w-[470px] text-sm leading-7 text-[#777771] sm:text-base">
            A simple, transparent and creative workflow that turns your raw
            footage into content worth watching.
          </p>
        </motion.div>

        {/* Process Cards */}
        <div className="mt-16 pb-6 sm:mt-20">
          {STEPS.map((s, i) => {
            const { Icon } = s;
            const isLast = i === STEPS.length - 1;

            return (
              <div
                key={s.title}
                className="sticky mb-6 sm:mb-10"
                style={{ top: `${85 + i * 18}px` }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 45 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.7,
                    delay: 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`group relative grid gap-6 overflow-hidden rounded-xl border p-6 transition-all duration-500 sm:p-10 lg:grid-cols-[auto_1.2fr_1fr] lg:items-center lg:gap-14 ${
                    isLast
                      ? "border-blue-600 bg-blue-600 text-white shadow-[0_20px_60px_-25px_rgba(37,99,235,0.4)]"
                      : "border-[#e9e9e4] bg-white text-[#171717] shadow-[0_12px_40px_-25px_rgba(0,0,0,0.18)] hover:border-blue-200"
                  }`}
                >
                  {/* Soft card decoration */}
                  <div
                    className={`pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full border ${
                      isLast ? "border-white/10" : "border-[#f1f1ed]"
                    }`}
                  />
                  <div
                    className={`pointer-events-none absolute -right-4 -top-4 h-32 w-32 rounded-full border ${
                      isLast ? "border-white/10" : "border-[#f1f1ed]"
                    }`}
                  />

                  {/* Number */}
                  <div className="relative z-10">
                    <span
                      className="select-none text-[72px] font-black leading-none tracking-[-0.09em] sm:text-[120px] lg:text-[150px]"
                      style={{
                        color: "transparent",
                        WebkitTextStroke: isLast
                          ? "1.5px rgba(255,255,255,0.8)"
                          : "1.5px #2563eb",
                      }}
                    >
                      {pad(i + 1)}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <p
                      className={`font-mono text-[10px] font-medium tracking-[0.22em] ${
                        isLast ? "text-white/65" : "text-[#aaa9a2]"
                      }`}
                    >
                      STEP {pad(i + 1)} / {s.time}
                    </p>

                    <h3 className="mt-3 text-3xl font-semibold tracking-[-0.065em] sm:text-5xl">
                      {s.title}
                    </h3>

                    <p
                      className={`mt-4 max-w-[480px] text-sm leading-7 sm:text-[15px] ${
                        isLast ? "text-white/80" : "text-[#85857e]"
                      }`}
                    >
                      {s.desc}
                    </p>
                  </div>

                  {/* Points */}
                  <div className="relative z-10 flex items-start justify-between gap-5">
                    <ul className="space-y-3">
                      {s.points.map((p) => (
                        <li
                          key={p}
                          className="flex items-center gap-3 text-sm font-medium"
                        >
                          <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                              isLast
                                ? "bg-white text-blue-600"
                                : "bg-blue-50 text-blue-600"
                            }`}
                          >
                            <Check size={12} strokeWidth={3} />
                          </span>
                          {p}
                        </li>
                      ))}
                    </ul>

                    <span
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border transition-transform duration-500 group-hover:rotate-[-12deg] sm:h-16 sm:w-16 ${
                        isLast
                          ? "border-white/30 bg-white/10"
                          : "border-[#e9e9e4] bg-[#f8f8f5]"
                      }`}
                    >
                      <Icon
                        size={25}
                        strokeWidth={1.4}
                        className={isLast ? "text-white" : "text-blue-600"}
                      />
                    </span>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative flex flex-col items-start justify-between gap-7 overflow-hidden rounded-xl border border-[#e9e9e4] bg-white p-7 shadow-[0_15px_50px_-35px_rgba(0,0,0,0.25)] sm:flex-row sm:items-center sm:p-10"
        >
          {/* CTA decoration */}
          <div className="pointer-events-none absolute -right-10 -top-20 h-64 w-64 rounded-full border border-blue-100" />
          <div className="pointer-events-none absolute -right-2 -top-12 h-48 w-48 rounded-full border border-blue-100" />

          <div className="relative z-10">
            <p className="text-2xl font-semibold tracking-[-0.055em] sm:text-4xl">
              Ready to start step 01?
            </p>
            <p className="mt-2 text-sm leading-6 text-[#85857e]">
              Tell us about your next creative project.
            </p>
          </div>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative z-10 inline-flex shrink-0 items-center gap-3 rounded-full bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#171717]"
          >
            Start on WhatsApp
            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
