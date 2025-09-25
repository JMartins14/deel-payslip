export function formatDateRange(from: string, to: string): string {
  const fromDate = new Date(from);
  const toDate = new Date(to);
  return `${fromDate.toISOString().split('T')[0]} – ${
    toDate.toISOString().split('T')[0]
  }`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toISOString().split('T')[0];
}
