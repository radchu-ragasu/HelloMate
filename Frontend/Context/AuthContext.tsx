"use client"

import type React from "react"
import { createContext, useState, useEffect, useContext } from "react"
import { auth, db } from "../../firebase-config"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"

interface UserProfile {
  uid: string
  email: string | null
  name: string
  photoURL: string
  contact: string
  gender: string
}

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (data: Partial<UserProfile>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)

      if (currentUser) {
        // Fetch user profile from Firestore
        const userDocRef = doc(db, "users", currentUser.uid)
        const userDoc = await getDoc(userDocRef)

        if (userDoc.exists()) {
          setProfile(userDoc.data() as UserProfile)
        } else {
          // Create a default profile if it doesn't exist
          const defaultProfile: UserProfile = {
            uid: currentUser.uid,
            email: currentUser.email,
            name: "",
            photoURL: "",
            contact: "",
            gender: "",
          }

          await setDoc(userDocRef, defaultProfile)
          setProfile(defaultProfile)
        }
      } else {
        setProfile(null)
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Create user profile in Firestore
      const userProfile: UserProfile = {
        uid: user.uid,
        email: user.email,
        name: "",
        photoURL: "",
        contact: "",
        gender: "",
      }

      await setDoc(doc(db, "users", user.uid), userProfile)
    } catch (error) {
      console.error("Error signing up:", error)
      throw error
    }
  }
//signin pages
  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.error("Error signing in:", error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Error signing out:", error)
      throw error
    }
  }
//UpdateProfile
  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) return

    try {
      const userDocRef = doc(db, "users", user.uid)
      await setDoc(userDocRef, { ...profile, ...data }, { merge: true })

      // Update local state
      setProfile((prev) => (prev ? { ...prev, ...data } : null))
    } catch (error) {
      console.error("Error updating profile:", error)
      throw error
    }
  }

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    logout,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

