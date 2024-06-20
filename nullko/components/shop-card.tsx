// components/shop-card.tsx
"use client";

import Link from 'next/link';

interface ShopCardProps {
  id: string;
  name: string;
  address: string;
  description: string;
}

const ShopCard: React.FC<ShopCardProps> = ({ id, name, address, description }) => {
  return (
    <Link href={`/dashboard/shops/${id}`}>
      <div className="p-4 border-2 border-black rounded-lg mb-4 hover:bg-gray-100">
        <h2 className="text-2xl font-bold">{name}</h2>
        <p className="text-sm text-dimGrey">{address}</p>
        <p className="text-base">{description}</p>
      </div>
    </Link>
  );
};

export default ShopCard;
