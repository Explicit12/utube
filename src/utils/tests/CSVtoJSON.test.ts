import { describe, test, expect } from "vitest";

import CSVtoJSON from "@/utils/CSVtoJSON";

describe("formatNumbers.ts", () => {
  test("CSVtoJSON returns correct data from CSV file", async () => {
    const csvContent = `name,age,email
    John Doe,35,john.doe@example.com
    Jane Smith,28,jane.smith@example.com`;
    const csvFile = new File([csvContent], "test.csv", { type: "text/csv" });

    const result = await CSVtoJSON(csvFile);
    expect(result).toEqual([
      {
        name: "John Doe",
        age: "35",
        email: "john.doe@example.com",
      },
      {
        name: "Jane Smith",
        age: "28",
        email: "jane.smith@example.com",
      },
    ]);
  });

  test("CSVtoJSON throw an error if wrong file type recived", async () => {
    const fileContent = "Some content here";
    const file = new File([fileContent], "test.txt", { type: "text/txt" });

    await expect(CSVtoJSON(file)).rejects.toThrow("Wrong file type");
  });
});
