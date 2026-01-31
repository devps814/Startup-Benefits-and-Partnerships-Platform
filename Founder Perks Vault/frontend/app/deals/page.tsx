'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { dealsAPI } from '@/lib/api';
import { Deal } from '@/types';
import PageTransition from '@/components/animations/PageTransition';
import Skeleton from '@/components/ui/Skeleton';

const CATEGORIES = ['All', 'Development', 'Design', 'Marketing', 'Analytics', 'Infrastructure', 'Other'];

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadDeals();
  }, [selectedCategory, searchQuery]);

  const loadDeals = async () => {
    setLoading(true);
    try {
      const category = selectedCategory === 'All' ? undefined : selectedCategory;
      const search = searchQuery.trim() || undefined;
      const data = await dealsAPI.getAll(category, search);
      setDeals(data);
    } catch (error) {
      console.error('Failed to load deals:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-8 text-amber-400"
        >
          All Deals
        </motion.h1>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <input
            type="text"
            placeholder="Search deals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-amber-500 text-slate-100"
          />

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? 'bg-amber-500 text-slate-900'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Deals Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-64" />
            ))}
          </div>
        ) : deals.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            No deals found
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deals.map((deal, index) => (
              <motion.div
                key={deal._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/deals/${deal._id}`}>
                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-amber-500/50 transition-all cursor-pointer h-full flex flex-col">
                    {deal.isLocked && (
                      <div className="mb-3 inline-block px-3 py-1 bg-amber-500/20 border border-amber-500/50 rounded text-amber-400 text-sm">
                        🔒 Locked
                      </div>
                    )}
                    <h3 className="text-xl font-semibold mb-2 text-amber-400">
                      {deal.title}
                    </h3>
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                      {deal.description}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-sm text-slate-500">{deal.provider}</span>
                      <span className="text-sm font-medium text-amber-400">
                        {deal.discount}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
