
import { useMemo, useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import { CATEGORIES, PROJECTS } from "../../data/portfolioData";

import { ArrowRight, ArrowUpRight, Play, X } from "lucide-react";

import "swiper/css";

/* =========================================================
   COLUMN SETTINGS
========================================================= */

const COLUMNS = [
  { reverse: false, speed: 10000 },
  { reverse: true, speed: 12000 },
  { reverse: false, speed: 11000 },
];

const MASK =
  "linear-gradient(to bottom, transparent 0%, #000 10%, #000 90%, transparent 100%)";

/* =========================================================
   RANDOM SHUFFLE
   Shuffle projects without repeating any video
========================================================= */

const shuffleProjects = (projects) => {
  const shuffled = [...projects];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

/* =========================================================
   DISTRIBUTE RANDOM VIDEOS INTO 3 UNIQUE COLUMNS
========================================================= */

const distributeProjects = (projects, columnCount = 3) => {
  const columns = Array.from({ length: columnCount }, () => []);

  projects.forEach((project, index) => {
    columns[index % columnCount].push(project);
  });

  return columns;
};

/* =========================================================
   CLOUDINARY OPTIMIZATION
========================================================= */

const optimize = (url, width = 360) =>
  url?.includes("/upload/")
    ? url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`)
    : url;

const optimizeFull = (url) =>
  url?.includes("/upload/")
    ? url.replace("/upload/", "/upload/f_auto,q_auto/")
    : url;

const makePoster = (url, width = 360) =>
  url?.includes("/upload/")
    ? url
        .replace(
          "/upload/",
          `/upload/so_0,f_auto,q_auto,w_${width}/`
        )
        .replace(/\.(mp4|mov|webm)$/i, ".jpg")
    : undefined;

/* =========================================================
   VIDEO THUMBNAIL
========================================================= */

const ReelThumb = ({ src, projectId }) => {
  const videoRef = useRef(null);

  const [inView, setInView] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;

        setInView(visible);

        if (visible) {
          setShouldLoad(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, [projectId]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    if (inView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inView, shouldLoad]);

  return (
    <video
      key={projectId}
      ref={videoRef}
      src={shouldLoad ? optimize(src, 360) : undefined}
      poster={makePoster(src, 360)}
      muted
      loop
      playsInline
      preload="none"
      onError={(e) => {
        e.currentTarget.pause();
      }}
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
  );
};

/* =========================================================
   MAIN SECTION
========================================================= */

const PortfolioSection = () => {
  const [activeProject, setActiveProject] = useState(null);

  /* REMOVE DUPLICATES + RANDOMIZE */

  const shuffledProjects = useMemo(() => {
    const source = Array.isArray(PROJECTS) ? PROJECTS : [];

    const seenIds = new Set();
    const seenUrls = new Set();

    const uniqueProjects = source.filter((project) => {
      if (!project?.videoUrl || !project?.id) return false;

      const normalizedUrl = project.videoUrl.trim();

      if (seenIds.has(project.id) || seenUrls.has(normalizedUrl)) {
        return false;
      }

      seenIds.add(project.id);
      seenUrls.add(normalizedUrl);

      return true;
    });

    return shuffleProjects(uniqueProjects);
  }, []);

  /* DISTRIBUTE RANDOM VIDEOS INTO 3 COLUMNS */

  const columnProjects = useMemo(
    () => distributeProjects(shuffledProjects, 3),
    [shuffledProjects]
  );

  /* MODAL BODY SCROLL LOCK + ESCAPE */

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (activeProject) {
      document.body.style.overflow = "hidden";
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setActiveProject(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [activeProject]);

  /* RANDOM NEXT PROJECT - NO IMMEDIATE REPEAT */

  const handleNext = () => {
    if (!activeProject || shuffledProjects.length <= 1) return;

    const remainingProjects = shuffledProjects.filter(
      (project) => project.id !== activeProject.id
    );

    const randomIndex = Math.floor(
      Math.random() * remainingProjects.length
    );

    setActiveProject(remainingProjects[randomIndex]);
  };

  if (!shuffledProjects.length) return null;

  return (
    <section
      id="videos"
      className="relative overflow-hidden bg-[#08090c] py-14 text-white sm:py-20 lg:py-24"
    >
      {/* SWIPER STYLE */}

      <style>{`
        .reel-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
        }

        .reel-swiper .swiper-slide {
          height: auto;
        }

        .reel-swiper {
          overflow: hidden;
        }
      `}</style>

      {/* BACKGROUND GLOW */}

      <div className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-blue-500/[0.06] blur-[120px]" />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16 xl:gap-20">

          {/* ================= VIDEO GRID ================= */}

          <div
            className="order-2 grid h-[400px] grid-cols-3 gap-2.5 sm:h-[520px] sm:gap-4 lg:order-1 lg:h-[620px]"
            style={{
              maskImage: MASK,
              WebkitMaskImage: MASK,
            }}
          >
            {COLUMNS.map((col, colIndex) => {
              const items = columnProjects[colIndex] || [];

              return (
                <div
                  key={`column-${colIndex}`}
                  className="h-full min-h-0 w-full"
                >
                  <Swiper
                    key={`swiper-${colIndex}`}
                    direction="vertical"
                    modules={[Autoplay]}
                    slidesPerView={2.35}
                    spaceBetween={10}
                    loop={false}
                    allowTouchMove={false}
                    speed={col.speed}
                    autoplay={
                      items.length > 1
                        ? {
                            delay: 0,
                            disableOnInteraction: false,
                            reverseDirection: col.reverse,
                            pauseOnMouseEnter: false,
                            stopOnLastSlide: true,
                          }
                        : false
                    }
                    style={{ height: "100%" }}
                    className="reel-swiper"
                  >
                    {items.map((project) => (
                      <SwiperSlide key={`project-${project.id}`}>
                        <div
                          onClick={() => setActiveProject(project)}
                          className="group relative h-full w-full cursor-pointer overflow-hidden rounded-xl border border-white/[0.08] bg-[#111319] transition-all duration-500 hover:border-blue-500/60"
                        >
                          {/* VIDEO */}

                          <ReelThumb
                            src={project.videoUrl}
                            projectId={project.id}
                          />

                          {/* OVERLAY */}

                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-black/15" />

                          {/* PLAY BUTTON */}

                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="flex h-9 w-9 scale-90 items-center justify-center rounded-full border border-white/40 bg-white/10 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 sm:h-11 sm:w-11">
                              <Play className="ml-0.5 h-3.5 w-3.5 fill-white text-white sm:h-4 sm:w-4" />
                            </div>
                          </div>

                          {/* CONTENT */}

                          <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3">
                            <p className="line-clamp-1 text-[7px] font-medium uppercase tracking-[0.14em] text-blue-300 sm:text-[9px]">
                              {project.category}
                            </p>

                            <h3 className="mt-1 line-clamp-2 text-[9px] font-semibold leading-tight text-white sm:text-xs">
                              {project.title}
                            </h3>
                          </div>

                          {/* HOVER BORDER */}

                          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/0 transition-all duration-300 group-hover:ring-blue-500/20" />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              );
            })}
          </div>

          {/* ================= CONTENT ================= */}

          <div className="order-1 text-center lg:order-2 lg:text-left">

            {/* LABEL */}

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-blue-400 sm:text-xs"
            >
              Our Portfolio
            </motion.p>

            {/* HEADING */}

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-serif text-4xl font-medium leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl"
            >
              Selected{" "}
              <span className="italic text-blue-500">
                Work
              </span>{" "}
              <span className="sm:block">
                that makes you stand out.
              </span>
            </motion.h2>

            {/* DESCRIPTION */}

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mx-auto mt-5 max-w-md text-sm leading-7 text-white/50 lg:mx-0"
            >
              Creative visuals, cinematic edits and short-form
              content crafted to grab attention in the first
              second and keep it till the last.
            </motion.p>

            {/* CTA */}

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <a
                href="https://wa.me/919253174295?text=Hi%2C%20I%20want%20to%20start%20a%20project%20with%20you."
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-md border border-white/15 px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-white transition-all duration-300 hover:border-blue-500 hover:bg-blue-600 sm:text-xs"
              >
                Start a Project

                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>

            {/* ================= STATS ================= */}

            <div className="mt-8 grid grid-cols-4 border-t border-white/10 pt-6 sm:mt-10">
              {[
                {
                  value: String(shuffledProjects.length),
                  label: "Projects",
                },
                {
                  value: String(CATEGORIES.length - 1).padStart(2, "0"),
                  label: "Categories",
                },
                {
                  value: "03",
                  label: "Formats",
                },
                {
                  value: "100%",
                  label: "Creative",
                },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className={`min-w-0 ${
                    index !== 0
                      ? "border-l border-white/10 pl-2 sm:pl-5"
                      : ""
                  }`}
                >
                  <p className="text-lg font-bold tracking-tight text-white sm:text-3xl">
                    {stat.value}
                  </p>

                  <p className="mt-1 truncate text-[7px] font-medium uppercase tracking-[0.12em] text-white/40 sm:text-[9px] sm:tracking-[0.16em]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= VIDEO MODAL ================= */}

      <AnimatePresence>
        {activeProject && (
          <motion.div
            key="portfolio-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-3 backdrop-blur-sm sm:p-5"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-5xl overflow-hidden rounded-xl border border-white/10 bg-[#101116] shadow-2xl shadow-black/50"
            >
              {/* MODAL HEADER */}

              <div className="flex items-center justify-between border-b border-white/10 px-3 py-3 sm:px-5">
                <div className="min-w-0">
                  <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-blue-400 sm:text-[9px]">
                    Nosh Infotech · Portfolio
                  </p>

                  <h3 className="mt-1 truncate text-xs font-semibold text-white sm:text-sm">
                    {activeProject.title}
                  </h3>
                </div>

                <button
                  onClick={() => setActiveProject(null)}
                  aria-label="Close video"
                  className="ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-blue-500 hover:bg-blue-600 sm:h-9 sm:w-9"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* VIDEO PLAYER */}

              <div className="aspect-video bg-black">
                <video
                  key={activeProject.videoUrl}
                  src={optimizeFull(activeProject.videoUrl)}
                  poster={makePoster(activeProject.videoUrl, 960)}
                  autoPlay
                  controls
                  playsInline
                  className="h-full w-full object-contain"
                />
              </div>

              {/* MODAL FOOTER */}

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-3 py-3 sm:px-5">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                  <p className="text-[10px] text-white/50 sm:text-xs">
                    Client:{" "}
                    <span className="font-semibold text-white">
                      {activeProject.client || "Nosh Infotech"}
                    </span>
                  </p>

                  <p className="text-[10px] text-white/50 sm:text-xs">
                    Category:{" "}
                    <span className="font-semibold text-blue-400">
                      {activeProject.category}
                    </span>
                  </p>
                </div>

                <button
                  onClick={handleNext}
                  disabled={shuffledProjects.length <= 1}
                  className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-3.5 py-2 text-[9px] font-semibold text-white transition-all duration-300 hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-40 sm:px-4 sm:text-[10px]"
                >
                  Random Project
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
