// components/sidebar.tsx
'use client';

import { Home, Search, Ticket, Store, Settings, User, LogOut, Info } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';

export const Sidebar = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/login');
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`fixed top-0 left-0 h-full ${isOpen ? 'w-64' : 'w-16'} bg-black text-white flex flex-col transition-width duration-300`}>
        <div className="p-4 flex justify-between items-center cursor-pointer" onClick={toggleSidebar}>
          <h1 className="text-2xl font-bold">{isOpen ? 'Null:kø' : 'N'}</h1>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-4">
            <li>
              <Link href="/dashboard">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <Home className="w-5 h-5" />
                  {isOpen && <span>Hjem</span>}
                </div>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/explore">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <Search className="w-5 h-5" />
                  {isOpen && <span>Søk etter butikk</span>}
                </div>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/my-tickets">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <Ticket className="w-5 h-5" />
                  {isOpen && <span>Mine kø kort</span>}
                </div>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/shops">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <Store className="w-5 h-5" />
                  {isOpen && <span>Mine butikker</span>}
                </div>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/settings">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <Settings className="w-5 h-5" />
                  {isOpen && <span>Innstillinger</span>}
                </div>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-dimGrey mt-auto">
          {user && (
            <div className="flex items-center space-x-2 mb-4">
              <User className="w-5 h-5" />
              {isOpen && <span>{user.email}</span>}
            </div>
          )}
          <button onClick={handleLogout} className="flex items-center space-x-2 cursor-pointer w-full">
            <LogOut className="w-5 h-5" />
            {isOpen && <span>Logg ut</span>}
          </button>
          <div className="flex items-center space-x-2 mt-4">
            <Info className="w-5 h-5" />
            {isOpen && <span>Om Null Kø (1.0.4)</span>}
          </div>
        </div>
      </div>
    </>
  );
};
