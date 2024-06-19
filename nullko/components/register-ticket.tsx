'use client';

import { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

type RegisterTicketProps = {
  storeId: string;
};

export default function RegisterTicket({ storeId }: RegisterTicketProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [ticketId, setTicketId] = useState<string | null>(null);

  const handleServiceChange = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleRegister = async () => {
    try {
      const newTicketId = uuidv4();
      const response = await axios.post('/api/tickets', {
        storeId,
        services: selectedServices,
        ticketId: newTicketId,
      });
      setTicketId(newTicketId);
    } catch (err) {
      setError('Feil ved registrering av billett. Vennligst prøv igjen.');
    }
  };

  return (
    <div>
      <h2>Velg tjenester og registrer</h2>
      <div>
        <label>
          <input
            type="checkbox"
            value="Spørsmål"
            onChange={() => handleServiceChange('Spørsmål')}
          />
          Spørsmål
        </label>
        <label>
          <input
            type="checkbox"
            value="Kjøpe kunst"
            onChange={() => handleServiceChange('Kjøpe kunst')}
          />
          Kjøpe kunst
        </label>
        <label>
          <input
            type="checkbox"
            value="Inngang galleri"
            onChange={() => handleServiceChange('Inngang galleri')}
          />
          Inngang galleri
        </label>
      </div>
      <button onClick={handleRegister}>Registrer</button>
      {error && <p>{error}</p>}
      {ticketId && <p>Din billett ID: {ticketId}</p>}
    </div>
  );
}
