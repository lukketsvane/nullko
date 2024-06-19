'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db, useAuth } from '@/lib/firebase';
import { addDoc, collection } from 'firebase/firestore';

export default function RegisterTicketPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  const handleRegister = async () => {
    setIsSubmitting(true);
    setError('');
    setConfirmation('');
    try {
      await addDoc(collection(db, 'tickets'), {
        userId: user?.uid,
        createdAt: new Date(),
      });
      setIsSubmitting(false);
      setConfirmation('Billetten ble registrert!');
      setTimeout(() => {
        router.push('/dashboard/my-tickets');
      }, 2000);
    } catch (err) {
      console.error('Error registering ticket:', err);
      setIsSubmitting(false);
      setError('Feil ved registrering av billett. Vennligst prøv igjen.');
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex-1 p-6 mt-[100px] flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
          <h1 className="text-2xl font-bold mb-4">Registrer billett</h1>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          {confirmation && <p className="text-green-600 mb-4">{confirmation}</p>}
          <button
            onClick={handleRegister}
            className="px-4 py-2 bg-blue-600 text-white rounded w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registrerer...' : 'Registrer'}
          </button>
        </div>
      </div>
    </div>
  );
}
