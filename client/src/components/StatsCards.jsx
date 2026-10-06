import React from 'react';
import { Users, UserCheck, UserMinus, Calendar, ArrowUpRight } from 'lucide-react';

export default function StatsCards({ stats, onSelectFilter }) {
  const {
    totalVisitors = 0,
    checkedIn = 0,
    checkedOut = 0,
    todayVisits = 0,
  } = stats || {};

  return (
    <section className="stats-grid no-print" aria-label="System Metrics">
      {/* Total Visitors */}
      <div
        className="stat-card total"
        onClick={() => onSelectFilter && onSelectFilter('status', 'All')}
        style={{ cursor: 'pointer' }}
        title="View All Visitors"
      >
        <div className="stat-content">
          <span className="stat-label">Total Visitors</span>
          <span className="stat-value">{totalVisitors}</span>
          <span className="stat-hint">
            <Users size={12} /> All recorded entries
          </span>
        </div>
        <div className="stat-icon-wrapper primary">
          <Users size={24} />
        </div>
      </div>

      {/* Currently Checked In */}
      <div
        className="stat-card checked-in"
        onClick={() => onSelectFilter && onSelectFilter('status', 'Checked In')}
        style={{ cursor: 'pointer' }}
        title="Filter by Checked In (Inside Premises)"
      >
        <div className="stat-content">
          <span className="stat-label">Currently Checked In</span>
          <span className="stat-value" style={{ color: '#10b981' }}>{checkedIn}</span>
          <span className="stat-hint" style={{ color: '#34d399' }}>
            <span className="status-dot"></span> On premise right now
          </span>
        </div>
        <div className="stat-icon-wrapper success">
          <UserCheck size={24} />
        </div>
      </div>

      {/* Checked Out */}
      <div
        className="stat-card checked-out"
        onClick={() => onSelectFilter && onSelectFilter('status', 'Checked Out')}
        style={{ cursor: 'pointer' }}
        title="Filter by Checked Out"
      >
        <div className="stat-content">
          <span className="stat-label">Checked Out</span>
          <span className="stat-value">{checkedOut}</span>
          <span className="stat-hint">
            <UserMinus size={12} /> Exited premises
          </span>
        </div>
        <div className="stat-icon-wrapper neutral">
          <UserMinus size={24} />
        </div>
      </div>

      {/* Today's Visits */}
      <div
        className="stat-card today"
        onClick={() => onSelectFilter && onSelectFilter('dateFilter', 'today')}
        style={{ cursor: 'pointer' }}
        title="Filter by Today's Visitors"
      >
        <div className="stat-content">
          <span className="stat-label">Today's Visits</span>
          <span className="stat-value">{todayVisits}</span>
          <span className="stat-hint">
            <Calendar size={12} /> Logged for current date
          </span>
        </div>
        <div className="stat-icon-wrapper warning">
          <Calendar size={24} />
        </div>
      </div>
    </section>
  );
}
