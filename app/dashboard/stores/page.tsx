'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface Store {
  id: string;
  name: string;
  description: string;
}

export default function StoresPage() {
  const [stores, setStores] = useState<Store[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const storesCollection = collection(db, 'shops')
        const storesSnapshot = await getDocs(storesCollection)
        const storesList = storesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Store[]
        setStores(storesList)
      } catch (error) {
        console.error('Error fetching stores:', error)
        toast({
          title: "Error",
          description: "Failed to fetch stores. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }
    fetchStores()
  }, [toast])

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Stores</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.map((store) => (
          <Card key={store.id}>
            <CardHeader>
              <CardTitle>{store.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{store.description}</p>
              <Button asChild>
                <Link href={`/dashboard/stores/${store.id}`}>View Store</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}