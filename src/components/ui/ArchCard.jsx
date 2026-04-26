/* ============================================
   ArchCard.jsx — Card estilo panel Arch
   ============================================ */
export default function ArchCard({ title, icon, variant = 'default', children }) {
  const variants = {
    default: 'border-term-border',
    blue:    'border-arch-blue/30 bg-arch-blue/5',
    green:   'border-arch-green/30 bg-arch-green/5',
    yellow:  'border-arch-yellow/30 bg-arch-yellow/5',
    red:     'border-arch-red/30 bg-arch-red/5',
    cyan:    'border-arch-cyan/30 bg-arch-cyan/5',
    purple:  'border-arch-purple/30 bg-arch-purple/5',
  }

  const titleColors = {
    default: 'text-arch-white',
    blue:    'text-arch-blue',
    green:   'text-arch-green',
    yellow:  'text-arch-yellow',
    red:     'text-arch-red',
    cyan:    'text-arch-cyan',
    purple:  'text-arch-purple',
  }

  return (
    <div className={`rounded-md border p-4 bg-term-surface ${variants[variant]}`}>
      {title && (
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-term-border">
          {icon && <span className="text-sm">{icon}</span>}
          <h4 className={`text-xs font-bold font-mono uppercase tracking-wider ${titleColors[variant]}`}>
            {title}
          </h4>
        </div>
      )}
      <div className="text-sm text-arch-white/80 font-mono leading-relaxed">
        {children}
      </div>
    </div>
  )
}