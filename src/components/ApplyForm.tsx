"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import {
  countries,
  nicheOptions,
  platforms,
  followerRanges,
  viewRanges,
  interests,
  hearAboutOptions,
} from "@/lib/data";

type Status = "idle" | "submitting" | "success" | "error";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-paper/80 mb-2">
        {label}
        {required && <span className="text-hotpink ml-1">*</span>}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-white/15 bg-ink px-4 py-3 text-sm text-paper placeholder:text-paper/30 outline-none focus:border-hotpink transition-colors";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="font-mono text-xs tracking-[0.2em] text-hotpink uppercase whitespace-nowrap">
        {children}
      </span>
      <span className="h-px flex-1 bg-white/10" />
    </div>
  );
}

export default function ApplyForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [checkedPlatforms, setCheckedPlatforms] = useState<string[]>([]);
  const [checkedInterests, setCheckedInterests] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState("");

  const toggle = (
    list: string[],
    setList: (v: string[]) => void,
    value: string
  ) => {
    setList(
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
    );
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());
    payload["platforms"] = JSON.stringify(checkedPlatforms);
    payload["interests"] = JSON.stringify(checkedInterests);

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Something went wrong");
      setStatus("success");
      form.reset();
      setCheckedPlatforms([]);
      setCheckedInterests([]);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div id="apply" className="scroll-mt-24 max-w-2xl mx-auto text-center py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <CheckCircle2 className="mx-auto text-acid" size={56} />
          <h3 className="mt-6 font-display font-extrabold text-2xl sm:text-3xl">
            Application Received!
          </h3>
          <p className="mt-3 text-paper/65">
            Thanks for applying to FanFest 2026. We&apos;ll review your
            submission and get back to you within 5–7 business days.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-8 inline-flex items-center rounded-full border border-white/20 px-6 py-3 font-display font-bold hover:bg-white/5 transition-colors"
          >
            Submit Another Application
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <section id="apply" className="scroll-mt-20 relative py-24 sm:py-32 border-t border-white/10">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14">
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl leading-[1.05]">
            Apply as a Creator
          </h2>
          <p className="mt-4 text-paper/65">
            Fill in the form below and we&apos;ll review your application
            within 5–7 business days.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-14">
          {/* Personal Information */}
          <div>
            <SectionLabel>Personal Information</SectionLabel>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="First Name" required>
                <input name="firstName" required className={inputClass} placeholder="Alex" />
              </Field>
              <Field label="Last Name" required>
                <input name="lastName" required className={inputClass} placeholder="Rivera" />
              </Field>
              <Field label="Email Address" required>
                <input
                  type="email"
                  name="email"
                  required
                  className={inputClass}
                  placeholder="you@example.com"
                />
              </Field>
              <Field label="Phone Number">
                <input type="tel" name="phone" className={inputClass} placeholder="+91 98765 43210" />
              </Field>
              <Field label="Country" required>
                <select name="country" required defaultValue="" className={inputClass}>
                  <option value="" disabled>
                    Select your country
                  </option>
                  {countries.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="City">
                <input name="city" className={inputClass} placeholder="Mumbai" />
              </Field>
            </div>
          </div>

          {/* Creator Profile */}
          <div>
            <SectionLabel>Creator Profile</SectionLabel>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Primary Creator Handle / Name" required>
                <input name="handle" required className={inputClass} placeholder="@yourhandle" />
              </Field>
              <Field label="Content Niche" required>
                <select name="niche" required defaultValue="" className={inputClass}>
                  <option value="" disabled>
                    Select your niche
                  </option>
                  {nicheOptions.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </Field>

              <div className="sm:col-span-2">
                <span className="block text-sm font-medium text-paper/80 mb-3">
                  Primary Platform(s) <span className="text-hotpink">*</span>
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {platforms.map((p) => {
                    const active = checkedPlatforms.includes(p);
                    return (
                      <button
                        type="button"
                        key={p}
                        onClick={() =>
                          toggle(checkedPlatforms, setCheckedPlatforms, p)
                        }
                        aria-pressed={active}
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                          active
                            ? "border-transparent bg-brand-grad text-ink"
                            : "border-white/15 text-paper/70 hover:border-white/30"
                        }`}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>
              </div>

              <Field label="Total Followers / Subscribers" required>
                <select name="followers" required defaultValue="" className={inputClass}>
                  <option value="" disabled>
                    Select range
                  </option>
                  {followerRanges.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Average Views per Post">
                <select name="avgViews" defaultValue="" className={inputClass}>
                  <option value="" disabled>
                    Select range
                  </option>
                  {viewRanges.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Primary Channel / Profile Link" required>
                <input
                  type="url"
                  name="profileLink"
                  required
                  className={inputClass}
                  placeholder="https://"
                />
              </Field>
              <Field label="Other Social Media Links">
                <input name="otherLinks" className={inputClass} placeholder="https://" />
              </Field>
            </div>
          </div>

          {/* Participation Preferences */}
          <div>
            <SectionLabel>Participation Preferences</SectionLabel>
            <div className="space-y-6">
              <div>
                <span className="block text-sm font-medium text-paper/80 mb-3">
                  Interested In (Select all that apply)
                </span>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {interests.map((i) => {
                    const active = checkedInterests.includes(i);
                    return (
                      <button
                        type="button"
                        key={i}
                        onClick={() =>
                          toggle(checkedInterests, setCheckedInterests, i)
                        }
                        aria-pressed={active}
                        className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors ${
                          active
                            ? "border-hotpink/60 bg-hotpink/10 text-paper"
                            : "border-white/15 text-paper/70 hover:border-white/30"
                        }`}
                      >
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                            active
                              ? "border-hotpink bg-hotpink"
                              : "border-white/30"
                          }`}
                        >
                          {active && (
                            <CheckCircle2 size={12} className="text-ink" />
                          )}
                        </span>
                        {i}
                      </button>
                    );
                  })}
                </div>
              </div>

              <Field label="Tell Us About Yourself & Why You Want to Join" required>
                <textarea
                  name="about"
                  required
                  rows={5}
                  className={inputClass}
                  placeholder="Share your story, your content, and why FanFest 2026 is the right stage for you…"
                />
              </Field>

              <Field label="Previous Event Experience">
                <textarea
                  name="pastExperience"
                  rows={3}
                  className={inputClass}
                  placeholder="Conventions, meetups, or brand events you've attended or hosted…"
                />
              </Field>

              <Field label="How Did You Hear About FanFest 2026?">
                <select name="hearAbout" defaultValue="" className={inputClass}>
                  <option value="" disabled>
                    Select one
                  </option>
                  {hearAboutOptions.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </div>

          {/* Consents */}
          <div className="space-y-3">
            <label className="flex items-start gap-3 text-sm text-paper/75">
              <input
                type="checkbox"
                name="agreeTerms"
                required
                className="mt-1 h-4 w-4 rounded border-white/30 bg-ink accent-hotpink"
              />
              I agree to FanFest 2026&apos;s Terms &amp; Conditions and Creator
              Code of Conduct. <span className="text-hotpink">*</span>
            </label>
            <label className="flex items-start gap-3 text-sm text-paper/75">
              <input
                type="checkbox"
                name="consentPhotos"
                className="mt-1 h-4 w-4 rounded border-white/30 bg-ink accent-hotpink"
              />
              I consent to photos and videos of me being used in FanFest
              marketing materials.
            </label>
            <label className="flex items-start gap-3 text-sm text-paper/75">
              <input
                type="checkbox"
                name="consentUpdates"
                className="mt-1 h-4 w-4 rounded border-white/30 bg-ink accent-hotpink"
              />
              Keep me updated with FanFest news and future opportunities.
            </label>
          </div>

          <AnimatePresence>
            {status === "error" && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-sm text-hotpink"
              >
                {errorMsg}
              </motion.p>
            )}
          </AnimatePresence>

          <div>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-brand-grad px-9 py-4 font-display font-bold text-ink hover:brightness-110 active:scale-[0.98] transition disabled:opacity-60"
            >
              {status === "submitting" && (
                <Loader2 className="animate-spin" size={18} />
              )}
              Submit My Application →
            </button>
            <p className="mt-4 text-xs text-paper/45">
              Applications close June 30, 2026. We&apos;ll respond within 5–7
              business days. Limited spots available.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
