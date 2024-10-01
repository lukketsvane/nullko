'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QueueManagement } from '@/components/queue-management'
import { useAuth } from '@/lib/authContext'

interface Shop {
  id: string;
  name: string;
}

export default function DashboardPage() {
  const [shops, setShops] = useState<Shop[]>([])
  const [selectedShop, setSelectedShop] = useState<string | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    const fetchShops = async () => {
      const shopsCollection = collection(db, 'shops')
      const shopSnapshot = await getDocs(shopsCollection)
      const shopList = shopSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Shop[]
      setShops(shopList)
      if (shopList.length > 0) {
        setSelectedShop(shopList[0].id)
      }
    }
    fetchShops()
  }, [])

  if (!user) {
    return <div>Please log in to view the dashboard.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Shop Selection</CardTitle>
          </CardHeader>
          <CardContent>
            <select
              value={selectedShop || ''}
              onChange={(e) => setSelectedShop(e.target.value)}
              className="w-full p-2 border rounded"
            >
              {shops.map((shop) => (
                <option key={shop.id} value={shop.id}>
                  {shop.name}
                </option>
              ))}
            </select>
          </CardContent>
        </Card>
        {selectedShop && (
          <Card>
            <CardHeader>
              <CardTitle>Queue Management</CardTitle>
            </CardHeader>
            <CardContent>
              <QueueManagement shopId={selectedShop} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}