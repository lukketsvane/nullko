// components/inspiration-section.tsx
import Image from 'next/image';

export function InspirationSection() {
  return (
    <section className="py-12 bg-whiteSmoke border-b-4 border-black">
      <h2 className="text-4xl font-semibold text-center mb-8">
        Leter du etter inspirasjon til hvordan du kan bruke systemene våre?
      </h2>
      <p className="text-center text-lg mb-8">Oppdag brukerhistorier fra kundene våre!</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <div className="p-4 bg-white shadow-md rounded border border-black">
          <Image src="https://framerusercontent.com/images/wfYpLeHzAIXukoKwrdVd0nIeF4.svg" width={100} height={100} alt="Kunstgallerier" />
          <h3 className="text-2xl font-semibold mt-4">Kunstgallerier</h3>
          <p className="mt-2">Utforsk utstillinger i ditt eget tempo; vi varsler deg for neste guidet tur.</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded border border-black">
          <Image src="https://framerusercontent.com/images/QSLabU3UZc6iIu03ebdYUeNSUJ8.svg" width={100} height={100} alt="Treningssentre" />
          <h3 className="text-2xl font-semibold mt-4">Treningssentre</h3>
          <p className="mt-2">Tren uten stress; motta en melding når det er din tur til personlig trening eller gruppetimer.</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded border border-black">
          <Image src="https://framerusercontent.com/images/r9ApGf9BZo4yBpZKq9hxmGvksbo.svg" width={100} height={100} alt="Frisørsalonger" />
          <h3 className="text-2xl font-semibold mt-4">Frisørsalonger</h3>
          <p className="mt-2">Kos deg med en kaffe mens vi setter deg i kø for en frisk klipp.</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded border border-black">
          <Image src="https://framerusercontent.com/images/f10Ialx065u8V8yU8PriTR5gmhE.svg" width={100} height={100} alt="Biblioteker" />
          <h3 className="text-2xl font-semibold mt-4">Biblioteker</h3>
          <p className="mt-2">Les i fred; vi informerer deg når studierommet er klart.</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded border border-black">
          <Image src="https://framerusercontent.com/images/MsVw8GkjhfJUCx9yYUPwYZ7KjNk.svg" width={100} height={100} alt="Teknologibutikker" />
          <h3 className="text-2xl font-semibold mt-4">Teknologibutikker</h3>
          <p className="mt-2">Utforsk de siste gadgetene; vi gir deg beskjed når det er tid for din konsultasjon.</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded border border-black">
          <Image src="https://framerusercontent.com/images/wfYpLeHzAIXukoKwrdVd0nIeF4.svg" width={100} height={100} alt="Legevakta" />
          <h3 className="text-2xl font-semibold mt-4">Legevakta</h3>
          <p className="mt-2">Vent på akuttbehandling med komfort, vitende om at plassen din er holdt.</p>
        </div>
      </div>
    </section>
  );
}
