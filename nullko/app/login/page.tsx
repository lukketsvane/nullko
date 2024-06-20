// app/login/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, onAuthStateChanged } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/dashboard');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex bg-whiteSmoke">
      <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Logg inn</h2>
          </div>
          <div className="mt-8">
            <div>
              <div className="space-y-3">
                <button className="w-full inline-flex justify-center py-2 px-4 border border-black bg-blue-600 text-sm font-medium text-white hover:bg-blue-700">
                  Google
                </button>
                <button className="w-full inline-flex justify-center py-2 px-4 border border-black bg-blue-500 text-sm font-medium text-white hover:bg-blue-600">
                  Bank ID
                </button>
                <button className="w-full inline-flex justify-center py-2 px-4 border border-black bg-blue-400 text-sm font-medium text-white hover:bg-blue-500">
                  Stripe
                </button>
                <button className="w-full inline-flex justify-center py-2 px-4 border border-black bg-orange-600 text-sm font-medium text-white hover:bg-orange-700">
                  Vipps
                </button>
              </div>
            </div>

            <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <p className="text-red-600">{error}</p>}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-post</label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Passord</label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                </div>
              </div>
              <div>
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Logg inn
                </button>
              </div>
            </form>
            <p className="mt-2 text-center text-sm text-gray-600">
              Har du ikke en konto?{' '}
              <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                Registrer deg
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src="https://framerusercontent.com/images/bWEEVmWOFB96NKBpO7wcpg8DeA.png"
          alt="Background image"
          layout="fill"
        />
      </div>
    </div>
  );
}
