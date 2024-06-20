// components/sidebar.tsx
'use client';

import { Home, Search, Ticket, Store, Settings, User, LogOut, Info } from 'lucide-react';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export const Sidebar = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (isOpen: boolean) => void; }) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/login');
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {isMobile ? (
        <div className="fixed top-0 left-0 w-full bg-black text-white flex items-center p-4">
          <span className="text-xl font-bold flex-grow text-center" onClick={toggleSidebar}>Null:kø</span>
        </div>
      ) : (
        <div className={`fixed top-0 left-0 h-full bg-black text-white flex flex-col ${isOpen ? 'w-64' : 'w-16'}`}>
          <div className="p-4 cursor-pointer" onClick={toggleSidebar}>
            <h1 className="text-2xl font-bold">{isOpen ? 'Null:kø' : 'N'}</h1>
          </div>
          <nav className="flex-1 p-4">
            <ul className="space-y-4">
              <li>
                <Link href="/dashboard">
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <Home />
                    {isOpen && <span>Hjem</span>}
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/dashboard/explore">
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <Search />
                    {isOpen && <span>Søk etter butikk</span>}
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/dashboard/my-tickets">
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <Ticket />
                    {isOpen && <span>Mine kø kort</span>}
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/dashboard/shops">
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <Store />
                    {isOpen && <span>Mine butikker</span>}
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/dashboard/settings">
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <Settings />
                    {isOpen && <span>Innstillinger</span>}
                  </div>
                </Link>
              </li>
            </ul>
          </nav>
          <div className="p-4 border-t border-dimGrey">
            {user && (
              <div className="flex items-center space-x-2">
                <User />
                <span>{user.email}</span>
              </div>
            )}
            <button onClick={handleLogout} className="flex items-center space-x-2 cursor-pointer mt-4">
              <LogOut />
              {isOpen && <span>Logg ut</span>}
            </button>
            <div className="flex items-center space-x-2 mt-4">
              <Info />
              {isOpen && <span>Om Null Kø (1.0.4)</span>}
            </div>
          </div>
        </div>
      )}

      {isMobile && isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50" onClick={toggleSidebar}></div>
      )}
    </>
  );
};
