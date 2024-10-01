// app/dashboard/queue-management/page.tsx
'use client'

import { useState, useCallback, useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import RealTimeQueueUpdates from '@/components/RealTimeQueueUpdates'
import ErrorBoundary from '@/components/ErrorBoundary'
import { fetchQueueData, addCustomerToQueue, updateCustomerStatus, removeCustomerFromQueue } from '@/lib/api'

const ITEMS_PER_PAGE = 10

export default function QueueManagementPage() {
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const { data: queueData, isLoading, error } = useQuery(
    ['queue', currentPage],
    () => fetchQueueData(currentPage, ITEMS_PER_PAGE),
    { keepPreviousData: true }
  )

  const addCustomerMutation = useMutation(addCustomerToQueue, {
    onSuccess: () => {
      queryClient.invalidateQueries('queue')
      toast({
        title: "Customer added to queue",
        description: `${customerName} has been added to the queue.`,
      })
      setCustomerName('')
      setCustomerPhone('')
    },
  })

  const updateStatusMutation = useMutation(updateCustomerStatus, {
    onSuccess: () => queryClient.invalidateQueries('queue'),
  })

  const removeCustomerMutation = useMutation(removeCustomerFromQueue, {
    onSuccess: () => queryClient.invalidateQueries('queue'),
  })

  const handleAddToQueue = useCallback(() => {
    if (customerName && customerPhone) {
      addCustomerMutation.mutate({ name: customerName, phone: customerPhone })
    }
  }, [customerName, customerPhone, addCustomerMutation])

  const handleUpdateStatus = useCallback((id: number, newStatus: string) => {
    updateStatusMutation.mutate({ id, status: newStatus })
  }, [updateStatusMutation])

  const handleRemoveFromQueue = useCallback((id: number) => {
    removeCustomerMutation.mutate(id)
  }, [removeCustomerMutation])

  const analytics = useMemo(() => ({
    averageWaitTime: queueData?.analytics.averageWaitTime || 0,
    servedToday: queueData?.analytics.servedToday || 0,
    currentQueueLength: queueData?.analytics.currentQueueLength || 0,
  }), [queueData])

  if (error) {
    return <div>An error occurred: {(error as Error).message}</div>
  }

  return (
    <ErrorBoundary>
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
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <>
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
                    {queueData?.customers.map((customer, index) => (
                      <TableRow key={customer.id}>
                        <TableCell>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</TableCell>
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
                <div className="mt-4 flex justify-between">
                  <Button
                    onClick={() => setCurrentPage(old => Math.max(old - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous Page
                  </Button>
                  <Button
                    onClick={() => setCurrentPage(old => old + 1)}
                    disabled={!queueData?.hasNextPage}
                  >
                    Next Page
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </ErrorBoundary>
  )
}