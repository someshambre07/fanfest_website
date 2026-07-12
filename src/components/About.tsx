"use client";

import { motion } from "framer-motion";
import { whatIs } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="font-mono text-xs tracking-[0.2em] text-hotpink uppercase">
            What Is FanFest 2026
          </span>
          <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-5xl leading-[1.05]">
            Where Creators
            <br />
            Meet Their Fans
          </h2>
          <p className="mt-5 text-paper/65 text-base sm:text-lg leading-relaxed">
            Three days of panels, activations, live streams, brand
            collaborations, and unforgettable fan moments — all under one
            roof.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whatIs.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group relative rounded-2xl border border-white/10 bg-ink2 p-7 hover:border-hotpink/40 transition-colors"
            >
              <div className="text-3xl">{item.icon}</div>
              <h3 className="mt-5 font-display font-bold text-lg">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-paper/60 leading-relaxed">
                {item.desc}
              </p>
              <div className="absolute inset-x-7 bottom-0 h-px bg-brand-grad scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
