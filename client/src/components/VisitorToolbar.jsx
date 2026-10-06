import React from 'react';
import {
  Search,
  X,
  Filter,
  Download,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react';

export default function VisitorToolbar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  purposeFilter,
  onPurposeChange,
  dateFilter,
  onDateChange,
  onResetFilters,
  onExportCSV,
  totalCount,
}) {
  const purposes = [
    'All',
    'Client Meeting',
    'Job Interview',
    'Industrial Visit',
    'Vendor / Delivery',
    'Campus / Student Visit',
    'Official Discussion',
    'Maintenance / Service',
    'Consultation',
    'Personal',
    'Other',
  ];

  return (
    <div className="toolbar-card no-print">
      <div className="toolbar-row">
        {/* Search Input */}
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search visitors by Name, Mobile, Org, or Person to Meet..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            id="search-input"
          />
          {searchQuery && (
            <button
              className="clear-search-btn"
              onClick={() => onSearchChange('')}
              title="Clear search"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filter Controls Group */}
        <div className="filters-group">
          {/* Status Tabs */}
          <div className="status-tabs" role="group" aria-label="Filter by Status">
            {['All', 'Checked In', 'Checked Out'].map((status) => (
              <button
                key={status}
                type="button"
                className={`status-tab-btn ${statusFilter === status ? 'active' : ''}`}
                onClick={() => onStatusChange(status)}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Purpose Filter */}
          <select
            className="filter-select"
            value={purposeFilter}
            onChange={(e) => onPurposeChange(e.target.value)}
            title="Filter by Visit Purpose"
            aria-label="Filter by Visit Purpose"
          >
            <option value="All">All Purposes</option>
            {purposes.filter((p) => p !== 'All').map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>

          {/* Date Filter */}
          <select
            className="filter-select"
            value={dateFilter}
            onChange={(e) => onDateChange(e.target.value)}
            title="Filter by Date"
            aria-label="Filter by Date"
          >
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="this_week">This Week</option>
            <option value="this_month">This Month</option>
          </select>

          {/* Export CSV Button */}
          <button
            className="btn btn-secondary btn-sm"
            onClick={onExportCSV}
            title="Export filtered records to CSV file"
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>

          {/* Reset Filters */}
          {(searchQuery || statusFilter !== 'All' || purposeFilter !== 'All' || dateFilter !== 'all') && (
            <button
              className="btn btn-secondary btn-sm"
              onClick={onResetFilters}
              title="Reset all filters"
            >
              <RotateCcw size={13} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
