import React from 'react';
import { CheckCircle2, ShieldAlert } from 'lucide-react';
import TrustScoreCircle from './TrustScoreCircle.jsx';
import { statusFromScore } from '../data/mockData.js';

function riskBadgeClasses(status) {
  if (status === 'Safe') return 'border-safe/25 bg-safe/10 text-safe';
  if (status === 'Suspicious') return 'border-warning/25 bg-warning/10 text-warning';
  return 'border-danger/25 bg-danger/10 text-danger';
}

export default function ScanResult({ score, checks }) {
  const status = statusFromScore(score);
  return (
    <div className="glass rounded-2xl p-6 shadow-glow">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary shadow-glowSoft">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <div className="text-lg font-semibold text-white">Simulated Scan Result</div>
            <div className="mt-1 text-sm text-white/60">No backend calls — score is randomized.</div>
          </div>
        </div>

        <span className={`inline-flex w-fit rounded-full border px-4 py-2 text-xs font-semibold ${riskBadgeClasses(status)}`}>
          Risk Level: {status.toUpperCase()}
        </span>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr]">
        <div className="flex items-center justify-center">
          <TrustScoreCircle score={score} size={220} />
        </div>

        <div className="rounded-2xl border border-white/6 bg-card/40 p-5">
          <div className="text-sm font-semibold text-white">Checklist</div>
          <div className="mt-1 text-xs text-white/50">Simulated signals for demo screenshots</div>

          <ul className="mt-4 space-y-3">
            {checks.map((c) => (
              <li key={c.label} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-safe" />
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white/90">{c.label}</div>
                  <div className="text-sm text-white/60">{c.value}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

