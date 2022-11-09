export function formatNumbers(
  number: number,
): string | `${number}k` | `${number}M` {
  if (Math.abs(number) <= 999) {
    return String(Math.sign(number) * Math.abs(number));
  } else if (Math.abs(number) > 999 && Math.abs(number) < 1_000_000) {
    return String(Number((Math.abs(number) / 1000).toFixed(1))) + "k";
  } else {
    return String(Number((Math.abs(number) / 1_000_000).toFixed(1))) + "M";
  }
}
