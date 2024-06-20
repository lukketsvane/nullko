// app/dashboard/my-tickets/[id]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import Link from 'next/link';

type Ticket = {
  id: string;
  name: string;
  shopID: string;
  time: string;
  timeStamp: number;
};

export default function TicketPage() {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchTicket() {
      try {
        const response = await axios.get(`/api/tickets/${id}`);
        setTicket(response.data);
      } catch (error) {
        console.error('Error fetching ticket:', error);
      }
    }
    fetchTicket();
  }, [id]);

  if (!ticket) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-whiteSmoke p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 border-2 border-black">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-black">{ticket.name}</h1>
          <Link href="/dashboard/my-tickets">
            <div className="px-4 py-2 bg-black text-white rounded cursor-pointer">Tilbake</div>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-black">Ticket Details</h2>
            <p className="text-dimGrey"><strong>Shop ID:</strong> {ticket.shopID}</p>
            <p className="text-dimGrey"><strong>Time:</strong> {ticket.time}</p>
            <p className="text-dimGrey"><strong>Timestamp:</strong> {ticket.timeStamp}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
