// app/components/queue-form.tsx
'use client';

import { useState } from 'react';
import axios from 'axios';

interface QueueFormProps {
  shopID: string;
}

export default function QueueForm({ shopID }: QueueFormProps) {
  const [lineID, setLineID] = useState('');
  const [time, setTime] = useState('');
  const [timeStamp, setTimeStamp] = useState<number>(Date.now());
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/spotIDs', {
        lineID,
        shopID,
        time,
        timeStamp,
      });

      if (response.status === 200) {
        setMessage('Registrering vellykket');
      } else {
        setMessage('Registrering mislyktes');
      }
    } catch (error) {
      console.error('Error registering:', error);
      setMessage('Registrering mislyktes');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 p-4 border-2 border-black rounded">
      <div className="mb-4">
        <label className="block text-black text-sm font-bold mb-2" htmlFor="lineID">
          Line ID
        </label>
        <input
          id="lineID"
          type="text"
          value={lineID}
          onChange={(e) => setLineID(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-black text-sm font-bold mb-2" htmlFor="time">
          Time
        </label>
        <input
          id="time"
          type="text"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <input type="hidden" value={timeStamp} />
      <div className="mb-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Registrer
        </button>
      </div>
      {message && <p className="text-red-500">{message}</p>}
    </form>
  );
}
