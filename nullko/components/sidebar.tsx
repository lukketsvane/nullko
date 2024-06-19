'use client';

import { LogOut, Search, Info } from 'lucide-react';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';

export const Sidebar = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/login');
  };

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-black text-white flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      <nav className="flex-1 p-6">
        <ul className="space-y-4">
          <li>
            <Link href="/dashboard/stores">
              <div className="flex items-center space-x-2 cursor-pointer">
                <Search />
                <span>Søk etter butikk</span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/my-tickets">
              <div className="flex items-center space-x-2 cursor-pointer">
                <Search />
                <span>Mine kø kort</span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/stores">
              <div className="flex items-center space-x-2 cursor-pointer">
                <Search />
                <span>Mine butikker</span>
              </div>
            </Link>
          </li>
          {user && (
            <li>
              <div className="flex items-center space-x-2">
                <Info />
                <span>Logged in as {user.email}</span>
              </div>
            </li>
          )}
          <li>
            <button onClick={handleLogout} className="flex items-center space-x-2 cursor-pointer">
              <LogOut />
              <span>Logg ut</span>
            </button>
          </li>
          <li>
            <div className="flex items-center space-x-2">
              <Info />
              <span>Om Null Kø (1.0.4)</span>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};
