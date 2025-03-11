"use client"

import type React from "react"
import { createContext, useState, useContext } from "react"

type User = {
  name: string
  email: string
  contact: string
  gender: string
  profilePicture: string | null
}

type UserContextType = {
  user: User
  updateUser: (data: Partial<User>) => void
}
//Database 
const defaultUser: User = {
  name: "John Doe",
  email: "john.doe@example.com",
  contact: "+92 3470967396",
  gender: "Male",
  profilePicture: null,
}

const UserContext = createContext<UserContextType>({
  user: defaultUser,
  updateUser: () => {},
})

export const useUser = () => useContext(UserContext)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(defaultUser)

  const updateUser = (data: Partial<User>) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...data,
    }))
  }

  return <UserContext.Provider value={{ user, updateUser }}>{children}</UserContext.Provider>
}

