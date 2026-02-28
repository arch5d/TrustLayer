import React from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="rounded-xl border border-white/10 bg-card/95 px-3 py-2 shadow-glowSoft">
      <div className="text-xs text-white/60">{label}</div>
      <div className="text-sm font-semibold text-white">{payload[0].value} / 100</div>
    </div>
  );
}

export default function ThreatChart({ data }) {
  return (
    <div className="glass rounded-2xl p-5 shadow-glowSoft">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-white">Trust Score Trend</div>
          <div className="mt-1 text-xs text-white/50">Mock data over the last 7 days</div>
        </div>
        <div className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          LIVE (SIMULATED)
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.35)" tickLine={false} axisLine={false} />
            <YAxis
              domain={[0, 100]}
              stroke="rgba(255,255,255,0.35)"
              tickLine={false}
              axisLine={false}
              width={30}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#4F46E5"
              strokeWidth={3}
              dot={{ r: 3, stroke: '#4F46E5', strokeWidth: 2, fill: '#0B0F17' }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

