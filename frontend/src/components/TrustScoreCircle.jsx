import React from 'react';
import { colorFromStatus, statusFromScore } from '../data/mockData.js';

function ringColorClass(status) {
  const c = colorFromStatus(status);
  if (c === 'safe') return 'text-safe';
  if (c === 'warning') return 'text-warning';
  return 'text-danger';
}

export default function TrustScoreCircle({ score, size = 180, showStatus = true }) {
  const clamped = Math.max(0, Math.min(100, Number(score) || 0));
  const status = statusFromScore(clamped);
  const stroke = Math.max(10, Math.round(size * 0.08));
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={stroke}
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinecap="round"
            fill="transparent"
            className={ringColorClass(status)}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={offset}
          />
        </svg>

        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center">
            <div className="text-5xl font-semibold tracking-tight text-white">{clamped}</div>
            <div className="mt-1 text-xs text-white/50">Trust Score</div>
          </div>
        </div>
      </div>

      {showStatus && (
        <div className="mt-3 flex items-center gap-2">
          <span
            className={[
              'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide',
              status === 'Safe'
                ? 'border-safe/25 bg-safe/10 text-safe'
                : status === 'Suspicious'
                ? 'border-warning/25 bg-warning/10 text-warning'
                : 'border-danger/25 bg-danger/10 text-danger'
            ].join(' ')}
          >
            {status.toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
}

