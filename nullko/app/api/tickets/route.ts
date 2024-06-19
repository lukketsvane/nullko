import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

export async function POST(request: NextRequest) {
  const { storeId, services, ticketId } = await request.json();

  try {
    const ticketRef = db.collection('tickets').doc(ticketId);
    await ticketRef.set({
      storeId,
      services,
      ticketId,
      createdAt: new Date().toISOString(),
    });
    return NextResponse.json({ message: 'Ticket registered successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Error registering ticket' }, { status: 500 });
  }
}
