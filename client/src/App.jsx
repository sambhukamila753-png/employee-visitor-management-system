import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import StatsCards from './components/StatsCards';
import VisitorToolbar from './components/VisitorToolbar';
import VisitorTable from './components/VisitorTable';
import VisitorModal from './components/VisitorModal';
import VisitorPassModal from './components/VisitorPassModal';
import VisitorDetailsModal from './components/VisitorDetailsModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Toast from './components/Toast';
import { api } from './services/api';

export default function App() {
  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('visitoriq-theme') || 'dark';
  });

  // Data states
  const [visitors, setVisitors] = useState([]);
  const [stats, setStats] = useState({
    totalVisitors: 0,
    checkedIn: 0,
    checkedOut: 0,
    todayVisits: 0,
    purposeBreakdown: [],
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [dbStatus, setDbStatus] = useState({ databaseConnected: false });

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [purposeFilter, setPurposeFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('all');

  // Modal states
  const [isVisitorModalOpen, setIsVisitorModalOpen] = useState(false);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState(null);

  // Toast state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Sync theme attribute with DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('visitoriq-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Fetch visitors & stats
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [visitorsRes, statsRes, healthRes] = await Promise.all([
        api.getVisitors({
          search: searchQuery,
          status: statusFilter,
          purpose: purposeFilter,
          dateFilter: dateFilter,
        }),
        api.getStats(),
        api.getHealth(),
      ]);

      if (visitorsRes?.data) setVisitors(visitorsRes.data);
      if (statsRes?.data) setStats(statsRes.data);
      if (healthRes) setDbStatus(healthRes);
    } catch (err) {
      console.error('Error fetching visitor data:', err);
      showToast(err.message || 'Failed to load visitor records', 'error');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, statusFilter, purposeFilter, dateFilter]);

  // Initial load and whenever filters change
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handlers for Add / Edit
  const handleOpenCreateModal = () => {
    setSelectedVisitor(null);
    setIsVisitorModalOpen(true);
  };

  const handleOpenEditModal = (visitor) => {
    setSelectedVisitor(visitor);
    setIsDetailsModalOpen(false);
    setIsVisitorModalOpen(true);
  };

  const handleSaveVisitor = async (formData) => {
    try {
      setSubmitting(true);
      if (selectedVisitor && selectedVisitor._id) {
        // Edit mode
        await api.updateVisitor(selectedVisitor._id, formData);
        showToast(`Record for ${formData.visitorName} updated successfully`);
      } else {
        // Create mode
        await api.createVisitor(formData);
        showToast(`Visitor ${formData.visitorName} checked in successfully`);
      }
      setIsVisitorModalOpen(false);
      setSelectedVisitor(null);
      await loadData();
    } catch (err) {
      showToast(err.message || 'Operation failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // Quick Check Out
  const handleQuickCheckOut = async (visitor) => {
    try {
      await api.checkOutVisitor(visitor._id);
      showToast(`${visitor.visitorName} has checked out successfully`);
      await loadData();
    } catch (err) {
      showToast(err.message || 'Check out failed', 'error');
    }
  };

  // Delete Record
  const handleOpenDeleteModal = (visitor) => {
    setSelectedVisitor(visitor);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedVisitor) return;
    try {
      setSubmitting(true);
      await api.deleteVisitor(selectedVisitor._id);
      showToast(`Visitor record deleted successfully`);
      setIsDeleteModalOpen(false);
      setSelectedVisitor(null);
      await loadData();
    } catch (err) {
      showToast(err.message || 'Deletion failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // Print Visitor Pass
  const handleOpenPrintPass = (visitor) => {
    setSelectedVisitor(visitor);
    setIsPassModalOpen(true);
  };

  // View Details
  const handleOpenDetails = (visitor) => {
    setSelectedVisitor(visitor);
    setIsDetailsModalOpen(true);
  };

  // Seed Demo Data
  const handleSeedData = async () => {
    try {
      setIsSeeding(true);
      const res = await api.seedData();
      showToast(res.message || 'Sample visitor data loaded');
      await loadData();
    } catch (err) {
      showToast(err.message || 'Failed to seed sample data', 'error');
    } finally {
      setIsSeeding(false);
    }
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setPurposeFilter('All');
    setDateFilter('all');
  };

  // Select filter from KPI card click
  const handleSelectFilterFromCard = (filterKey, value) => {
    if (filterKey === 'status') {
      setStatusFilter(value);
    } else if (filterKey === 'dateFilter') {
      setDateFilter(value);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (visitors.length === 0) {
      showToast('No records available to export', 'error');
      return;
    }

    const headers = [
      'Badge Number',
      'Visitor Name',
      'Mobile Number',
      'Email',
      'Organization / College',
      'Person To Meet',
      'Purpose',
      'Status',
      'Entry Time',
      'Exit Time',
      'ID Type',
      'ID Number',
      'Remarks',
    ];

    const rows = visitors.map((v) => [
      `"${v.badgeNumber || ''}"`,
      `"${(v.visitorName || '').replace(/"/g, '""')}"`,
      `"${v.mobileNumber || ''}"`,
      `"${v.email || ''}"`,
      `"${(v.organization || '').replace(/"/g, '""')}"`,
      `"${(v.personToMeet || '').replace(/"/g, '""')}"`,
      `"${v.purpose || ''}"`,
      `"${v.status || ''}"`,
      `"${v.visitDateTime ? new Date(v.visitDateTime).toLocaleString() : ''}"`,
      `"${v.checkOutDateTime ? new Date(v.checkOutDateTime).toLocaleString() : ''}"`,
      `"${v.idProofType || ''}"`,
      `"${v.idProofNumber || ''}"`,
      `"${(v.remarks || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    const dateStr = new Date().toISOString().slice(0, 10);
    link.setAttribute('download', `visitor-logs-${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`Exported ${visitors.length} visitor records to CSV`);
  };

  return (
    <div className="app-wrapper">
      {/* Top Navbar */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenCreateModal={handleOpenCreateModal}
        onSeedData={handleSeedData}
        dbStatus={dbStatus}
        isSeeding={isSeeding}
      />

      {/* Main Content Area */}
      <main className="app-container">
        {/* KPI Metrics */}
        <StatsCards
          stats={stats}
          onSelectFilter={handleSelectFilterFromCard}
        />

        {/* Search & Filter Toolbar */}
        <VisitorToolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          purposeFilter={purposeFilter}
          onPurposeChange={setPurposeFilter}
          dateFilter={dateFilter}
          onDateChange={setDateFilter}
          onResetFilters={handleResetFilters}
          onExportCSV={handleExportCSV}
          totalCount={visitors.length}
        />

        {/* Visitors Register Table */}
        <VisitorTable
          visitors={visitors}
          loading={loading}
          onEdit={handleOpenEditModal}
          onDelete={handleOpenDeleteModal}
          onCheckOut={handleQuickCheckOut}
          onViewDetails={handleOpenDetails}
          onPrintPass={handleOpenPrintPass}
          onOpenCreate={handleOpenCreateModal}
        />
      </main>

      {/* Add / Edit Visitor Modal */}
      <VisitorModal
        isOpen={isVisitorModalOpen}
        onClose={() => setIsVisitorModalOpen(false)}
        onSubmit={handleSaveVisitor}
        visitor={selectedVisitor}
        submitting={submitting}
      />

      {/* Printable Visitor Security Badge Pass Modal */}
      <VisitorPassModal
        isOpen={isPassModalOpen}
        onClose={() => setIsPassModalOpen(false)}
        visitor={selectedVisitor}
      />

      {/* Full Record Details Modal */}
      <VisitorDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        visitor={selectedVisitor}
        onEdit={handleOpenEditModal}
        onCheckOut={handleQuickCheckOut}
        onPrintPass={handleOpenPrintPass}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        visitor={selectedVisitor}
        deleting={submitting}
      />

      {/* Toast Notification Container */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
