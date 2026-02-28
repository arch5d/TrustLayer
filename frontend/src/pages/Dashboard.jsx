import React from 'react';
import { AlertTriangle, Globe, Image, Mail } from 'lucide-react';
import StatsCard from '../components/StatsCard.jsx';
import TrustScoreCircle from '../components/TrustScoreCircle.jsx';
import ScanTable from '../components/ScanTable.jsx';
import ThreatChart from '../components/ThreatChart.jsx';
import { chartData, scanHistory, statusFromScore, trustScore } from '../data/mockData.js';

export default function Dashboard() {
  const status = statusFromScore(trustScore);

  const websitesScanned = scanHistory.filter((x) => x.type === 'Website').length;
  const threatsDetected = scanHistory.filter((x) => x.status === 'Dangerous').length;
  const emailsAnalyzed = scanHistory.filter((x) => x.type === 'Email').length;
  const mediaAnalyzed = scanHistory.filter((x) => x.type === 'Media').length;

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-2xl font-semibold text-white">Dashboard</div>
          <div className="mt-1 text-sm text-white/55">Modern cybersecurity UI prototype with simulated data.</div>
        </div>
        <div className="hidden rounded-full border border-white/8 bg-card/40 px-4 py-2 text-xs font-semibold text-white/70 sm:block">
          Environment: Frontend-only
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <div className="glass rounded-2xl p-6 shadow-glow">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-white">Trust Score</div>
              <div className="mt-1 text-xs text-white/50">Overall system confidence (mock)</div>
            </div>
            <div
              className={[
                'rounded-full border px-3 py-1 text-xs font-semibold tracking-wide',
                status === 'Safe'
                  ? 'border-safe/25 bg-safe/10 text-safe'
                  : status === 'Suspicious'
                  ? 'border-warning/25 bg-warning/10 text-warning'
                  : 'border-danger/25 bg-danger/10 text-danger'
              ].join(' ')}
            >
              {status.toUpperCase()}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center">
            <TrustScoreCircle score={trustScore} size={260} showStatus={false} />
          </div>

          <div className="mt-5 text-center">
            <div className="text-sm text-white/60">Status</div>
            <div className="mt-1 text-xl font-semibold text-white">
              {status === 'Safe' ? 'SAFE' : status === 'Suspicious' ? 'SUSPICIOUS' : 'DANGEROUS'}
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <StatsCard title="Websites scanned" value={websitesScanned} icon={Globe} tone="primary" />
          <StatsCard title="Threats detected" value={threatsDetected} icon={AlertTriangle} tone={threatsDetected ? 'warning' : 'safe'} />
          <StatsCard title="Emails analyzed" value={emailsAnalyzed} icon={Mail} tone="primary" />
          <StatsCard title="Media analyzed" value={mediaAnalyzed} icon={Image} tone="primary" />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <ThreatChart data={chartData} />
        <ScanTable rows={scanHistory} />
      </div>
    </div>
  );
}

