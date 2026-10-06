import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Visitor from '../models/Visitor.js';
import { getDBStatus } from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../data/visitors.json');

// Ensure data directory exists
const ensureDataDir = () => {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Initial default sample records
const defaultVisitors = [
  {
    _id: '67001a1b2c3d4e5f6a7b8001',
    visitorName: 'Aarav Sharma',
    mobileNumber: '+91 98765 43210',
    email: 'aarav.sharma@techcorp.in',
    organization: 'TechCorp Solutions',
    personToMeet: 'Dr. Rajesh Verma (VP Engineering)',
    purpose: 'Client Meeting',
    visitDateTime: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    checkOutDateTime: null,
    status: 'Checked In',
    badgeNumber: 'VIS-2603-1001',
    idProofType: 'Aadhaar Card',
    idProofNumber: 'XXXX-XXXX-8921',
    remarks: 'Discussing Q3 Cloud Infrastructure Migration proposal.',
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  },
  {
    _id: '67001a1b2c3d4e5f6a7b8002',
    visitorName: 'Priya Patel',
    mobileNumber: '+91 91234 56789',
    email: 'priya.patel@iitdelhi.ac.in',
    organization: 'IIT Delhi',
    personToMeet: 'Ananya Roy (Head of Talent Acquisition)',
    purpose: 'Job Interview',
    visitDateTime: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
    checkOutDateTime: null,
    status: 'Checked In',
    badgeNumber: 'VIS-2603-1002',
    idProofType: 'College / Student ID',
    idProofNumber: 'IITD-2023-CS041',
    remarks: 'Final round technical interview for Full Stack Developer role.',
    createdAt: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
  },
  {
    _id: '67001a1b2c3d4e5f6a7b8003',
    visitorName: 'Rohan Deshmukh',
    mobileNumber: '+91 99887 76655',
    email: 'rohan.deshmukh@supplylink.com',
    organization: 'SupplyLink Logistics',
    personToMeet: 'Vikram Sethi (Procurement Manager)',
    purpose: 'Vendor / Delivery',
    visitDateTime: new Date(Date.now() - 240 * 60 * 1000).toISOString(),
    checkOutDateTime: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
    status: 'Checked Out',
    badgeNumber: 'VIS-2603-1003',
    idProofType: 'Driving License',
    idProofNumber: 'DL-04201900342',
    remarks: 'Delivered hardware servers and signed dispatch receipt.',
    createdAt: new Date(Date.now() - 240 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
  },
  {
    _id: '67001a1b2c3d4e5f6a7b8004',
    visitorName: 'Sneha Kulkarni',
    mobileNumber: '+91 97654 32109',
    email: 'sneha.k@mitpune.edu',
    organization: 'MIT World Peace University',
    personToMeet: 'Kavita Nair (R&D Director)',
    purpose: 'Campus / Student Visit',
    visitDateTime: new Date(Date.now() - 360 * 60 * 1000).toISOString(),
    checkOutDateTime: null,
    status: 'Checked In',
    badgeNumber: 'VIS-2603-1004',
    idProofType: 'College / Student ID',
    idProofNumber: 'MIT-MCA-2024-88',
    remarks: 'Industrial training visit and capstone project coordination.',
    createdAt: new Date(Date.now() - 360 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 360 * 60 * 1000).toISOString(),
  },
  {
    _id: '67001a1b2c3d4e5f6a7b8005',
    visitorName: 'Vikrant Mehta',
    mobileNumber: '+91 98220 11223',
    email: 'v.mehta@cisco-partner.com',
    organization: 'Network Systems Ltd',
    personToMeet: 'Sameer Joshi (IT Operations Lead)',
    purpose: 'Maintenance / Service',
    visitDateTime: new Date(Date.now() - 500 * 60 * 1000).toISOString(),
    checkOutDateTime: new Date(Date.now() - 180 * 60 * 1000).toISOString(),
    status: 'Checked Out',
    badgeNumber: 'VIS-2603-1005',
    idProofType: 'Company Employee ID',
    idProofNumber: 'NET-ENG-491',
    remarks: 'Annual firewall and network switch routine audit.',
    createdAt: new Date(Date.now() - 500 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 180 * 60 * 1000).toISOString(),
  },
  {
    _id: '67001a1b2c3d4e5f6a7b8006',
    visitorName: 'Neha Gupta',
    mobileNumber: '+91 94567 89012',
    email: 'neha.gupta@deloitte.com',
    organization: 'Deloitte Advisory',
    personToMeet: 'Siddharth Sen (Finance Director)',
    purpose: 'Official Discussion',
    visitDateTime: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    checkOutDateTime: null,
    status: 'Checked In',
    badgeNumber: 'VIS-2603-1006',
    idProofType: 'Company Employee ID',
    idProofNumber: 'DEL-AUD-9923',
    remarks: 'Quarterly compliance and statutory review meeting.',
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
];

// Helper to read JSON visitors
const readLocalData = () => {
  ensureDataDir();
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultVisitors, null, 2), 'utf-8');
    return defaultVisitors;
  }
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading JSON fallback data:', err);
    return defaultVisitors;
  }
};

// Helper to write JSON visitors
const writeLocalData = (data) => {
  ensureDataDir();
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
};

export const visitorStorage = {
  // Find all with query filters
  async find(filter = {}, sort = { visitDateTime: -1 }) {
    if (getDBStatus()) {
      return await Visitor.find(filter).sort(sort);
    }

    let records = readLocalData();

    // Search filter
    if (filter.$or) {
      records = records.filter((item) => {
        return filter.$or.some((condition) => {
          const key = Object.keys(condition)[0];
          const regex = condition[key];
          return item[key] && regex.test(item[key]);
        });
      });
    }

    // Status filter
    if (filter.status) {
      records = records.filter((item) => item.status === filter.status);
    }

    // Purpose filter
    if (filter.purpose) {
      records = records.filter((item) => item.purpose === filter.purpose);
    }

    // Date range filter
    if (filter.visitDateTime) {
      if (filter.visitDateTime.$gte && filter.visitDateTime.$lte) {
        const gte = new Date(filter.visitDateTime.$gte).getTime();
        const lte = new Date(filter.visitDateTime.$lte).getTime();
        records = records.filter((item) => {
          const t = new Date(item.visitDateTime).getTime();
          return t >= gte && t <= lte;
        });
      } else if (filter.visitDateTime.$gte) {
        const gte = new Date(filter.visitDateTime.$gte).getTime();
        records = records.filter((item) => new Date(item.visitDateTime).getTime() >= gte);
      }
    }

    // Sort
    const sortField = Object.keys(sort)[0] || 'visitDateTime';
    const sortDir = sort[sortField];
    records.sort((a, b) => {
      const valA = a[sortField] || '';
      const valB = b[sortField] || '';
      if (valA < valB) return sortDir === 1 ? -1 : 1;
      if (valA > valB) return sortDir === 1 ? 1 : -1;
      return 0;
    });

    return records;
  },

  // Find single by ID
  async findById(id) {
    if (getDBStatus()) {
      return await Visitor.findById(id);
    }
    const records = readLocalData();
    return records.find((item) => item._id === id || String(item._id) === String(id)) || null;
  },

  // Create new visitor
  async create(visitorData) {
    if (getDBStatus()) {
      const visitor = new Visitor(visitorData);
      return await visitor.save();
    }

    const records = readLocalData();
    const today = new Date();
    const dateStr = today.toISOString().slice(2, 10).replace(/-/g, '');
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    const badgeNumber = visitorData.badgeNumber || `VIS-${dateStr}-${randomHex}`;

    const newRecord = {
      _id: 'local_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 7),
      ...visitorData,
      badgeNumber,
      status: visitorData.status || 'Checked In',
      visitDateTime: visitorData.visitDateTime ? new Date(visitorData.visitDateTime).toISOString() : new Date().toISOString(),
      checkOutDateTime: visitorData.checkOutDateTime || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    records.unshift(newRecord);
    writeLocalData(records);
    return newRecord;
  },

  // Update visitor
  async findByIdAndUpdate(id, updateData) {
    if (getDBStatus()) {
      return await Visitor.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true });
    }

    const records = readLocalData();
    const index = records.findIndex((item) => item._id === id || String(item._id) === String(id));
    if (index === -1) return null;

    records[index] = {
      ...records[index],
      ...updateData,
      updatedAt: new Date().toISOString(),
    };

    writeLocalData(records);
    return records[index];
  },

  // Delete visitor
  async findByIdAndDelete(id) {
    if (getDBStatus()) {
      return await Visitor.findByIdAndDelete(id);
    }

    const records = readLocalData();
    const index = records.findIndex((item) => item._id === id || String(item._id) === String(id));
    if (index === -1) return null;

    const [deleted] = records.splice(index, 1);
    writeLocalData(records);
    return deleted;
  },

  // Get statistics
  async getStats() {
    if (getDBStatus()) {
      const totalVisitors = await Visitor.countDocuments();
      const checkedIn = await Visitor.countDocuments({ status: 'Checked In' });
      const checkedOut = await Visitor.countDocuments({ status: 'Checked Out' });

      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);
      const endOfToday = new Date();
      endOfToday.setHours(23, 59, 59, 999);

      const todayVisits = await Visitor.countDocuments({
        visitDateTime: { $gte: startOfToday, $lte: endOfToday },
      });

      const purposeBreakdown = await Visitor.aggregate([
        { $group: { _id: '$purpose', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]);

      return { totalVisitors, checkedIn, checkedOut, todayVisits, purposeBreakdown };
    }

    const records = readLocalData();
    const totalVisitors = records.length;
    const checkedIn = records.filter((r) => r.status === 'Checked In').length;
    const checkedOut = records.filter((r) => r.status === 'Checked Out').length;

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const todayVisits = records.filter((r) => {
      const t = new Date(r.visitDateTime).getTime();
      return t >= startOfToday.getTime() && t <= endOfToday.getTime();
    }).length;

    const purposeCounts = {};
    records.forEach((r) => {
      purposeCounts[r.purpose] = (purposeCounts[r.purpose] || 0) + 1;
    });

    const purposeBreakdown = Object.entries(purposeCounts).map(([_id, count]) => ({ _id, count }));
    purposeBreakdown.sort((a, b) => b.count - a.count);

    return { totalVisitors, checkedIn, checkedOut, todayVisits, purposeBreakdown };
  },

  // Reset/seed sample records
  async seed() {
    if (getDBStatus()) {
      await Visitor.deleteMany({});
      return await Visitor.insertMany(defaultVisitors);
    }
    writeLocalData(defaultVisitors);
    return defaultVisitors;
  },
};
