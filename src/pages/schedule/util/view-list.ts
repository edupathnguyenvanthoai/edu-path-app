export function abbreviate(str?: string, max: number = 6): string {
  if (!str) return '';
  if (str.length <= max) return str;
  const words = str.split(/\s+/);
  return words.map((w) => w[0].toUpperCase()).join('');
}
