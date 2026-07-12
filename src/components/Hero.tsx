"use client";

import { motion } from "framer-motion";
import { stats } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-40 sm:pb-28">
      <div className="absolute inset-0 bg-spotlight-grad" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0B0A10_85%)]" />

      {/* Floating badges */}
      <div
        className="hidden lg:block absolute top-32 left-[6%] rotate-[-8deg] animate-float"
        style={{ ["--r" as string]: "-8deg" }}
      >
        <span className="hole-punch badge-notch bg-ink2 border border-white/10 px-4 py-2 font-mono text-xs text-acid">
          LIVE ON STAGE
        </span>
      </div>
      <div
        className="hidden lg:block absolute top-56 right-[8%] rotate-[6deg] animate-float"
        style={{ ["--r" as string]: "6deg", animationDelay: "1.2s" }}
      >
        <span className="hole-punch badge-notch bg-ink2 border border-white/10 px-4 py-2 font-mono text-xs text-hotpink">
          200+ CREATORS
        </span>
      </div>

      <div className="relative max-w-5xl mx-auto px-5 sm:px-8 text-center">
        <motion.div
          initial="hidden"
          animate="show"
          custom={0}
          variants={fadeUp}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-mono text-xs sm:text-sm tracking-wide text-paper/80"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-hotpink opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-hotpink" />
          </span>
          Open Applications — Limited Spots
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="show"
          custom={1}
          variants={fadeUp}
          className="mt-7 font-display font-black leading-[0.95] text-[13vw] sm:text-7xl md:text-8xl tracking-tight"
        >
          CREATE.
          <br />
          <span className="bg-brand-grad bg-clip-text text-transparent">CONNECT.</span>
          <br />
          <span className="text-outline">DOMINATE.</span>
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="show"
          custom={2}
          variants={fadeUp}
          className="mt-8 max-w-2xl mx-auto text-base sm:text-lg text-paper/70 leading-relaxed"
        >
          FanFest 2026 is calling on creators like you to be part of the
          biggest fan-powered event of the year. Share your world, grow your
          audience, and make history.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="show"
          custom={3}
          variants={fadeUp}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#apply"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-brand-grad px-8 py-4 font-display font-bold text-ink shadow-[0_0_40px_-8px_rgba(255,61,138,0.7)] hover:scale-[1.03] active:scale-[0.98] transition-transform"
          >
            Apply as a Creator
          </a>
          <a
            href="#about"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-4 font-display font-bold text-paper hover:bg-white/5 transition-colors"
          >
            Learn More
          </a>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="show"
          custom={4}
          variants={fadeUp}
          className="mt-16 sm:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 border-t border-white/10 pt-10"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-display font-extrabold text-xl sm:text-3xl">
                {s.value}
              </div>
              <div className="mt-1 font-mono text-[11px] sm:text-xs uppercase tracking-widest text-paper/50">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
