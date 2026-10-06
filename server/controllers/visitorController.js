import { visitorStorage } from '../services/visitorStorage.js';
import { getDBStatus } from '../config/db.js';

// @desc    Get all visitors with optional search, filter & sorting
// @route   GET /api/visitors
export const getAllVisitors = async (req, res) => {
  try {
    const { search, status, purpose, dateFilter, sortBy = 'visitDateTime', sortOrder = 'desc' } = req.query;

    const query = {};

    // Search by name, mobile, organization, person to meet, or badge
    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { visitorName: searchRegex },
        { mobileNumber: searchRegex },
        { organization: searchRegex },
        { personToMeet: searchRegex },
        { badgeNumber: searchRegex },
      ];
    }

    // Filter by Status
    if (status && status !== 'All') {
      query.status = status;
    }

    // Filter by Purpose
    if (purpose && purpose !== 'All') {
      query.purpose = purpose;
    }

    // Filter by Date
    if (dateFilter && dateFilter !== 'all') {
      const now = new Date();
      if (dateFilter === 'today') {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        query.visitDateTime = { $gte: startOfDay, $lte: endOfDay };
      } else if (dateFilter === 'this_week') {
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        startOfWeek.setHours(0, 0, 0, 0);
        query.visitDateTime = { $gte: startOfWeek };
      } else if (dateFilter === 'this_month') {
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        query.visitDateTime = { $gte: startOfMonth };
      }
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const visitors = await visitorStorage.find(query, sortOptions);

    res.status(200).json({
      success: true,
      count: visitors.length,
      dbMode: getDBStatus() ? 'MongoDB' : 'Local JSON Persistence',
      data: visitors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch visitor records',
      error: error.message,
    });
  }
};

// @desc    Get single visitor by ID
// @route   GET /api/visitors/:id
export const getVisitorById = async (req, res) => {
  try {
    const visitor = await visitorStorage.findById(req.params.id);

    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: 'Visitor record not found',
      });
    }

    res.status(200).json({
      success: true,
      data: visitor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving visitor details',
      error: error.message,
    });
  }
};

// @desc    Create a new visitor record
// @route   POST /api/visitors
export const createVisitor = async (req, res) => {
  try {
    const {
      visitorName,
      mobileNumber,
      email,
      organization,
      personToMeet,
      purpose,
      visitDateTime,
      status,
      idProofType,
      idProofNumber,
      remarks,
    } = req.body;

    // Validate required fields
    if (!visitorName || !mobileNumber || !organization || !personToMeet || !purpose) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: Visitor Name, Mobile Number, Organization, Person to Meet, and Purpose of Visit.',
      });
    }

    const savedVisitor = await visitorStorage.create({
      visitorName: visitorName.trim(),
      mobileNumber: mobileNumber.trim(),
      email: (email || '').trim().toLowerCase(),
      organization: organization.trim(),
      personToMeet: personToMeet.trim(),
      purpose,
      visitDateTime: visitDateTime ? new Date(visitDateTime) : new Date(),
      status: status || 'Checked In',
      idProofType: idProofType || 'College / Student ID',
      idProofNumber: (idProofNumber || '').trim(),
      remarks: (remarks || '').trim(),
    });

    res.status(201).json({
      success: true,
      message: 'Visitor record created successfully',
      data: savedVisitor,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create visitor record',
      error: error.message,
    });
  }
};

// @desc    Update visitor details
// @route   PUT /api/visitors/:id
export const updateVisitor = async (req, res) => {
  try {
    const existing = await visitorStorage.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Visitor record not found',
      });
    }

    const updateData = { ...req.body };

    // If changing status to Checked Out and no checkout time specified, set it now
    if (updateData.status === 'Checked Out' && !updateData.checkOutDateTime && !existing.checkOutDateTime) {
      updateData.checkOutDateTime = new Date();
    } else if (updateData.status === 'Checked In') {
      updateData.checkOutDateTime = null;
    }

    const updatedVisitor = await visitorStorage.findByIdAndUpdate(req.params.id, updateData);

    res.status(200).json({
      success: true,
      message: 'Visitor details updated successfully',
      data: updatedVisitor,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update visitor record',
      error: error.message,
    });
  }
};

// @desc    Quick Check-Out toggle
// @route   PATCH /api/visitors/:id/checkout
export const checkOutVisitor = async (req, res) => {
  try {
    const visitor = await visitorStorage.findById(req.params.id);
    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: 'Visitor record not found',
      });
    }

    if (visitor.status === 'Checked Out') {
      return res.status(400).json({
        success: false,
        message: 'Visitor is already checked out',
      });
    }

    const updated = await visitorStorage.findByIdAndUpdate(req.params.id, {
      status: 'Checked Out',
      checkOutDateTime: new Date(),
    });

    res.status(200).json({
      success: true,
      message: `${visitor.visitorName} checked out successfully`,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to check out visitor',
      error: error.message,
    });
  }
};

// @desc    Delete visitor record
// @route   DELETE /api/visitors/:id
export const deleteVisitor = async (req, res) => {
  try {
    const visitor = await visitorStorage.findByIdAndDelete(req.params.id);

    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: 'Visitor record not found',
      });
    }

    res.status(200).json({
      success: true,
      message: `Visitor record for ${visitor.visitorName} deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete visitor record',
      error: error.message,
    });
  }
};

// @desc    Get dashboard metrics & statistics
// @route   GET /api/visitors/stats
export const getVisitorStats = async (req, res) => {
  try {
    const stats = await visitorStorage.getStats();

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch visitor statistics',
      error: error.message,
    });
  }
};

// @desc    Seed sample realistic visitors (for demonstration / testing)
// @route   POST /api/visitors/seed
export const seedSampleVisitors = async (req, res) => {
  try {
    const seeded = await visitorStorage.seed();

    res.status(201).json({
      success: true,
      message: `Database refreshed with ${seeded.length} realistic visitor records`,
      data: seeded,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to seed sample visitors',
      error: error.message,
    });
  }
};
