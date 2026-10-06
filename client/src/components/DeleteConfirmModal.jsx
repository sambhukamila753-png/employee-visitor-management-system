import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  visitor,
  deleting,
}) {
  if (!isOpen || !visitor) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-dialog"
        style={{ maxWidth: '440px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-title-group">
            <div
              className="modal-icon-badge"
              style={{ background: 'var(--danger-bg)', color: 'var(--danger)' }}
            >
              <AlertTriangle size={20} />
            </div>
            <div>
              <h3 className="modal-title">Delete Visitor Record</h3>
              <p className="modal-subtitle">Permanent removal confirmation</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ textAlign: 'center', padding: '1.5rem 1rem' }}>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            Are you sure you want to delete the visitor record for:
          </p>
          <div
            style={{
              padding: '0.85rem',
              background: 'var(--bg-surface-elevated)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              marginBottom: '1rem',
            }}
          >
            <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-main)' }}>
              {visitor.visitorName}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              {visitor.organization} &bull; {visitor.badgeNumber}
            </div>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--danger)', fontWeight: 500 }}>
            This action cannot be undone and will permanently remove this entry from logs.
          </p>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
            disabled={deleting}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={onConfirm}
            disabled={deleting}
            id="btn-confirm-delete"
          >
            <Trash2 size={16} />
            <span>{deleting ? 'Deleting...' : 'Confirm Delete'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
