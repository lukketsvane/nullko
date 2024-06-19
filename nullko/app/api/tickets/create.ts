import { NextRequest, NextResponse } from 'next/server';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase-admin';

export async function POST(request: NextRequest) {
  const { storeId, userId } = await request.json();

  try {
    const ticketCollection = collection(db, 'tickets');
    const ticketRef = await addDoc(ticketCollection, { storeId, userId });
    return NextResponse.json({ ticketId: ticketRef.id });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating ticket' }, { status: 500 });
  }
}
