import { NextRequest, NextResponse } from 'next/server';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase-admin';

export async function POST(request: NextRequest) {
  const storeData = await request.json();
  
  try {
    const storesCollection = collection(db, 'stores');
    const storeRef = await addDoc(storesCollection, storeData);
    return NextResponse.json({ id: storeRef.id });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating store' }, { status: 500 });
  }
}
