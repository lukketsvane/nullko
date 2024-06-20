// app/dashboard/layout.tsx
'use client';

import { Sidebar } from '@/components/sidebar';
import '../globals.css';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}
