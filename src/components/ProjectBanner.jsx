function AuditBanner() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-slate-900 p-5 text-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle,_#ffffff12_1px,_transparent_1px)] [background-size:16px_16px]" />
      <div className="relative w-full max-w-[340px] rotate-1 rounded-sm bg-slate-50 p-4 shadow-2xl transition-transform duration-300 group-hover:rotate-0 sm:p-5">
        <div className="flex items-start justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.2em] text-slate-500 sm:text-[9px]">
              Academic audit case study
            </p>
            <p className="mt-1 text-sm font-bold tracking-tight sm:text-base">ALFAGIFT / IT AUDIT</p>
          </div>
          <span className="rounded-sm border border-emerald-700/20 bg-emerald-700/10 px-2 py-1 font-mono text-[8px] font-semibold text-emerald-800 sm:text-[9px]">
            FINAL REPORT
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 py-3">
          <div className="rounded-sm border border-slate-200 bg-white p-2.5">
            <p className="font-mono text-[8px] uppercase tracking-wide text-slate-500">Control activities</p>
            <p className="mt-1 text-xl font-bold leading-none sm:text-2xl">15</p>
          </div>
          <div className="rounded-sm border border-slate-200 bg-white p-2.5">
            <p className="font-mono text-[8px] uppercase tracking-wide text-slate-500">Audit domains</p>
            <p className="mt-1 text-xl font-bold leading-none sm:text-2xl">05</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 border-t border-dashed border-slate-300 pt-2.5 font-mono text-[8px] text-slate-600 sm:text-[9px]">
          <span>COBIT 2019</span>
          <span aria-hidden="true">/</span>
          <span>ISO 31000</span>
          <span aria-hidden="true">/</span>
          <span>ISACA ITAF</span>
        </div>
      </div>
    </div>
  );
}

function JedaBanner() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-slate-900 p-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle,_#ffffff12_1px,_transparent_1px)] [background-size:16px_16px]" />
      <div className="relative w-full max-w-[370px] overflow-hidden rounded-md border border-white/15 bg-[#f4f4ef] text-slate-900 shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]">
        <div className="flex items-center justify-between border-b border-slate-200 px-3 py-2 sm:px-4">
          <p className="text-[10px] font-bold tracking-tight sm:text-xs">jeda</p>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[8px] font-medium text-emerald-800 sm:text-[9px]">
            Your private space
          </span>
        </div>
        <div className="grid grid-cols-[1.1fr_0.9fr] gap-2.5 p-3 sm:gap-3 sm:p-4">
          <div>
            <p className="font-mono text-[8px] uppercase tracking-wider text-slate-500">Today / Check-in</p>
            <p className="mt-1 text-[11px] font-semibold sm:text-sm">How are you feeling?</p>
            <div className="mt-2 flex gap-1">
              {["Calm", "Okay", "Tired"].map((mood) => (
                <span
                  key={mood}
                  className={`rounded-full border px-1.5 py-1 text-[7px] sm:px-2 sm:text-[8px] ${
                    mood === "Okay"
                      ? "border-emerald-700 bg-emerald-700 text-white"
                      : "border-slate-200 bg-white text-slate-600"
                  }`}
                >
                  {mood}
                </span>
              ))}
            </div>
            <div className="mt-3 flex h-8 items-end gap-1 sm:h-10">
              {[30, 50, 38, 68, 46, 78, 57, 88, 63, 74, 48, 68].map((height, index) => (
                <span
                  key={index}
                  className={`w-full rounded-t-sm ${index === 7 ? "bg-emerald-700" : "bg-emerald-700/20"}`}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
            <p className="mt-1 font-mono text-[7px] text-slate-500 sm:text-[8px]">Your recent check-ins</p>
          </div>
          <div className="flex flex-col items-center justify-center rounded-sm bg-white p-2 text-center">
            <div className="flex size-12 items-center justify-center rounded-full border-[3px] border-emerald-700/20 sm:size-14">
              <span className="size-7 rounded-full border border-emerald-700/40 sm:size-9" />
            </div>
            <p className="mt-2 text-[9px] font-semibold sm:text-[10px]">Take a moment</p>
            <p className="mt-0.5 font-mono text-[7px] text-slate-500 sm:text-[8px]">4-7-8 breathing</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectBanner({ type, variant = "card" }) {
  const isCard = variant === "card";

  return (
    <div
      aria-hidden="true"
      className={
        isCard
          ? "group aspect-video w-full select-none"
          : "group mt-5 aspect-video w-full select-none overflow-hidden rounded-lg"
      }
    >
      {type === "audit" ? <AuditBanner /> : <JedaBanner />}
    </div>
  );
}
