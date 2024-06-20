// components/nav.tsx
import Link from 'next/link';
import Image from 'next/image';

export function Nav() {
  return (
    <nav className="bg-white border-b-4 border-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-24 border-b-4 border-black">
          <div className="h-full flex items-center">
            <Link href="/">
              <Image src="https://framerusercontent.com/images/VJ7uXYRKVyOwsCyx4pD6X4lro.png" alt="logo" width={300} height={150} />
            </Link>
          </div>
        </div>
        <div className="flex justify-between items-center h-16">
          <div className="hidden md:flex items-center h-full space-x-0">
            <Link href="/about">
              <span className="h-16 w-auto px-4 flex items-center justify-center  border-black text-sm font-medium text-black hover:bg-pink hover:text-white">Om</span>
            </Link>
            <Link href="/features">
              <span className="h-16 w-auto px-4 flex items-center justify-center border-l-4 border-black text-sm font-medium text-black hover:bg-pink hover:text-white">Funksjoner</span>
            </Link>
            <Link href="/pricing">
              <span className="h-16 w-auto px-4 flex items-center justify-center border-l-4 border-r-4 border-black text-sm font-medium text-black hover:bg-pink hover:text-white">Priser</span>
            </Link>
          </div>
          <div className="flex items-center h-full">
            <Link href="/signup">
              <span className="h-16 w-auto flex px-4 items-center justify-center border-l-4 border-black bg-black text-white hover:bg-pink hover:text-black text-sm font-medium ml-auto">Registrer deg</span>
            </Link>
          </div>
          <div className="md:hidden items-center justify-center w-16 h-full bg-black">
            <Link href="/login">
              <span className="h-16 w-full flex items-center justify-center text-white text-sm font-medium text-center">Logg inn</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <div className="sm:px-3 ">
          <Link href="/about">
            <span className="h-16 w-full flex items-center justify-center px-4 border-b-4 border-black text-base font-medium text-black hover:bg-pink hover:text-white">Om</span>
          </Link>
          <Link href="/features">
            <span className="h-16 w-full flex items-center justify-center px-4 border-b-4 border-black text-base font-medium text-black hover:bg-pink hover:text-white">Funksjoner</span>
          </Link>
          <Link href="/pricing">
            <span className="h-16 w-full flex items-center justify-center px-4 border-b-4 border-black text-base font-medium text-black hover:bg-pink hover:text-white">Priser</span>
          </Link>
          <Link href="/signup">
            <span className="h-16 w-full flex items-center justify-center px-4 border-b-4 border-black bg-white text-black hover:bg-pink hover:text-white text-base font-medium">Registrer deg</span>
          </Link>
          <Link href="/login">
            <div className="bg-black h-16 flex items-center justify-center">
              <span className="h-16 w-full flex items-center justify-center text-white text-base font-medium text-center">Logg inn</span>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
