// app/api/spotIDs/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { firebaseApp } from '@/lib/firebase';

const db = getFirestore(firebaseApp);

export async function POST(req: NextRequest) {
  const { lineId, shopId, time, timeStamp } = await req.json();

  const newSpot = { lineId, shopId, time, timeStamp };

  try {
    const docRef = await addDoc(collection(db, 'spotIDs'), newSpot);
    return NextResponse.json({ id: docRef.id, ...newSpot }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
