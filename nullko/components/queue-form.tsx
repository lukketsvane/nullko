// app/components/queue-form.tsx

'use client';

import React, { useState } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';
import { useRouter } from 'next/navigation';

type QueueFormProps = {
  shopID: string;
};

export default function QueueForm({ shopID }: QueueFormProps) {
  const [name, setName] = useState('');
  const [time] = useState(new Date().toString());
  const [timeStamp] = useState(Date.now());
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/spotIDs', {
        name,
        shopID,
        time,
        timeStamp,
        userID: "your-user-id" // Replace with the actual user ID logic
      });
      router.push('/dashboard/my-tickets');
    } catch (error) {
      console.error('Error creating spotID:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-black">Registrer til kø</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-black mb-2" htmlFor="name">
            Navn
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#FFB800] text-[#3A3A3A] py-2 px-4 rounded hover:bg-[#FFD700] transition-colors duration-200"
        >
          Registrer
        </button>
      </form>
      {qrCodeUrl && (
        <div className="mt-6 text-center">
          <h3 className="text-xl font-bold mb-2 text-black">Din QR-kode:</h3>
          <QRCode value={qrCodeUrl} size={256} />
        </div>
      )}
    </div>
  );
}
