import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from '@/lib/authContext'
import { WebSocketProvider } from '@/lib/WebsocketContext'
import { ToastProvider } from "@/components/ui/toast"
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <WebSocketProvider>
            <ToastProvider>
              {children}
              <Toaster />
            </ToastProvider>
          </WebSocketProvider>
        </AuthProvider>
      </body>
    </html>
  )
}