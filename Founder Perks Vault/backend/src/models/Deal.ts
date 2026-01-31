import mongoose, { Document, Schema } from 'mongoose';

export interface IDeal extends Document {
  title: string;
  description: string;
  provider: string;
  discount: string;
  category: string;
  isPublic: boolean;
  eligibilityRules?: string;
  claimUrl?: string;
  createdAt: Date;
}

const DealSchema = new Schema<IDeal>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  provider: {
    type: String,
    required: true,
    trim: true
  },
  discount: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Development', 'Design', 'Marketing', 'Analytics', 'Infrastructure', 'Other']
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  eligibilityRules: {
    type: String,
    default: ''
  },
  claimUrl: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<IDeal>('Deal', DealSchema);
