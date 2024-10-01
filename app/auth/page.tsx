'use client'

import { useState } from 'react'
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { doc, setDoc } from 'firebase/firestore'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        // Create a user document in Firestore
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          email: userCredential.user.email,
          createdAt: new Date(),
        })
        toast({ title: "Account created", description: "You've successfully signed up!" })
      } else {
        await signInWithEmailAndPassword(auth, email, password)
        toast({ title: "Welcome back!", description: "You've successfully logged in." })
      }
      // Redirect to the dashboard for both login and signup
      router.push('/dashboard')
    } catch (error) {
      toast({ 
        title: "Authentication error", 
        description: error.message, 
        variant: "destructive" 
      })
    }
  }

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      // Check if it's a new user
      if (result.additionalUserInfo?.isNewUser) {
        // Create a user document in Firestore for new Google sign-ins
        await setDoc(doc(db, 'users', result.user.uid), {
          email: result.user.email,
          createdAt: new Date(),
        })
        toast({ title: "Welcome!", description: "Your account has been created with Google." })
      } else {
        toast({ title: "Welcome back!", description: "You've successfully logged in with Google." })
      }
      // Redirect to the dashboard for both new and existing Google users
      router.push('/dashboard')
    } catch (error) {
      toast({ 
        title: "Google Sign-In error", 
        description: error.message, 
        variant: "destructive" 
      })
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{isSignUp ? 'Sign Up' : 'Log In'}</CardTitle>
          <CardDescription>Welcome to Nullkø</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              {isSignUp ? 'Sign Up' : 'Log In'}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-500">or</span>
          </div>
          <Button onClick={handleGoogleSignIn} variant="outline" className="w-full mt-4">
            Sign in with Google
          </Button>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center w-full">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-500 hover:underline"
            >
              {isSignUp ? 'Log In' : 'Sign Up'}
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}