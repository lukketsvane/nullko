'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import StoreDetails from '@/components/store-details';
import QueueStatus from '@/components/queue-status';
import QrCode from '@/components/QrCode';

export default function StorePage() {
  const [store, setStore] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchStore() {
      try {
        const response = await axios.get(`/api/store/${id}`);
        setStore(response.data);
      } catch (error) {
        console.error('Error fetching store:', error);
      }
    }
    if (id) fetchStore();
  }, [id]);

  if (!store) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <StoreDetails store={store} />
        <QueueStatus storeId={store.id} />
        <QrCode storeId={store.id} />
      </div>
    </div>
  );
}
