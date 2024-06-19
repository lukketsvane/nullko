'use client';

import { Sidebar } from '@/components/sidebar';
import '../globals.css';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 ml-64 overflow-auto">
        {children}
      </div>
    </div>
  );
}
