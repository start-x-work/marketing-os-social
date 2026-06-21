import {
  ArrowRight,
  CalendarDays,
  MessageSquare,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "../components/ui/Card";

const features = [
  {
    to: "/post",
    title: "投稿評価",
    description:
      "URL配置診断と AI 評価で投稿の改善点を把握します（生成はしません）。",
    icon: MessageSquare,
  },
  {
    to: "/calendar",
    title: "カレンダー診断",
    description: "1/10 ルールなど Content OS 知見で投稿計画を診断します。",
    icon: CalendarDays,
  },
  {
    to: "/account",
    title: "アカウント診断",
    description: "プロフィールと bio の基本チェック（読み取り専用）。",
    icon: UserRound,
  },
];

export function Home() {
  return (
    <div className="space-y-12">
      <section className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
        <div>
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.24em] text-indigo">
            Social Toolkit
          </p>
          <h1 className="text-5xl font-light tracking-tight text-slate sm:text-6xl">
            対話の素材を、意思決定に。
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-muted">
            Marketing-OS Social は、投稿評価・カレンダー診断・アカウント診断を
            CLI と同じ core ロジックで実行する Web UI
            です。自動投稿は行いません。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/post"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo/90"
            >
              評価を始める
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://github.com/start-x-work/marketing-os-social"
              className="inline-flex items-center rounded-xl border border-border bg-white px-5 py-3 text-sm font-medium text-slate transition hover:border-indigo"
            >
              GitHubを見る
            </a>
          </div>
        </div>
        <Card className="overflow-hidden p-0">
          <div className="bg-gradient-to-br from-indigo via-cyan-400 to-teal-300 p-1">
            <div className="rounded-[1.35rem] bg-white p-7">
              <p className="text-sm text-slate-muted">v0.1 scope</p>
              <div className="mt-6 space-y-4">
                {features.map((feature, index) => (
                  <div key={feature.to} className="flex items-center gap-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-light text-sm font-medium text-indigo">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium text-slate">{feature.title}</p>
                      <p className="text-sm text-slate-muted">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
