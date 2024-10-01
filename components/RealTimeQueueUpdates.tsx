// app/components/RealTimeQueueUpdates.tsx
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type QueueUpdate = {
  id: number
  message: string
  timestamp: string
}

export default function RealTimeQueueUpdates() {
  const [updates, setUpdates] = useState<QueueUpdate[]>([])

  useEffect(() => {
    // In a real application, you would use WebSockets or Server-Sent Events here
    // This is just a simulation of real-time updates
    const simulateUpdates = () => {
      const newUpdate: QueueUpdate = {
        id: Date.now(),
        message: `Customer ${Math.floor(Math.random() * 100)} has been served`,
        timestamp: new Date().toLocaleTimeString(),
      }
      setUpdates(prevUpdates => [newUpdate, ...prevUpdates.slice(0, 4)])
    }

    const interval = setInterval(simulateUpdates, 5000) // New update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Real-Time Queue Updates</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {updates.map(update => (
            <li key={update.id} className="bg-secondary p-2 rounded">
              <p className="text-sm">{update.message}</p>
              <p className="text-xs text-gray-500">{update.timestamp}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}