'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

type Store = {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  info: string;
  maxWaitRoom: number;
};

export default function StoreListPage() {
  const [stores, setStores] = useState<Store[]>([]);

  useEffect(() => {
    async function fetchStores() {
      try {
        const response = await axios.get('/api/store');
        setStores(response.data);
      } catch (error) {
        console.error('Error fetching stores:', error);
      }
    }
    fetchStores();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Mine butikker</h1>
          <Link href="/dashboard/stores/create">
            <div className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer">
              Opprett butikk
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map(store => (
            <Link href={`/dashboard/stores/${store.id}`} key={store.id}>
              <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <h2 className="text-2xl font-bold mb-2">{store.name}</h2>
                <p className="text-gray-700">{store.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
