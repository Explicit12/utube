import axios from "axios";

export type VideoThumbnails = {
  height: number;
  quality: string;
  url: string;
  width: number;
}[];

export type ChannelsId = string;
export type VideoId = string;

export type ShortVideoInfo = {
  title: string;
  author: string;
  authorId: ChannelsId;
  videoId: VideoId;
  viewCount: number;
  published: number;
  videoThumbnails: VideoThumbnails;
};

export type AuthorThumbnails = {
  url: string;
  height: number;
  width: number;
}[];

export type ShortChannelInfo = {
  author: string;
  authorId: ChannelsId;
  authorThumbnails: AuthorThumbnails;
};

const invidiousURL: string = "https://vid.puffyan.us";

const invidious = axios.create({
  baseURL: invidiousURL + "/api/v1",
});

export async function getPopular(): Promise<ShortVideoInfo[]> {
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

export async function getShortChannelInfo(
  channelId: ChannelsId,
): Promise<ShortChannelInfo> {
  const response = await invidious.get("/channels/" + channelId, {
    params: {
      fields: "author,authorId,authorThumbnails",
    },
  });
  const data = await response.data;
  return data;
}

export async function getChannelsLatest(
  videoId: VideoId,
): Promise<ShortVideoInfo[]> {
  const response = await invidious.get("/channels/vidoes/" + videoId, {
    params: {
      fields:
        "title,author,authorId,videoId,viewCount,published,videoThumbnails",
    },
  });
  const data = await response.data;
  return data;
}
