// app/api/spotIDs/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { firebaseApp } from '@/lib/firebase';

const db = getFirestore(firebaseApp);

export async function POST(req: NextRequest) {
  try {
    const { name, shopID, time, timeStamp } = await req.json();

    if (!name || !shopID || !time || !timeStamp) {
      return NextResponse.json({ error: 'All fields must be filled out.' }, { status: 400 });
    }

    const spotRef = doc(collection(db, 'spotIDs'));
    await setDoc(spotRef, {
      name,
      shopID,
      time,
      timeStamp,
    });

    return NextResponse.json({ message: 'Registration successful' }, { status: 200 });
  } catch (error) {
    console.error('Error creating spotID:', error);
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
