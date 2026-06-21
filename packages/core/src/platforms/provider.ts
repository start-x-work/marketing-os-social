export interface Profile {
  handle: string;
  platform: string;
  bio: string;
  links: string[];
  followerCount?: number;
}

export interface Post {
  id: string;
  text: string;
  createdAt: string;
  engagement?: Engagement;
}

export interface Engagement {
  likes: number;
  reposts: number;
  replies: number;
  impressions?: number;
}

/** Read-only social platform. Write methods are intentionally omitted. */
export interface SocialPlatform {
  /** Fetch profile (read-only) */
  getProfile(handle: string): Promise<Profile>;
  /** Fetch posts (read-only) */
  getPosts(handle: string, limit?: number): Promise<Post[]>;
  /** Fetch engagement (read-only) */
  getEngagement(postId: string): Promise<Engagement>;
}
