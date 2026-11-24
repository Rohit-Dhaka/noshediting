
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-fade";

import Hero1 from "../../assets/images/Hero1.webp";
import Hero2 from "../../assets/images/Hero2.webp";
import Hero3 from "../../assets/images/Hero3.webp";

const slides = [
  {
    id: 1,
    label: "CINEMATIC VIDEO EDITING",
    title: ["Every frame,", "a story worth", "watching."],
    description:
      "We transform raw footage into cinematic experiences that capture attention, emotion, and leave a lasting impression.",
    image: Hero1,
  },
  {
    id: 2,
    label: "REELS & SOCIAL CONTENT",
    title: ["Scroll-stopping", "content made", "to be seen."],
    description:
      "From short-form reels to engaging social content, we create videos that make people stop scrolling and start watching.",
    image: Hero2,
  },
  {
    id: 3,
    label: "CREATIVE STORYTELLING",
    title: ["Your vision.", "Our creativity.", "One masterpiece."],
    description:
      "A perfect blend of creativity, rhythm, color, and storytelling that turns your ideas into something unforgettable.",
    image: Hero3,
  },
];

const HeroSection = () => {
  const [swiper, setSwiper] = useState(null);
  const [active, setActive] = useState(0);

  const currentSlide = slides[active];
  const slideNumber = String(active + 1).padStart(2, "0");

  return (
    <section className="relative isolate h-[78svh] min-h-[480px] w-full overflow-hidden bg-[#050608] text-white sm:h-[85svh] sm:min-h-[600px] lg:h-[100svh] lg:min-h-[700px]">

      {/* BACKGROUND SLIDER */}
      <div className="absolute inset-0 z-0">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={1400}
          loop
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          onSwiper={setSwiper}
          onSlideChange={(s) => setActive(s.realIndex)}
          className="hero-background-swiper !h-full !w-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <motion.div
                initial={{ scale: 1.15 }}
                animate={{ scale: 1.02 }}
                transition={{ duration: 7, ease: "linear" }}
                className="h-full w-full"
              >
                <img
                  src={slide.image}
                  alt={slide.label}
                  loading={slide.id === 1 ? "eager" : "lazy"}
                  fetchPriority={slide.id === 1 ? "high" : "auto"}
                  decoding="async"
                  className="h-full w-full object-cover object-center"
                />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* CINEMATIC OVERLAY */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/40" />

      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.3)_55%,rgba(0,0,0,0.75)_100%)]" />

      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_bottom,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.12)_35%,rgba(0,0,0,0.2)_60%,rgba(0,0,0,0.88)_100%)]" />

      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_right,rgba(0,0,0,0.35),transparent_30%,transparent_70%,rgba(0,0,0,0.35)]" />

      {/* BLUE ATMOSPHERE */}
      <motion.div
        animate={{
          opacity: [0.12, 0.3, 0.12],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 blur-[100px] sm:h-[400px] sm:w-[400px] lg:h-[550px] lg:w-[550px]"
      />

      {/* FILM GRAIN */}
      <div className="hero-film-grain pointer-events-none absolute inset-0 z-[2] opacity-[0.12]" />

      {/* FRAME CORNERS */}
      <div className="pointer-events-none absolute inset-0 z-[3] p-3 sm:p-5 lg:p-8">
        <div className="relative h-full w-full">
          <span className="absolute left-0 top-0 h-5 w-5 border-l border-t border-white/20 sm:h-7 sm:w-7" />
          <span className="absolute right-0 top-0 h-5 w-5 border-r border-t border-white/20 sm:h-7 sm:w-7" />
          <span className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-white/20 sm:h-7 sm:w-7" />
          <span className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-white/20 sm:h-7 sm:w-7" />
        </div>
      </div>

      {/* TOP BRAND LABEL */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-[10] flex items-center justify-between px-5 pt-[100px] sm:px-8 sm:pt-[110px] lg:px-14 lg:pt-[115px] xl:px-20">
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2.5 sm:gap-3"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
          </span>

          <span className="text-[8px] font-medium tracking-[0.16em] text-white/75 sm:text-[10px] sm:tracking-[0.26em]">
            INDEPENDENT CREATIVE STUDIO
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden items-center gap-2 sm:flex"
        >
          <span className="text-[9px] tracking-[0.2em] text-white/55 lg:text-[10px]">
            VISUALS THAT MOVE YOU
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
        </motion.div>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-[5] mx-auto flex h-full w-full max-w-[1600px] flex-col items-center px-4 pb-[90px] pt-[145px] sm:px-6 sm:pb-[105px] sm:pt-[155px] lg:px-14 lg:pb-[115px] lg:pt-[155px] xl:px-20">

        {/* CENTER CONTENT */}
        <div className="flex w-full flex-1 items-center justify-center">
          <div className="relative mx-auto flex w-full max-w-[1150px] flex-col items-center justify-center text-center">

       
            {/* SLIDE LABEL */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`label-${active}`}
                initial={{ opacity: 0, y: 15, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                transition={{ duration: 0.45 }}
                className="relative mb-5 flex items-center justify-center gap-2.5 sm:mb-7 sm:gap-3"
              >
                <span className="h-px w-5 bg-blue-500 sm:w-9" />

                <span className="text-[9px] font-medium tracking-[0.2em] text-blue-300 sm:text-[11px] sm:tracking-[0.3em] lg:text-xs">
                  {currentSlide.label}
                </span>

                <span className="h-px w-5 bg-blue-500 sm:w-9" />
              </motion.div>
            </AnimatePresence>

            {/* TITLE */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`title-${active}`}
                initial={{ opacity: 0, filter: "blur(6px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(5px)" }}
                transition={{ duration: 0.4 }}
                className="relative w-full overflow-hidden"
              >
                {currentSlide.title.map((line, index) => (
                  <div key={`${active}-${index}`} className="overflow-hidden px-1">
                    <motion.h1
                      initial={{ y: "110%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.85,
                        delay: 0.1 + index * 0.13,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="mx-auto text-center text-[clamp(2.15rem,9vw,4.1rem)] font-semibold leading-[1.03] tracking-[-0.055em] text-white sm:text-[clamp(3.2rem,7.5vw,5.7rem)] lg:text-[clamp(4.5rem,6.5vw,7rem)]"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      {index === 2 ? (
                        <>
                          {line.split(" ").slice(0, -1).join(" ")}{" "}
                          <span className="relative inline-block font-normal italic text-blue-400">
                            {line.split(" ").slice(-1).join("")}
                            <motion.span
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{
                                duration: 0.8,
                                delay: 0.75,
                              }}
                              className="absolute -bottom-1 left-0 h-[1px] w-full origin-left bg-blue-400/70 sm:-bottom-2"
                            />
                          </span>
                        </>
                      ) : (
                        line
                      )}
                    </motion.h1>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* DESCRIPTION */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${active}`}
                initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mx-auto mt-5 max-w-[320px] text-center text-[11px] leading-[1.85] text-white/75 sm:mt-6 sm:max-w-[520px] sm:text-sm sm:leading-7 lg:mt-7 lg:max-w-[620px] lg:text-base"
              >
                {currentSlide.description}
              </motion.p>
            </AnimatePresence>

            {/* CTA */}
            <motion.a
              href="https://wa.me/919253174295?text=Hello%2C%20I%20want%20to%20discuss%20a%20video%20editing%20project."
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="group mt-3 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white py-1.5 pl-3 pr-2 text-xs font-semibold text-black shadow-[0_10px_40px_rgba(0,0,0,0.2)] transition-all duration-300 hover:border-blue-500 hover:bg-blue-600 hover:text-white sm:pl-7 sm:text-sm"
            >
              Let&apos;s talk
              <span className="flex h-6 w-6  items-center justify-center rounded-full bg-black text-white transition-all duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-blue-600 sm:h-8 sm:w-8">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </motion.a>
          </div>
        </div>

        {/* COMPACT BOTTOM CONTROLS */}
        <div className="absolute bottom-3 left-4 right-4 z-[6] sm:bottom-5 sm:left-6 sm:right-6 lg:bottom-6 lg:left-14 lg:right-14 xl:left-20 xl:right-20">
          <div className="flex w-full items-center justify-between gap-3">

            {/* COUNTER */}
            <div className="flex min-w-[48px] items-center gap-1 sm:min-w-[70px] sm:gap-1.5">
              <AnimatePresence mode="wait">
                <motion.span
                  key={slideNumber}
                  initial={{ opacity: 0, y: 7 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -7 }}
                  className="text-base font-medium tabular-nums sm:text-xl"
                >
                  {slideNumber}
                </motion.span>
              </AnimatePresence>
              <span className="text-[9px] text-white/40 sm:text-[11px]">
                / 03
              </span>
            </div>

      

            {/* ARROWS */}
            <div className="flex min-w-[68px] items-center justify-end gap-1 sm:min-w-[94px] sm:gap-2">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => swiper?.slidePrev()}
                aria-label="Previous slide"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-white/5 text-white backdrop-blur-xl transition-all duration-300 hover:border-white hover:bg-white hover:text-black sm:h-10 sm:w-10"
              >
                <ArrowLeft size={14} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => swiper?.slideNext()}
                aria-label="Next slide"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-white/5 text-white backdrop-blur-xl transition-all duration-300 hover:border-blue-500 hover:bg-blue-600 sm:h-10 sm:w-10"
              >
                <ArrowRight size={14} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* STYLES */}
      <style>{`
        .hero-background-swiper,
        .hero-background-swiper .swiper-wrapper,
        .hero-background-swiper .swiper-slide {
          width: 100%;
          height: 100%;
        }

        .hero-background-swiper {
          position: absolute !important;
          inset: 0 !important;
        }

        .hero-background-swiper .swiper-slide {
          overflow: hidden;
        }

        .hero-film-grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E");
          background-size: 180px 180px;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;


// import { useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, EffectFade } from "swiper/modules";
// import { AnimatePresence, motion } from "motion/react";
// import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

// import "swiper/css";
// import "swiper/css/effect-fade";
// import Hero1 from "../../assets/images/Hero1.webp";
// import Hero2 from "../../assets/images/Hero2.webp";
// import Hero3 from "../../assets/images/Hero3.webp";

// const slides = [
//   {
//     id: 1,
//     label: "CINEMATIC VIDEO EDITING",
//     title: ["Every frame,", "a story worth", "watching."],
//     description:
//       "We transform raw footage into cinematic experiences that capture attention, emotion, and leave a lasting impression.",
//     image: Hero1,
//   },
//   {
//     id: 2,
//     label: "REELS & SOCIAL CONTENT",
//     title: ["Scroll-stopping", "content made", "to be seen."],
//     description:
//       "From short-form reels to engaging social content, we create videos that make people stop scrolling and start watching.",
//     image: Hero2,
//   },
//   {
//     id: 3,
//     label: "CREATIVE STORYTELLING",
//     title: ["Your vision.", "Our creativity.", "One masterpiece."],
//     description:
//       "A perfect blend of creativity, rhythm, color, and storytelling that turns your ideas into something unforgettable.",
//     image: Hero3,
//   },
// ];

// const HeroSection = () => {
//   const [swiper, setSwiper] = useState(null);
//   const [active, setActive] = useState(0);

//   const currentSlide = slides[active];

//   return (
//     <section className="relative isolate h-screen sm:h-[100svh] w-full overflow-hidden bg-[#08090c] text-white">
//       {/* BACKGROUND SLIDER */}
//       <div className="absolute inset-0 z-0">
//         <Swiper
//           modules={[Autoplay, EffectFade]}
//           effect="fade"
//           fadeEffect={{ crossFade: true }}
//           speed={1200}
//           loop
//           autoplay={{
//             delay: 5500,
//             disableOnInteraction: false,
//           }}
//           onSwiper={setSwiper}
//           onSlideChange={(s) => setActive(s.realIndex)}
//           className="hero-background-swiper !h-full !w-full"
//         >
//           {slides.map((slide) => (
//             <SwiperSlide key={slide.id}>
//               <motion.div
//                 initial={{ scale: 1.08 }}
//                 animate={{ scale: 1 }}
//                 transition={{ duration: 6, ease: "linear" }}
//                 className="h-full w-full"
//               >
//                 <img
//                   src={slide.image}
//                   alt={slide.label}
//                   className="h-full w-full object-cover"
//                 />
//               </motion.div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>

//       {/* OVERLAY */}
//       {/* <div className="pointer-events-none absolute inset-0 z-[1] bg-black/40" /> */}
//       <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/85 via-black/50 to-black/05" />
//       <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/80 via-transparent to-black/35" />

//       <div className="relative z-[5] mx-auto flex h-full w-full max-w-[1600px] flex-col px-5 sm:px-8 lg:px-14 xl:px-20">
//         <div className="my-auto mb-4 sm:mb-10 pb-4">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={currentSlide.label}
//               initial={{ opacity: 0, y: 12 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.4 }}
//               className="flex items-center gap-3"
//             >
//               <span className="h-[7px] w-[7px] rounded-full bg-blue-500 shadow-[0_0_12px_#3b82f6]" />

//               <span className="text-[10px] font-medium tracking-[0.18em] text-white/85 sm:text-[11px] sm:tracking-[0.22em]">
//                 {currentSlide.label}
//               </span>
//             </motion.div>
//           </AnimatePresence>
//           {/* TITLE */}

//           <AnimatePresence mode="wait">
//             <motion.div
//               key={`title-${active}`}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.25 }}
//               className="overflow-hidden pt-4 sm:pt-8"
//             >
//               {currentSlide.title.map((line, index) => (
//                 <div key={`${active}-${index}`} className="overflow-hidden">
//                   <motion.h1
//                     initial={{ y: "110%", opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     transition={{
//                       duration: 0.7,
//                       delay: 0.1 + index * 0.12,
//                       ease: [0.22, 1, 0.36, 1],
//                     }}
//                     className="text-[clamp(2.4rem,6.2vw,6.5rem)] font-medium leading-[0.98] tracking-[-0.045em] text-white"
//                     style={{ fontFamily: "Georgia, serif" }}
//                   >
//                     {index === 2 ? (
//                       <>
//                         {line.split(" ").slice(0, -1).join(" ")}{" "}
//                         <span className="font-normal italic text-blue-400">
//                           {line.split(" ").slice(-1).join("")}
//                         </span>
//                       </>
//                     ) : (
//                       line
//                     )}
//                   </motion.h1>
//                 </div>
//               ))}
//             </motion.div>
//           </AnimatePresence>

//           {/* DESCRIPTION */}
//           <AnimatePresence mode="wait">
//             <motion.p
//               key={`description-${active}`}
//               initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
//               animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.5, delay: 0.25 }}
//               className="mt-5 max-w-[400px] text-[13px] leading-6 text-white/70 sm:mt-6 sm:text-sm sm:leading-7"
//             >
//               {currentSlide.description}
//             </motion.p>
//           </AnimatePresence>
//         </div>

//         {/* BOTTOM BAR - CTA LEFT & ARROWS RIGHT */}
//         <div className="mb-10 flex items-center justify-between ">
//           {/* CTA LEFT */}
//           <motion.a
//             href="https://wa.me/919253174295?text=Hello%2C%20I%20want%20to%20discuss%20a%20video%20editing%20project."
//             target="_blank"
//             rel="noopener noreferrer"
//             whileHover={{ scale: 1.04 }}
//             whileTap={{ scale: 0.96 }}
//             className="group inline-flex w-fit items-center gap-3 rounded-full bg-white py-1.5 pl-5 pr-1.5 text-[13px] font-medium text-black transition-colors duration-300 hover:bg-blue-500 hover:text-white"
//           >
//             Let's talk
//             <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:rotate-45">
//               <ArrowUpRight size={16} />
//             </span>
//           </motion.a>

//           {/* ARROWS RIGHT */}
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => swiper?.slidePrev()}
//               aria-label="Previous slide"
//               className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/5 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-black sm:h-11 sm:w-11"
//             >
//               <ArrowLeft size={16} />
//             </button>

//             <button
//               onClick={() => swiper?.slideNext()}
//               aria-label="Next slide"
//               className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/5 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-black sm:h-11 sm:w-11"
//             >
//               <ArrowRight size={16} />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* SWIPER HEIGHT */}
//       <style>{`
//         .hero-background-swiper,
//         .hero-background-swiper .swiper-wrapper,
//         .hero-background-swiper .swiper-slide {
//           width: 100%;
//           height: 100%;
//         }

//         .hero-background-swiper {
//           position: absolute !important;
//           inset: 0 !important;
//         }

//         .hero-background-swiper .swiper-slide {
//           overflow: hidden;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default HeroSection;