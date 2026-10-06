const API_BASE = '/api/visitors';

export const api = {
  // Get all visitors with search & filters
  async getVisitors(params = {}) {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.status && params.status !== 'All') query.append('status', params.status);
    if (params.purpose && params.purpose !== 'All') query.append('purpose', params.purpose);
    if (params.dateFilter && params.dateFilter !== 'all') query.append('dateFilter', params.dateFilter);
    if (params.sortBy) query.append('sortBy', params.sortBy);
    if (params.sortOrder) query.append('sortOrder', params.sortOrder);

    const url = `${API_BASE}?${query.toString()}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch visitors');
    return data;
  },

  // Get statistics
  async getStats() {
    const res = await fetch(`${API_BASE}/stats`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch statistics');
    return data;
  },

  // Get visitor by ID
  async getVisitorById(id) {
    const res = await fetch(`${API_BASE}/${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Visitor not found');
    return data;
  },

  // Create new visitor
  async createVisitor(visitorData) {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(visitorData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create visitor record');
    return data;
  },

  // Update visitor details
  async updateVisitor(id, visitorData) {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(visitorData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update visitor record');
    return data;
  },

  // Quick checkout
  async checkOutVisitor(id) {
    const res = await fetch(`${API_BASE}/${id}/checkout`, {
      method: 'PATCH',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to check out visitor');
    return data;
  },

  // Delete visitor
  async deleteVisitor(id) {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete visitor record');
    return data;
  },

  // Seed sample data
  async seedData() {
    const res = await fetch(`${API_BASE}/seed`, {
      method: 'POST',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to seed sample data');
    return data;
  },

  // System Health
  async getHealth() {
    try {
      const res = await fetch('/api/health');
      return await res.json();
    } catch {
      return { status: 'offline', databaseConnected: false };
    }
  },
};
