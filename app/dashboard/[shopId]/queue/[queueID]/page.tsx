'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/authContext'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { db } from '@/lib/firebase'
import { doc, getDoc, updateDoc, collection, query, where, onSnapshot, orderBy } from 'firebase/firestore'
import { UsersIcon, UserPlusIcon, UserMinusIcon } from 'lucide-react'

export default function QueueManagementPage({ params }) {
  const { shopId, queueId } = params
  const { user, loading } = useAuth()
  const router = useRouter()
  const [queue, setQueue] = useState(null)
  const [customers, setCustomers] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    } else if (user && shopId && queueId) {
      fetchQueueData()
      const unsubscribe = subscribeToCustomers()
      return () => unsubscribe()
    }
  }, [user, loading, router, shopId, queueId])

  const fetchQueueData = async () => {
    const queueDoc = await getDoc(doc(db, 'queues', queueId))
    if (queueDoc.exists()) {
      setQueue({ id: queueDoc.id, ...queueDoc.data() })
    } else {
      router.push(`/dashboard/${shopId}`)
    }
  }

  const subscribeToCustomers = () => {
    const q = query(
      collection(db, 'customers'),
      where('queueId', '==', queueId),
      where('status', '==', 'waiting'),
      orderBy('number', 'asc')
    )
    return onSnapshot(q, (querySnapshot) => {
      const customerData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setCustomers(customerData)
    })
  }

  const handleNextCustomer = async () => {
    if (!queue || customers.length === 0) return
    setIsProcessing(true)
    try {
      const nextCustomer = customers[0]
      await updateDoc(doc(db, 'customers', nextCustomer.id), { status: 'processing' })
      await updateDoc(doc(db, 'queues', queueId), { currentNumber: nextCustomer.number })
    } catch (error) {
      console.error('Error processing next customer:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCompleteCustomer = async (customerId) => {
    setIsProcessing(true)
    try {
      await updateDoc(doc(db, 'customers', customerId), { status: 'completed' })
    } catch (error) {
      console.error('Error completing customer:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  if (loading || !queue) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto py-4 px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">{queue.name} - Køadministrasjon</h1>
          <Button onClick={() => router.push(`/dashboard/${shopId}`)} variant="secondary">Tilbake til butikkoversikt</Button>
        </div>
      </header>
      <main className="container mx-auto py-8 px-6">
        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Køoversikt</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Nåværende nummer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{queue.currentNumber}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Ventende kunder</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{customers.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Neste handling</CardTitle>
              </CardHeader>
              <CardContent>
                <Button onClick={handleNextCustomer} disabled={isProcessing || customers.length === 0}>
                  Neste kunde
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
        <section>
          <h3 className="text-2xl font-semibold mb-4">Ventende kunder</h3>
          <div className="space-y-4">
            {customers.map((customer) => (
              <Card key={customer.id}>
                <CardContent className="flex items-center justify-between py-4">
                  <div>
                    <p className="font-semibold">Nummer: {customer.number}</p>
                    <p>Navn: {customer.name}</p>
                  </div>
                  <Button onClick={() => handleCompleteCustomer(customer.id)} disabled={isProcessing}>
                    Fullfør
                  </Button>
                </CardContent>
              </Card>
            ))}
            {customers.length === 0 && (
              <p className="text-muted-foreground">Ingen ventende kunder i køen.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}