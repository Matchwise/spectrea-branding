import PageShell from '../components/layout/PageShell'

export default function Placeholder() {
  return (
    <PageShell title="Not found" subtitle="This page doesn't exist — or hasn't been linked yet.">
      <div className="flex items-center justify-center h-64 rounded-xl border-2 border-dashed border-stone-200">
        <p className="text-stone-400 text-sm">Use the navigation to find what you're looking for.</p>
      </div>
    </PageShell>
  )
}
