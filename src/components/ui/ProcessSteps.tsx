export function ProcessSteps({
  steps,
  light = false,
}: {
  steps: { title: string; text?: string }[];
  light?: boolean;
}) {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {steps.map((s, i) => (
        <li
          key={s.title}
          className={`relative rounded-xl border p-5 ${light ? "border-white/15 bg-white/5" : "border-navy-100 bg-white"}`}
        >
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-full font-display text-sm font-bold ${
              light ? "bg-gold-400 text-navy-950" : "bg-navy-900 text-gold-300"
            }`}
          >
            {i + 1}
          </span>
          <h3 className={`mt-4 text-base font-semibold ${light ? "text-white" : "text-navy-900"}`}>{s.title}</h3>
          {s.text ? <p className={`mt-1.5 text-sm leading-relaxed ${light ? "text-navy-200" : "text-navy-600"}`}>{s.text}</p> : null}
        </li>
      ))}
    </ol>
  );
}
