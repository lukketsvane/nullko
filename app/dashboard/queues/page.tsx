'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function QueuesPage() {
  const [queues, setQueues] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchQueues = async () => {
      const queuesCollection = collection(db, 'queues')
      const queueSnapshot = await getDocs(queuesCollection)
      const queueList = queueSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setQueues(queueList)
      setLoading(false)
    }
    fetchQueues()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Queues</h2>
        <Button asChild>
          <Link href="/dashboard/queues/new">Create New Queue</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {queues.map(queue => (
          <Card key={queue.id}>
            <CardHeader>
              <CardTitle>{queue.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Current Queue: {queue.currentNumber}</p>
              <p>People Waiting: {queue.peopleWaiting}</p>
              <Button asChild className="mt-4">
                <Link href={`/dashboard/queues/${queue.id}`}>Manage Queue</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}