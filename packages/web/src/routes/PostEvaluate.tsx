import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { FeatureHeader } from "../components/FeatureHeader";
import { FeedbackList } from "../components/IssueList";
import { ScoreCard } from "../components/ScoreCard";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Textarea } from "../components/ui/Textarea";
import { evaluatePost } from "../lib/api";

function averageScore(scores: Record<string, number>): number {
  const values = Object.values(scores);
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function PostEvaluate() {
  const [text, setText] = useState("Marketing-OS で意思決定を構造化する。");
  const [platform, setPlatform] = useState("x");
  const evaluate = useMutation({
    mutationFn: () => evaluatePost({ text, platform }),
  });

  return (
    <div>
      <FeatureHeader
        eyebrow="Post"
        title="投稿を評価"
        description="Content OS 知見（URL 配置）と AI 評価で改善点を把握します。新しい投稿文の生成は行いません。"
      />
      <Card className="mb-8">
        <form
          className="grid gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            evaluate.mutate();
          }}
        >
          <Textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            rows={6}
            required
          />
          <label className="grid gap-2 text-sm">
            <span className="text-slate-muted">Platform</span>
            <select
              className="rounded-xl border border-border px-4 py-3"
              value={platform}
              onChange={(event) => setPlatform(event.target.value)}
            >
              <option value="x">X</option>
              <option value="threads">Threads</option>
              <option value="instagram">Instagram</option>
            </select>
          </label>
          <Button type="submit" disabled={evaluate.isPending}>
            {evaluate.isPending ? "評価中..." : "投稿を評価する"}
          </Button>
        </form>
      </Card>
      {evaluate.error instanceof Error && (
        <Card className="mb-6 border-danger text-danger">
          {evaluate.error.message}
        </Card>
      )}
      {evaluate.data && (
        <div className="space-y-6">
          <ScoreCard
            label="Overall"
            score={averageScore(evaluate.data.scores)}
          />
          {evaluate.data.warnings.length > 0 && (
            <FeedbackList items={evaluate.data.warnings} />
          )}
          <FeedbackList items={evaluate.data.feedback} />
        </div>
      )}
    </div>
  );
}
