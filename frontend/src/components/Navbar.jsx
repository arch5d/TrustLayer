import React from 'react';
import { NavLink } from 'react-router-dom';
import { Clock3, LayoutDashboard, Search, Settings, Shield } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/scan', label: 'Scan', icon: Search },
  { to: '/history', label: 'History', icon: Clock3 },
  { to: '/settings', label: 'Settings', icon: Settings }
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-bg/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 shadow-glowSoft">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div className="leading-tight">
            <div className="text-lg font-semibold tracking-wide text-white">TrustLayer</div>
            <div className="text-xs text-white/50">Cybersecurity dashboard prototype</div>
          </div>
        </div>

        <nav className="hidden items-center gap-2 sm:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    'group inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition',
                    'border border-transparent',
                    isActive
                      ? 'bg-card text-white shadow-glow border-white/5'
                      : 'text-white/70 hover:text-white hover:bg-card/60 hover:border-white/5'
                  ].join(' ')
                }
              >
                <Icon className="h-4 w-4 text-white/60 group-hover:text-white/80" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="sm:hidden">
          <NavLink
            to="/scan"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-glow"
          >
            <Search className="h-4 w-4" />
            Scan
          </NavLink>
        </div>
      </div>
    </header>
  );
}

