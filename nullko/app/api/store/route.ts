import { NextRequest, NextResponse } from 'next/server';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase-admin';

export async function GET(request: NextRequest) {
  try {
    const storesCollection = collection(db, 'stores');
    const storesSnapshot = await getDocs(storesCollection);
    const storesList = storesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(storesList);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching stores' }, { status: 500 });
  }
}
