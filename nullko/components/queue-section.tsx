// components/queue-section.tsx
import Image from 'next/image';

export function QueueSection() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-around py-12 bg-green-100 border-b-4 border-black">
      <div className="md:w-1/2 p-4">
        <h2 className="text-4xl font-semibold mb-4">Kø Alt!</h2>
        <p className="text-lg mb-6">
          Effektivt håndter et mangfold av tilbud med vårt allsidige køsystem. Fra opplæringsvideoer til eksklusive månedsabonnementer, og til og med lanseringer av fysiske produkter - Null:kø er designet for å legge til rette for en smidig driftsstrøm for enhver type tjeneste.
        </p>
        <ul className="list-disc list-inside mb-6">
          <li>Sanntids Køoppdateringer: Hold kundene informerte med live statusoppdateringer.</li>
          <li>Håndtering av Flere Tjenester: Administrer ulike tjenester gjennom et enkelt dashbord.</li>
          <li>Verktøy for Kundebevaring: Engasjer kunder med oppfølgingsfunksjoner og lojalitetsbelønninger.</li>
          <li>Datastyrte Innsikter: Ta informerte beslutninger med vår analysepakke.</li>
        </ul>
      </div>
      <div className="md:w-1/2 p-4">
        <Image src="https://framerusercontent.com/images/2QVkgo9yGj3Gq5Q8kaHh666QzZE.svg" width={600} height={400} alt="Paneler illustrasjon" />
      </div>
    </section>
  );
}
