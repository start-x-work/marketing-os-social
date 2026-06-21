import type { Engagement, Post, Profile, SocialPlatform } from "./provider";

/** Manual export data platform stub. Reads empty data until export parsing is implemented. */
export class ManualDataPlatform implements SocialPlatform {
  constructor(private dataPath: string) {}

  async getProfile(handle: string): Promise<Profile> {
    void this.dataPath;
    return { handle, platform: "manual", bio: "", links: [] };
  }

  async getPosts(_handle: string, _limit?: number): Promise<Post[]> {
    void this.dataPath;
    return [];
  }

  async getEngagement(_postId: string): Promise<Engagement> {
    void this.dataPath;
    return { likes: 0, reposts: 0, replies: 0 };
  }
}
