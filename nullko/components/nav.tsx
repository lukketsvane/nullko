// components/nav.tsx
import Link from 'next/link';

export function Nav() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/">
              <span className="text-3xl font-bold">null:kø</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/products">
                <span className="text-black hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">Produkt</span>
              </Link>
              <Link href="/signup">
                <span className="bg-white text-black hover:bg-gray-200 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">Registrer deg</span>
              </Link>
              <Link href="/login">
                <span className="bg-black text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Logg inn</span>
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white">
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
              <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/products">
            <span className="text-black hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium">Produkt</span>
          </Link>
          <Link href="/signup">
            <span className="bg-white text-black hover:bg-gray-200 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium">Registrer deg</span>
          </Link>
          <Link href="/login">
            <span className="bg-black text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">Logg inn</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
