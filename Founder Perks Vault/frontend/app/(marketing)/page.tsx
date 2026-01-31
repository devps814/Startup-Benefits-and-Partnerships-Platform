'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import PageTransition from '@/components/animations/PageTransition';

export default function LandingPage() {
  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent"
            >
              Founder Perks Vault
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-slate-300 mb-8 text-balance"
            >
              Exclusive SaaS perks and discounts curated for founders.
              Unlock verified deals and accelerate your startup.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex gap-4 justify-center"
            >
              <Link
                href="/deals"
                className="px-8 py-4 bg-amber-500 text-slate-900 rounded-lg hover:bg-amber-400 transition-all font-semibold text-lg shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40"
              >
                Browse Deals
              </Link>
              <Link
                href="/register"
                className="px-8 py-4 border border-amber-500 text-amber-400 rounded-lg hover:bg-amber-500/10 transition-all font-semibold text-lg"
              >
                Get Started
              </Link>
            </motion.div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-20 grid md:grid-cols-3 gap-8"
          >
            {[
              {
                title: 'Exclusive Deals',
                description: 'Access verified discounts from top SaaS providers',
              },
              {
                title: 'Verified Access',
                description: 'Unlock premium deals with founder verification',
              },
              {
                title: 'Curated Selection',
                description: 'Hand-picked perks that actually matter for startups',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.6 }}
                className="p-6 rounded-lg border border-slate-800 bg-slate-800/50 hover:border-amber-500/50 transition-colors"
              >
                <h3 className="text-xl font-semibold mb-2 text-amber-400">
                  {feature.title}
                </h3>
                <p className="text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>
    </PageTransition>
  );
}
