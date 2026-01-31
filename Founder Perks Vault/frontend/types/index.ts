export interface User {
  id: string;
  email: string;
  name: string;
  isVerified: boolean;
}

export interface Deal {
  _id: string;
  title: string;
  description: string;
  provider: string;
  discount: string;
  category: string;
  isPublic: boolean;
  isLocked?: boolean;
  eligibilityRules?: string;
  claimUrl?: string;
  createdAt: string;
}

export interface Claim {
  _id: string;
  user: string;
  deal: Deal;
  status: 'pending' | 'claimed' | 'expired';
  claimedAt: string;
  createdAt: string;
}
