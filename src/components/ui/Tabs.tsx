import { useState } from 'react'
import { clsx } from 'clsx'

interface Tab {
  id: string
  label: string
  content: React.ReactNode
}

interface TabsProps {
  tabs: Tab[]
  defaultTab?: string
  className?: string
}

export function Tabs({ tabs, defaultTab, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab ?? tabs[0]?.id ?? '')

  const current = tabs.find(t => t.id === activeTab) ?? tabs[0]

  return (
    <div className={clsx(className)}>
      <div className="flex border-b border-slate-200 dark:border-slate-700 overflow-x-auto" role="tablist">
        {tabs.map(tab => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={tab.id === activeTab}
            aria-controls={`tabpanel-${tab.id}`}
            className={clsx(
              'px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors -mb-px',
              tab.id === activeTab
                ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:border-b-2 hover:border-slate-300 dark:hover:border-slate-600'
            )}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {current && (
        <div
          id={`tabpanel-${current.id}`}
          role="tabpanel"
          aria-labelledby={current.id}
          className="pt-4"
        >
          {current.content}
        </div>
      )}
    </div>
  )
}
