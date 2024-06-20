// app/components/queue-card.tsx

import React from 'react';
import { useRouter } from 'next/router';

type QueueCardProps = {
  ticket: {
    id: string;
    name: string;
    shopID: string;
    time: string;
  };
};

const QueueCard = ({ ticket }: QueueCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/dashboard/my-tickets/${ticket.id}`);
  };

  return (
    <div className="p-4 border rounded shadow cursor-pointer" onClick={handleClick}>
      <h2 className="text-xl font-bold">{ticket.name}</h2>
      <p>{ticket.time}</p>
    </div>
  );
};

export default QueueCard;
