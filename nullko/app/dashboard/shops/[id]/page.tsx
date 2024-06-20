// app/dashboard/shops/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import QueueForm from '@/components/queue-form';

type Shop = {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  info: string;
  maxWaitRoom: number;
};

export default function ShopPage({ params }: { params: { id: string } }) {
  const [shop, setShop] = useState<Shop | null>(null);

  useEffect(() => {
    async function fetchShop() {
      try {
        const response = await axios.get(`/api/shops/${params.id}`);
        setShop(response.data);
      } catch (error) {
        console.error('Error fetching shop:', error);
      }
    }
    fetchShop();
  }, [params.id]);

  if (!shop) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-whiteSmoke p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 border-2 border-black">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-black">{shop.name}</h1>
          <Link href="/dashboard/shops">
            <div className="px-4 py-2 bg-black text-white rounded cursor-pointer">Tilbake</div>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-black">Beskrivelse</h2>
            <p className="text-dimGrey">{shop.description}</p>
            <h2 className="text-2xl font-bold mt-6 mb-4 text-black">Informasjon</h2>
            <p className="text-dimGrey"><strong>Adresse:</strong> {shop.address}</p>
            <p className="text-dimGrey"><strong>Telefon:</strong> {shop.phone}</p>
            <p className="text-dimGrey"><strong>Maks venteroom:</strong> {shop.maxWaitRoom}</p>
            <p className="text-dimGrey"><strong>Info:</strong> {shop.info}</p>
          </div>
        </div>
        <QueueForm shopID={shop.id} />
      </div>
    </div>
  );
}
