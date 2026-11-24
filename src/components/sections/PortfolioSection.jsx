import { useMemo, useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import { CATEGORIES, PROJECTS } from "../../data/portfolioData";

import { ArrowRight, ArrowUpRight, Play, X } from "lucide-react";

import "swiper/css";


const COLUMNS = [
  { reverse: false, offset: 0, speed: 9000 }, 
  { reverse: true, offset: 2, speed: 11000 }, 
  { reverse: false, offset: 4, speed: 10000 }, 
];


const buildColumnItems = (projects, offset, min = 8) => {
  if (!projects.length) return [];
  const rotated = projects.map(
    (_, i) => projects[(i + offset) % projects.length]
  );
  const items = [];
  while (items.length < min) items.push(...rotated);
  return items;
};

const MASK =
  "linear-gradient(to bottom, transparent 0%, #000 12%, #000 88%, transparent 100%)";




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
        .replace("/upload/", `/upload/so_0,f_auto,q_auto,w_${width}/`)
        .replace(/\.(mp4|mov|webm)$/i, ".jpg")
    : undefined;


const ReelThumb = ({ src }) => {
  const videoRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false); 

  
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setShouldLoad(true);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    if (inView) video.play().catch(() => {});
    else video.pause();
  }, [inView, shouldLoad]);

  return (
    <video
      ref={videoRef}
      src={shouldLoad ? optimize(src) : undefined}
      poster={makePoster(src)}
      muted
      loop
      playsInline
      preload="none"
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
  );
};

const PortfolioSection = () => {
  const [category, setCategory] = useState("All");
  const [activeProject, setActiveProject] = useState(null);

  const filteredProjects = useMemo(() => {
    return category === "All"
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === category);
  }, [category]);

  
  useEffect(() => {
    document.body.style.overflow = activeProject ? "hidden" : "";

    const handleEscape = (event) => {
      if (event.key === "Escape") setActiveProject(null);
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [activeProject]);

  const handleNext = () => {
    if (!activeProject) return;
    const index = filteredProjects.findIndex((p) => p.id === activeProject.id);
    setActiveProject(filteredProjects[(index + 1) % filteredProjects.length]);
  };

  if (!filteredProjects.length) return null;

  return (
    <section
      id="videos"
      className="relative overflow-hidden bg-[#08090c] py-15 text-white sm:py-20"
    >
      
      <style>{`
        .reel-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>

      
      <div className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          
          <div
            className="order-2 grid h-[440px] grid-cols-3 grid-rows-[100%] gap-3 sm:h-[540px] sm:gap-4 lg:order-1 lg:h-[620px]"
            style={{ maskImage: MASK, WebkitMaskImage: MASK }}
          >
            {COLUMNS.map((col, colIndex) => {
              const items = buildColumnItems(filteredProjects, col.offset);

              return (
                <div
                  key={`${category}-${colIndex}`}
                  className="h-full min-h-0 w-full"
                >
                  <Swiper
                    direction="vertical"
                    modules={[Autoplay]}
                    slidesPerView={2.5}
                    spaceBetween={12}
                    loop={true}
                    loopAdditionalSlides={2}
                    allowTouchMove={false}
                    speed={col.speed}
                    autoplay={{
                      delay: 0,
                      disableOnInteraction: false,
                      reverseDirection: col.reverse,
                    }}
                    style={{ height: "100%" }}
                    className="reel-swiper"
                  >
                    {items.map((project, index) => (
                      <SwiperSlide key={`${project.id}-${colIndex}-${index}`}>
                        <div
                          onClick={() => setActiveProject(project)}
                          className="group relative h-full w-full cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-[#111319] transition-colors duration-300 hover:border-blue-500/60"
                        >
                          <ReelThumb src={project.videoUrl} />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />

                          
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/10 backdrop-blur-md">
                              <Play className="ml-0.5 h-4 w-4 fill-white text-white" />
                            </div>
                          </div>

                          <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3">
                            <p className="line-clamp-1 text-[8px] font-medium uppercase tracking-wider text-white/55 sm:text-[9px]">
                              {project.category}
                            </p>
                            <h3 className="mt-0.5 line-clamp-1 text-[10px] font-semibold text-white sm:text-xs">
                              {project.title}
                            </h3>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              );
            })}
          </div>

          
          <div className="order-1 text-center lg:order-2 lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-3 text-[10px] font-medium uppercase tracking-[0.22em] text-blue-400 sm:text-xs"
            >
              Our Portfolio
            </motion.p>

       <motion.h2
  initial={{ opacity: 0, y: 15 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="font-serif text-4xl font-medium leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl"
>
  Selected <span className="italic text-blue-500">Work</span>{" "}
  <span className="sm:block">that makes you stand out.</span>
</motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mx-auto mt-5 max-w-md text-sm leading-7 text-white/50 lg:mx-0"
            >
              Creative visuals, cinematic edits and short-form reels crafted to
              grab attention in the first second and keep it till the last.
            </motion.p>

            
            <div className="mt-4 sm:mt-7 flex flex-wrap justify-center gap-2 lg:justify-start">
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

            
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <a
                href="https://wa.me/919253174295?text=Hi%2C%20I%20want%20to%20start%20a%20project%20with%20you."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-white/20 px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-white transition-colors hover:border-blue-500 hover:text-blue-400"
              >
                Start a Project
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

            
            <div className="sm:mt-10 flex items-center justify-center gap-8 sm:border-t border-white/10 pt-6 lg:justify-start">
              <div>
                <p className="text-2xl font-bold text-white">
                  {PROJECTS.length}+
                </p>
                <p className="text-[10px] uppercase tracking-widest text-white/70">
                  Projects
                </p>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <p className="text-2xl font-bold text-white">
                  {CATEGORIES.length - 1}
                </p>
                <p className="text-[10px] uppercase tracking-widest text-white/70">
                  Categories
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <AnimatePresence>
        {activeProject && (
          <motion.div
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
              className="relative w-full max-w-5xl overflow-hidden rounded-xl border border-white/10 bg-[#101116]"
            >
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
                  onClick={() => setActiveProject(null)}
                  aria-label="Close video"
                  className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-blue-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

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
                  onClick={handleNext}
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