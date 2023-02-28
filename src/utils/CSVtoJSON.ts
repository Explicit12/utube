export default async function CSVtoJSON(
  file: File,
): Promise<Record<string, string>[] | void> {
  if (file.type !== "text/csv") throw new Error("Wrong file type");

  const reader = new FileReader();
  reader.readAsText(file);
  return new Promise((resolve) => {
    reader.onload = (event) => resolve(formatFile(event));
  });
}

async function formatFile(
  event: Event,
): Promise<Record<string, string>[] | void> {
  const target: FileReader = event.target as FileReader;
  const stringCsv = target.result;
  if (typeof stringCsv === "string") {
    const titles = stringCsv
      .slice(0, stringCsv.indexOf("\n"))
      .split(",")
      .map((title) => title.trim());

    return stringCsv
      .slice(stringCsv.indexOf("\n") + 1)
      .split("\n")
      .filter((v) => v !== "")
      .map((v) => {
        const values = v.split(",").map((value) => value.trim());
        return titles.reduce(
          (obj, title: string, index: number) => (
            (obj[title] = values[index]), obj
          ),
          {} as Record<string, string>,
        );
      });
  }
}
