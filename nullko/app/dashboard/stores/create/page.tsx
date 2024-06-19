'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import RegisterTicket from '@/components/register-ticket';

export default function RegisterTicketPage() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleRegisterTicket = async (storeId: string) => {
    setError('');
    setSuccess('');
    try {
      await addDoc(collection(db, 'tickets'), {
        storeId,
        userId: 'currentUserId', // Replace with actual user ID
        createdAt: new Date().toISOString(),
      });
      setSuccess('Billett registrert!');
      setTimeout(() => {
        router.push('/dashboard/my-tickets');
      }, 2000);
    } catch (err) {
      setError('Feil ved registrering av billett. Vennligst prøv igjen.');
    }
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">Registrer billett</h1>
      <RegisterTicket onRegister={handleRegisterTicket} />
      {error && <p className="text-red-600 mt-4">{error}</p>}
      {success && <p className="text-green-600 mt-4">{success}</p>}
    </div>
  );
}
