import React, { useMemo, useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import ScanResult from '../components/ScanResult.jsx';

function randomScore() {
  return Math.floor(35 + Math.random() * 60);
}

export default function Scan() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [score, setScore] = useState(null);

  const checks = useMemo(
    () => [
      { label: 'SSL Certificate', value: 'Valid' },
      { label: 'Domain Age', value: 'Medium Risk' },
      { label: 'Phishing Detection', value: 'Low Risk' },
      { label: 'AI Content Detection', value: 'Safe' }
    ],
    []
  );

  function onAnalyze() {
    setIsLoading(true);
    setScore(null);
    window.setTimeout(() => {
      setScore(randomScore());
      setIsLoading(false);
    }, 2000);
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="text-2xl font-semibold text-white">Scan Simulator</div>
        <div className="mt-1 text-sm text-white/55">
          Enter a URL, email text, or pasted content. Results are simulated for demo screenshots.
        </div>
      </div>

      <div className="glass rounded-2xl p-6 shadow-glowSoft">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <label className="text-sm font-semibold text-white/80">Input</label>
            <div className="mt-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter website URL, email text, or paste content"
                className="min-h-[120px] w-full resize-none rounded-2xl border border-white/8 bg-card/40 px-4 py-3 text-sm text-white/90 outline-none ring-0 placeholder:text-white/35 focus:border-primary/40 focus:shadow-glowSoft"
              />
            </div>
          </div>

          <button
            onClick={onAnalyze}
            disabled={isLoading}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-sm font-semibold text-white shadow-glow transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {isLoading ? 'Analyzing…' : 'Analyze'}
          </button>
        </div>

        <div className="mt-4 text-xs text-white/45">
          Tip: Click Analyze repeatedly to generate a different random trust score each time.
        </div>
      </div>

      {isLoading && (
        <div className="glass rounded-2xl p-6 shadow-glow">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-primary/15 shadow-glowSoft" />
            <div>
              <div className="text-sm font-semibold text-white">Running simulated checks</div>
              <div className="mt-1 text-sm text-white/55">This takes ~2 seconds.</div>
            </div>
          </div>
          <div className="mt-5 grid gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-12 w-full animate-pulse rounded-2xl bg-white/5" />
            ))}
          </div>
        </div>
      )}

      {score !== null && <ScanResult score={score} checks={checks} />}
    </div>
  );
}

