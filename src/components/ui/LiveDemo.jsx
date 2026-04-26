/* ============================================
   LiveDemo.jsx — Preview estilo output de terminal
   ============================================ */
export default function LiveDemo({ title, children }) {
  return (
    <div className="rounded-md overflow-hidden arch-border">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-term-surface border-b border-term-border">
        <span className="w-1.5 h-1.5 rounded-full bg-arch-green animate-blink" />
        <span className="text-[10px] text-arch-gray-light font-mono">{title || 'OUTPUT'}</span>
        <span className="text-[10px] text-arch-blue ml-auto font-mono">[LIVE]</span>
      </div>
      <div className="bg-term-bg p-4">{children}</div>
    </div>
  )
}