// File: hooks/useRBAC.ts

import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export const useRBAC = (user) => {
  const [canManageQueue, setCanManageQueue] = useState(false)

  useEffect(() => {
    const checkPermissions = async () => {
      if (user) {
        const userDoc = doc(db, 'users', user.uid)
        const userSnapshot = await getDoc(userDoc)
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data()
          setCanManageQueue(userData.role === 'admin' || userData.role === 'staff')
        }
      }
    }

    checkPermissions()
  }, [user])

  return { canManageQueue }
}