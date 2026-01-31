'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { claimsAPI } from '@/lib/api';
import { Claim } from '@/types';
import { getUser } from '@/lib/auth';
import PageTransition from '@/components/animations/PageTransition';
import Skeleton from '@/components/ui/Skeleton';

export default function DashboardPage() {
  const router = useRouter();
  const user = getUser();
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    loadClaims();
  }, [user]);

  const loadClaims = async () => {
    try {
      const data = await claimsAPI.getMyClaims();
      setClaims(data);
    } catch (error) {
      console.error('Failed to load claims:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2 text-amber-400">Dashboard</h1>
          <p className="text-slate-400">
            Welcome back, {user.name}
            {!user.isVerified && (
              <span className="ml-2 text-amber-500">(Unverified)</span>
            )}
          </p>
        </motion.div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        ) : claims.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-slate-800/50 border border-slate-700 rounded-lg"
          >
            <p className="text-slate-400 mb-4">You haven't claimed any deals yet.</p>
            <Link
              href="/deals"
              className="text-amber-400 hover:text-amber-300"
            >
              Browse Deals →
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {claims.map((claim, index) => (
              <motion.div
                key={claim._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-amber-500/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Link href={`/deals/${claim.deal._id}`}>
                      <h3 className="text-xl font-semibold mb-2 text-amber-400 hover:text-amber-300">
                        {claim.deal.title}
                      </h3>
                    </Link>
                    <p className="text-slate-400 text-sm mb-2">{claim.deal.provider}</p>
                    <p className="text-amber-500 font-medium">{claim.deal.discount}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded text-sm ${
                      claim.status === 'claimed'
                        ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                        : claim.status === 'pending'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50'
                        : 'bg-red-500/20 text-red-400 border border-red-500/50'
                    }`}>
                      {claim.status}
                    </span>
                    <p className="text-slate-500 text-xs mt-2">
                      {new Date(claim.claimedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
