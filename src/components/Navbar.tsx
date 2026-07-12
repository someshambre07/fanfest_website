"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#about", label: "About" },
  { href: "#perks", label: "Perks" },
  { href: "#eligibility", label: "Eligibility" },
  { href: "#timeline", label: "Timeline" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ink/85 backdrop-blur-md border-b border-white/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-8 h-16 sm:h-20">
        <a href="#" className="font-display font-extrabold tracking-tight text-lg sm:text-xl">
          FAN<span className="text-hotpink">FEST</span> 26
        </a>

        <ul className="hidden md:flex items-center gap-8 font-body text-sm text-paper/75">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-paper transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a
            href="#apply"
            className="inline-flex items-center rounded-full bg-brand-grad px-5 py-2.5 font-display text-sm font-bold text-ink hover:brightness-110 transition"
          >
            Apply Now
          </a>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          className="md:hidden p-2 -mr-2 text-paper"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed inset-x-0 top-16 bottom-0 bg-ink transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="flex flex-col gap-1 px-6 py-8 font-display text-2xl">
          {links.map((l) => (
            <li key={l.href} className="border-b border-white/10 py-4">
              <a href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="px-6">
          <a
            href="#apply"
            onClick={() => setOpen(false)}
            className="block text-center rounded-full bg-brand-grad px-5 py-4 font-display font-bold text-ink"
          >
            Apply Now
          </a>
        </div>
      </div>
    </header>
  );
}
