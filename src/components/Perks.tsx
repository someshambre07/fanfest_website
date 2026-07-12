"use client";

import { motion } from "framer-motion";
import { perks } from "@/lib/data";

export default function Perks() {
  return (
    <section id="perks" className="relative py-24 sm:py-32 border-t border-white/10 bg-ink2/40">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="font-mono text-xs tracking-[0.2em] text-ember uppercase">
            Creator Perks
          </span>
          <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-5xl leading-[1.05]">
            What You Get
          </h2>
          <p className="mt-5 text-paper/65 text-base sm:text-lg leading-relaxed">
            Every creator who joins FanFest 2026 gets a full support package
            designed to help you shine.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {perks.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 24, rotate: i % 2 === 0 ? -1.5 : 1.5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="hole-punch badge-notch relative bg-ink border border-white/10 p-7 pt-9"
            >
              <span className="font-mono text-4xl font-bold text-transparent bg-brand-grad bg-clip-text">
                {p.n}
              </span>
              <h3 className="mt-4 font-display font-bold text-lg">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-paper/60 leading-relaxed">
                {p.desc}
              </p>
              <div className="mt-6 flex gap-1.5">
                {Array.from({ length: 8 }).map((_, d) => (
                  <span
                    key={d}
                    className="h-1.5 w-1.5 rounded-full bg-white/10"
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
