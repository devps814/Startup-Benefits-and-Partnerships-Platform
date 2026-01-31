'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { dealsAPI, claimsAPI } from '@/lib/api';
import { Deal } from '@/types';
import { getUser } from '@/lib/auth';
import PageTransition from '@/components/animations/PageTransition';
import Skeleton from '@/components/ui/Skeleton';

export default function DealDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [deal, setDeal] = useState<Deal | null>(null);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(false);
  const [error, setError] = useState('');
  const [claimed, setClaimed] = useState(false);
  const user = getUser();

  useEffect(() => {
    loadDeal();
  }, [params.id]);

  const loadDeal = async () => {
    try {
      const data = await dealsAPI.getById(params.id as string);
      setDeal(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load deal');
    } finally {
      setLoading(false);
    }
  };

  const handleClaim = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (!deal) return;

    setClaiming(true);
    setError('');

    try {
      await claimsAPI.create(deal._id);
      setClaimed(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to claim deal');
    } finally {
      setClaiming(false);
    }
  };

  if (loading) {
    return (
      <PageTransition>
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-96" />
        </div>
      </PageTransition>
    );
  }

  if (error && !deal) {
    return (
      <PageTransition>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={() => router.push('/deals')}
              className="text-amber-400 hover:text-amber-300"
            >
              Back to Deals
            </button>
          </div>
        </div>
      </PageTransition>
    );
  }

  if (!deal) return null;

  const canClaim = !deal.isLocked && user && !claimed;

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.button
          onClick={() => router.back()}
          className="mb-6 text-slate-400 hover:text-amber-400 transition-colors"
        >
          ← Back
        </motion.button>

        {deal.isLocked && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-amber-500/20 border border-amber-500/50 rounded-lg"
          >
            <p className="text-amber-400">
              🔒 This deal requires verification. Please verify your account to access this deal.
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 border border-slate-700 rounded-lg p-8"
        >
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-slate-700 rounded text-sm text-slate-300 mb-4">
              {deal.category}
            </span>
            <h1 className="text-4xl font-bold mb-4 text-amber-400">{deal.title}</h1>
            <p className="text-xl text-amber-500 mb-2">{deal.discount}</p>
            <p className="text-slate-400 mb-4">by {deal.provider}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-slate-200">Description</h2>
            <p className="text-slate-300 leading-relaxed">{deal.description}</p>
          </div>

          {deal.eligibilityRules && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-slate-200">Eligibility</h2>
              <p className="text-slate-300">{deal.eligibilityRules}</p>
            </div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}

          {claimed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400"
            >
              ✓ Deal claimed successfully! Check your dashboard.
            </motion.div>
          ) : (
            <div className="mt-8">
              {canClaim ? (
                <button
                  onClick={handleClaim}
                  disabled={claiming}
                  className="px-8 py-3 bg-amber-500 text-slate-900 rounded-lg hover:bg-amber-400 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {claiming ? 'Claiming...' : 'Claim Deal'}
                </button>
              ) : !user ? (
                <div className="space-y-4">
                  <p className="text-slate-400">Please login to claim this deal.</p>
                  <button
                    onClick={() => router.push('/login')}
                    className="px-8 py-3 bg-amber-500 text-slate-900 rounded-lg hover:bg-amber-400 transition-colors font-semibold"
                  >
                    Login
                  </button>
                </div>
              ) : null}

              {deal.claimUrl && (
                <a
                  href={deal.claimUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-4 px-8 py-3 border border-amber-500 text-amber-400 rounded-lg hover:bg-amber-500/10 transition-colors font-semibold inline-block"
                >
                  Visit Provider
                </a>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </PageTransition>
  );
}
