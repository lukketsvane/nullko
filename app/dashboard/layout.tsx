'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart, ShoppingBag, Settings, LogOut, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useAuth } from '@/lib/authContext'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const pathname = usePathname()
  const { user, signOut } = useAuth()

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: BarChart },
    { href: '/dashboard/stores', label: 'Stores', icon: ShoppingBag },
    { href: '/dashboard/profile', label: 'Profile', icon: User },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`bg-white ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out`}>
        <div className="flex items-center justify-between p-4">
          <h2 className={`text-xl font-bold ${isSidebarOpen ? 'block' : 'hidden'}`}>Nullkø</h2>
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            {isSidebarOpen ? '←' : '→'}
          </Button>
        </div>
        <nav className="mt-8">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <span className={`flex items-center p-4 ${pathname === item.href ? 'bg-gray-200' : ''}`}>
                <item.icon className="h-5 w-5 mr-4" />
                {isSidebarOpen && <span>{item.label}</span>}
              </span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span>{user?.email}</span>
              <Button variant="ghost" size="icon" onClick={signOut}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  )
}