// components/shop-list.tsx
"use client";

import useSWR from 'swr';
import ShopCard from './shop-card';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ShopList: React.FC = () => {
  const { data, error } = useSWR('/api/shops', fetcher);

  if (error) return <div>Failed to load shops</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      {data.map((shop: any) => (
        <ShopCard key={shop.id} id={shop.id} name={shop.name} address={shop.address} description={shop.description} />
      ))}
    </div>
  );
};

export default ShopList;
