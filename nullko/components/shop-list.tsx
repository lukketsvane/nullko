// components/shop-list.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import ShopCard from './shop-card';

type Shop = {
  id: string;
  name: string;
  description: string;
};

export default function ShopList() {
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {shops.map(shop => (
        <ShopCard shop={shop} key={shop.id} />
      ))}
    </div>
  );
}
