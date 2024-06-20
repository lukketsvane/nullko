// components/nav.tsx
import Link from 'next/link';

export function Nav() {
  return (
    <nav className="bg-white border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 border-r-4 border-black pr-4 h-full flex items-center">
            <Link href="/">
              <span className="text-3xl font-bold">null:kø</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-0">
            <Link href="/products">
              <span className="border-l-4 border-black px-3 py-2 text-sm font-medium text-black hover:text-gray-700 h-full flex items-center">Produkt</span>
            </Link>
            <Link href="/signup">
              <span className="border-l-4 border-black bg-white text-black hover:bg-gray-200 hover:text-gray-700 px-3 py-2 text-sm font-medium h-full flex items-center">Registrer deg</span>
            </Link>
            <Link href="/login">
              <span className="border-l-4 border-black bg-black text-white hover:bg-gray-700 px-3 py-2 text-sm font-medium h-full flex items-center">Logg inn</span>
            </Link>
          </div>
          <div className="-mr-2 flex md:hidden items-center justify-center w-16 h-16 bg-black">
            <Link href="/login">
              <span className="text-white text-sm font-medium">Logg inn</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 sm:px-3">
          <Link href="/products">
            <span className="border-b-4 border-black block px-3 py-2 text-base font-medium text-black hover:text-gray-700 h-full flex items-center">Produkt</span>
          </Link>
          <Link href="/signup">
            <span className="border-b-4 border-black bg-white text-black hover:bg-gray-200 hover:text-gray-700 block px-3 py-2 text-base font-medium h-full flex items-center">Registrer deg</span>
          </Link>
          <Link href="/login">
            <div className="bg-black h-16 flex items-center justify-center">
              <span className="text-white text-base font-medium">Logg inn</span>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
