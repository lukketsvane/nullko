// app/dashboard/explore/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Categories from '@/components/explore/categories';

export default function ExplorePage() {
  const [search, setSearch] = useState('');
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      const response = await fetch('/api/shops');
      const data = await response.json();
      setStores(data);
    };

    fetchStores();
  }, []);

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="p-4">
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Alle Butikker</h2>
        <input
          type="text"
          placeholder="Søk etter butikker"
          value={search}
          onChange={handleSearch}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredStores.slice(0, 8).map(store => (
            <div key={store.id} className="p-4 border border-gray-300 rounded">
              <h3 className="text-xl font-bold mb-2">{store.name}</h3>
              <p>{store.description}</p>
              <Link href={`/dashboard/shops/${store.id}`}>
                <span className="text-blue-500 hover:underline">Besøk</span>
              </Link>
            </div>
          ))}
        </div>
      </section>
      <Categories />
    </div>
  );
}
