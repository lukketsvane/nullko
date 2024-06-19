// app/dashboard/page.tsx
'use client';

import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="space-y-4">
        <Link href="/dashboard/register-ticket">
          <div className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer">
            Registrer billett
          </div>
        </Link>
        <Link href="/dashboard/my-tickets">
          <div className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer">
            Mine kø kort
          </div>
        </Link>
      </div>
    </div>
  );
}
