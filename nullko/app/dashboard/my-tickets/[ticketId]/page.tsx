'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

type Ticket = {
  id: string;
  name: string;
  shopID: string;
  time: string;
  timeStamp: number;
};

export default function TicketPage() {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    async function fetchTicket() {
      try {
        const response = await axios.get(`/api/tickets/${ticketId}`);
        setTicket(response.data);
      } catch (error) {
        console.error('Error fetching ticket:', error);
      }
    }
    fetchTicket();
  }, [ticketId]);

  if (!ticket) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-whiteSmoke p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 border-2 border-black">
        <h1 className="text-4xl font-bold text-black mb-6">Ticket Details</h1>
        <p className="text-dimGrey">Name: {ticket.name}</p>
        <p className="text-dimGrey">Shop ID: {ticket.shopID}</p>
        <p className="text-dimGrey">Time: {ticket.time}</p>
        <p className="text-dimGrey">Timestamp: {ticket.timeStamp}</p>
      </div>
    </div>
  );
}
