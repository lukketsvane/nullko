// app/queue-status/[queueId]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function QueueStatusPage() {
  const { queueId } = useParams()
  const [queueStatus, setQueueStatus] = useState({
    position: 0,
    estimatedWaitTime: 0,
    totalInQueue: 0,
  })

  useEffect(() => {
    // In a real application, you would fetch the queue status from your backend
    // This is just a simulation
    const fetchQueueStatus = () => {
      setQueueStatus({
        position: Math.floor(Math.random() * 10) + 1,
        estimatedWaitTime: Math.floor(Math.random() * 30) + 5,
        totalInQueue: Math.floor(Math.random() * 20) + 10,
      })
    }

    fetchQueueStatus()
    const interval = setInterval(fetchQueueStatus, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [queueId])

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Queue Status</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Current Queue Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{queueStatus.position}</p>
              <p className="text-sm text-gray-500">Your Position</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{queueStatus.estimatedWaitTime} min</p>
              <p className="text-sm text-gray-500">Estimated Wait Time</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{queueStatus.totalInQueue}</p>
              <p className="text-sm text-gray-500">Total in Queue</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}