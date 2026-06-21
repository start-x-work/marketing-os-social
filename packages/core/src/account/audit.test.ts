import { describe, expect, it } from "vitest";
import type {
  Engagement,
  Post,
  Profile,
  SocialPlatform,
} from "../platforms/provider";
import { auditAccount } from "./audit";

function createMockPlatform(profile: Profile): SocialPlatform {
  return {
    getProfile: async () => profile,
    getPosts: async () => [] as Post[],
    getEngagement: async () =>
      ({ likes: 0, reposts: 0, replies: 0 }) satisfies Engagement,
  };
}

describe("auditAccount", () => {
  it("flags missing bio and profile link", async () => {
    const result = await auditAccount(
      createMockPlatform({
        handle: "testuser",
        platform: "manual",
        bio: "",
        links: [],
      }),
      "testuser",
    );

    expect(result.checks.filter((c) => !c.passed)).toHaveLength(2);
    expect(result.recommendations.length).toBe(2);
  });

  it("passes a complete profile", async () => {
    const result = await auditAccount(
      createMockPlatform({
        handle: "testuser",
        platform: "x",
        bio: "Marketing-OS advocate",
        links: ["https://example.com"],
      }),
      "testuser",
    );

    expect(result.checks.every((c) => c.passed)).toBe(true);
    expect(result.recommendations).toHaveLength(0);
  });
});
