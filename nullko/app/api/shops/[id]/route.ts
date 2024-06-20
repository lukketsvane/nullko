// app/api/shops/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { firebaseApp } from '@/lib/firebase';

const db = getFirestore(firebaseApp);

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const docRef = doc(db, 'shops', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: 'Shop not found' }, { status: 404 });
    }

    return NextResponse.json({ id: docSnap.id, ...docSnap.data() }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
