export interface UrlPlacementCheck {
  score: number;
  warnings: string[];
}

export function checkUrlPlacement(
  text: string,
  platform: string,
): UrlPlacementCheck {
  const urlRegex = /https?:\/\/[^\s]+/g;
  const urls = text.match(urlRegex) ?? [];
  const warnings: string[] = [];
  let score = 100;

  const penaltyPlatforms = ["x", "threads", "instagram"];
  if (penaltyPlatforms.includes(platform) && urls.length > 0) {
    score = 40;
    warnings.push(
      `本文に直接URLがあります(${urls.length}件)。${platform}ではリーチ低下の可能性。プロフィールリンクや返信欄への配置を検討してください。`,
    );
  }

  return { score, warnings };
}
