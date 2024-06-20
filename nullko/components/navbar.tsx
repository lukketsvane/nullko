// components/navbar.tsx
'use client';

import { Home, Search, Ticket, Store, Settings, User, LogOut, Info, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export const Navbar = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/login');
  };

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-black text-white flex justify-between items-center p-4 md:hidden">
        <button onClick={toggleNavbar} className="focus:outline-none">
          {isOpen ? <X /> : <Menu />}
        </button>
        <div className="flex items-center">
          <Image src="https://fluffy-cod-x9j97vrv6gw3rgg-3000.app.github.dev/" alt="logo" width={100} height={50} />
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 text-white flex flex-col space-y-4 p-4 md:hidden z-50">
          <button onClick={toggleNavbar} className="self-end focus:outline-none">
            <X className="w-6 h-6" />
          </button>
          <Link href="/dashboard">
            <div className="flex items-center space-x-2 cursor-pointer">
              <Home className="w-5 h-5" />
              <span>Hjem</span>
            </div>
          </Link>
          <Link href="/dashboard/explore">
            <div className="flex items-center space-x-2 cursor-pointer">
              <Search className="w-5 h-5" />
              <span>Søk etter butikk</span>
            </div>
          </Link>
          <Link href="/dashboard/my-tickets">
            <div className="flex items-center space-x-2 cursor-pointer">
              <Ticket className="w-5 h-5" />
              <span>Mine kø kort</span>
            </div>
          </Link>
          <Link href="/dashboard/shops">
            <div className="flex items-center space-x-2 cursor-pointer">
              <Store className="w-5 h-5" />
              <span>Mine butikker</span>
            </div>
          </Link>
          <Link href="/dashboard/settings">
            <div className="flex items-center space-x-2 cursor-pointer">
              <Settings className="w-5 h-5" />
              <span>Innstillinger</span>
            </div>
          </Link>
          {user && (
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>{user.email}</span>
            </div>
          )}
          <button onClick={handleLogout} className="flex items-center space-x-2 cursor-pointer w-full">
            <LogOut className="w-5 h-5" />
            <span>Logg ut</span>
          </button>
          <div className="flex items-center space-x-2">
            <Info className="w-5 h-5" />
            <span>Om Null Kø (1.0.4)</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
