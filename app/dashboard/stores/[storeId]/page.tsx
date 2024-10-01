'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { useAuth } from '@/lib/authContext'

interface Ticket {
  id: string;
  number: number;
  status: string;
  customerName: string;
  customerId: string;
  createdAt: Date;
}

interface Store {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  openingHours: string;
}

export default function SingleStorePage() {
  const { storeId } = useParams()
  const [store, setStore] = useState<Store | null>(null)
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const fetchStoreAndTickets = async () => {
      if (storeId) {
        try {
          // Fetch store data
          const storeDoc = doc(db, 'shops', storeId as string)
          const storeSnapshot = await getDoc(storeDoc)
          if (storeSnapshot.exists()) {
            setStore({ id: storeSnapshot.id, ...storeSnapshot.data() } as Store)
          }

          // Fetch tickets for this store
          const ticketsCollection = collection(db, 'shops', storeId as string, 'tickets')
          const ticketsQuery = query(ticketsCollection, where('status', '!=', 'completed'))
          const ticketsSnapshot = await getDocs(ticketsQuery)
          const ticketsList = ticketsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate()
          })) as Ticket[]
          setTickets(ticketsList)
        } catch (error) {
          console.error('Error fetching store and tickets:', error)
        } finally {
          setLoading(false)
        }
      }
    }
    fetchStoreAndTickets()
  }, [storeId])

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (!store) {
    return <div className="container mx-auto px-4 py-8">Store not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{store.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{store.description}</p>
          <p className="mb-2"><strong>Address:</strong> {store.address}</p>
          <p className="mb-2"><strong>Phone:</strong> {store.phone}</p>
          <p className="mb-2"><strong>Email:</strong> {store.email}</p>
          <p className="mb-4"><strong>Opening Hours:</strong> {store.openingHours}</p>
          <div className="flex space-x-4">
            <Button asChild>
              <Link href={`/dashboard/stores/${storeId}/edit`}>Edit Store</Link>
            </Button>
            <Button asChild>
              <Link href={`/dashboard/stores/${storeId}/queues`}>View Queues</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Queue</CardTitle>
        </CardHeader>
        <CardContent>
          {tickets.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left">Ticket Number</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Customer Name</th>
                    <th className="px-4 py-2 text-left">Created At</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket) => (
                    <tr key={ticket.id} className="border-b">
                      <td className="px-4 py-2">{ticket.number}</td>
                      <td className="px-4 py-2">{ticket.status}</td>
                      <td className="px-4 py-2">{ticket.customerName}</td>
                      <td className="px-4 py-2">{ticket.createdAt.toLocaleString()}</td>
                      <td className="px-4 py-2">
                        {user && user.uid === ticket.customerId && (
                          <Button asChild size="sm">
                            <Link href={`/dashboard/stores/${storeId}/tickets/${ticket.id}`}>
                              View My Ticket
                            </Link>
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No active tickets in the queue.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}