import React from 'react';
import {
  Phone,
  Building,
  User,
  Clock,
  IdCard,
  Edit2,
  Trash2,
  LogOut,
  Eye,
  Printer,
  Calendar,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

// Deterministic vibrant avatar background color based on name
const getAvatarColor = (name = '') => {
  const colors = [
    '#3b82f6', // blue
    '#10b981', // emerald
    '#8b5cf6', // purple
    '#f59e0b', // amber
    '#ec4899', // pink
    '#06b6d4', // cyan
    '#6366f1', // indigo
    '#f97316', // orange
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

// Format Date & Time cleanly
const formatDateTime = (dateString) => {
  if (!dateString) return '—';
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleString([], {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function VisitorTable({
  visitors,
  loading,
  onEdit,
  onDelete,
  onCheckOut,
  onViewDetails,
  onPrintPass,
  onOpenCreate,
}) {
  if (loading) {
    return (
      <div className="table-card">
        <div style={{ padding: '3.5rem 2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
          <div className="status-dot" style={{ margin: '0 auto 1rem', width: '12px', height: '12px' }}></div>
          <p style={{ fontWeight: 600 }}>Loading visitor records...</p>
        </div>
      </div>
    );
  }

  if (!visitors || visitors.length === 0) {
    return (
      <div className="table-card">
        <div className="empty-state">
          <div className="empty-state-icon">
            <AlertCircle size={32} />
          </div>
          <h3 className="empty-state-title">No Visitor Records Found</h3>
          <p className="empty-state-desc">
            No matching visitor entries were found for your current search or filter criteria.
          </p>
          <button className="btn btn-primary" onClick={onOpenCreate}>
            + Register New Visitor
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="table-card no-print">
      <div className="table-header-bar">
        <h2 className="table-title">
          <span>Visitor Log Register</span>
          <span className="badge-counter">{visitors.length} records</span>
        </h2>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          Showing newest entries first
        </span>
      </div>

      <div className="table-responsive">
        <table className="visitor-table">
          <thead>
            <tr>
              <th>Visitor Info</th>
              <th>Contact &amp; Organization</th>
              <th>Host &amp; Purpose</th>
              <th>Entry / Exit Time</th>
              <th>Status</th>
              <th style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visitors.map((visitor) => {
              const initials = visitor.visitorName
                ? visitor.visitorName
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase()
                : 'VI';

              const isCheckedIn = visitor.status === 'Checked In';

              return (
                <tr key={visitor._id}>
                  {/* Visitor Profile */}
                  <td>
                    <div className="visitor-profile-cell">
                      <div
                        className="visitor-avatar"
                        style={{ backgroundColor: getAvatarColor(visitor.visitorName) }}
                        title={visitor.visitorName}
                      >
                        {initials}
                      </div>
                      <div className="visitor-meta">
                        <span className="visitor-name">{visitor.visitorName}</span>
                        {visitor.email && (
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {visitor.email}
                          </span>
                        )}
                        <span className="visitor-badge-id">
                          {visitor.badgeNumber || 'PASS-PENDING'}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Contact & Organization */}
                  <td>
                    <div className="contact-cell">
                      <span className="contact-phone">
                        <Phone size={13} style={{ color: 'var(--primary)' }} />
                        {visitor.mobileNumber}
                      </span>
                      <span className="contact-org">
                        <Building size={13} />
                        {visitor.organization}
                      </span>
                    </div>
                  </td>

                  {/* Host & Purpose */}
                  <td>
                    <div className="host-cell">
                      <span className="host-person">
                        <User size={13} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} />
                        {visitor.personToMeet}
                      </span>
                      <span className="purpose-pill">
                        {visitor.purpose}
                      </span>
                    </div>
                  </td>

                  {/* Date & Time Log */}
                  <td>
                    <div className="time-cell">
                      <span className="time-checkin">
                        <Clock size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} />
                        In: {formatDateTime(visitor.visitDateTime)}
                      </span>
                      {visitor.checkOutDateTime ? (
                        <span className="time-checkout">
                          Out: {formatDateTime(visitor.checkOutDateTime)}
                        </span>
                      ) : (
                        <span style={{ color: '#10b981', fontSize: '0.72rem', fontWeight: 600 }}>
                          Currently Active
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td>
                    <span className={`status-pill ${isCheckedIn ? 'checked-in' : 'checked-out'}`}>
                      {isCheckedIn ? (
                        <>
                          <span className="status-dot"></span>
                          Checked In
                        </>
                      ) : (
                        <>
                          <CheckCircle2 size={13} />
                          Checked Out
                        </>
                      )}
                    </span>
                  </td>

                  {/* Action Buttons */}
                  <td>
                    <div className="table-actions" style={{ justifyContent: 'center' }}>
                      {/* Print Pass */}
                      <button
                        className="action-btn print-btn"
                        onClick={() => onPrintPass(visitor)}
                        title="Generate &amp; Print Visitor Pass"
                        aria-label="Print Visitor Pass"
                      >
                        <Printer size={15} />
                      </button>

                      {/* View Details */}
                      <button
                        className="action-btn"
                        onClick={() => onViewDetails(visitor)}
                        title="View Detailed Record"
                        aria-label="View Details"
                      >
                        <Eye size={15} />
                      </button>

                      {/* Edit */}
                      <button
                        className="action-btn edit-btn"
                        onClick={() => onEdit(visitor)}
                        title="Edit Visitor Information"
                        aria-label="Edit Visitor"
                      >
                        <Edit2 size={15} />
                      </button>

                      {/* Quick Check Out */}
                      {isCheckedIn && (
                        <button
                          className="action-btn checkout-btn"
                          onClick={() => onCheckOut(visitor)}
                          title="Instant Check-Out"
                          aria-label="Check-Out Visitor"
                        >
                          <LogOut size={15} />
                        </button>
                      )}

                      {/* Delete */}
                      <button
                        className="action-btn delete-btn"
                        onClick={() => onDelete(visitor)}
                        title="Delete Record"
                        aria-label="Delete Visitor"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
