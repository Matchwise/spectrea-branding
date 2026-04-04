import { type ReactNode } from 'react'

interface PageShellProps {
  title: string
  subtitle?: string
  children: ReactNode
}

export default function PageShell({ title, subtitle, children }: PageShellProps) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{title}</h1>
        {subtitle && (
          <p className="mt-2 text-lg text-slate-500">{subtitle}</p>
        )}
      </div>
      <div className="space-y-10">
        {children}
      </div>
    </div>
  )
}

export function Section({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <section>
      {title && (
        <h2 className="text-xl font-semibold text-slate-800 mb-4">{title}</h2>
      )}
      {children}
    </section>
  )
}
