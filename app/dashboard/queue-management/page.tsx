// app/dashboard/queue-management/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import RealTimeQueueUpdates from '@/components/RealTimeQueueUpdates'

export default function QueueManagementPage() {
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [queue, setQueue] = useState([
    { id: 1, name: 'John Doe', phone: '+1234567890', status: 'Waiting', joinedAt: '2023-09-27T10:00:00Z' },
    { id: 2, name: 'Jane Smith', phone: '+0987654321', status: 'Waiting', joinedAt: '2023-09-27T10:15:00Z' },
  ])
  const { toast } = useToast()

  const [analytics, setAnalytics] = useState({
    averageWaitTime: 0,
    servedToday: 0,
    currentQueueLength: 0,
  })

  useEffect(() => {
    // Update analytics
    setAnalytics({
      averageWaitTime: calculateAverageWaitTime(),
      servedToday: calculateServedToday(),
      currentQueueLength: queue.length,
    })
  }, [queue])

  const calculateAverageWaitTime = () => {
    // In a real app, this would be calculated based on historical data
    return Math.floor(Math.random() * 20) + 10
  }

  const calculateServedToday = () => {
    // In a real app, this would be calculated based on actual served customers
    return Math.floor(Math.random() * 50) + 20
  }

  const handleAddToQueue = () => {
    if (customerName && customerPhone) {
      const newCustomer = {
        id: queue.length + 1,
        name: customerName,
        phone: customerPhone,
        status: 'Waiting',
        joinedAt: new Date().toISOString(),
      }
      setQueue([...queue, newCustomer])
      setCustomerName('')
      setCustomerPhone('')
      toast({
        title: "Customer added to queue",
        description: `${customerName} has been added to the queue.`,
      })
    }
  }

  const handleUpdateStatus = (id: number, newStatus: string) => {
    const updatedQueue = queue.map(customer => 
      customer.id === id ? { ...customer, status: newStatus } : customer
    )
    setQueue(updatedQueue)
    toast({
      title: "Status updated",
      description: `Customer status has been updated to ${newStatus}.`,
    })
  }

  const handleRemoveFromQueue = (id: number) => {
    const updatedQueue = queue.filter(customer => customer.id !== id)
    setQueue(updatedQueue)
    toast({
      title: "Customer removed from queue",
      description: "The customer has been removed from the queue.",
    })
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Queue Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Queue Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{analytics.averageWaitTime} min</p>
                <p className="text-sm text-gray-500">Avg. Wait Time</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{analytics.servedToday}</p>
                <p className="text-sm text-gray-500">Served Today</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{analytics.currentQueueLength}</p>
                <p className="text-sm text-gray-500">In Queue</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <RealTimeQueueUpdates />
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add Customer to Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customer-name">Customer Name</Label>
              <Input
                id="customer-name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter customer name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer-phone">Customer Phone</Label>
              <Input
                id="customer-phone"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="Enter customer phone"
              />
            </div>
          </div>
          <Button onClick={handleAddToQueue} className="mt-4">Add to Queue</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Current Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Position</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {queue.map((customer, index) => (
                <TableRow key={customer.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.status}</TableCell>
                  <TableCell>{new Date(customer.joinedAt).toLocaleTimeString()}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleUpdateStatus(customer.id, 'Serving')} className="mr-2">
                      Serve
                    </Button>
                    <Button onClick={() => handleRemoveFromQueue(customer.id)} variant="destructive">
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}