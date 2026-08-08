import { useId, useState, type ReactNode } from 'react'

interface TooltipProps {
  content: string
  children: ReactNode
}

export default function Tooltip({ content, children }: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const id = useId()

  return (
    <span
      className="relative inline-flex items-center"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      <button
        type="button"
        aria-label="More information"
        aria-expanded={visible}
        aria-describedby={visible ? id : undefined}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        onKeyDown={e => {
          if (e.key === 'Escape') setVisible(false)
        }}
        className="btn-focus ml-1 inline-flex items-center justify-center w-6 h-6 rounded-full bg-stone-200 text-slate text-xs font-semibold cursor-help select-none flex-shrink-0"
      >
        ?
      </button>
      <span
        id={id}
        role="tooltip"
        className="absolute left-0 bottom-full mb-2 z-50 w-64 px-3 py-2 text-xs text-white bg-ink rounded-lg shadow-lg leading-relaxed pointer-events-none transition-opacity duration-150"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {content}
        <span className="absolute left-4 top-full w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-ink" />
      </span>
    </span>
  )
}
