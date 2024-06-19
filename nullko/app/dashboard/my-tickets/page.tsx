'use client';

import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

type Ticket = {
  id: string;
  createdAt: string;
};

export default function MyTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      async function fetchTickets() {
        const q = query(collection(db, 'tickets'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const ticketsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTickets(ticketsList);
      }
      fetchTickets();
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Mine kø kort</h1>
        {tickets.length === 0 ? (
          <p>Du har ingen registrerte billetter.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map(ticket => (
              <div key={ticket.id} className="bg-white shadow-md rounded-lg p-6">
                <p className="text-xl font-semibold">Billett ID: {ticket.id}</p>
                <p>Registrert: {new Date(ticket.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
