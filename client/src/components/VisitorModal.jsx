import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  Phone,
  Mail,
  Building,
  Briefcase,
  Calendar,
  FileText,
  ShieldCheck,
  Save,
  CheckCircle,
} from 'lucide-react';

const PURPOSE_OPTIONS = [
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

const ID_PROOF_OPTIONS = [
  'College / Student ID',
  'Company Employee ID',
  'Aadhaar Card',
  'Driving License',
  'Passport',
  'Government ID',
  'Other',
];

// Helper to convert Date to YYYY-MM-DDTHH:mm for datetime-local input
const toDateTimeLocalString = (date) => {
  const d = date ? new Date(date) : new Date();
  if (isNaN(d.getTime())) return '';
  const pad = (num) => String(num).padStart(2, '0');
  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export default function VisitorModal({
  isOpen,
  onClose,
  onSubmit,
  visitor,
  submitting,
}) {
  const isEditMode = Boolean(visitor && visitor._id);

  const [formData, setFormData] = useState({
    visitorName: '',
    mobileNumber: '',
    email: '',
    organization: '',
    personToMeet: '',
    purpose: 'Client Meeting',
    visitDateTime: toDateTimeLocalString(new Date()),
    status: 'Checked In',
    idProofType: 'College / Student ID',
    idProofNumber: '',
    remarks: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (visitor) {
      setFormData({
        visitorName: visitor.visitorName || '',
        mobileNumber: visitor.mobileNumber || '',
        email: visitor.email || '',
        organization: visitor.organization || '',
        personToMeet: visitor.personToMeet || '',
        purpose: visitor.purpose || 'Client Meeting',
        visitDateTime: toDateTimeLocalString(visitor.visitDateTime),
        status: visitor.status || 'Checked In',
        idProofType: visitor.idProofType || 'College / Student ID',
        idProofNumber: visitor.idProofNumber || '',
        remarks: visitor.remarks || '',
      });
      setErrors({});
    } else {
      setFormData({
        visitorName: '',
        mobileNumber: '',
        email: '',
        organization: '',
        personToMeet: '',
        purpose: 'Client Meeting',
        visitDateTime: toDateTimeLocalString(new Date()),
        status: 'Checked In',
        idProofType: 'College / Student ID',
        idProofNumber: '',
        remarks: '',
      });
      setErrors({});
    }
  }, [visitor, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.visitorName.trim()) {
      newErrors.visitorName = 'Visitor Name is required.';
    } else if (formData.visitorName.trim().length < 2) {
      newErrors.visitorName = 'Name must be at least 2 characters.';
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile Number is required.';
    } else if (!/^[0-9+\s\-()]{7,15}$/.test(formData.mobileNumber.trim())) {
      newErrors.mobileNumber = 'Please enter a valid phone number (7-15 digits).';
    }

    if (formData.email.trim() && !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.organization.trim()) {
      newErrors.organization = 'Organization or College Name is required.';
    }

    if (!formData.personToMeet.trim()) {
      newErrors.personToMeet = 'Person to Meet is required.';
    }

    if (!formData.purpose.trim()) {
      newErrors.purpose = 'Purpose of visit is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="modal-icon-badge">
              <User size={20} />
            </div>
            <div>
              <h3 className="modal-title">
                {isEditMode ? 'Update Visitor Record' : 'Register New Visitor'}
              </h3>
              <p className="modal-subtitle">
                {isEditMode
                  ? `Editing details for ${visitor.visitorName} (${visitor.badgeNumber || 'PASS'})`
                  : 'Enter visitor credentials and host meeting details'}
              </p>
            </div>
          </div>
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} id="visitor-form">
          <div className="modal-body">
            <div className="form-grid">
              {/* Visitor Name */}
              <div className="form-group">
                <label className="form-label" htmlFor="visitorName">
                  <User size={14} /> Visitor Name <span className="required-star">*</span>
                </label>
                <input
                  type="text"
                  id="visitorName"
                  name="visitorName"
                  className="form-input"
                  placeholder="e.g. John Doe"
                  value={formData.visitorName}
                  onChange={handleChange}
                  required
                />
                {errors.visitorName && (
                  <span className="form-error-msg">{errors.visitorName}</span>
                )}
              </div>

              {/* Mobile Number */}
              <div className="form-group">
                <label className="form-label" htmlFor="mobileNumber">
                  <Phone size={14} /> Mobile Number <span className="required-star">*</span>
                </label>
                <input
                  type="tel"
                  id="mobileNumber"
                  name="mobileNumber"
                  className="form-input"
                  placeholder="e.g. +91 98765 43210"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  required
                />
                {errors.mobileNumber && (
                  <span className="form-error-msg">{errors.mobileNumber}</span>
                )}
              </div>

              {/* Email Address */}
              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  <Mail size={14} /> Email Address (Optional)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="e.g. visitor@company.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <span className="form-error-msg">{errors.email}</span>
                )}
              </div>

              {/* Organization / College Name */}
              <div className="form-group">
                <label className="form-label" htmlFor="organization">
                  <Building size={14} /> Organization / College <span className="required-star">*</span>
                </label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  className="form-input"
                  placeholder="e.g. Microsoft / IIT Delhi"
                  value={formData.organization}
                  onChange={handleChange}
                  required
                />
                {errors.organization && (
                  <span className="form-error-msg">{errors.organization}</span>
                )}
              </div>

              {/* Person to Meet */}
              <div className="form-group">
                <label className="form-label" htmlFor="personToMeet">
                  <Briefcase size={14} /> Person to Meet <span className="required-star">*</span>
                </label>
                <input
                  type="text"
                  id="personToMeet"
                  name="personToMeet"
                  className="form-input"
                  placeholder="e.g. Dr. Rajesh Verma (VP Tech)"
                  value={formData.personToMeet}
                  onChange={handleChange}
                  required
                />
                {errors.personToMeet && (
                  <span className="form-error-msg">{errors.personToMeet}</span>
                )}
              </div>

              {/* Purpose of Visit */}
              <div className="form-group">
                <label className="form-label" htmlFor="purpose">
                  <FileText size={14} /> Purpose of Visit <span className="required-star">*</span>
                </label>
                <select
                  id="purpose"
                  name="purpose"
                  className="form-select"
                  value={formData.purpose}
                  onChange={handleChange}
                >
                  {PURPOSE_OPTIONS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                {errors.purpose && (
                  <span className="form-error-msg">{errors.purpose}</span>
                )}
              </div>

              {/* Date and Time of Visit */}
              <div className="form-group">
                <label className="form-label" htmlFor="visitDateTime">
                  <Calendar size={14} /> Date &amp; Time of Visit <span className="required-star">*</span>
                </label>
                <input
                  type="datetime-local"
                  id="visitDateTime"
                  name="visitDateTime"
                  className="form-input"
                  value={formData.visitDateTime}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Status */}
              <div className="form-group">
                <label className="form-label" htmlFor="status">
                  <CheckCircle size={14} /> Current Status
                </label>
                <select
                  id="status"
                  name="status"
                  className="form-select"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Checked In">Checked In</option>
                  <option value="Checked Out">Checked Out</option>
                </select>
              </div>

              {/* ID Proof Type */}
              <div className="form-group">
                <label className="form-label" htmlFor="idProofType">
                  <ShieldCheck size={14} /> ID Proof Document Type
                </label>
                <select
                  id="idProofType"
                  name="idProofType"
                  className="form-select"
                  value={formData.idProofType}
                  onChange={handleChange}
                >
                  {ID_PROOF_OPTIONS.map((id) => (
                    <option key={id} value={id}>{id}</option>
                  ))}
                </select>
              </div>

              {/* ID Proof Number */}
              <div className="form-group">
                <label className="form-label" htmlFor="idProofNumber">
                  ID Document / Badge Number
                </label>
                <input
                  type="text"
                  id="idProofNumber"
                  name="idProofNumber"
                  className="form-input"
                  placeholder="e.g. DL-12345 or Student Roll #"
                  value={formData.idProofNumber}
                  onChange={handleChange}
                />
              </div>

              {/* Remarks / Purpose Notes */}
              <div className="form-group form-full-width">
                <label className="form-label" htmlFor="remarks">
                  Remarks / Meeting Agenda Notes
                </label>
                <textarea
                  id="remarks"
                  name="remarks"
                  className="form-textarea"
                  placeholder="Additional context, badge collection remarks, luggage items..."
                  value={formData.remarks}
                  onChange={handleChange}
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
              id="btn-save-visitor"
            >
              <Save size={16} />
              <span>{submitting ? 'Saving...' : isEditMode ? 'Update Record' : 'Register Visitor'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
