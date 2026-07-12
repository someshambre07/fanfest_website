"use client";

import { motion } from "framer-motion";
import { timeline } from "@/lib/data";

export default function Timeline() {
  return (
    <section id="timeline" className="relative py-24 sm:py-32 border-t border-white/10 bg-ink2/40">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="font-mono text-xs tracking-[0.2em] text-acid uppercase">
            Key Dates
          </span>
          <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-5xl leading-[1.05]">
            Application Timeline
          </h2>
        </div>

        <div className="mt-16 relative">
          {/* rail */}
          <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-white/10" />
          <div className="grid md:grid-cols-4 gap-10 md:gap-6">
            {timeline.map((t, i) => (
              <motion.div
                key={t.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                <div className="relative z-10 flex md:block items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-grad font-display font-black text-ink">
                    {t.n}
                  </div>
                  <div className="md:hidden h-px flex-1 bg-white/10" />
                </div>
                <div className="mt-4 md:mt-6">
                  <span className="font-mono text-xs text-paper/50">
                    {t.range}
                  </span>
                  <h3 className="mt-2 font-display font-bold text-lg">
                    {t.title}
                  </h3>
                  <p className="mt-2 text-sm text-paper/60 leading-relaxed">
                    {t.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
