// lib/api.ts
import { Customer } from './types'

export async function fetchQueueData(page: number, itemsPerPage: number) {
  // This would be an API call in a real application
  await new Promise(resolve => setTimeout(resolve, 500)) // Simulate network delay

  const totalCustomers = 100 // Example total
  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const customers: Customer[] = Array.from({ length: itemsPerPage }, (_, i) => ({
    id: startIndex + i + 1,
    name: `Customer ${startIndex + i + 1}`,
    phone: `+1234567${(startIndex + i + 1).toString().padStart(4, '0')}`,
    status: 'Waiting',
    joinedAt: new Date(Date.now() - Math.random() * 3600000).toISOString(),
  }))

  return {
    customers,
    analytics: {
      averageWaitTime: Math.floor(Math.random() * 20) + 10,
      servedToday: Math.floor(Math.random() * 50) + 20,
      currentQueueLength: totalCustomers,
    },
    hasNextPage: endIndex < totalCustomers,
  }
}

export async function addCustomerToQueue(customer: { name: string; phone: string }) {
  // This would be an API call in a real application
  await new Promise(resolve => setTimeout(resolve, 500)) // Simulate network delay
  console.log('Customer added:', customer)
  return { success: true }
}

export async function updateCustomerStatus(update: { id: number; status: string }) {
  // This would be an API call in a real application
  await new Promise(resolve => setTimeout(resolve, 500)) // Simulate network delay
  console.log('Customer status updated:', update)
  return { success: true }
}

export async function removeCustomerFromQueue(id: number) {
  // This would be an API call in a real application
  await new Promise(resolve => setTimeout(resolve, 500)) // Simulate network delay
  console.log('Customer removed:', id)
  return { success: true }
}

export async function fetchQueueUpdates() {
  // This would be an API call in a real application
  await new Promise(resolve => setTimeout(resolve, 500)) // Simulate network delay

  return [
    {
      id: Date.now(),
      message: `Customer ${Math.floor(Math.random() * 100)} has been served`,
      timestamp: new Date().toLocaleTimeString(),
    },
  ]
}