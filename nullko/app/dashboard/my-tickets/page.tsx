// app/dashboard/my-tickets/page.tsx

'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Ticket = {
  id: string;
  name: string;
  shopID: string;
  time: string;
  timeStamp: number;
};

export default function MyTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const userID = "your-user-id"; // Replace with the actual user ID logic

  useEffect(() => {
    async function fetchTickets() {
      try {
        const response = await axios.get(`/api/tickets/${userID}`);
        setTickets(response.data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    }
    fetchTickets();
  }, [userID]);

  if (!tickets.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-whiteSmoke p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 border-2 border-black">
        <h1 className="text-4xl font-bold text-black mb-6">Mine Billetter</h1>
        {tickets.map(ticket => (
          <Link key={ticket.id} href={`/dashboard/my-tickets/${ticket.id}`}>
            <div className="bg-gray-100 p-4 rounded shadow-md mb-4 cursor-pointer">
              <h2 className="text-2xl font-bold text-black">{ticket.name}</h2>
              <p className="text-dimGrey">Tid: {ticket.time}</p>
              <p className="text-dimGrey">Butikk ID: {ticket.shopID}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
