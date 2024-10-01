// File: app/dashboard/[shopId]/page.tsx

'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useAuth } from '@/lib/authContext'
import { db } from '@/lib/firebase'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { doc, getDoc, collection, query, where, onSnapshot, updateDoc, deleteDoc, orderBy } from 'firebase/firestore'
import { useToast } from "@/components/ui/use-toast"
import { useWebSocket } from '@/hooks/useWebSocket'
import { useRBAC } from '@/hooks/useRBAC'

export default function ShopDashboardPage({ params }: { params: { shopId: string } }) {
  const { shopId } = params
  const { user } = useAuth()
  const { socket, isConnected } = useWebSocket()
  const { toast } = useToast()
  const { canManageQueue } = useRBAC(user)

  const [shop, setShop] = useState(null)
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchShopAndTickets = async () => {
      if (shopId) {
        try {
          // Fetch shop data
          const shopDoc = doc(db, 'shops', shopId)
          const shopSnapshot = await getDoc(shopDoc)
          if (shopSnapshot.exists()) {
            setShop({ id: shopSnapshot.id, ...shopSnapshot.data() })
          }

          // Set up real-time listener for tickets
          const ticketsCollection = collection(db, 'shops', shopId, 'tickets')
          const activeTicketsQuery = query(
            ticketsCollection,
            where('status', 'in', ['waiting', 'serving']),
            orderBy('createdAt')
          )

          const unsubscribe = onSnapshot(activeTicketsQuery, (snapshot) => {
            const ticketList = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
              createdAt: doc.data().createdAt.toDate()
            }))
            setTickets(ticketList)
            setLoading(false)
          })

          return unsubscribe
        } catch (error) {
          console.error('Error fetching shop and tickets:', error)
          toast({
            title: "Error",
            description: "Failed to load shop data and tickets.",
            variant: "destructive",
          })
          setLoading(false)
        }
      }
    }

    fetchShopAndTickets()
  }, [shopId, toast])

  const callNextTicket = async () => {
    if (!canManageQueue) {
      toast({
        title: "Permission Denied",
        description: "You don't have permission to manage the queue.",
        variant: "destructive",
      })
      return
    }

    const waitingTickets = tickets.filter(ticket => ticket.status === 'waiting')
    if (waitingTickets.length === 0) {
      toast({
        title: "No Waiting Tickets",
        description: "There are no tickets waiting in the queue.",
      })
      return
    }

    const nextTicket = waitingTickets[0]
    try {
      await updateDoc(doc(db, 'shops', shopId, 'tickets', nextTicket.id), {
        status: 'serving'
      })

      if (socket && isConnected) {
        socket.emit('ticketCalled', { shopId, ticketId: nextTicket.id })
      }

      toast({
        title: "Next Ticket Called",
        description: `Now serving ticket number ${nextTicket.number}`,
      })
    } catch (error) {
      console.error('Error calling next ticket:', error)
      toast({
        title: "Error",
        description: "Failed to call the next ticket. Please try again.",
        variant: "destructive",
      })
    }
  }

  const completeTicket = async (ticketId) => {
    if (!canManageQueue) {
      toast({
        title: "Permission Denied",
        description: "You don't have permission to manage the queue.",
        variant: "destructive",
      })
      return
    }

    try {
      await updateDoc(doc(db, 'shops', shopId, 'tickets', ticketId), {
        status: 'completed'
      })

      if (socket && isConnected) {
        socket.emit('ticketCompleted', { shopId, ticketId })
      }

      toast({
        title: "Ticket Completed",
        description: "The ticket has been marked as completed.",
      })
    } catch (error) {
      console.error('Error completing ticket:', error)
      toast({
        title: "Error",
        description: "Failed to complete the ticket. Please try again.",
        variant: "destructive",
      })
    }
  }

  const cancelTicket = async (ticketId) => {
    if (!canManageQueue) {
      toast({
        title: "Permission Denied",
        description: "You don't have permission to manage the queue.",
        variant: "destructive",
      })
      return
    }

    try {
      await deleteDoc(doc(db, 'shops', shopId, 'tickets', ticketId))

      if (socket && isConnected) {
        socket.emit('ticketCancelled', { shopId, ticketId })
      }

      toast({
        title: "Ticket Cancelled",
        description: "The ticket has been cancelled and removed from the queue.",
      })
    } catch (error) {
      console.error('Error cancelling ticket:', error)
      toast({
        title: "Error",
        description: "Failed to cancel the ticket. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (!shop) {
    return <div className="container mx-auto px-4 py-8">Shop not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{shop.name} Dashboard</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Queue Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={callNextTicket} disabled={!canManageQueue || tickets.filter(t => t.status === 'waiting').length === 0}>
            Call Next Ticket
          </Button>
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
                        {ticket.status === 'serving' && (
                          <Button onClick={() => completeTicket(ticket.id)} disabled={!canManageQueue} size="sm" className="mr-2">
                            Complete
                          </Button>
                        )}
                        <Button onClick={() => cancelTicket(ticket.id)} disabled={!canManageQueue} size="sm" variant="destructive">
                          Cancel
                        </Button>
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