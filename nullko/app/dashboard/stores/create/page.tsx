'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db, useAuth } from '@/lib/firebase';
import { addDoc, collection } from 'firebase/firestore';

export default function CreateStorePage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [info, setInfo] = useState('');
  const [maxWaitRoom, setMaxWaitRoom] = useState(0);
  const [error, setError] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setConfirmation('');
    try {
      await addDoc(collection(db, 'stores'), {
        name,
        description,
        address,
        phone,
        info,
        maxWaitRoom,
        shopOwner: user?.uid,
        createdAt: new Date(),
      });
      setConfirmation('Butikk opprettet!');
      router.push('/dashboard/stores');
    } catch (err) {
      console.error('Error creating store:', err);
      setError('Feil ved opprettelse av butikk. Vennligst prøv igjen.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Opprett butikk</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-600">{error}</p>}
          {confirmation && <p className="text-green-600">{confirmation}</p>}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Navn
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Beskrivelse
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Adresse
            </label>
            <input
              id="address"
              name="address"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Telefon
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="info" className="block text-sm font-medium text-gray-700">
              Informasjon
            </label>
            <textarea
              id="info"
              name="info"
              rows={3}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={info}
              onChange={(e) => setInfo(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="maxWaitRoom" className="block text-sm font-medium text-gray-700">
              Maks venteroom kapasitet
            </label>
            <input
              id="maxWaitRoom"
              name="maxWaitRoom"
              type="number"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={maxWaitRoom}
              onChange={(e) => setMaxWaitRoom(parseInt(e.target.value))}
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Opprett
          </button>
        </form>
      </div>
    </div>
  );
}
