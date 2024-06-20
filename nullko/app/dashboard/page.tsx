// app/dashboard/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function DashboardPage() {
  const [showNews, setShowNews] = useState(true);

  return (
    <div className="min-h-screen bg-whiteSmoke p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Hei Michael!</h1>
        <button className="bg-pink text-black px-4 py-2 border border-black">
          Ny arbeidsflyt
        </button>
      </div>
      {showNews && (
        <div className="mb-8 p-4 border border-black bg-pink/50">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Image 
                src="https://framerusercontent.com/images/IYyNX07JoABfX9d6L6qLjXciQA.png"
                alt="Nyhet Icon"
                width={32}
                height={32}
                className="mr-4"
              />
              <span className="text-lg font-bold">Nyhet!</span>
            </div>
            <button onClick={() => setShowNews(false)} className="text-lg font-bold">Lukk</button>
          </div>
          <p className="mt-2">Lær mer her!</p>
        </div>
      )}
      <div className="mb-8">
        <Image 
          src="https://framerusercontent.com/images/M4WKxrAAI8Rjhrs4dUhIM7iokuw.png"
          alt="Main Image"
          width={960}
          height={540}
          className="w-full object-cover"
          style={{ aspectRatio: '7 / 4', objectPosition: 'right' }}
        />
      </div>
      <div className="text-left mb-8">
        <h2 className="text-2xl font-bold mb-4">Vi er her for å hjelpe deg med å få betalt for arbeidet ditt.</h2>
        <div className="space-y-4">
          <button className="bg-pink text-black px-4 py-2 border border-black block w-full text-left">Opprett ditt første produkt</button>
          <button className="bg-babyblue text-black px-4 py-2 border border-black block w-full text-left">Opprett en butikk!</button>
        </div>
      </div>
    </div>
  );
}