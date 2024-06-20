// app/dashboard/layout.tsx
'use client';

import { Sidebar } from '@/components/sidebar';
import '../globals.css';
import { useState } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={`flex-1 transition-all duration-0 ${isOpen ? 'ml-64' : 'ml-16'}`}>
        {children}
      </div>
    </div>
  );
}
