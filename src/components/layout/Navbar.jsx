
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowUpRight,
  ArrowDownRight,
  Menu,
  X,
  Circle,
} from "lucide-react";

import Logo from "../../assets/images/Logo.webp";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/#about" },
  { name: "Videos", path: "/#videos" },
  { name: "Services", path: "/#services" },
  { name: "Price", path: "/#price" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const location = useLocation();

  // Scroll state + page progress
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const currentProgress =
        scrollableHeight > 0
          ? (window.scrollY / scrollableHeight) * 100
          : 0;

      setProgress(Math.min(100, Math.max(0, currentProgress)));
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle section navigation
  useEffect(() => {
    if (!location.hash) {
      if (location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    const sectionId = location.hash.slice(1);

    const frame = requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [location.pathname, location.hash]);

  // Close menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname, location.hash]);

  // Prevent background scrolling on mobile menu
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  // Active route
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/" && !location.hash;
    }

    if (path.startsWith("/#")) {
      return (
        location.pathname === "/" &&
        location.hash === path.replace("/", "")
      );
    }

    return location.pathname === path;
  };

  // WhatsApp
  const whatsappLink = `https://wa.me/919253174295?text=${encodeURIComponent(
    "Hello Nosh Infotech, I want to discuss a video editing project."
  )}`;

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      {/* ================= DESKTOP / MAIN NAVBAR ================= */}
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
        <motion.div
          animate={{
            maxWidth: isScrolled ? "1180px" : "1600px",
            y: isScrolled ? 0 : 0,
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`relative mx-auto transition-all duration-500 ${
            isScrolled ? "rounded-2xl" : "rounded-2xl"
          }`}
        >
          {/* MAIN SHELL */}
          <div
            className={`relative flex h-[76px] items-center justify-between overflow-hidden transition-all duration-500 ${
              isScrolled
                ? "rounded-full border border-white/[0.10] bg-[#101010]/90 px-4 shadow-[0_20px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:px-6"
                : "rounded-full border border-white/[0.06] bg-[#080808]/45 px-4 backdrop-blur-md sm:px-7"
            }`}
          >
            {/* Top edge */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/[0.08]" />

            {/* Progress indicator */}
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white/[0.03]">
              <motion.div
                className="h-full bg-blue-500"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>

            {/* LEFT BRAND BLOCK */}
              <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="relative z-10 flex items-center"
          >
            <img
              src={Logo}
              alt="Logo"
              className={`w-auto object-contain transition-all duration-500 ${
                isScrolled ? "h-18" : "h-22"
              }`}
            />
          </Link>

            {/* CENTER NAV - DESKTOP */}
            <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
              {navLinks.map((link) => {
                const active = isActive(link.path);

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative flex lg:py-2 items-center gap-2.5 rounded-xl px-3 transition-colors duration-300 xl:px-5 ${
                      active
                        ? "text-white"
                        : "text-white/80 hover:text-white/85"
                    }`}
                  >
                    {/* Active sliding surface */}
                    {active && (
                      <motion.span
                        layoutId="active-nav-surface"
                        className="absolute inset-0 rounded-full border border-white/[0.07] bg-white/[0.065]"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                 
                    <span className="relative z-10 text-[14px] font-medium tracking-wide">
                      {link.name}
                    </span>
                
                  </Link>
                );
              })}
            </nav>

            {/* RIGHT CONTROL AREA */}
            <div className="relative z-10 flex items-center gap-3">
            

              
              

              {/* Contact CTA */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group hidden items-center gap-2 rounded-full border border-white/10 bg-white text-black pl-4 pr-1.5 py-1.5 transition-all duration-300 hover:bg-blue-500 hover:text-white lg:flex"
              >
                <span className="text-[11px] font-semibold">Let's Talk</span>

                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-all duration-300 group-hover:bg-white group-hover:text-blue-600">
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-300 group-hover:rotate-45"
                  />
                </span>
              </a>

              {/* Mobile menu trigger */}
              <button
                type="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] text-white transition-colors hover:bg-white/10 lg:hidden"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isMenuOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                    >
                      <X size={18} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                    >
                      <Menu size={18} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

  
        </motion.div>
      </header>

      {/* ================= MOBILE FULLSCREEN MENU ================= */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-[#080808] px-6 pb-6 pt-28 sm:px-10 lg:hidden"
          >
            {/* Menu top info */}
            <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Circle size={8} fill="#3b82f6" className="text-blue-500" />
                <span className="text-[9px] uppercase tracking-[0.22em] text-white/40">
                  The creative index
                </span>
              </div>

              <span className="text-[9px] tracking-[0.15em] text-white/20">
                2026 / NOSH
              </span>
            </div>

            {/* Menu links */}
            <nav className="flex flex-col">
              {navLinks.map((link, index) => {
                const active = isActive(link.path);

                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{
                      delay: 0.12 + index * 0.08,
                      duration: 0.45,
                    }}
                  >
                    <Link
                      to={link.path}
                      onClick={closeMenu}
                      className="group relative flex items-center justify-between border-b border-white/[0.09] py-5"
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className={`text-[10px] ${
                            active ? "text-blue-400" : "text-white/20"
                          }`}
                        >
                          {link.number}
                        </span>

                        <span
                          className={`text-[clamp(34px,10vw,54px)] font-medium tracking-[-0.04em] transition-colors ${
                            active
                              ? "text-white"
                              : "text-white/45 group-hover:text-white"
                          }`}
                        >
                          {link.name}
                        </span>
                      </div>

                      <span
                        className={`transition-transform duration-300 ${
                          active
                            ? "translate-x-0 text-blue-400"
                            : "text-white/25 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white"
                        }`}
                      >
                        <ArrowUpRight size={21} />
                      </span>

                      {/* Hover number decoration */}
                      <span className="pointer-events-none absolute right-10 top-1/2 -translate-y-1/2 text-[90px] font-semibold leading-none text-white/[0.025] transition-all duration-300 group-hover:text-white/[0.045]">
                        {link.number}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Project card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="mt-auto pt-10"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[9px] uppercase tracking-[0.22em] text-white/30">
                  Next frame starts here
                </span>
                <span className="text-[9px] text-white/20">↘</span>
              </div>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="group relative flex items-center justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#111111] p-5 transition-colors duration-300 hover:border-white/20 sm:p-6"
              >
                <div className="absolute inset-y-0 left-0 w-1 bg-blue-500 transition-all duration-300 group-hover:w-full group-hover:opacity-[0.06]" />

                <div className="relative">
                  <p className="text-lg font-medium text-white sm:text-xl">
                    Have a video to create?
                  </p>
                  <p className="mt-1.5 text-xs text-white/40">
                    Let's talk about your next project.
                  </p>
                </div>

                <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-black transition-all duration-300 group-hover:rotate-45 group-hover:bg-blue-500 group-hover:text-white">
                  <ArrowUpRight size={18} />
                </span>
              </a>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-[8px] uppercase tracking-[0.22em] text-white/20">
                  Nosh Infotech
                </span>
                <span className="text-[8px] uppercase tracking-[0.22em] text-white/20">
                  Video / Motion / Story
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;