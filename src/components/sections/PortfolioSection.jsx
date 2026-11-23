import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";

import { CATEGORIES, PROJECTS } from "../../data/portfolioData";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Play,
  X,
} from "lucide-react";

import "swiper/css";
import "swiper/css/effect-coverflow";

const pad = (num) => String(num).padStart(2, "0");

const PortfolioSection = () => {
  const [category, setCategory] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [swiper, setSwiper] = useState(null);
  const [progress, setProgress] = useState(0);

  const filteredProjects = useMemo(() => {
    return category === "All"
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === category);
  }, [category]);

  const activeProject = filteredProjects[activeIndex] || filteredProjects[0];

  // Reset when category changes
  useEffect(() => {
    setActiveIndex(0);
    setProgress(0);

    if (swiper && !swiper.destroyed) {
      swiper.slideTo(0, 0);
    }
  }, [category, swiper]);

  // Modal controls and body scroll lock
  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";

    const handleEscape = (event) => {
      if (event.key === "Escape") setModalOpen(false);
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [modalOpen]);

  // Pause autoplay when modal is open
  useEffect(() => {
    if (!swiper || swiper.destroyed || !swiper.autoplay) return;

    if (modalOpen) {
      swiper.autoplay.stop();
    } else {
      swiper.autoplay.start();
    }
  }, [modalOpen, swiper]);

  if (!activeProject) return null;

  const goNext = () => swiper?.slideNext();
  const goPrev = () => swiper?.slidePrev();

  return (
    <section
      id="videos"
      className="relative overflow-hidden bg-[#08090c] py-10 text-white sm:py-14 lg:py-16"
    >
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 xl:px-12">
        {/* ================= HEADER ================= */}

     {/* ================= PORTFOLIO HEADER ================= */}

<div className="mb-6 text-center sm:mb-8">
  <motion.p
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="mb-2 text-[10px] font-medium uppercase tracking-[0.22em] text-blue-400 sm:text-xs"
  >
    Our Portfolio
  </motion.p>

  <motion.h2
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="font-serif text-4xl font-medium tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl"
  >
    Selected{" "}
    <span className="italic text-blue-500">Work.</span>
  </motion.h2>

  <motion.p
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.15 }}
    className="mx-auto mt-2 max-w-sm text-xs leading-6 text-white/45 sm:text-sm"
  >
    Creative visuals, cinematic edits and stories made to stand out.
  </motion.p>
</div>

{/* ================= CATEGORY FILTERS ================= */}

<div className="mb-6 flex justify-center sm:mb-8">
  <div className="flex max-w-full flex-wrap justify-center gap-2">
    {CATEGORIES.map((item) => (
      <button
        key={item}
        onClick={() => setCategory(item)}
        className={`rounded-full px-4 py-2 text-[10px] font-medium tracking-wide transition-all duration-300 sm:px-5 sm:text-xs ${
          category === item
            ? "bg-blue-600 text-white"
            : "border border-white/10 bg-transparent text-white/50 hover:border-white/25 hover:text-white"
        }`}
      >
        {item}
      </button>
    ))}
  </div>
</div>

        {/* ================= CENTER SLIDER ================= */}

        <div className="relative mx-auto w-full max-w-[1200px]">
          <Swiper
            key={category}
            onSwiper={setSwiper}
            onSlideChange={(instance) => {
              setActiveIndex(instance.realIndex);
              setProgress(0);
            }}
            onAutoplayTimeLeft={(_, __, remaining) => {
              setProgress(1 - remaining);
            }}
            modules={[EffectCoverflow, Autoplay]}
            effect="coverflow"
            centeredSlides={true}
            slidesPerView="auto"
            centerInsufficientSlides={true}
            loop={filteredProjects.length > 2}
            speed={700}
            grabCursor={true}
            watchSlidesProgress={true}
            autoplay={
              filteredProjects.length > 1
                ? {
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }
                : false
            }
            coverflowEffect={{
              rotate: 0,
              stretch: -20,
              depth: 140,
              modifier: 1.3,
              slideShadows: false,
            }}
            className="portfolio-overlap-swiper !overflow-visible !py-3"
          >
            {filteredProjects.map((project, index) => (
              <SwiperSlide
                key={project.id}
                className="!w-[205px] sm:!w-[250px] md:!w-[285px] lg:!w-[320px]"
              >
                {({ isActive, isPrev, isNext }) => {
                  const shouldLoadVideo = isActive || isPrev || isNext;

                  return (
                    <motion.div
                      onClick={() => {
                        if (isActive) {
                          setModalOpen(true);
                        } else {
                          swiper?.slideToLoop(index);
                        }
                      }}
                      animate={{
                        scale: isActive ? 1 : 0.9,
                        opacity: isActive ? 1 : 0.55,
                      }}
                      transition={{ duration: 0.45 }}
                      className={`group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-xl border bg-[#111319] transition-shadow duration-500 ${
                        isActive
                          ? "border-blue-500/60 shadow-[0_15px_45px_rgba(37,99,235,0.15)]"
                          : "border-white/[0.06]"
                      }`}
                    >
                      {/* Video preview */}
                      {shouldLoadVideo ? (
                        <video
                          key={project.videoUrl}
                          src={project.videoUrl}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      ) : (
                        <img
                          src={project.thumb}
                          alt={project.title}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      )}

                      {/* Overlay */}
                      <div
                        className={`absolute inset-0 transition-colors duration-300 ${
                          isActive
                            ? "bg-black/[0.08]"
                            : "bg-black/35 group-hover:bg-black/15"
                        }`}
                      />

                      {/* Card top */}
                      <div className="absolute left-3 right-3 top-3 flex items-center justify-between sm:left-4 sm:right-4 sm:top-4">
                        <span className="font-mono text-[9px] font-semibold text-white/80">
                          {pad(index + 1)} / {pad(filteredProjects.length)}
                        </span>

                        <span className="rounded-full border border-white/20 bg-black/30 px-2 py-1 text-[8px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                          {project.category}
                        </span>
                      </div>

                      {/* Play button */}
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/60 bg-white/10 backdrop-blur-md transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14">
                            <Play className="ml-0.5 h-4 w-4 fill-white text-white sm:h-5 sm:w-5" />
                          </div>
                        </motion.div>
                      )}

                      {/* Card content */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/55 to-transparent px-3 pb-4 pt-16 sm:px-4 sm:pb-5">
                        <p className="text-[8px] font-medium uppercase tracking-[0.15em] text-white/50 sm:text-[9px]">
                          {project.client}
                        </p>

                        <h3 className="mt-1.5 line-clamp-2 text-sm font-semibold leading-snug text-white sm:text-lg">
                          {project.title}
                        </h3>

                        {isActive && (
                          <div className="mt-2 flex items-center gap-1.5 text-[8px] font-semibold uppercase tracking-widest text-blue-400 sm:text-[9px]">
                            Watch video
                            <ArrowUpRight className="h-3 w-3" />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                }}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ================= COMPACT BOTTOM INFO ================= */}

        <div className="mx-auto mt-6  border-t border-white/10 pt-5 sm:mt-8 sm:pt-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            {/* Project info */}
            <div className="min-w-0 flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/35">
                    <span className="text-blue-500">
                      {pad(activeIndex + 1)}
                    </span>
                    <span className="h-px w-5 bg-white/15" />
                    {activeProject.category}
                  </div>

                  <h3 className="mt-1.5 text-xl font-bold tracking-tight sm:text-2xl">
                    {activeProject.title}
                  </h3>

                  <p className="mt-1 text-xs text-white/40">
                    {activeProject.client}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between gap-2 sm:justify-end">
              <div className="flex items-center gap-2">
                <button
                  onClick={goPrev}
                  aria-label="Previous project"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-all hover:border-blue-500 hover:bg-blue-600 sm:h-11 sm:w-11"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>

                <button
                  onClick={goNext}
                  aria-label="Next project"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white transition-all hover:bg-blue-500 sm:h-11 sm:w-11"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <button
                onClick={() => setModalOpen(true)}
                className="ml-2 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-black transition-colors hover:bg-blue-600 hover:text-white sm:px-5"
              >
                Watch Film
                <Play className="h-3 w-3 fill-current" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ================= VIDEO MODAL ================= */}

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-3 backdrop-blur-sm sm:p-5"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-5xl overflow-hidden rounded-xl border border-white/10 bg-[#101116]"
            >
              {/* Modal header */}
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5">
                <div className="min-w-0">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-blue-400">
                    Nosh Infotech · Portfolio
                  </p>

                  <h3 className="mt-1 truncate text-sm font-semibold text-white">
                    {activeProject.title}
                  </h3>
                </div>

                <button
                  onClick={() => setModalOpen(false)}
                  aria-label="Close video"
                  className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-blue-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Video */}
              <div className="aspect-video bg-black">
                <video
                  key={activeProject.videoUrl}
                  src={activeProject.videoUrl}
                  autoPlay
                  controls
                  playsInline
                  className="h-full w-full object-contain"
                />
              </div>

              {/* Modal footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-4 py-3 sm:px-5">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
                  <p className="text-xs text-white/50">
                    Client:{" "}
                    <span className="font-semibold text-white">
                      {activeProject.client}
                    </span>
                  </p>

                  <p className="text-xs text-white/50">
                    Category:{" "}
                    <span className="font-semibold text-white">
                      {activeProject.category}
                    </span>
                  </p>
                </div>

                <button
                  onClick={() => {
                    setModalOpen(false);
                    goNext();
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-[10px] font-semibold text-white transition-colors hover:bg-white hover:text-black"
                >
                  Next project
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioSection;