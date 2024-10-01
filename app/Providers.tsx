// components/Providers.tsx

'use client';

import { SessionProvider } from 'next-auth/react';
import { useState, useEffect } from 'react';
import ConsentModal from './ConsentModal';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('userConsent');
    if (!consent) {
      setConsentGiven(false);
    } else {
      setConsentGiven(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('userConsent', 'true');
    setConsentGiven(true);
  };

  return (
    <SessionProvider>
      {!consentGiven && <ConsentModal onAccept={handleAccept} />}
      {children}
    </SessionProvider>
  );
}
