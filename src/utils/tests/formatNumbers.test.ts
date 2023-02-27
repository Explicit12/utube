import { describe, test, expect } from "vitest";

import formatNumbers from "@/utils/formatNumbers";

describe("formatNumbers.ts", () => {
  test("formatNumbers formats small numbers correctly", () => {
    expect(formatNumbers(42)).toBe("42");
    expect(formatNumbers(-42)).toBe("-42");
    expect(formatNumbers(0)).toBe("0");
    expect(formatNumbers(999)).toBe("999");
    expect(formatNumbers(-999)).toBe("-999");
  });

  test("formatNumbers formats numbers in the thousands correctly", () => {
    expect(formatNumbers(1000)).toBe("1k");
    expect(formatNumbers(-1000)).toBe("-1k");
    expect(formatNumbers(2500)).toBe("2.5k");
    expect(formatNumbers(-2500)).toBe("-2.5k");
    expect(formatNumbers(999999)).toBe("999.9k");
    expect(formatNumbers(-999999)).toBe("-999.9k");
  });

  test("formatNumbers formats numbers in the millions correctly", () => {
    expect(formatNumbers(1000000)).toBe("1M");
    expect(formatNumbers(-1000000)).toBe("-1M");
    expect(formatNumbers(2500000)).toBe("2.5M");
    expect(formatNumbers(-2500000)).toBe("-2.5M");
    expect(formatNumbers(999999999)).toBe("999.9M");
    expect(formatNumbers(-999999999)).toBe("-999.9M");
  });
});
