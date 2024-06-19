import React from 'react';

type Store = {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  info: string;
  maxWaitRoom: number;
};

export default function StoreDetails({ store }: { store: Store }) {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{store.name}</h1>
      <p className="text-gray-700 mb-4">{store.description}</p>
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Kontaktinformasjon</h2>
        <p className="text-gray-700">Adresse: {store.address}</p>
        <p className="text-gray-700">Telefon: {store.phone}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Tilleggsinformasjon</h2>
        <p className="text-gray-700">{store.info}</p>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Maks ventekapasitet</h2>
        <p className="text-gray-700">{store.maxWaitRoom}</p>
      </div>
    </div>
  );
}
