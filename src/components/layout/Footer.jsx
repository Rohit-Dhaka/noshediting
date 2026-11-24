// Footer.jsx
import { motion } from "motion/react";

import { ArrowUpRight } from "lucide-react";
import Logo from "../../assets/images/Logo.webp";

import { FaInstagram, FaLinkedinIn, FaFacebookF } from "react-icons/fa";

const LINKS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/#about" },
  { name: "Videos", path: "/#videos" },
  { name: "Services", path: "/#services" },
  { name: "Price", path: "/#price" },
];

const SOCIALS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/nosh_infotech/",
    icon: FaInstagram,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/nosh-infotech/home/",
    icon: FaLinkedinIn,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61583257367995",
    icon: FaFacebookF,
  },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden rounded-t-[28px] bg-[#0b0b0d] text-white sm:rounded-t-[40px]">
      <div className="mx-auto max-w-[1600px] px-5 pt-10 sm:px-8 sm:pt-12 lg:px-12 xl:px-16">
        {/* ================= TOP CONTENT ================= */}

        <div className="grid grid-cols-2 gap-x-8 gap-y-9 border-b border-white/10 pb-9 sm:grid-cols-4 sm:gap-8 sm:pb-11">
          {/* Brand intro */}
          <div className="max-w-[260px]">
            <a href="/" className="block overflow-hidden">
              <img
                src={Logo}
                alt="Nosh Infotech"
                className="h-14 w-full object-cover object-center sm:-ml-[12px]"
              />
            </a>

            <p className="mt-2 text-sm leading-6 text-white/65">
              Creative digital experiences, crafted to make brands stand out.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-4 text-sm font-medium text-white">Explore</p>

            <ul className="flex flex-col gap-2.5">
              {LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group flex w-fit items-center gap-1.5 text-sm text-white transition-colors duration-300 hover:text-blue-400"
                  >
                    {link.name}

                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div>
            <p className="mb-4 text-sm font-medium text-white">Follow us</p>

            <ul className="flex flex-col gap-3">
              {SOCIALS.map((social) => {
                const Icon = social.icon;

                return (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="group flex w-fit items-center gap-2.5 text-sm text-white transition-colors duration-300 hover:text-blue-400"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 transition-all duration-300 group-hover:border-blue-500 group-hover:bg-blue-500/10">
                        <Icon
                          size={12}
                          className="transition-transform duration-300 group-hover:scale-110"
                        />
                      </span>

                      <span>{social.name}</span>

                      <ArrowUpRight
                        size={13}
                        className="text-white/70 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-400"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Call / Contact */}
          <div className="flex flex-col items-start">
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 text-base font-semibold text-white transition-colors duration-300 hover:text-blue-400"
            >
              Call Nosh Infotech
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight size={13} />
              </span>
            </a>

            <p className="mt-3 text-sm leading-6 text-white/65">
              Let's create something meaningful.
              <br />
              Tell us about your next project.
            </p>

            <a
              href={`https://wa.me/919253174295?text=${encodeURIComponent(
                "Hi Nosh Infotech! I'm interested in your video editing services and would like to discuss my project.",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 inline-flex items-center gap-2 border-b border-white/30 pb-1 text-sm font-medium text-white transition-all duration-300 hover:border-blue-400 hover:text-blue-400"
            >
              Start a conversation
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </div>

        {/* ================= BIG BRAND TEXT ================= */}

        <div className="relative mt-8 overflow-hidden sm:mt-10">
          <motion.div
            initial={{ y: "35%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <h2 className="select-none font-[Outfit] whitespace-nowrap text-center text-[clamp(3.5rem,15.5vw,13rem)] font-black leading-[0.82]  text-white">
              Nosh
              <span className="ml-[0.04em]">Infotech</span>
            </h2>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
