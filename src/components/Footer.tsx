export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-14">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col items-center text-center gap-4">
        <div className="font-display font-black text-2xl sm:text-3xl">
          FAN<span className="text-hotpink">FEST</span> 2026
        </div>
        <p className="font-mono text-xs text-paper/50 tracking-wide">
          August 14–16, 2026 · For creators, by creators.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-paper/50">
          <span>© 2026 FanFest. All rights reserved.</span>
          <a href="#" className="hover:text-paper transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-paper transition-colors">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}
