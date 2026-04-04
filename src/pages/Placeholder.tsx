import PageShell from '../components/layout/PageShell'

export default function Placeholder() {
  return (
    <PageShell title="Coming Soon" subtitle="This section is under construction.">
      <div className="flex items-center justify-center h-64 rounded-xl border-2 border-dashed border-slate-200">
        <p className="text-slate-400 text-sm">Content will be added after the brand interview is complete.</p>
      </div>
    </PageShell>
  )
}
