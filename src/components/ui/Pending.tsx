/**
 * Visible placeholder for information the client has not yet confirmed (Plan §2, §19).
 * Deliberately styled so it can't be mistaken for final copy. Search the codebase for <Pending
 * to find every outstanding item before launch.
 */
export function Pending({ label, className = "" }: { label: string; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded border border-dashed border-gold-500 bg-gold-50 px-1.5 py-0.5 text-[0.8125rem] font-medium text-gold-700 ${className}`}
      title="Placeholder — to be confirmed by Finmirai before launch"
    >
      [{label} — to be confirmed]
    </span>
  );
}

/** Renders the value if present, otherwise a <Pending> placeholder. */
export function ValueOrPending({ value, label }: { value: string | null | undefined; label: string }) {
  return value ? <>{value}</> : <Pending label={label} />;
}
