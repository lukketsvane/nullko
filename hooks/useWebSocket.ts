// File: hooks/useWebSocket.ts

import { useContext } from 'react'
import { WebSocketContext } from '@/lib/WebsocketContext'

export const useWebSocket = () => {
  const context = useContext(WebSocketContext)
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider')
  }
  return context
}