import React from 'react';
import { colorFromStatus } from '../data/mockData.js';

function badgeClasses(status) {
  const c = colorFromStatus(status);
  if (c === 'safe') return 'border-safe/25 bg-safe/10 text-safe';
  if (c === 'warning') return 'border-warning/25 bg-warning/10 text-warning';
  return 'border-danger/25 bg-danger/10 text-danger';
}

export default function ScanTable({ rows }) {
  return (
    <div className="glass rounded-2xl p-5 shadow-glowSoft">
      <div className="mb-4">
        <div className="text-sm font-semibold text-white">Recent Scans</div>
        <div className="mt-1 text-xs text-white/50">Latest simulated activity</div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-separate border-spacing-y-2 text-left">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-white/40">
              <th className="px-3 py-2">URL</th>
              <th className="px-3 py-2">Type</th>
              <th className="px-3 py-2">Trust Score</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="rounded-xl bg-white/0">
                <td className="rounded-l-xl border border-white/5 bg-card/40 px-3 py-3 text-sm text-white/85">
                  <div className="max-w-[360px] truncate">{r.url}</div>
                </td>
                <td className="border-y border-white/5 bg-card/40 px-3 py-3 text-sm text-white/70">{r.type}</td>
                <td className="border-y border-white/5 bg-card/40 px-3 py-3 text-sm font-semibold text-white">
                  {r.score}
                </td>
                <td className="border-y border-white/5 bg-card/40 px-3 py-3">
                  <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${badgeClasses(r.status)}`}>
                    {r.status}
                  </span>
                </td>
                <td className="rounded-r-xl border border-white/5 bg-card/40 px-3 py-3 text-sm text-white/60">
                  {r.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

