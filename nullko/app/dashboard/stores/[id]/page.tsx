'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import StoreDetails from '@/components/store-details';
import RegisterTicket from '@/components/register-ticket';
import QueueStatus from '@/components/queue-status';

type Store = {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  info: string;
  maxWaitRoom: number;
};

export default function StorePage() {
  const [store, setStore] = useState<Store | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      async function fetchStore() {
        try {
          const response = await axios.get(`/api/store/${id}`);
          setStore(response.data);
        } catch (error) {
          console.error('Error fetching store:', error);
        }
      }
      fetchStore();
    }
  }, [id]);

  if (!store) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <StoreDetails store={store} />
        <RegisterTicket storeId={store.id} />
        <QueueStatus storeId={store.id} />
      </div>
    </div>
  );
}
