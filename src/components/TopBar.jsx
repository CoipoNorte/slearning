/* ============================================
   TopBar.jsx — Barra superior estilo Arch / tiling WM
   ============================================ */
import { useState, useEffect } from 'react'
import { Menu } from 'lucide-react'

const tabs = [
  { id: 'express', label: 'Express', icon: '⚡' },
  { id: 'sqlite', label: 'SQLite', icon: '🗄️' },
  { id: 'api', label: 'API REST', icon: '🌐' },
]

export default function TopBar({ activeTab, setActiveTab, onToggleSidebar }) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 30000)
    return () => clearInterval(t)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-8 bg-term-surface border-b border-term-border flex items-center px-2"
      style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
      
      {/* Hamburguesa móvil */}
      <button onClick={onToggleSidebar} className="lg:hidden p-1 mr-1 text-arch-gray hover:text-arch-blue transition-colors">
        <Menu size={14} />
      </button>

      {/* Logo Arch */}
      <div className="flex items-center gap-1.5 mr-4">
        <span className="text-arch-blue text-sm">🐧</span>
        <span className="text-[11px] font-mono text-arch-blue font-bold hidden sm:inline arch-glow-text">
          slearning
        </span>
      </div>

      {/* Separador */}
      <div className="w-px h-4 bg-term-border mr-2" />

      {/* Tabs como workspaces */}
      <div className="flex items-center gap-0.5">
        {tabs.map((tab, i) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1 px-2.5 h-6 text-[11px] font-mono transition-all rounded-sm ${
              activeTab === tab.id
                ? 'bg-arch-blue/15 text-arch-blue border border-arch-blue/30'
                : 'text-arch-gray hover:text-arch-white hover:bg-term-hover'
            }`}>
            <span className="text-[10px]">{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
            {activeTab === tab.id && <span className="hidden sm:inline text-[9px] text-arch-gray ml-1">[{i + 1}]</span>}
          </button>
        ))}
      </div>

      {/* System info derecha */}
      <div className="ml-auto flex items-center gap-3 text-[10px] font-mono text-arch-gray">
        <span className="hidden md:inline">
          <span className="text-arch-green">●</span> node v20
        </span>
        <span className="hidden lg:inline text-arch-gray-light">
          {time.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
        </span>
        <span className="hidden lg:inline">
          arch linux
        </span>
      </div>
    </nav>
  )
}