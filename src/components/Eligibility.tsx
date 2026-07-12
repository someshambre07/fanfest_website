"use client";

import { niches } from "@/lib/data";

export default function Eligibility() {
  const row = [...niches, ...niches];

  return (
    <section id="eligibility" className="relative py-24 sm:py-32 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="font-mono text-xs tracking-[0.2em] text-violet uppercase">
            Eligibility
          </span>
          <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-5xl leading-[1.05]">
            Who Can Apply?
          </h2>
          <p className="mt-5 text-paper/65 text-base sm:text-lg leading-relaxed">
            We welcome creators across every niche, platform, and audience
            size. If you create — this is for you.
          </p>
        </div>
      </div>

      <div className="mt-14 relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-ink to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-ink to-transparent z-10" />

        <div className="flex w-max animate-marquee gap-4 py-2">
          {row.map((n, i) => (
            <a
              key={i}
              href="#apply"
              className="flex items-center gap-3 shrink-0 rounded-full border border-white/15 bg-ink2 px-6 py-3.5 font-display font-semibold hover:border-hotpink/50 hover:text-hotpink transition-colors"
            >
              <span className="text-xl">{n.icon}</span>
              {n.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
