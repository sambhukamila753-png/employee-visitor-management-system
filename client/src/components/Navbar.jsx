import React, { useState, useEffect } from 'react';
import {
  Users,
  Clock,
  UserPlus,
  RefreshCw,
  Sun,
  Moon,
  Database,
  Building2,
} from 'lucide-react';

export default function Navbar({
  theme,
  toggleTheme,
  onOpenCreateModal,
  onSeedData,
  dbStatus,
  isSeeding,
}) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const formattedDate = currentTime.toLocaleDateString([], {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <header className="navbar no-print">
      <div className="navbar-inner">
        {/* Brand logo & title */}
        <div className="brand-wrapper">
          <div className="brand-logo-icon">
            <Building2 size={24} />
          </div>
          <div className="brand-info">
            <div className="brand-title">
              VisitorIQ
              <span className="brand-badge">MERN STACK</span>
            </div>
            <span className="brand-subtitle">
              Employee Visitor Management System
            </span>
          </div>
        </div>

        {/* Live Clock & DB Status */}
        <div className="nav-actions">
          <div className="live-clock" title="Current Reception Time">
            <Clock size={14} />
            <span>{formattedDate} &bull; {formattedTime}</span>
          </div>

          <div
            className="system-status-pill"
            title={
              dbStatus?.databaseConnected
                ? 'Connected to MongoDB Database'
                : 'Running in Local JSON Storage Mode'
            }
          >
            <span className="status-dot"></span>
            <Database size={13} />
            <span>
              {dbStatus?.databaseConnected ? 'MongoDB Online' : 'Active (Local DB)'}
            </span>
          </div>

          {/* Theme toggle */}
          <button
            className="btn btn-secondary btn-icon-only"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Sample seed data button */}
          <button
            className="btn btn-secondary btn-sm"
            onClick={onSeedData}
            disabled={isSeeding}
            title="Restore sample demo visitor records"
          >
            <RefreshCw size={14} className={isSeeding ? 'spin' : ''} />
            <span>{isSeeding ? 'Seeding...' : 'Load Demo Data'}</span>
          </button>

          {/* New Visitor CTA */}
          <button
            className="btn btn-primary"
            onClick={onOpenCreateModal}
            id="btn-add-visitor"
          >
            <UserPlus size={16} />
            <span>+ Check In Visitor</span>
          </button>
        </div>
      </div>
    </header>
  );
}
