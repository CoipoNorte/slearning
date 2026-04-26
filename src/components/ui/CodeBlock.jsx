/* ============================================
   CodeBlock.jsx — Terminal de código estilo Arch
   ============================================ */
import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

export default function CodeBlock({ code, language = 'js', title }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const langColors = {
    js: 'text-arch-yellow',
    javascript: 'text-arch-yellow',
    bash: 'text-arch-green',
    sql: 'text-arch-cyan',
    json: 'text-arch-orange',
    http: 'text-arch-magenta',
  }

  return (
    <div className="rounded-md overflow-hidden arch-border">
      {/* Header estilo terminal Arch */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-term-surface border-b border-term-border">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-arch-red/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-arch-yellow/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-arch-green/80" />
          </div>
          <span className="text-[10px] text-arch-gray-light font-mono">
            {title || `file.${language}`}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-mono ${langColors[language] || 'text-arch-gray-light'}`}>
            {language}
          </span>
          <button onClick={handleCopy}
            className="p-1 rounded hover:bg-term-hover text-arch-gray hover:text-arch-white transition-colors">
            {copied ? <Check size={12} className="text-arch-green" /> : <Copy size={12} />}
          </button>
        </div>
      </div>
      <div className="bg-term-bg p-3 overflow-x-auto">
        <pre className="font-mono text-sm leading-relaxed">
          <code className="text-arch-white/90">{code.trim()}</code>
        </pre>
      </div>
    </div>
  )
}