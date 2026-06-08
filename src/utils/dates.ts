// Date helpers for API queries. Kept pure (no side effects) so they're easy to test.

function toISODate(d: Date): string {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

/** First and last day of the current month, as YYYY-MM-DD strings. */
export function getCurrentMonthRange(): { startDate: string; endDate: string } {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-based
  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0); // day 0 of next month = last day of this one
  return { startDate: toISODate(start), endDate: toISODate(end) };
}
