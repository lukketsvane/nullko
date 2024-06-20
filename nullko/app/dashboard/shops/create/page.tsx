// app/dashboard/shops/create/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function CreateShopPage() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [maxWaitRoom, setMaxWaitRoom] = useState(0);
  const [info, setInfo] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/shops', { name, address, description, phone, maxWaitRoom, info });
      router.push('/dashboard/shops');
    } catch (error) {
      console.error('Error creating shop:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <form className="max-w-lg w-full bg-white shadow-md rounded-lg p-8 space-y-6" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-6">Opprett ny butikk</h1>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Navn</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adresse</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Beskrivelse</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w/full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefon</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block w/full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="maxWaitRoom" className="block text-sm font-medium text-gray-700">Maks ventrom</label>
          <input
            type="number"
            id="maxWaitRoom"
            value={maxWaitRoom}
            onChange={(e) => setMaxWaitRoom(parseInt(e.target.value))}
            className="mt-1 block w/full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="info" className="block text-sm font-medium text-gray-700">Info</label>
          <input
            type="text"
            id="info"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            className="mt-1 block w/full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Opprett butikk
          </button>
        </div>
      </form>
    </div>
  );
}