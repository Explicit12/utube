import axios from "axios";

export type VideoThumbnails = {
  height: number;
  quality: string;
  url: string;
  width: number;
}[];

export type PopularVideos = {
  title: string;
  author: string;
  authorId: string;
  viewCount: number;
  published: number;
  videoThumbnails: VideoThumbnails;
}[];

export const invidiousURL: string = "https://vid.puffyan.us";

const invidious = axios.create({
  baseURL: `${invidiousURL}/api/v1`,
});

export async function getPopular(): Promise<PopularVideos> {
  const response = await invidious.get("/popular", {
    params: {
      fields: "title,author,authorId,viewCount,published,videoThumbnails",
    },
  });
  const data = await response.data;
  return data;
}

export async function pingImage(url: string): Promise<void> {
  return axios.get(url);
}
