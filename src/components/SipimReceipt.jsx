// Decorative "feature receipt" preview for SIPIM. Uses the site palette and fonts.
const ROWS = [
  { label: "Point of sale", card: true },
  { label: "Products & suppliers", card: true },
  { label: "Transaction history", card: true },
  { label: "Chart dashboard", card: true },
  { label: "Excel import/export" },
  { label: "Activity log" },
  { label: "Owner & staff roles", card: true },
];

export default function SipimReceipt({ variant = "card" }) {
  const isCard = variant === "card";
  const rows = isCard ? ROWS.filter((r) => r.card) : ROWS;

  const paper = (
    <div
      className={`receipt-edge relative bg-slate-50 font-mono text-slate-900 ${
        isCard
          ? "w-[240px] rotate-1 px-3.5 pb-[18px] pt-3 text-[10px] transition-transform duration-300 group-hover:rotate-0"
          : "mx-auto max-w-[280px] px-4 pb-[18px] pt-3 text-[11px]"
      }`}
    >
      <p className="mb-2 border-b border-dashed border-slate-900/30 pb-1.5 text-center font-bold">
        SIPIM Feature Receipt
      </p>
      <ul className={isCard ? "space-y-0.5" : "space-y-1"}>
        {rows.map((r) => (
          <li key={r.label} className="flex items-baseline">
            <span>{r.label}</span>
            <span className="mx-1 flex-1 border-b border-dotted border-slate-400" />
            <b className="font-semibold">Included</b>
          </li>
        ))}
      </ul>
      <p className="mt-2 border-t border-dashed border-slate-900 pt-1.5 text-[9px] leading-tight text-slate-600">
        Laravel 11 + Inertia, React + TypeScript, MySQL
      </p>
    </div>
  );

  if (!isCard) {
    return (
      <div aria-hidden="true" className="mt-5 rounded-lg bg-slate-900 p-5">
        {paper}
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="relative flex aspect-video w-full select-none items-center justify-center overflow-hidden bg-slate-900 p-4"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle,_#ffffff12_1px,_transparent_1px)] [background-size:16px_16px]" />
      <div className="relative">{paper}</div>
    </div>
  );
}
