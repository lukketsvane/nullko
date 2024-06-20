// components/explore/categories.tsx
import Image from 'next/image';

const categories = [
  { name: '3D', description: 'Perfeksjoner håndverket ditt med de samme verktøyene som brukes hos Dreamworks og Pixar.', creators: '16K', products: '89K', sales: '20M', imageUrl: 'https://framerusercontent.com/images/wfYpLeHzAIXukoKwrdVd0nIeF4.svg' },
  { name: 'Design', description: 'Koder, design og send drømmeproduktet ditt med disse tekniske ressursene.', creators: '23K', products: '94K', sales: '29M', imageUrl: 'https://framerusercontent.com/images/QSLabU3UZc6iIu03ebdYUeNSUJ8.svg' },
  { name: 'Tegning & Maling', description: 'Opplæringer, plugins og børster fra pro-konseptkunstnere og illustratører.', creators: '18K', products: '113K', sales: '26M', imageUrl: 'https://framerusercontent.com/images/r9ApGf9BZo4yBpZKq9hxmGvksbo.svg' },
  { name: 'Programvareutvikling', description: 'Lær å kode og verktøy for å hjelpe deg med å kode mer produktivt.', creators: '10K', products: '36K', sales: '11M', imageUrl: 'https://framerusercontent.com/images/f10Ialx065u8V8yU8PriTR5gmhE.svg' },
  { name: 'Selvforbedring', description: 'Beveg kroppen din og publikum med guider, videoer og mer.', creators: '17K', products: '49K', sales: '8M', imageUrl: 'https://framerusercontent.com/images/MsVw8GkjhfJUCx9yYUPwYZ7KjNk.svg' },
  { name: 'Trening & Helse', description: 'Enten du ønsker å slanke deg eller bygge muskler, her er trenere for å hjelpe deg.', creators: '4K', products: '14K', sales: '1M', imageUrl: 'https://framerusercontent.com/images/QSLabU3UZc6iIu03ebdYUeNSUJ8.svg' },
  { name: 'Musikk & Lyddesign', description: 'Spor, beats og looper fra de beste musikerne og ingeniørene i bransjen.', creators: '11K', products: '79K', sales: '10M', imageUrl: 'https://framerusercontent.com/images/r9ApGf9BZo4yBpZKq9hxmGvksbo.svg' },
  { name: 'Fotografering', description: 'Få de beste presetene, stock-bilder og digi mørkeromsbehov.', creators: '8K', products: '66K', sales: '4M', imageUrl: 'https://framerusercontent.com/images/f10Ialx065u8V8yU8PriTR5gmhE.svg' },
];

export default function Categories() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Butikk Kategorier</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <div key={index} className="p-4 border border-gray-300 rounded">
            <Image src={category.imageUrl} width={100} height={100} alt={category.name} />
            <h3 className="text-xl font-bold mb-2">{category.name}</h3>
            <p>{category.description}</p>
            <div className="text-gray-600 mt-2">
              <span>{category.creators} besøk</span> · <span>{category.products} produkter</span> · <span>{category.sales} salg</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
