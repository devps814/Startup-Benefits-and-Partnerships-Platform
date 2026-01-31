'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { getUser, logout } from '@/lib/auth';

export default function Navbar() {
  const pathname = usePathname();
  const user = getUser();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-amber-400">
            Founder Perks Vault
          </Link>
          
          <div className="flex items-center gap-6">
            <Link
              href="/deals"
              className={`transition-colors ${
                pathname === '/deals' ? 'text-amber-400' : 'text-slate-300 hover:text-amber-400'
              }`}
            >
              Deals
            </Link>
            
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className={`transition-colors ${
                    pathname === '/dashboard' ? 'text-amber-400' : 'text-slate-300 hover:text-amber-400'
                  }`}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-slate-300 hover:text-amber-400 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-slate-300 hover:text-amber-400 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-amber-500 text-slate-900 rounded-lg hover:bg-amber-400 transition-colors font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
