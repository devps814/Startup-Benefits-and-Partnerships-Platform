import { Response } from 'express';
import Deal from '../models/Deal';
import { AuthRequest } from '../middlewares/auth.middleware';
import User from '../models/User';

export const getDeals = async (req: AuthRequest, res: Response) => {
  try {
    const { category, search } = req.query;
    const userId = req.userId;

    let query: any = {};
    
    // If user is not authenticated, only show public deals
    if (!userId) {
      query.isPublic = true;
    }

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { provider: { $regex: search, $options: 'i' } }
      ];
    }

    const deals = await Deal.find(query).sort({ createdAt: -1 });

    // Check user verification status if authenticated
    let isVerified = false;
    if (userId) {
      const user = await User.findById(userId);
      isVerified = user?.isVerified || false;
    }

    const dealsWithLockStatus = deals.map(deal => ({
      ...deal.toObject(),
      isLocked: !deal.isPublic && !isVerified
    }));

    res.json(dealsWithLockStatus);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Failed to fetch deals' });
  }
};

export const getDealById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const deal = await Deal.findById(id);
    if (!deal) {
      return res.status(404).json({ message: 'Deal not found' });
    }

    // Check if user can access this deal
    let isVerified = false;
    if (userId) {
      const user = await User.findById(userId);
      isVerified = user?.isVerified || false;
    }

    const isLocked = !deal.isPublic && !isVerified;

    if (isLocked) {
      return res.status(403).json({ 
        message: 'This deal requires verification',
        deal: {
          id: deal._id,
          title: deal.title,
          isLocked: true
        }
      });
    }

    res.json({
      ...deal.toObject(),
      isLocked: false
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Failed to fetch deal' });
  }
};
