'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/authContext'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export default function ProfilePage() {
  const { user } = useAuth()
  const [profile, setProfile] = useState({
    displayName: '',
    phoneNumber: '',
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const userDoc = doc(db, 'users', user.uid)
        const userSnapshot = await getDoc(userDoc)
        if (userSnapshot.exists()) {
          setProfile(userSnapshot.data())
        }
        setLoading(false)
      }
    }
    fetchProfile()
  }, [user])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfile(prevProfile => ({ ...prevProfile, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const userDoc = doc(db, 'users', user.uid)
      await updateDoc(userDoc, profile)
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      })
    } catch (error) {
      console.error('Error updating profile:', error)
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                name="displayName"
                value={profile.displayName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={profile.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}