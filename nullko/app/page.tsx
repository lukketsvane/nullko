// app/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Nav } from '@/components/nav';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-whitesmoke">
      <Nav />
      <section className="flex flex-col items-center justify-center py-12 border-b-4 border-black">
        <h2 className="text-3xl font-semibold text-center mb-4">
          Du vet alle de flotte ideene du har? Vi ønsker at du skal prøve dem ut, mange av dem, og finne ut hva som fungerer.
        </h2>
        <Image src="https://framerusercontent.com/images/ZeE5tJPFpNHV7wos9aNl3VJjlo.gif" width={800} height={400} alt="Animated hero" />
      </section>
      <section className="flex flex-col md:flex-row items-center justify-around py-12 bg-yellow border-b-4 border-black">
        <div className="md:w-1/2 p-4">
          <h2 className="text-4xl font-semibold mb-4">Forvandle Måten Du Køer På</h2>
          <p className="text-lg mb-6">
            Integrer vårt digitale køsystem i dine operasjoner for en strømlinjeformet kundeflyt. For veiledning om oppsett og tilpasning, er teamet vårt tilgjengelig for å assistere.
          </p>
          <Link href="/signup">
            <span className="px-4 py-2 bg-blue-600 text-white rounded">Lag bruker</span>
          </Link>
        </div>
        <div className="md:w-1/2 p-4">
          <Image src="https://framerusercontent.com/images/Ck6C6UQzSBupSCPstkh6M13g.webp" width={600} height={400} alt="Portrait" />
        </div>
      </section>
      <section className="flex flex-col items-center justify-center py-12 bg-pink border-b-4 border-black">
        <h2 className="text-4xl font-semibold mb-4">Insert Segments or Entire Pages</h2>
        <p className="text-xl mb-4">ikke vær i veien tjommi</p>
      </section>
      <section className="flex flex-col md:flex-row items-center justify-around py-12 bg-green-100 border-b-4 border-black">
        <div className="md:w-1/2 p-4">
          <h2 className="text-4xl font-semibold mb-4">Kø Alt!</h2>
          <p className="text-lg mb-6">
            Effektivt håndter et mangfold av tilbud med vårt allsidige køsystem. Fra opplæringsvideoer til eksklusive månedsabonnementer, og til og med lanseringer av fysiske produkter - Null:kø er designet for å legge til rette for en smidig driftsstrøm for enhver type tjeneste.
          </p>
          <ul className="list-disc list-inside mb-6">
            <li>Sanntids Køoppdateringer: Hold kundene informerte med live statusoppdateringer.</li>
            <li>Håndtering av Flere Tjenester: Administrer ulike tjenester gjennom et enkelt dashbord.</li>
            <li>Customer Retention Tools: Engage customers with follow-up features and loyalty rewards.</li>
            <li>Verktøy for Kundebevaring: Engasjer kunder med oppfølgingsfunksjoner og lojalitetsbelønninger.</li>
            <li>Datastyrte Innsikter: Ta informerte beslutninger med vår analysepakke.</li>
          </ul>
        </div>
        <div className="md:w-1/2 p-4">
          <Image src="https://framerusercontent.com/images/2QVkgo9yGj3Gq5Q8kaHh666QzZE.svg" width={600} height={400} alt="Panels illustration" />
        </div>
      </section>
      <section className="py-12 bg-whitesmoke border-b-4 border-black">
        <h2 className="text-4xl font-semibold text-center mb-8">
          Leter du etter inspirasjon til hvordan du kan bruke systemene våre?
        </h2>
        <p className="text-center text-lg mb-8">Oppdag brukerhistorier fra kundene våre!</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-4 bg-white shadow-md rounded">
            <Image src="https://framerusercontent.com/images/wfYpLeHzAIXukoKwrdVd0nIeF4.svg" width={100} height={100} alt="Kunstgallerier" />
            <h3 className="text-2xl font-semibold mt-4">Kunstgallerier</h3>
            <p className="mt-2">Utforsk utstillinger i ditt eget tempo; vi varsler deg for neste guidet tur.</p>
          </div>
          <div className="p-4 bg-white shadow-md rounded">
            <Image src="https://framerusercontent.com/images/QSLabU3UZc6iIu03ebdYUeNSUJ8.svg" width={100} height={100} alt="Treningssentre" />
            <h3 className="text-2xl font-semibold mt-4">Treningssentre</h3>
            <p className="mt-2">Tren uten stress; motta en melding når det er din tur til personlig trening eller gruppetimer.</p>
          </div>
          <div className="p-4 bg-white shadow-md rounded">
            <Image src="https://framerusercontent.com/images/r9ApGf9BZo4yBpZKq9hxmGvksbo.svg" width={100} height={100} alt="Frisørsalonger" />
            <h3 className="text-2xl font-semibold mt-4">Frisørsalonger</h3>
            <p className="mt-2">Kos deg med en kaffe mens vi setter deg i kø for en frisk klipp.</p>
          </div>
          <div className="p-4 bg-white shadow-md rounded">
            <Image src="https://framerusercontent.com/images/f10Ialx065u8V8yU8PriTR5gmhE.svg" width={100} height={100} alt="Biblioteker" />
            <h3 className="text-2xl font-semibold mt-4">Biblioteker</h3>
            <p className="mt-2">Les i fred; vi informerer deg når studierommet er klart.</p>
          </div>
          <div className="p-4 bg-white shadow-md rounded">
            <Image src="https://framerusercontent.com/images/MsVw8GkjhfJUCx9yYUPwYZ7KjNk.svg" width={100} height={100} alt="Teknologibutikker" />
            <h3 className="text-2xl font-semibold mt-4">Teknologibutikker</h3>
            <p className="mt-2">Utforsk de siste gadgetene; vi gir deg beskjed når det er tid for din konsultasjon.</p>
          </div>
          <div className="p-4 bg-white shadow-md rounded">
            <Image src="https://framerusercontent.com/images/wfYpLeHzAIXukoKwrdVd0nIeF4.svg" width={100} height={100} alt="Legevakta" />
            <h3 className="text-2xl font-semibold mt-4">Legevakta</h3>
            <p className="mt-2">Wait for urgent care in comfort, knowing your place is held.</p>
          </div>
        </div>
      </section>
      <section className="py-12 bg-pink border-b-4 border-black">
        <h2 className="text-4xl font-semibold text-center mb-8">Vent i stil!</h2>
        <div className="flex justify-center">
          <button className="px-6 py-3 bg-black text-white rounded">Kom igang</button>
        </div>
      </section>
    </div>
  );
}
