// app/dashboard/my-tickets/page.tsx

'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Link from 'next/link';

type Ticket = {
  id: string;
  name: string;
  shopID: string;
  time: string;
  timeStamp: number;
};

export default function MyTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [userID, setUserID] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserID(user.uid);
        fetchTickets(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchTickets = async (userID: string) => {
    try {
      const response = await axios.get(`/api/tickets/${userID}`);
      setTickets(response.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  if (!userID) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-whiteSmoke p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 border-2 border-black">
        <h1 className="text-4xl font-bold text-black mb-6">My Tickets</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tickets.map((ticket) => (
            <Link key={ticket.id} href={`/dashboard/my-tickets/${ticket.id}`}>
              <div className="bg-white p-4 shadow-md rounded-lg border border-gray-200 cursor-pointer">
                <h2 className="text-2xl font-bold text-black mb-2">{ticket.name}</h2>
                <p className="text-dimGrey">Shop ID: {ticket.shopID}</p>
                <p className="text-dimGrey">Time: {ticket.time}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
