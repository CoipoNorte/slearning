/* ============================================
   Terminal.jsx — Simulación de terminal Arch
   ============================================ */
export default function TerminalBlock({ user = 'dev', host = 'arch', path = '~', commands = [] }) {
  return (
    <div className="rounded-md overflow-hidden arch-border">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-term-surface border-b border-term-border">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-arch-red/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-arch-yellow/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-arch-green/80" />
        </div>
        <span className="text-[10px] text-arch-gray-light font-mono">
          {user}@{host}:{path}
        </span>
      </div>
      <div className="bg-term-bg p-3 font-mono text-sm space-y-1">
        {commands.map((cmd, i) => (
          <div key={i}>
            {cmd.type === 'input' ? (
              <p>
                <span className="text-arch-green">{user}@{host}</span>
                <span className="text-arch-white">:</span>
                <span className="text-arch-blue">{cmd.path || path}</span>
                <span className="text-arch-white">$ </span>
                <span className="text-arch-white">{cmd.text}</span>
              </p>
            ) : cmd.type === 'output' ? (
              <p className={`text-arch-white/70 ${cmd.color || ''}`}>{cmd.text}</p>
            ) : cmd.type === 'comment' ? (
              <p className="text-arch-gray"># {cmd.text}</p>
            ) : null}
          </div>
        ))}
        <p>
          <span className="text-arch-green">{user}@{host}</span>
          <span className="text-arch-white">:</span>
          <span className="text-arch-blue">{path}</span>
          <span className="text-arch-white">$ </span>
          <span className="animate-blink text-arch-white">▌</span>
        </p>
      </div>
    </div>
  )
}