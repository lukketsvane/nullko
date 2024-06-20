// components/shop-card.tsx
import Link from 'next/link';

type Shop = {
  id: string;
  name: string;
  description: string;
};

export default function ShopCard({ shop }: { shop: Shop }) {
  return (
    <Link href={`/dashboard/shops/${shop.id}`}>
      <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-200">
        <h2 className="text-2xl font-bold mb-2">{shop.name}</h2>
        <p className="text-gray-700">{shop.description}</p>
      </div>
    </Link>
  );
}
