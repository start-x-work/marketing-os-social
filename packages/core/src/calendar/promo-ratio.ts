export interface PromoRatioCheck {
  ratio: number;
  warnings: string[];
}

export function checkPromoRatio(posts: { type: string }[]): PromoRatioCheck {
  if (posts.length === 0) return { ratio: 0, warnings: [] };

  const promoCount = posts.filter((p) => p.type === "promotional").length;
  const ratio = promoCount / posts.length;
  const warnings: string[] = [];

  if (ratio > 0.1) {
    warnings.push(
      `販促投稿の比率が ${(ratio * 100).toFixed(0)}% です。1/10ルール(10%以下)を超えています。価値提供型の投稿を増やすことを検討してください。`,
    );
  }

  return { ratio, warnings };
}
