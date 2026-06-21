import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { FeatureHeader } from "../components/FeatureHeader";
import { IssueList } from "../components/IssueList";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Textarea } from "../components/ui/Textarea";
import { analyzeCalendar } from "../lib/api";

const sample = [
  {
    date: "2026-06-01",
    platform: "x",
    text: "Tips for marketers",
    type: "value",
  },
  {
    date: "2026-06-02",
    platform: "x",
    text: "Buy now",
    type: "promotional",
  },
];

export function CalendarAnalyze() {
  const [json, setJson] = useState(JSON.stringify(sample, null, 2));
  const analyze = useMutation({
    mutationFn: async () => analyzeCalendar(JSON.parse(json)),
  });

  return (
    <div>
      <FeatureHeader
        eyebrow="Calendar"
        title="コンテンツカレンダーを診断"
        description="投稿計画 JSON を入力し、販促比率（1/10 ルール）などを診断します。"
      />
      <Card className="mb-8">
        <form
          className="grid gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            analyze.mutate();
          }}
        >
          <Textarea
            value={json}
            onChange={(event) => setJson(event.target.value)}
            rows={14}
            className="font-mono text-sm"
            required
          />
          <Button type="submit" disabled={analyze.isPending}>
            {analyze.isPending ? "診断中..." : "カレンダーを診断する"}
          </Button>
        </form>
      </Card>
      {analyze.error instanceof Error && (
        <Card className="mb-6 border-danger text-danger">
          {analyze.error.message}
        </Card>
      )}
      {analyze.data && (
        <div className="space-y-6">
          <Card>
            <p className="text-sm text-slate-muted">Total posts</p>
            <p className="mt-2 text-3xl font-light text-slate">
              {analyze.data.totalPosts}
            </p>
            <p className="mt-4 text-sm text-slate-muted">
              Promo ratio: {(analyze.data.promoRatio * 100).toFixed(0)}%
            </p>
          </Card>
          <IssueList items={analyze.data.warnings} />
        </div>
      )}
    </div>
  );
}
