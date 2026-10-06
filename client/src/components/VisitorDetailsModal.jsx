import React from 'react';
import {
  X,
  User,
  Phone,
  Mail,
  Building,
  Briefcase,
  Calendar,
  Clock,
  ShieldCheck,
  FileText,
  LogOut,
  Edit2,
  Printer,
  CheckCircle,
} from 'lucide-react';

export default function VisitorDetailsModal({
  isOpen,
  onClose,
  visitor,
  onEdit,
  onCheckOut,
  onPrintPass,
}) {
  if (!isOpen || !visitor) return null;

  const isCheckedIn = visitor.status === 'Checked In';

  const formatFullDate = (d) => {
    if (!d) return '—';
    return new Date(d).toLocaleString([], {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="modal-icon-badge">
              <FileText size={20} />
            </div>
            <div>
              <h3 className="modal-title">Visitor Record Details</h3>
              <p className="modal-subtitle">Registration ID: {visitor.badgeNumber || visitor._id}</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Visitor Banner Card */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1.25rem',
              background: 'var(--bg-surface-elevated)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>{visitor.visitorName}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.25rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {visitor.organization}
                </span>
                <span className="badge-counter">{visitor.badgeNumber}</span>
              </div>
            </div>

            <span className={`status-pill ${isCheckedIn ? 'checked-in' : 'checked-out'}`}>
              {isCheckedIn ? (
                <>
                  <span className="status-dot"></span>
                  Checked In (Inside)
                </>
              ) : (
                <>
                  <CheckCircle size={13} />
                  Checked Out
                </>
              )}
            </span>
          </div>

          {/* Details Grid */}
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label" style={{ color: 'var(--text-muted)' }}>
                <Phone size={13} /> Mobile Number
              </label>
              <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{visitor.mobileNumber}</span>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ color: 'var(--text-muted)' }}>
                <Mail size={13} /> Email Address
              </label>
              <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                {visitor.email || 'Not provided'}
              </span>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ color: 'var(--text-muted)' }}>
                <Building size={13} /> Organization / College
              </label>
              <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{visitor.organization}</span>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ color: 'var(--text-muted)' }}>
                <Briefcase size={13} /> Person to Meet (Host)
              </label>
              <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{visitor.personToMeet}</span>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ color: 'var(--text-muted)' }}>
                <FileText size={13} /> Purpose of Visit
              </label>
              <span className="purpose-pill" style={{ fontSize: '0.85rem' }}>
                {visitor.purpose}
              </span>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ color: 'var(--text-muted)' }}>
                <ShieldCheck size={13} /> ID Verification
              </label>
              <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                {visitor.idProofType} {visitor.idProofNumber ? `(${visitor.idProofNumber})` : ''}
              </span>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ color: 'var(--text-muted)' }}>
                <Calendar size={13} /> Check-In Timestamp
              </label>
              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                {formatFullDate(visitor.visitDateTime)}
              </span>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ color: 'var(--text-muted)' }}>
                <Clock size={13} /> Check-Out Timestamp
              </label>
              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                {visitor.checkOutDateTime ? formatFullDate(visitor.checkOutDateTime) : 'Still Checked In'}
              </span>
            </div>

            {visitor.remarks && (
              <div className="form-group form-full-width">
                <label className="form-label" style={{ color: 'var(--text-muted)' }}>
                  Remarks / Meeting Notes
                </label>
                <div
                  style={{
                    padding: '0.75rem 1rem',
                    background: 'var(--bg-surface-elevated)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.9rem',
                    color: 'var(--text-main)',
                  }}
                >
                  {visitor.remarks}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={() => onPrintPass(visitor)}>
            <Printer size={15} />
            <span>Print Pass</span>
          </button>

          <button className="btn btn-secondary" onClick={() => onEdit(visitor)}>
            <Edit2 size={15} />
            <span>Edit</span>
          </button>

          {isCheckedIn && (
            <button
              className="btn btn-warning"
              onClick={() => onCheckOut(visitor)}
              style={{ background: 'var(--warning)', color: 'white' }}
            >
              <LogOut size={15} />
              <span>Check Out Now</span>
            </button>
          )}

          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
