import React from 'react';
import { X, Printer, Shield, CheckCircle, QrCode } from 'lucide-react';

export default function VisitorPassModal({ isOpen, onClose, visitor }) {
  if (!isOpen || !visitor) return null;

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = new Date(visitor.visitDateTime || Date.now()).toLocaleDateString([], {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const formattedTime = new Date(visitor.visitDateTime || Date.now()).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const initials = visitor.visitorName
    ? visitor.visitorName
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'VI';

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-dialog"
        style={{ maxWidth: '440px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header no-print">
          <div className="modal-title-group">
            <div className="modal-icon-badge">
              <Printer size={18} />
            </div>
            <div>
              <h3 className="modal-title">Visitor Security Pass</h3>
              <p className="modal-subtitle">Official premises temporary credential</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body pass-container printable-area">
          <div className="visitor-badge-card">
            {/* Badge Header */}
            <div className="badge-header">
              <div className="badge-corp-title">IBM / Enterprise Campus</div>
              <div className="badge-pass-type">VISITOR ACCESS PASS</div>

              <div className="badge-avatar-wrap">
                <div className="badge-avatar-inner">
                  {initials}
                </div>
              </div>
            </div>

            {/* Badge Body */}
            <div className="badge-body">
              <div className="badge-visitor-name">{visitor.visitorName}</div>
              <div className="badge-org-name">{visitor.organization}</div>

              <div className="badge-data-grid">
                <div className="badge-data-item">
                  <span className="badge-data-label">Host Person</span>
                  <span className="badge-data-val">{visitor.personToMeet}</span>
                </div>
                <div className="badge-data-item">
                  <span className="badge-data-label">Purpose</span>
                  <span className="badge-data-val">{visitor.purpose}</span>
                </div>
                <div className="badge-data-item">
                  <span className="badge-data-label">Issue Date</span>
                  <span className="badge-data-val">{formattedDate}</span>
                </div>
                <div className="badge-data-item">
                  <span className="badge-data-label">Entry Time</span>
                  <span className="badge-data-val">{formattedTime}</span>
                </div>
              </div>

              {/* Barcode & Pass ID */}
              <div className="badge-barcode-area">
                <div className="simulated-barcode">
                  {[2, 4, 1, 3, 2, 5, 2, 1, 4, 3, 2, 1, 3, 4, 2, 5, 1, 3, 2, 4, 1, 2, 3].map((width, idx) => (
                    <div
                      key={idx}
                      className="barcode-line"
                      style={{ width: `${width * 2}px` }}
                    ></div>
                  ))}
                </div>
                <span className="badge-code-string">{visitor.badgeNumber || 'VIS-TEMP-001'}</span>
              </div>

              <div className="badge-footer-note">
                Please wear this pass visibly at all times and return to reception upon check-out.
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer no-print">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={handlePrint}>
            <Printer size={16} />
            <span>Print Pass Badge</span>
          </button>
        </div>
      </div>
    </div>
  );
}
