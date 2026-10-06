import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema(
  {
    visitorName: {
      type: String,
      required: [true, 'Visitor name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
    },
    mobileNumber: {
      type: String,
      required: [true, 'Mobile number is required'],
      trim: true,
      match: [/^[0-9+\s\-()]{7,15}$/, 'Please enter a valid mobile number'],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address',
      ],
      default: '',
    },
    organization: {
      type: String,
      required: [true, 'Organization or College name is required'],
      trim: true,
    },
    personToMeet: {
      type: String,
      required: [true, 'Person to meet is required'],
      trim: true,
    },
    purpose: {
      type: String,
      required: [true, 'Purpose of visit is required'],
      enum: [
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
      ],
      default: 'Official Discussion',
    },
    visitDateTime: {
      type: Date,
      required: true,
      default: Date.now,
    },
    checkOutDateTime: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ['Checked In', 'Checked Out'],
      default: 'Checked In',
    },
    badgeNumber: {
      type: String,
      unique: true,
      sparse: true,
    },
    idProofType: {
      type: String,
      enum: [
        'College / Student ID',
        'Company Employee ID',
        'Aadhaar Card',
        'Driving License',
        'Passport',
        'Government ID',
        'Other',
      ],
      default: 'College / Student ID',
    },
    idProofNumber: {
      type: String,
      trim: true,
      default: '',
    },
    remarks: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate badge number if not provided
visitorSchema.pre('save', async function (next) {
  if (!this.badgeNumber) {
    const today = new Date();
    const dateStr = today.toISOString().slice(2, 10).replace(/-/g, '');
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    this.badgeNumber = `VIS-${dateStr}-${randomHex}`;
  }
  next();
});

const Visitor = mongoose.model('Visitor', visitorSchema);

export default Visitor;
