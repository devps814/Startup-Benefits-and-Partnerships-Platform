import { Response } from 'express';
import Claim from '../models/Claim';
import Deal from '../models/Deal';
import User from '../models/User';
import { AuthRequest } from '../middlewares/auth.middleware';

export const createClaim = async (req: AuthRequest, res: Response) => {
  try {
    const { dealId } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    if (!dealId) {
      return res.status(400).json({ message: 'Deal ID is required' });
    }

    const deal = await Deal.findById(dealId);
    if (!deal) {
      return res.status(404).json({ message: 'Deal not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if deal is locked
    if (!deal.isPublic && !user.isVerified) {
      return res.status(403).json({ message: 'This deal requires verification' });
    }

    // Check if already claimed
    const existingClaim = await Claim.findOne({ user: userId, deal: dealId });
    if (existingClaim) {
      return res.status(400).json({ message: 'Deal already claimed' });
    }

    const claim = new Claim({
      user: userId,
      deal: dealId,
      status: 'claimed'
    });

    await claim.save();
    await claim.populate('deal');

    res.status(201).json(claim);
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Deal already claimed' });
    }
    res.status(500).json({ message: error.message || 'Failed to create claim' });
  }
};

export const getMyClaims = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const claims = await Claim.find({ user: userId })
      .populate('deal')
      .sort({ claimedAt: -1 });

    res.json(claims);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Failed to fetch claims' });
  }
};
