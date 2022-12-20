import axios from "axios";

export type ChannelId = string;
export type VideoId = string;

export interface VideoThumbnail {
  height: number;
  quality: string;
  url: string;
  width: number;
}

export type AuthorThumbnail = Omit<VideoThumbnail, "quality">;
export type AuthorBanner = AuthorThumbnail;

export interface VideoInfo {
  title: string;
  author: string;
  authorId: ChannelId;
  videoId: VideoId;
  viewCount: number;
  likeCount: number;
  published: number;
  videoThumbnails: VideoThumbnail[];
  description?: string;
}

export interface ChannelInfo {
  author: string;
  authorId: ChannelId;
  authorThumbnails: AuthorThumbnail[];
  subCount: number;
  authorBanners: AuthorBanner[];
}

export interface FormatStream {
  url: string;
  itag: string;
  type: string;
  quality: string;
  container: string;
  encoding: string;
  qualityLabel: string;
  resolution: string;
  size: string;
}

export interface RecommendedVideo {
  videoId: string;
  title: string;
  videoThumbnails: VideoThumbnail[];
  author: string;
  lengthSeconds: number;
  viewCountText: string;
}

export interface Comment {
  author: string;
  authorThumbnails: AuthorThumbnail[];
  authorId: ChannelId;
  content: string;
  published: number;
  commentId: string;
}

const invidiousURL = "https://invidious.slipfox.xyz";

// needed to fetch viewsCount, likesCount in getVideo function.
// Main URL has some bug and always returns zeroes in this fileds.
// issue: https://github.com/iv-org/invidious/issues/3425
const deInvidiousURL = "https://invidious.dhusch.de";

const invidious = axios.create({
  baseURL: invidiousURL + "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

const invidiousDe = axios.create({
  baseURL: deInvidiousURL + "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getPopularVideos(): Promise<VideoInfo[]> {
  const response = await invidious.get("/popular", {
    params: {
      fields:
        "title,author,authorId,videoId,viewCount,published,videoThumbnails,likeCount",
    },
  });
  const data = await response.data;
  return data;
}

export async function pingImage(url: string): Promise<void> {
  return axios.get(url);
}

export async function getChannelInfo(
  channelId: ChannelId,
): Promise<ChannelInfo> {
  const response = await invidious.get("/channels/" + channelId, {
    params: {
      fields: "author,authorId,authorThumbnails,subCount,authorBanners",
    },
  });
  const data = await response.data;
  return data;
}

export async function getChannelSubs(channelId: ChannelId): Promise<number> {
  const response = await invidious.get("/channels/" + channelId, {
    params: {
      fields: "subCount",
    },
  });
  const data = await response.data;
  return data.subCount;
}

export async function getChannelVideos(videoId: VideoId): Promise<VideoInfo[]> {
  const response = await invidious.get("/channels/videos/" + videoId, {
    params: {
      fields:
        "title,author,authorId,videoId,viewCount,published,videoThumbnails,likeCount",
    },
  });
  const data = await response.data;
  return data;
}

export async function getVideo(videoId: VideoId): Promise<VideoInfo> {
  const response = await invidiousDe.get("/videos/" + videoId, {
    params: {
      fields:
        "title,author,authorId,videoId,viewCount,published,videoThumbnails,likeCount",
    },
  });
  const data = await response.data;
  return data;
}

export async function getVideoDiscription(videoId: VideoId): Promise<string> {
  const response = await invidious.get("/videos/" + videoId, {
    params: {
      fields: "descriptionHtml",
    },
  });
  const data = await response.data;
  return data.descriptionHtml;
}

export async function getVideoFormatStreams(
  videoId: VideoId,
): Promise<FormatStream[]> {
  const response = await invidious.get("/videos/" + videoId, {
    params: {
      fields: "formatStreams",
    },
  });
  const data = await response.data;
  return data.formatStreams;
}

export async function getRecommendedVideos(
  videoId: VideoId,
): Promise<RecommendedVideo[]> {
  const response = await invidious.get("/videos/" + videoId, {
    params: {
      fields: "recommendedVideos",
    },
  });
  const data = await response.data;
  return data.recommendedVideos;
}

export async function searchVideo(query: string): Promise<VideoInfo[]> {
  const response = await invidious.get("/search", {
    params: {
      q: query,
      sort_by: "relevance",
      fields:
        "title,author,authorId,videoId,viewCount,published,videoThumbnails,likeCount",
    },
  });
  const data = await response.data;
  return data;
}

export async function searchChannel(query: string): Promise<ChannelInfo[]> {
  const response = await invidious.get("/search", {
    params: {
      q: query,
      sort_by: "relevance",
      type: "channel",
      fields: "author,authorId,authorThumbnails,subCount,AuthorBanners",
    },
  });
  const data = await response.data;
  return data;
}

export async function getComments(videoId: VideoId): Promise<Comment[]> {
  const response = await invidious.get("/comments/" + videoId, {
    params: {
      fields: "comments",
    },
  });
  const data = await response.data;
  return data.comments;
}
