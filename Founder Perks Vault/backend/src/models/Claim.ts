import mongoose, { Document, Schema } from 'mongoose';

export interface IClaim extends Document {
  user: mongoose.Types.ObjectId;
  deal: mongoose.Types.ObjectId;
  status: 'pending' | 'claimed' | 'expired';
  claimedAt: Date;
  createdAt: Date;
}

const ClaimSchema = new Schema<IClaim>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  deal: {
    type: Schema.Types.ObjectId,
    ref: 'Deal',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'claimed', 'expired'],
    default: 'claimed'
  },
  claimedAt: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent duplicate claims
ClaimSchema.index({ user: 1, deal: 1 }, { unique: true });

export default mongoose.model<IClaim>('Claim', ClaimSchema);
