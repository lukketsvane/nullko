// components/hero-section.tsx
import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center py-12 border-b-4 border-black">
      <h2 className="text-3xl font-semibold text-center mb-4">
        Har du mange flotte ideer? Vi ønsker at du skal prøve dem ut, mange av dem, og finne ut hva som fungerer.
      </h2>
      <Image src="https://framerusercontent.com/images/ZeE5tJPFpNHV7wos9aNl3VJjlo.gif" width={800} height={400} alt="Animert hero" />
    </section>
  );
}
