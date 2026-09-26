import { createFileRoute, Link } from "@tanstack/react-router";
import { getBASignals } from "../lib/ba-content-engine.functions";

export const Route = createFileRoute("/ba-content-engine")({
  loader: () => getBASignals(),
  component: BAContentEngine,
});

function BAContentEngine() {
  const signals = Route.useLoaderData();
  const columns = ["New", "Watch", "Explore"] as const;
  return (
    <main className="min-h-screen bg-[#f3efe5] text-[#171717]">
      <header className="border-b border-black/15 px-6 py-5 md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.22em]">BA Content Engine</div>
            <h1 className="mt-1 font-bold text-2xl md:text-3xl">The Analysis Layer</h1>
            <p className="mt-1 text-sm opacity-65">Signals. Context. Decisions. Thought leadership.</p>
          </div>
          <Link to="/" className="font-mono text-xs uppercase underline underline-offset-4">Guilherme Costa</Link>
        </div>
      </header>
      <section className="mx-auto max-w-7xl px-6 py-8 md:px-10">
        <div className="mb-7">
          <span className="inline-block bg-[#f2d64b] px-3 py-1 font-mono text-xs font-bold uppercase">Trend Radar</span>
          <p className="mt-3 max-w-2xl text-sm opacity-70">Live editorial signals from the canonical Supabase workspace.</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {columns.map((state) => (
            <section key={state}>
              <div className="mb-3 flex items-center justify-between border-b border-black/25 pb-2">
                <h2 className="font-mono text-sm font-bold uppercase tracking-wider">{state}</h2>
                <span className="font-mono text-xs">{signals.filter(s => s.state === state).length}</span>
              </div>
              <div className="space-y-3">
                {signals.filter(s => s.state === state).map((signal) => (
                  <article key={signal.id} className="border border-black/15 bg-[#faf7ef] p-4 shadow-[3px_3px_0_rgba(0,0,0,.08)]">
                    <h3 className="font-semibold leading-snug">{signal.title}</h3>
                    {signal.summary && <p className="mt-2 text-sm leading-relaxed opacity-75">{signal.summary}</p>}
                    {signal.why_it_may_matter && <div className="mt-4 border-l-2 border-[#f2d64b] pl-3"><div className="font-mono text-[10px] uppercase opacity-55">Why it may matter</div><p className="mt-1 text-xs leading-relaxed">{signal.why_it_may_matter}</p></div>}
                    <div className="mt-4 flex flex-wrap gap-2 font-mono text-[10px] uppercase opacity-60">
                      {signal.evidence_strength && <span>Evidence: {signal.evidence_strength}</span>}
                      {signal.saturation && <span>· Saturation: {signal.saturation}</span>}
                    </div>
                  </article>
                ))}
                {!signals.some(s => s.state === state) && <div className="border border-dashed border-black/20 p-4 text-sm opacity-45">No signals.</div>}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
