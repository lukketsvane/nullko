'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

export default function SingleQueueTicketPage() {
  const { queueId, ticketId } = useParams()
  const router = useRouter()
  const [ticket, setTicket] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTicket = async () => {
      const ticketDoc = doc(db, 'queues', queueId, 'tickets', ticketId)
      const ticketSnapshot = await getDoc(ticketDoc)
      if (ticketSnapshot.exists()) {
        setTicket({ id: ticketSnapshot.id, ...ticketSnapshot.data() })
      } else {
        router.push(`/dashboard/queues/${queueId}`)
      }
      setLoading(false)
    }
    fetchTicket()
  }, [queueId, ticketId, router])

  const handleStatusChange = async (newStatus) => {
    try {
      const ticketRef = doc(db, 'queues', queueId, 'tickets', ticketId)
      await updateDoc(ticketRef, { status: newStatus })
      setTicket(prevTicket => ({ ...prevTicket, status: newStatus }))
      toast({
        title: "Ticket Updated",
        description: `Ticket status changed to ${newStatus}.`,
      })
    } catch (error) {
      console.error('Error updating ticket:', error)
      toast({
        title: "Error",
        description: "Failed to update ticket status. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <div>Loading...</div>
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
          <p className="mb-2"><strong>Service:</strong> {ticket.service}</p>
          <p className="mb-4"><strong>Created At:</strong> {new Date(ticket.createdAt.toDate()).toLocaleString()}</p>
          <div className="flex space-x-4">
            <Button onClick={() => handleStatusChange('in-progress')}>Start Service</Button>
            <Button onClick={() => handleStatusChange('completed')}>Complete Service</Button>
            <Button variant="destructive" onClick={() => handleStatusChange('cancelled')}>Cancel Ticket</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}