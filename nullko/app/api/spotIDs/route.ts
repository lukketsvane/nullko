// app/api/spotIDs/route.ts
import { NextResponse } from 'next/server';
import { firestore } from '@/lib/firebase';

export async function POST(request: Request) {
  try {
    const { lineID, shopID, time, timeStamp } = await request.json();

    if (!lineID || !shopID || !time || !timeStamp) {
      return NextResponse.json({ error: 'Alle feltene må fylles ut.' }, { status: 400 });
    }

    const spotRef = firestore.collection('spotIDs').doc();
    await spotRef.set({
      lineID,
      shopID,
      time,
      timeStamp,
    });

    return NextResponse.json({ message: 'Registrering vellykket' }, { status: 200 });
  } catch (error) {
    console.error('Error creating spotID:', error);
    return NextResponse.json({ error: 'Registrering mislyktes' }, { status: 500 });
  }
}
