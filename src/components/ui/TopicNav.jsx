/* ============================================
   TopicNav.jsx — Navegación prev/next estilo Arch
   ============================================ */
import { ChevronLeft, ChevronRight } from 'lucide-react'

const allTopicsOrdered = [
  { id: 'exp-intro', label: 'Qué es Express', tab: 'express' },
  { id: 'exp-setup', label: 'Setup e instalación', tab: 'express' },
  { id: 'exp-routes', label: 'Rutas y métodos', tab: 'express' },
  { id: 'exp-middleware', label: 'Middleware', tab: 'express' },
  { id: 'exp-request', label: 'Request y params', tab: 'express' },
  { id: 'exp-response', label: 'Response y status', tab: 'express' },
  { id: 'exp-static', label: 'Archivos estáticos', tab: 'express' },
  { id: 'exp-errors', label: 'Manejo de errores', tab: 'express' },
  { id: 'exp-mvc', label: 'Patrón MVC', tab: 'express' },
  { id: 'exp-env', label: 'Variables de entorno', tab: 'express' },
  { id: 'sql-intro', label: 'Qué es SQLite', tab: 'sqlite' },
  { id: 'sql-setup', label: 'Setup con better-sqlite3', tab: 'sqlite' },
  { id: 'sql-create', label: 'CREATE y tipos', tab: 'sqlite' },
  { id: 'sql-insert', label: 'INSERT y UPDATE', tab: 'sqlite' },
  { id: 'sql-select', label: 'SELECT y filtros', tab: 'sqlite' },
  { id: 'sql-joins', label: 'JOIN y relaciones', tab: 'sqlite' },
  { id: 'sql-advanced', label: 'Queries avanzados', tab: 'sqlite' },
  { id: 'sql-migrations', label: 'Migraciones', tab: 'sqlite' },
  { id: 'sql-security', label: 'SQL Injection', tab: 'sqlite' },
  { id: 'sql-tips', label: 'Tips y optimización', tab: 'sqlite' },
  { id: 'api-intro', label: 'Qué es REST', tab: 'api' },
  { id: 'api-crud', label: 'CRUD completo', tab: 'api' },
  { id: 'api-validation', label: 'Validación', tab: 'api' },
  { id: 'api-auth', label: 'Autenticación JWT', tab: 'api' },
  { id: 'api-upload', label: 'Upload de archivos', tab: 'api' },
  { id: 'api-pagination', label: 'Paginación y filtros', tab: 'api' },
  { id: 'api-cors', label: 'CORS', tab: 'api' },
  { id: 'api-testing', label: 'Testing con Thunder', tab: 'api' },
  { id: 'api-deploy', label: 'Deploy', tab: 'api' },
  { id: 'api-project', label: 'Proyecto final', tab: 'api' },
]

export default function TopicNav({ currentTopic, onNavigate, onTabChange }) {
  const idx = allTopicsOrdered.findIndex(t => t.id === currentTopic)
  if (idx === -1) return null

  const prev = idx > 0 ? allTopicsOrdered[idx - 1] : null
  const next = idx < allTopicsOrdered.length - 1 ? allTopicsOrdered[idx + 1] : null

  const handleNav = (topic) => {
    const currentTab = allTopicsOrdered[idx].tab
    if (topic.tab !== currentTab) onTabChange(topic.tab)
    onNavigate(topic.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="mt-8 pt-4 border-t border-term-border">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-[10px] text-arch-gray font-mono">{idx + 1}/{allTopicsOrdered.length}</span>
        <div className="flex-1 h-1.5 bg-term-surface rounded-full overflow-hidden arch-border">
          <div className="h-full rounded-full transition-all duration-500 bg-arch-blue"
            style={{ width: `${((idx + 1) / allTopicsOrdered.length) * 100}%` }} />
        </div>
        <span className="text-[10px] text-arch-blue font-mono font-bold">
          {Math.round(((idx + 1) / allTopicsOrdered.length) * 100)}%
        </span>
      </div>
      <div className="flex justify-between gap-3">
        {prev ? (
          <button onClick={() => handleNav(prev)}
            className="flex items-center gap-2 flex-1 text-left px-3 py-2.5 rounded-md bg-term-surface arch-border hover:border-arch-blue/50 hover:bg-term-hover transition-all text-xs font-mono">
            <ChevronLeft size={14} className="text-arch-blue" />
            <div>
              <div className="text-[10px] text-arch-gray">← anterior</div>
              <div className="text-arch-white/80">{prev.label}</div>
            </div>
          </button>
        ) : <div className="flex-1" />}
        {next ? (
          <button onClick={() => handleNav(next)}
            className="flex items-center justify-end gap-2 flex-1 text-right px-3 py-2.5 rounded-md bg-term-surface arch-border hover:border-arch-blue/50 hover:bg-term-hover transition-all text-xs font-mono">
            <div>
              <div className="text-[10px] text-arch-gray">siguiente →</div>
              <div className="text-arch-white/80">{next.label}</div>
            </div>
            <ChevronRight size={14} className="text-arch-blue" />
          </button>
        ) : (
          <div className="flex-1 rounded-md bg-term-surface arch-border p-3 text-center">
            <span className="text-arch-green text-xs font-mono arch-glow-green">🎉 CURSO COMPLETADO</span>
          </div>
        )}
      </div>
    </div>
  )
}