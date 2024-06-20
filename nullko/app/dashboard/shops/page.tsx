// app/dashboard/shops/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

type Shop = {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  info: string;
  maxWaitRoom: number;
};

export default function ShopListPage() {
  const [shops, setShops] = useState<Shop[]>([]);

  useEffect(() => {
    async function fetchShops() {
      try {
        const response = await axios.get('/api/shops');
        setShops(response.data);
      } catch (error) {
        console.error('Error fetching shops:', error);
      }
    }
    fetchShops();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Mine butikker</h1>
          <Link href="/dashboard/shops/create">
            <div className="px-4 py-2 bg-[#FFB800] text-[#3A3A3A] rounded cursor-pointer hover:bg-[#FFD700] transition-colors duration-200">
              Opprett butikk
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shops.map(shop => (
            <Link href={`/dashboard/shops/${shop.id}`} key={shop.id}>
              <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-200">
                <h2 className="text-2xl font-bold mb-2">{shop.name}</h2>
                <p className="text-gray-700">{shop.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
