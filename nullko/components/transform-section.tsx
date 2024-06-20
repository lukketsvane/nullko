// components/transform-section.tsx
import Link from 'next/link';
import Image from 'next/image';

export function TransformSection() {
  return (
    <section className="flex flex-col md:flex-row items-stretch justify-around py-12 bg-yellow border-b-4 border-black">
      <div className="md:w-1/2 flex items-center justify-center">
        <div className="md:border-r-4 border-black p-4 h-full">
          <h2 className="text-4xl font-semibold mb-4">Forvandle Måten Du Køer På</h2>
          <p className="text-lg mb-6">
            Integrer vårt digitale køsystem i dine operasjoner for en strømlinjeformet kundeflyt. For veiledning om oppsett og tilpasning, er teamet vårt tilgjengelig for å assistere.
          </p>
          <Link href="/signup">
            <span className="px-4 py-2 bg-black text-white rounded">Lag bruker</span>
          </Link>
        </div>
      </div>
      <div className="md:w-1/2 flex items-center justify-center">
        <div className="p-4">
          <Image src="https://framerusercontent.com/images/Ck6C6UQzSBupSCPstkh6M13g.webp" width={600} height={400} alt="Portrett" />
        </div>
      </div>
    </section>
  );
}
