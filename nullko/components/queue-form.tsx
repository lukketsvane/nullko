// components/queue-form.tsx
'use client';

import { useState } from 'react';
import axios from 'axios';

export default function QueueForm({ shopId }: { shopId: string }) {
  const [lineId, setLineId] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('/api/spotIDs', {
        lineId,
        shopId,
        time,
        timeStamp: Date.now(),
      });
      alert('Queue spot created successfully!');
    } catch (err) {
      setError('Error creating queue spot');
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Register for Queue</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-600">{error}</p>}
        <div>
          <label htmlFor="lineId" className="block text-sm font-medium text-gray-700">Line ID</label>
          <input
            id="lineId"
            name="lineId"
            type="text"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={lineId}
            onChange={(e) => setLineId(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
          <input
            id="time"
            name="time"
            type="text"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Register
        </button>
      </form>
    </div>
  );
}
