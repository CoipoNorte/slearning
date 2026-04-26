/* ============================================
   Sidebar.jsx — Panel lateral estilo Arch file manager
   ============================================ */
import { ChevronLeft, ChevronRight } from 'lucide-react'

const topicsByTab = {
  express: [
    { id: 'exp-intro', label: 'Qué es Express', icon: '📖' },
    { id: 'exp-setup', label: 'Setup e instalación', icon: '🚀' },
    { id: 'exp-routes', label: 'Rutas y métodos', icon: '🛤️' },
    { id: 'exp-middleware', label: 'Middleware', icon: '🔗' },
    { id: 'exp-request', label: 'Request y params', icon: '📥' },
    { id: 'exp-response', label: 'Response y status', icon: '📤' },
    { id: 'exp-static', label: 'Archivos estáticos', icon: '📁' },
    { id: 'exp-errors', label: 'Manejo de errores', icon: '🚨' },
    { id: 'exp-mvc', label: 'Patrón MVC', icon: '🏗️' },
    { id: 'exp-env', label: 'Variables de entorno', icon: '🔐' },
  ],
  sqlite: [
    { id: 'sql-intro', label: 'Qué es SQLite', icon: '📖' },
    { id: 'sql-setup', label: 'Setup better-sqlite3', icon: '🚀' },
    { id: 'sql-create', label: 'CREATE y tipos', icon: '🏗️' },
    { id: 'sql-insert', label: 'INSERT y UPDATE', icon: '✏️' },
    { id: 'sql-select', label: 'SELECT y filtros', icon: '🔍' },
    { id: 'sql-joins', label: 'JOIN y relaciones', icon: '🔗' },
    { id: 'sql-advanced', label: 'Queries avanzados', icon: '⚡' },
    { id: 'sql-migrations', label: 'Migraciones', icon: '📦' },
    { id: 'sql-security', label: 'SQL Injection', icon: '🛡️' },
    { id: 'sql-tips', label: 'Tips y optimización', icon: '💡' },
  ],
  api: [
    { id: 'api-intro', label: 'Qué es REST', icon: '📖' },
    { id: 'api-crud', label: 'CRUD completo', icon: '🔄' },
    { id: 'api-validation', label: 'Validación', icon: '✅' },
    { id: 'api-auth', label: 'Autenticación JWT', icon: '🔐' },
    { id: 'api-upload', label: 'Upload archivos', icon: '📤' },
    { id: 'api-pagination', label: 'Paginación', icon: '📄' },
    { id: 'api-cors', label: 'CORS', icon: '🌍' },
    { id: 'api-testing', label: 'Testing', icon: '🧪' },
    { id: 'api-deploy', label: 'Deploy', icon: '🚀' },
    { id: 'api-project', label: 'Proyecto final', icon: '🏆' },
  ],
}

export default function Sidebar({ activeTab, activeTopic, setActiveTopic, collapsed, setCollapsed }) {
  const topics = topicsByTab[activeTab] || []
  const isMobile = () => window.innerWidth < 1024

  const handleSelect = (id) => {
    setActiveTopic(id)
    if (isMobile()) setCollapsed(true)
  }

  return (
    <>
      {!collapsed && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setCollapsed(true)} />}

      <aside className={`fixed top-8 left-0 bottom-0 z-40 bg-term-surface border-r border-term-border transition-all duration-300 flex flex-col ${
        collapsed ? 'w-0 lg:w-10 overflow-hidden' : 'w-52'
      }`}>
        {!collapsed && (
          <div className="px-3 py-2 border-b border-term-border">
            <div className="text-[10px] text-arch-gray font-mono flex items-center gap-1">
              <span className="text-arch-green">$</span>
              <span>ls /srv/{activeTab}/</span>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto py-1">
          {!collapsed && topics.map(topic => (
            <button key={topic.id} onClick={() => handleSelect(topic.id)}
              className={`w-full text-left px-3 py-1.5 flex items-center gap-2 text-[11px] font-mono transition-all border-l-2 ${
                activeTopic === topic.id
                  ? 'border-arch-blue text-arch-blue bg-arch-blue/10'
                  : 'border-transparent text-arch-gray-light hover:text-arch-white hover:bg-term-hover'
              }`}>
              <span className="text-[10px] w-4 text-center">{topic.icon}</span>
              <span className="truncate">{topic.label}</span>
            </button>
          ))}

          {collapsed && topics.map(topic => (
            <button key={topic.id}
              onClick={() => { setActiveTopic(topic.id); if (!isMobile()) setCollapsed(false) }}
              className={`hidden lg:block w-full py-1.5 text-center text-[10px] transition-all ${
                activeTopic === topic.id ? 'text-arch-blue bg-arch-blue/10' : 'text-arch-gray hover:text-arch-white'
              }`}
              title={topic.label}>
              {topic.icon}
            </button>
          ))}
        </div>

        <button onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex items-center justify-center py-2 border-t border-term-border text-arch-gray hover:text-arch-blue transition-colors">
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </aside>
    </>
  )
}