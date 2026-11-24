
import { useRef, useState, useEffect, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  X,
  Play,
  ArrowUpRight,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { CATEGORIES, PROJECTS } from "../../data/portfolioData";
import LazyVideo from "../../components/common/LazyVideo";

import "swiper/css";
import "swiper/css/effect-coverflow";

/* =========================================================
   CLOUDINARY OPTIMIZATION
========================================================= */

const optimizeVideo = (url, width = 540) =>
  url?.includes("/upload/")
    ? url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`)
    : url;

const getPoster = (url, width = 500) =>
  url?.includes("/upload/")
    ? url
        .replace("/upload/", `/upload/so_0,f_jpg,q_auto,w_${width}/`)
        .replace(/\.(mov|mp4|webm)$/i, ".jpg")
    : undefined;

/* =========================================================
   MAIN SECTION
========================================================= */

const VideoGallerySection = () => {
  const swiperRef = useRef(null);
  const playerRef = useRef(null);

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);

  /* =========================================================
     REMOVE DUPLICATE PROJECTS
     Source: portfolioData.js
  ========================================================= */

  const uniqueProjects = useMemo(() => {
    const source = Array.isArray(PROJECTS) ? PROJECTS : [];

    const seenIds = new Set();
    const seenUrls = new Set();

    return source.filter((project) => {
      if (!project?.id || !project?.videoUrl) return false;

      const normalizedUrl = project.videoUrl.trim();

      if (seenIds.has(String(project.id))) return false;
      if (seenUrls.has(normalizedUrl)) return false;

      seenIds.add(String(project.id));
      seenUrls.add(normalizedUrl);

      return true;
    });
  }, []);

  /* =========================================================
     DYNAMIC CATEGORY LIST
     All + categories from portfolioData.js
  ========================================================= */

  const categories = useMemo(() => {
    const configuredCategories = Array.isArray(CATEGORIES)
      ? CATEGORIES.filter(
          (category) =>
              typeof category === "string" &&
              category !== "All"
        )
      : [];

    const projectCategories = uniqueProjects
      .map((project) => project.category)
      .filter(Boolean);

    const allCategories = [
      ...new Set([...configuredCategories, ...projectCategories]),
    ];

    return ["All", ...allCategories];
  }, [uniqueProjects]);

  /* =========================================================
     FILTER PROJECTS BY CATEGORY
  ========================================================= */

  const filteredVideos = useMemo(() => {
    if (activeCategory === "All") return uniqueProjects;

    return uniqueProjects.filter(
      (project) =>
        project.category?.toLowerCase() ===
        activeCategory.toLowerCase()
    );
  }, [activeCategory, uniqueProjects]);

  /* =========================================================
     LOOP ONLY WHEN ENOUGH VIDEOS
     No manually duplicated video arrays
  ========================================================= */

  const canLoop = filteredVideos.length >= 6;

  /* =========================================================
     CLOSE VIDEO MODAL
  ========================================================= */

  const closePlayer = () => {
    if (playerRef.current) {
      playerRef.current.pause();
    }

    setSelectedVideo(null);
  };

  /* =========================================================
     ESCAPE KEY + BODY SCROLL LOCK
  ========================================================= */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closePlayer();
      }
    };

    const previousOverflow = document.body.style.overflow;

    if (selectedVideo) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedVideo]);

  /* =========================================================
     STOP SLIDER AUTOPLAY WHILE MODAL IS OPEN
  ========================================================= */

  useEffect(() => {
    const swiper = swiperRef.current;

    if (!swiper || swiper.destroyed || !swiper.autoplay) return;

    if (selectedVideo) {
      swiper.autoplay.stop();
    } else {
      swiper.autoplay.start();
    }
  }, [selectedVideo]);

  /* =========================================================
     CATEGORY CHANGE
  ========================================================= */

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setActiveIndex(0);
    setSelectedVideo(null);

    if (swiperRef.current && !swiperRef.current.destroyed) {
      swiperRef.current.slideTo(0, 0);
    }
  };

  /* =========================================================
     NEXT VIDEO
  ========================================================= */

  const handleNextVideo = () => {
    if (!selectedVideo || !filteredVideos.length) return;

    const currentIndex = filteredVideos.findIndex(
      (video) => String(video.id) === String(selectedVideo.id)
    );

    const nextIndex =
      currentIndex >= 0
        ? (currentIndex + 1) % filteredVideos.length
        : 0;

    setSelectedVideo(filteredVideos[nextIndex]);
  };

  /* =========================================================
     EMPTY STATE
  ========================================================= */

  if (!uniqueProjects.length) return null;

  return (
    <>
      <section
        id="videos"
        className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/50 to-white text-slate-950 transition-colors duration-500 py-14 lg:py-20"
      >
        {/* BACKGROUND GLOW */}

        <div className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-300/20 blur-3xl" />

        <div className="relative mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">

          {/* ================= HEADER ================= */}

          <div className="mb-10 flex flex-col justify-between gap-7 md:flex-row md:items-end lg:mb-14">

            {/* TITLE */}

            <div className="max-w-2xl">            
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="font-['Outfit'] text-[36px] font-black uppercase leading-[0.98] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl"
              >
                Built For Feeds.
                <span className="mt-1 block font-serif font-bold normal-case tracking-normal text-blue-600">
                  Designed To Convert.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base"
              >
                Explore our video edits, creative storytelling and content crafted
                for creators, brands and social media.
              </motion.p>
            </div>

            {/* ================= CATEGORY FILTERS ================= */}

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-full md:w-auto md:max-w-[560px]"
            >
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Explore by category
              </p>

              <div className="flex flex-nowrap gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryChange(category)}
                    className={`shrink-0 rounded-full border px-4 py-2.5 text-xs font-bold tracking-wide transition-all duration-300 sm:px-5 ${
                      activeCategory === category
                        ? "scale-[1.03] border-blue-600 bg-blue-600 text-white shadow-[0_4px_15px_rgba(37,99,235,0.25)]"
                        : "border-blue-100 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600"
                    }`}
                  >
                    {category}

                    {category === "All" && (
                      <span className="ml-1.5 opacity-70">
                        ({uniqueProjects.length})
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ================= VIDEO SLIDER ================= */}

          <div className="relative mx-auto w-full">
            {filteredVideos.length > 0 ? (
              <Swiper
                key={activeCategory}
                modules={[EffectCoverflow, Autoplay]}
                effect="coverflow"
                centeredSlides
                grabCursor
                slidesPerView="auto"
                loop={canLoop}
                speed={750}
                coverflowEffect={{
                  rotate: 22,
                  stretch: 0,
                  depth: 180,
                  modifier: 1.2,
                  slideShadows: false,
                }}
                autoplay={
                  filteredVideos.length > 1
                    ? {
                        delay: 3500,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                      }
                    : false
                }
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                  setActiveIndex(0);
                }}
                onSlideChange={(swiper) => {
                  setActiveIndex(
                    swiper.realIndex % (filteredVideos.length || 1)
                  );
                }}
                className="!overflow-visible py-8 sm:py-10"
              >
                {filteredVideos.map((item, index) => (
                  <SwiperSlide
                    key={`${item.id}-${index}`}
                    className="!h-auto !w-[220px] sm:!w-[260px] md:!w-[290px] lg:!w-[310px]"
                  >
                    {({ isActive }) => (
                      <div
                        onClick={() => setSelectedVideo(item)}
                        className={`group relative cursor-pointer overflow-hidden rounded-2xl border-[4px] bg-slate-950 transition-all duration-500 sm:border-[6px] ${
                          isActive
                            ? "z-20 scale-105 border-blue-600 shadow-[0_20px_50px_rgba(37,99,235,0.28)]"
                            : "scale-95 border-white opacity-85 shadow-md hover:opacity-100"
                        }`}
                      >
                        {/* VIDEO THUMB */}

                        <div className="relative aspect-[9/16] w-full overflow-hidden">
                          <img
                            src={
                              item.thumbnail ||
                              getPoster(item.videoUrl, 500)
                            }
                            alt={`${item.title || "Portfolio"} video`}
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 h-full w-full object-cover"
                          />

                          {/* ACTIVE CARD VIDEO PREVIEW */}

                          {isActive && !selectedVideo && (
                            <LazyVideo
                              key={item.videoUrl}
                              src={optimizeVideo(item.videoUrl, 540)}
                              className="absolute inset-0 h-full w-full"
                            />
                          )}

                          {/* OVERLAY */}

                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/15 to-slate-950/30" />

                          {/* VIDEO NUMBER */}

                          <div className="absolute left-3.5 right-3.5 top-3.5 flex items-center justify-between">
                            <span className="rounded-full border border-white/20 bg-black/60 px-2.5 py-1 text-[10px] font-bold text-white">
                              VIDEO {String(item.number || item.id).padStart(2, "0")}
                            </span>

                            <span className="rounded-full border border-white/20 bg-black/60 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                              9:16
                            </span>
                          </div>

                          {/* PLAY ICON */}

                          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                            <div
                              className={`flex h-14 w-14 items-center justify-center rounded-full border border-white/60 bg-black/30 text-white backdrop-blur-sm transition-all duration-300 ${
                                isActive
                                  ? "scale-100 opacity-0 group-hover:opacity-100"
                                  : "scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                              }`}
                            >
                              <Play
                                size={22}
                                fill="currentColor"
                                className="ml-1"
                              />
                            </div>
                          </div>

                          {/* CARD CONTENT */}

                          <div className="absolute bottom-4 left-4 right-4 text-white">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-blue-300">
                              {item.category}
                            </p>

                            <h3 className="mt-1 font-['Outfit'] text-lg font-black leading-tight text-white">
                              {item.title}
                            </h3>

                            {item.client && (
                              <p className="mt-1 line-clamp-1 text-xs text-white/70">
                                {item.client}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="py-20 text-center">
                <p className="text-sm font-medium text-slate-500">
                  No projects available in this category.
                </p>
              </div>
            )}
          </div>

          {/* ================= SLIDER CONTROLS ================= */}

          {filteredVideos.length > 0 && (
            <div className="mt-5 flex items-center justify-center gap-4 sm:mt-8">
              <button
                type="button"
                onClick={() => swiperRef.current?.slidePrev()}
                aria-label="Previous video"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-200 bg-white text-slate-800 shadow-sm transition-all duration-300 hover:border-blue-600 hover:bg-blue-600 hover:text-white active:scale-95"
              >
                <ArrowLeft size={18} />
              </button>

              <span className="font-mono text-xs font-bold tracking-wider text-blue-600">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(filteredVideos.length).padStart(2, "0")}
              </span>

              <button
                type="button"
                onClick={() => swiperRef.current?.slideNext()}
                aria-label="Next video"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-200 bg-white text-slate-800 shadow-sm transition-all duration-300 hover:border-blue-600 hover:bg-blue-600 hover:text-white active:scale-95"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          )}

          {/* ================= CATEGORY INFO ================= */}

          {/* {filteredVideos.length > 0 && (
            <div className="mt-6 flex items-center justify-center">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 shadow-sm"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />

                <span className="text-[10px] font-semibold tracking-wide text-slate-500 sm:text-xs">
                  {activeCategory === "All"
                    ? `Showing all ${filteredVideos.length} projects`
                    : `${filteredVideos.length} projects in ${activeCategory}`}
                </span>
              </motion.div>
            </div>
          )} */}
        </div>
      </section>

      {/* ================= VIDEO MODAL ================= */}

      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePlayer}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 backdrop-blur-sm sm:p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
              className="relative aspect-[9/16] w-full max-w-[340px] overflow-hidden rounded-3xl border border-white/15 bg-slate-950 shadow-2xl sm:max-w-[400px]"
            >
              {/* VIDEO PLAYER */}

              <video
                ref={playerRef}
                key={selectedVideo.videoUrl}
                src={optimizeVideo(selectedVideo.videoUrl, 720)}
                poster={
                  selectedVideo.thumbnail ||
                  getPoster(selectedVideo.videoUrl, 720)
                }
                autoPlay
                controls
                playsInline
                preload="metadata"
                className="h-full w-full object-contain"
              />

              {/* VIDEO HEADER */}

              <div className="pointer-events-none absolute left-4 top-4 right-16 z-10">
                <p className="text-[10px] font-bold uppercase tracking-widest text-blue-300">
                  {selectedVideo.category}
                </p>

                <h3 className="mt-1 line-clamp-2 text-sm font-bold text-white">
                  {selectedVideo.title}
                </h3>
              </div>

              {/* CLOSE BUTTON */}

              <button
                type="button"
                onClick={closePlayer}
                aria-label="Close video"
                className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-md transition-all hover:bg-blue-600"
              >
                <X size={18} />
              </button>

              {/* NEXT VIDEO */}

              {filteredVideos.length > 1 && (
                <button
                  type="button"
                  onClick={handleNextVideo}
                  className="absolute bottom-4 right-4 z-20 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/65 px-4 py-2.5 text-[10px] font-bold text-white backdrop-blur-md transition-all hover:bg-blue-600"
                >
                  Next Video
                  <ArrowUpRight size={14} />
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VideoGallerySection;
