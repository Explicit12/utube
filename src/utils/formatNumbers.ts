export default function formatNumbers(
  number: number,
): string | `${number}k` | `${number}M` {
  const sign = Math.sign(number);
  const abs = Math.abs(number);

  if (abs <= 999) {
    return String(sign * abs);
  } else if (abs > 999 && abs < 1_000_000) {
    // We have to use 1000.1 instead of 1000 to avoind rounding
    return String(sign * Number((abs / 1000.1).toFixed(1))) + "k";
  } else {
    // Same here
    return String(sign * Number((abs / 1_000_060).toFixed(1))) + "M";
  }
}
