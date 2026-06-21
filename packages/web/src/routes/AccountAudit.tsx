import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { FeatureHeader } from "../components/FeatureHeader";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { auditAccount } from "../lib/api";

export function AccountAudit() {
  const [handle, setHandle] = useState("example");
  const audit = useMutation({ mutationFn: () => auditAccount(handle) });

  return (
    <div>
      <FeatureHeader
        eyebrow="Account"
        title="アカウントを診断"
        description="プロフィール bio とリンクの基本チェック（manual プラットフォーム / 読み取り専用）。"
      />
      <Card className="mb-8">
        <form
          className="grid gap-4 sm:grid-cols-[1fr_auto]"
          onSubmit={(event) => {
            event.preventDefault();
            audit.mutate();
          }}
        >
          <Input
            value={handle}
            onChange={(event) => setHandle(event.target.value)}
            placeholder="handle"
            required
          />
          <Button type="submit" disabled={audit.isPending}>
            {audit.isPending ? "診断中..." : "診断する"}
          </Button>
        </form>
      </Card>
      {audit.error instanceof Error && (
        <Card className="mb-6 border-danger text-danger">
          {audit.error.message}
        </Card>
      )}
      {audit.data && (
        <Card>
          <h2 className="text-xl font-light text-slate">チェック結果</h2>
          <div className="mt-5 divide-y divide-border">
            {audit.data.checks.map((check) => (
              <div key={check.id} className="py-4">
                <p className="font-medium text-slate">{check.label}</p>
                <p
                  className={`mt-1 text-sm ${check.passed ? "text-success" : "text-warning"}`}
                >
                  {check.detail}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
