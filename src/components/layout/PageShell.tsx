import { type ReactNode } from 'react'

interface PageShellProps {
  title: string
  subtitle?: string
  children: ReactNode
}

export default function PageShell({ title, subtitle, children }: PageShellProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight">{title}</h1>
        {subtitle && (
          <p className="mt-2 text-base sm:text-lg text-pewter">{subtitle}</p>
        )}
      </div>
      <div className="space-y-8 sm:space-y-10">
        {children}
      </div>
    </div>
  )
}

export function Section({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <section>
      {title && (
        <h2 className="text-xl font-semibold text-stone-800 mb-4">{title}</h2>
      )}
      {children}
    </section>
  )
}
