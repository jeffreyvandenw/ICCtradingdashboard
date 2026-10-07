const moneyFormat = new Intl.NumberFormat("nl-NL", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 2,
});

/** "€ 1.234,50"; with `signed`, positive amounts get a leading "+". */
export function formatMoney(value: number, { signed = false } = {}): string {
  const formatted = moneyFormat.format(value);
  return signed && value > 0 ? `+${formatted}` : formatted;
}

const compactMoneyFormat = new Intl.NumberFormat("nl-NL", {
  style: "currency",
  currency: "EUR",
  notation: "compact",
  maximumFractionDigits: 1,
});

/** "€ 12,5K" — for chart axes. */
export function formatMoneyCompact(value: number): string {
  return compactMoneyFormat.format(value);
}
