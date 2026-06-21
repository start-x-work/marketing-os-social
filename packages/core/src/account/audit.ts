import type { Profile, SocialPlatform } from "../platforms/provider";

export interface AccountCheck {
  id: string;
  label: string;
  passed: boolean;
  detail: string;
}

export interface AccountAudit {
  handle: string;
  platform: string;
  checks: AccountCheck[];
  recommendations: string[];
}

function checkBio(profile: Profile): AccountCheck {
  return {
    id: "bio",
    label: "bioが設定されているか",
    passed: profile.bio.length > 0,
    detail:
      profile.bio.length === 0 ? "bioが空です。" : "bioが設定されています。",
  };
}

function checkProfileLink(profile: Profile): AccountCheck {
  return {
    id: "profile-link",
    label: "プロフィールにリンクがあるか",
    passed: profile.links.length > 0,
    detail:
      profile.links.length === 0
        ? "プロフィールにリンクがありません。本文URLの代わりにプロフィールリンクを活用してください。"
        : "プロフィールリンクが設定されています。",
  };
}

export async function auditAccount(
  platform: SocialPlatform,
  handle: string,
): Promise<AccountAudit> {
  const profile = await platform.getProfile(handle);
  const checks = [checkBio(profile), checkProfileLink(profile)];

  return {
    handle,
    platform: profile.platform,
    checks,
    recommendations: checks.filter((c) => !c.passed).map((c) => c.detail),
  };
}
