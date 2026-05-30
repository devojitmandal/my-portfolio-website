import Link from "next/link";

export function Navbar() {
  return (
    // Changed border to a subtle white/gray line
    <nav className="flex justify-between items-center py-5 border-b-[0.5px] border-white/10 mb-0 relative z-50">
      
      {/* LOGO (White) */}
      <Link href="/" className="text-[13px] font-medium tracking-[0.12em] text-[#fafaf8] font-mono">
        DM_
      </Link>

      {/* LINKS (Gray, hover to White) */}
      <div className="flex gap-6">
        <Link href="#work" className="text-[12px] text-[#888] tracking-[0.06em] transition-colors hover:text-[#fafaf8]">work</Link>
        <Link href="#about" className="text-[12px] text-[#888] tracking-[0.06em] transition-colors hover:text-[#fafaf8]">about</Link>
        <Link href="#contact" className="text-[12px] text-[#888] tracking-[0.06em] transition-colors hover:text-[#fafaf8]">contact</Link>
      </div>

      {/* STATUS INDICATOR */}
      <div className="flex items-center gap-[6px] text-[11px] text-[#0d9488] font-mono">
        <div className="w-[6px] h-[6px] rounded-full bg-[#0d9488] animate-[pulse_2s_infinite]" />
        open to opportunities
      </div>
    </nav>
  );
}