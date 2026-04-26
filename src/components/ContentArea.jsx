/* ============================================
   ContentArea.jsx — Área de contenido principal
   ============================================ */
import { expressTopics } from '../data/expressTopics'
import { sqliteTopics } from '../data/sqliteTopics'
import { apiTopics } from '../data/apiTopics'
import TopicNav from './ui/TopicNav'

const allTopics = { ...expressTopics, ...sqliteTopics, ...apiTopics }

export default function ContentArea({ activeTab, activeTopic, setActiveTopic, setActiveTab, sidebarCollapsed }) {
  const TopicComponent = allTopics[activeTopic]

  return (
    <div className={`pt-8 min-h-screen transition-all duration-300 ${
      sidebarCollapsed ? 'lg:pl-10' : 'lg:pl-52'
    }`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {TopicComponent ? (
          <div className="animate-fade-in">
            <div className="text-[10px] text-arch-gray font-mono mb-3 flex items-center gap-1">
              <span className="text-arch-green">$</span>
              <span>cat /srv/{activeTab}/{activeTopic.replace(`${activeTab.slice(0, 3)}-`, '')}.md</span>
            </div>
            <div className="term-panel p-5">
              <TopicComponent />
              <TopicNav currentTopic={activeTopic} onNavigate={setActiveTopic} onTabChange={setActiveTab} />
            </div>
          </div>
        ) : (
          <WelcomeScreen activeTab={activeTab} />
        )}
      </div>
    </div>
  )
}

function WelcomeScreen({ activeTab }) {
  const info = {
    express: { icon: '⚡', name: 'Express.js', desc: 'Framework web para Node.js' },
    sqlite:  { icon: '🗄️', name: 'SQLite', desc: 'Base de datos ligera embebida' },
    api:     { icon: '🌐', name: 'API REST', desc: 'Construir APIs profesionales' },
  }
  const t = info[activeTab]

  return (
    <div className="term-panel p-8 text-center">
      <pre className="text-arch-blue text-[9px] sm:text-[11px] font-mono arch-glow-text mb-6 leading-tight inline-block text-left">
{`                   -\`
                  .o+\`
                 \`ooo/
                \`+oooo:
               \`+oooooo:
               -+oooooo+:
             \`/:-:++oooo+:
            \`/++++/+++++++:
           \`/++++++++++++++:
          \`/+++ooooooooooooo/\`
         ./ooosssso++osssssso+\`
        .oossssso-\`\`\`\`/ossssss+\`
       -osssssso.      :ssssssso.
      :osssssss/        osssso+++.
     /ossssssss/        +ssssooo/-
   \`/ossssso+/:-        -:/+osssso+-
  \`+sso+:-\`                 \`.-/+oso:
 \`++:.                           \`-/+/
 .\`                                 \`/`}
      </pre>
      <div className="text-3xl mb-3">{t.icon}</div>
      <h2 className="text-lg font-bold text-arch-blue font-mono arch-glow-text mb-1">{t.name}</h2>
      <p className="text-arch-gray text-sm font-mono mb-6">{t.desc}</p>
      <div className="term-panel p-3 max-w-sm mx-auto text-left">
        <p className="text-[11px] font-mono">
          <span className="text-arch-green">dev@arch</span>
          <span className="text-arch-white">:</span>
          <span className="text-arch-blue">~</span>
          <span className="text-arch-white">$ </span>
          <span className="text-arch-gray">Selecciona un tema del sidebar</span>
        </p>
        <p className="text-[11px] font-mono mt-1">
          <span className="text-arch-green">dev@arch</span>
          <span className="text-arch-white">:</span>
          <span className="text-arch-blue">~</span>
          <span className="text-arch-white">$ </span>
          <span className="animate-blink text-arch-white">▌</span>
        </p>
      </div>
    </div>
  )
}