import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

export async function GET(request: NextRequest) {
  try {
    const storesCollection = db.collection('stores');
    const storesSnapshot = await storesCollection.get();
    const storesList = storesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(storesList);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching stores' }, { status: 500 });
  }
}
