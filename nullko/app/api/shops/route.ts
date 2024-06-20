// app/api/shops/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { firebaseApp } from '@/lib/firebase';

const db = getFirestore(firebaseApp);

export async function POST(req: NextRequest) {
  const { name, address, description, phone, maxWaitRoom, info } = await req.json();

  const newShop = { name, address, description, phone, maxWaitRoom, info, current_spot: 0, latest_spot: 0, waitroom_num: 0 };

  try {
    const docRef = await addDoc(collection(db, 'shops'), newShop);
    return NextResponse.json({ id: docRef.id, ...newShop }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, 'shops'));
    const shops = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(shops, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}