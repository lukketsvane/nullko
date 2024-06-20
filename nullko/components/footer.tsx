// components/footer.tsx
export function Footer() {
    return (
      <footer className="bg-black text-white py-8 border-t-4 border-yellowDark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <p className="text-center mb-4">
              Meld deg på vårt nyhetsbrev for å få tips og taktikker for å vokse slik du ønsker.
            </p>
            <div className="flex items-center">
              <input
                type="email"
                placeholder="Din e-postadresse"
                className="px-4 py-2 text-black"
              />
              <button className="bg-pink px-4 py-2 ml-2 text-black">
                →
              </button>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <p>© null:kø, AS.</p>
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  