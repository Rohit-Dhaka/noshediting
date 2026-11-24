
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

  return (
    <section className="relative isolate h-[65svh] min-h-[400px] w-full overflow-hidden bg-[#08090c] text-white sm:h-[75svh] sm:min-h-[520px] lg:h-[100svh] lg:min-h-[680px]">

      {/* BACKGROUND SLIDER */}
      <div className="absolute inset-0 z-0">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={1200}
          loop
          autoplay={{
            delay: 5500,
            disableOnInteraction: false,
          }}
          onSwiper={setSwiper}
          onSlideChange={(s) => setActive(s.realIndex)}
          className="hero-background-swiper !h-full !w-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <motion.div
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 6, ease: "linear" }}
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

      {/* OVERLAYS */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/85 via-black/50 to-black/05" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/80 via-transparent to-black/35" />

      {/* MAIN CONTENT */}
      <div className="relative z-[5] mx-auto flex h-full w-full max-w-[1600px] flex-col px-4 pb-4 pt-20 sm:px-6 sm:pb-7 sm:pt-24 lg:px-14 lg:pb-10 lg:pt-28 xl:px-20">

        {/* CONTENT AREA */}
        <div className="flex flex-1 items-center py-4 sm:py-8 lg:py-0">
          <div className="w-full max-w-[1050px] text-left">

            {/* LABEL */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="flex items-center justify-start gap-3"
              >
                <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-blue-500 shadow-[0_0_12px_#3b82f6]" />

                <span className="text-[9px] font-medium tracking-[0.16em] text-white/85 sm:text-[11px] sm:tracking-[0.22em]">
                  {currentSlide.label}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* TITLE */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`title-${active}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden pt-4 sm:pt-7 lg:pt-8"
              >
                {currentSlide.title.map((line, index) => (
                  <div key={`${active}-${index}`} className="overflow-hidden">
                    <motion.h1
                      initial={{ y: "110%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.7,
                        delay: 0.1 + index * 0.12,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="whitespace-nowrap text-[clamp(1.9rem,8.5vw,3.8rem)] font-medium leading-[1.04] tracking-[-0.045em] text-white sm:text-[clamp(3rem,7vw,5rem)] lg:text-[clamp(4rem,6.2vw,6.5rem)]"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      {index === 2 ? (
                        <>
                          {line.split(" ").slice(0, -1).join(" ")}{" "}
                          <span className="font-normal italic text-blue-400">
                            {line.split(" ").slice(-1).join("")}
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
                key={`description-${active}`}
                initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="mt-4 max-w-[340px] text-left text-[11px] leading-[1.7] text-white/75 sm:mt-6 sm:max-w-[400px] sm:text-sm sm:leading-7"
              >
                {currentSlide.description}
              </motion.p>
            </AnimatePresence>

          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-auto flex w-full items-center justify-between gap-3 border-t border-white/10 pt-3 sm:gap-5 sm:pt-5 lg:border-none lg:pt-0">

          {/* CTA */}
          <motion.a
            href="https://wa.me/919253174295?text=Hello%2C%20I%20want%20to%20discuss%20a%20video%20editing%20project."
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-white py-1 pl-4 pr-1 text-[12px] font-medium text-black transition-colors duration-300 hover:bg-blue-500 hover:text-white sm:gap-3 sm:py-1.5 sm:pl-5 sm:pr-1.5 sm:text-[13px]"
          >
            Let's talk

            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:rotate-45 sm:h-9 sm:w-9">
              <ArrowUpRight size={15} />
            </span>
          </motion.a>

          {/* ARROWS */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <button
              onClick={() => swiper?.slidePrev()}
              aria-label="Previous slide"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/5 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-black sm:h-11 sm:w-11"
            >
              <ArrowLeft size={15} />
            </button>

            <button
              onClick={() => swiper?.slideNext()}
              aria-label="Next slide"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/5 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-black sm:h-11 sm:w-11"
            >
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* SWIPER CSS */}
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