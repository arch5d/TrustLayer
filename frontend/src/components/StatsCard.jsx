import React from 'react';

export default function StatsCard({ title, value, icon: Icon, tone = 'primary' }) {
  const toneStyles =
    tone === 'safe'
      ? 'bg-safe/10 text-safe border-safe/20'
      : tone === 'warning'
      ? 'bg-warning/10 text-warning border-warning/20'
      : tone === 'danger'
      ? 'bg-danger/10 text-danger border-danger/20'
      : 'bg-primary/10 text-primary border-primary/20';

  return (
    <div className="glass rounded-2xl p-5 shadow-glowSoft">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-sm text-white/60">{title}</div>
          <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${toneStyles}`}>
          {Icon ? <Icon className="h-5 w-5" /> : null}
        </div>
      </div>
    </div>
  );
}

