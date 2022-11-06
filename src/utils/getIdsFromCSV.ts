import type { ChannelsId } from "@/utils/invidiousAPI";

export default async function getIdsFromFile(
  file: File,
): Promise<ChannelsId[]> {
  const reader = new FileReader();
  reader.readAsText(file);

  return new Promise((resolve) => {
    reader.onload = (event) =>
      formatFile(event).then((ids) => {
        if (ids) resolve(ids.slice(1, ids.length));
      });
  });
}

async function formatFile(event: Event): Promise<string[] | void> {
  const target = event.target as FileReader;
  const stringCsv = target.result;
  if (typeof stringCsv === "string") {
    return stringCsv
      .split(/\r?\n/)
      .map((item): string => {
        const id = item.match(/UC(.*?),/)?.[0];
        if (id) return id.replace(",", "");
        else return item;
      })
      .filter((id) => id !== "");
  }
}
