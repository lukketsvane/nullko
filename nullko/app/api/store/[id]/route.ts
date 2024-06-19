import { NextRequest, NextResponse } from 'next/server';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase-admin';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const storeDoc = doc(db, 'stores', id);
    const storeSnapshot = await getDoc(storeDoc);

    if (storeSnapshot.exists()) {
      return NextResponse.json({ id: storeSnapshot.id, ...storeSnapshot.data() });
    } else {
      return NextResponse.json({ message: 'Store not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching store' }, { status: 500 });
  }
}
