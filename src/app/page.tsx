const examples = [
  "Hey dear, I can help you make $5,000 per week with my crypto mentorship.",
  "Hi Olivier, any interest in having a website built for you free of charge?",
  "Your package is blocked. Click this link now to confirm your delivery details.",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <section className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.14),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_30%)]" />

        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl border border-border bg-white/5 text-sm font-bold text-accent">
              IS
            </div>
            <span className="text-sm font-semibold tracking-wide">
              IntentScan
            </span>
          </div>

          <span className="rounded-full border border-border bg-white/5 px-3 py-1 text-xs text-muted">
            MVP Preview
          </span>
        </header>

        <div className="grid flex-1 items-center gap-12 py-20 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-border bg-white/5 px-4 py-2 text-sm text-muted">
              AI-powered message intent analyzer
            </p>

            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
              Decode suspicious messages before you reply.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              Paste a DM, email, SMS, or LinkedIn pitch. IntentScan detects
              scams, spam, manipulation, social red flags, and generates clean
              replies you can copy.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#analyze"
                className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
              >
                Analyze a message
              </a>
              <a
                href="#examples"
                className="rounded-full border border-border bg-white/5 px-5 py-3 text-sm font-semibold transition hover:bg-white/10"
              >
                View examples
              </a>
            </div>
          </div>

          <div
            id="analyze"
            className="rounded-3xl border border-border bg-white/[0.04] p-5 shadow-2xl backdrop-blur"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="font-semibold">Message analyzer</h2>
                <p className="mt-1 text-sm text-muted">
                  Mistral integration coming next.
                </p>
              </div>
              <div className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                Preview
              </div>
            </div>

            <textarea
              className="min-h-56 w-full resize-none rounded-2xl border border-border bg-black/30 p-4 text-sm outline-none transition placeholder:text-zinc-600 focus:border-accent/60"
              placeholder="Paste a weird message here..."
            />

            <button className="mt-4 w-full rounded-2xl bg-foreground px-5 py-3 text-sm font-semibold text-background transition hover:opacity-90">
              Analyze intent
            </button>
          </div>
        </div>

        <section id="examples" className="grid gap-4 pb-10 md:grid-cols-3">
          {examples.map((example) => (
            <div
              key={example}
              className="rounded-2xl border border-border bg-white/[0.03] p-4 text-sm leading-6 text-muted"
            >
              “{example}”
            </div>
          ))}
        </section>
      </section>
    </main>
  );
}
