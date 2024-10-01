'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { doc, getDoc } from 'firebase/firestore'
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
  estimatedWaitTime?: number;
}

export default function TicketPage() {
  const { storeId, ticketId } = useParams()
  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const fetchTicket = async () => {
      if (storeId && ticketId) {
        try {
          const ticketDoc = doc(db, 'shops', storeId as string, 'tickets', ticketId as string)
          const ticketSnapshot = await getDoc(ticketDoc)
          if (ticketSnapshot.exists()) {
            setTicket({
              id: ticketSnapshot.id,
              ...ticketSnapshot.data(),
              createdAt: ticketSnapshot.data().createdAt.toDate()
            } as Ticket)
          }
        } catch (error) {
          console.error('Error fetching ticket:', error)
        } finally {
          setLoading(false)
        }
      }
    }
    fetchTicket()
  }, [storeId, ticketId])

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (!ticket) {
    return <div className="container mx-auto px-4 py-8">Ticket not found</div>
  }

  if (user?.uid !== ticket.customerId) {
    return <div className="container mx-auto px-4 py-8">You don't have permission to view this ticket</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Ticket #{ticket.number}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2"><strong>Status:</strong> {ticket.status}</p>
          <p className="mb-2"><strong>Customer Name:</strong> {ticket.customerName}</p>
          <p className="mb-2"><strong>Created At:</strong> {ticket.createdAt.toLocaleString()}</p>
          {ticket.estimatedWaitTime && (
            <p className="mb-4"><strong>Estimated Wait Time:</strong> {ticket.estimatedWaitTime} minutes</p>
          )}
          <div className="flex space-x-4">
            <Button asChild>
              <Link href={`/dashboard/stores/${storeId}`}>Back to Store</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}