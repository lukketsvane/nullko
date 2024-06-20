// app/api/tickets/[userID]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { firebaseApp } from '@/lib/firebase';

const db = getFirestore(firebaseApp);

export async function GET(req: NextRequest, { params }: { params: { userID: string } }) {
  try {
    const userID = params.userID;
    const q = query(collection(db, 'spotIDs'), where('userID', '==', userID));
    const querySnapshot = await getDocs(q);

    const tickets = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json(tickets, { status: 200 });
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return NextResponse.json({ error: 'Failed to fetch tickets' }, { status: 500 });
  }
}
